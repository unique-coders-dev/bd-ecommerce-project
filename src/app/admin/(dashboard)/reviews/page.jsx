"use client";

import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Plus,
  MessageSquare,
  Search
} from 'lucide-react';
import toast from 'react-hot-toast';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: '',
    userName: '',
    rating: 5,
    comment: '',
    isDummy: true
  });

  useEffect(() => {
    fetchReviews();
    fetchProducts();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews(reviews.filter(r => r.id !== id));
        toast.success("Review deleted");
      }
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PUT',
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
        toast.success(`Review ${status}`);
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success("Review created");
        setShowAddModal(false);
        fetchReviews();
        setFormData({ productId: '', userName: '', rating: 5, comment: '', isDummy: true });
      }
    } catch (err) {
      toast.error("Failed to create review");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-500">Manage and moderate product reviews</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-semibold"
        >
          <Plus size={18} />
          Create Review
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-10 text-center text-gray-400">Loading reviews...</td></tr>
              ) : reviews.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-10 text-center text-gray-400">No reviews found</td></tr>
              ) : reviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{review.product?.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-bold text-gray-900">{review.userName}</div>
                      {review.isDummy && <span className="text-[10px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded font-bold uppercase">Admin Created</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-xs line-clamp-2">{review.comment}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      review.status === 'approved' ? 'bg-green-50 text-green-600' : 
                      review.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {review.status !== 'approved' && (
                        <button onClick={() => handleUpdateStatus(review.id, 'approved')} title="Approve" className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"><CheckCircle size={18} /></button>
                      )}
                      {review.status !== 'rejected' && (
                        <button onClick={() => handleUpdateStatus(review.id, 'rejected')} title="Reject" className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all"><XCircle size={18} /></button>
                      )}
                      <button onClick={() => handleDelete(review.id)} title="Delete" className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-scaleUp">
            <h2 className="text-xl font-bold mb-4">Create Dummy Review</h2>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Select Product</label>
                <select 
                  required
                  value={formData.productId}
                  onChange={(e) => setFormData({...formData, productId: e.target.value})}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-primary"
                >
                  <option value="">Select a product</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Reviewer Name</label>
                <input 
                  required
                  type="text"
                  value={formData.userName}
                  onChange={(e) => setFormData({...formData, userName: e.target.value})}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-primary"
                  placeholder="e.g. Happy Customer"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Rating</label>
                <select 
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-primary"
                >
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Comment</label>
                <textarea 
                  required
                  rows="3"
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-primary resize-none"
                  placeholder="Review content..."
                ></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2 border border-gray-200 rounded-lg font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all">Create Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
