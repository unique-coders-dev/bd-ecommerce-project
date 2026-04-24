"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  Package, 
  Trash2, 
  Eye, 
  Clock, 
  Truck, 
  CheckCircle, 
  XCircle,
  Calendar,
  User,
  MapPin,
  Phone
} from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
        if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status });
        toast.success(`Order marked as ${status}`);
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this order permanently?")) return;
    try {
      const res = await fetch(`/api/admin/orders?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(orders.filter(o => o.id !== id));
        setSelectedOrder(null);
        toast.success("Order deleted");
      }
    } catch (err) {
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#111] uppercase tracking-tighter italic">Orders Management</h1>
          <p className="text-gray-400 font-medium">Process and track incoming store orders</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-6 py-3 rounded-2xl border border-black/5 flex flex-col items-end">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Sales</span>
            <span className="text-xl font-black text-primary italic">৳ {orders.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white rounded-[32px] shadow-sm border border-black/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                    <th className="px-8 py-6">Order ID</th>
                    <th className="px-8 py-6">Customer</th>
                    <th className="px-8 py-6">Total</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr><td colSpan="5" className="px-8 py-20 text-center font-black text-gray-300 uppercase tracking-widest animate-pulse">Loading Orders...</td></tr>
                  ) : orders.length === 0 ? (
                    <tr><td colSpan="5" className="px-8 py-20 text-center font-black text-gray-300 uppercase tracking-widest">No orders found</td></tr>
                  ) : orders.map((order) => (
                    <tr 
                      key={order.id} 
                      className={`hover:bg-gray-50/50 transition-all cursor-pointer group ${selectedOrder?.id === order.id ? 'bg-primary/5' : ''}`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-black text-[#111] group-hover:text-primary transition-colors italic">{order.orderNumber}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-[#111]">{order.customerName}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">{order.customerPhone}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-[#111]">৳ {order.totalAmount}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                          order.status === 'processing' ? 'bg-orange-100 text-orange-600' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }} className="p-2 text-gray-400 hover:text-primary hover:bg-primary-soft rounded-xl transition-all"><Eye size={18} /></button>
                          <button onClick={(e) => { e.stopPropagation(); handleDelete(order.id); }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Details Panel */}
        <div className="xl:col-span-1">
          {selectedOrder ? (
            <div className="bg-white rounded-[40px] shadow-2xl border border-black/5 p-8 sticky top-6 space-y-8 animate-fadeIn">
              <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                <div>
                  <h3 className="text-2xl font-black text-[#111] uppercase italic tracking-tighter leading-none mb-1">{selectedOrder.orderNumber}</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
                <div className={`p-3 rounded-2xl ${
                  selectedOrder.status === 'delivered' ? 'bg-green-50 text-green-500' :
                  selectedOrder.status === 'shipped' ? 'bg-blue-50 text-blue-500' :
                  selectedOrder.status === 'processing' ? 'bg-orange-50 text-orange-500' :
                  'bg-gray-50 text-gray-400'
                }`}>
                  <Package size={24} />
                </div>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[3px]">Customer & Shipping</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm font-bold text-[#111]"><User size={16} className="text-gray-300" /> {selectedOrder.customerName}</div>
                    <div className="flex items-center gap-3 text-sm font-bold text-[#111]"><Phone size={16} className="text-gray-300" /> {selectedOrder.customerPhone}</div>
                    <div className="flex items-start gap-3 text-sm font-bold text-gray-500"><MapPin size={16} className="text-gray-300 mt-1 shrink-0" /> {selectedOrder.customerAddress}, {selectedOrder.customerCity}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[3px]">Order Items</h4>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {selectedOrder.orderItems?.map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-[#111] leading-tight">{item.productName}</span>
                          <span className="text-[10px] text-gray-400 font-bold">Qty: {item.quantity} × ৳ {item.price}</span>
                        </div>
                        <span className="text-sm font-black text-primary">৳ {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="pt-6 border-t border-gray-100 space-y-2">
                   <div className="flex justify-between text-xs font-bold text-gray-400"><span>Subtotal</span><span>৳ {selectedOrder.subtotal}</span></div>
                   <div className="flex justify-between text-xs font-bold text-gray-400"><span>Shipping</span><span>{selectedOrder.shippingFee === 0 ? 'FREE' : `৳ ${selectedOrder.shippingFee}`}</span></div>
                   <div className="flex justify-between text-lg font-black text-[#111] pt-2 italic"><span>Total</span><span className="text-primary underline decoration-primary/20 underline-offset-4">৳ {selectedOrder.totalAmount}</span></div>
                </div>

                {/* Status Update Actions */}
                <div className="pt-6 space-y-3">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[3px] mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, 'processing')} className="flex items-center justify-center gap-2 py-3 bg-orange-50 text-orange-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-100 transition-all"><Clock size={14} /> Process</button>
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped')} className="flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all"><Truck size={14} /> Ship</button>
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, 'delivered')} className="flex items-center justify-center gap-2 py-3 bg-green-50 text-green-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-100 transition-all"><CheckCircle size={14} /> Deliver</button>
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')} className="flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all"><XCircle size={14} /> Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-white rounded-[40px] border border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                <Package size={40} />
              </div>
              <div>
                <h4 className="font-black text-gray-400 uppercase tracking-widest">Select an Order</h4>
                <p className="text-xs text-gray-300 font-medium max-w-[200px] mx-auto">Click on any order from the list to view full details and take actions.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
