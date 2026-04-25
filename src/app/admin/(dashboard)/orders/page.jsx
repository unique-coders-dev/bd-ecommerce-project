"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { 
  Package, 
  Trash2, 
  Eye, 
  Clock, 
  Truck, 
  CheckCircle, 
  XCircle,
  Search,
  Calendar as CalendarIcon,
  User,
  MapPin,
  Phone,
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // all, today, week, month
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        if (selectedOrder?.id === id) {
          setSelectedOrder(null);
          setIsModalOpen(false);
        }
        toast.success("Order deleted");
      }
    } catch (err) {
      toast.error("Failed to delete order");
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedOrder(null), 300); // Wait for transition
  };

  // Derived state for filtering and sorting
  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];

    // 1. Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerPhone.includes(query)
      );
    }

    // 2. Date Filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const orderDateThreshold = new Date();
      
      if (dateFilter === 'today') {
        orderDateThreshold.setHours(0, 0, 0, 0);
      } else if (dateFilter === 'week') {
        orderDateThreshold.setDate(now.getDate() - 7);
      } else if (dateFilter === 'month') {
        orderDateThreshold.setMonth(now.getMonth() - 1);
      }

      result = result.filter(order => new Date(order.createdAt) >= orderDateThreshold);
    }

    // 3. Sorting
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'createdAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (sortConfig.key === 'customerName') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    // Reset to page 1 on filter/sort change
    setCurrentPage(1);

    return result;
  }, [orders, searchQuery, dateFilter, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedOrders, currentPage]);

  // Statistics calculations
  const stats = useMemo(() => {
    const totalSales = orders.reduce((acc, o) => acc + o.totalAmount, 0);
    const deliveredOrders = orders.filter(o => o.status === 'delivered');
    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing');
    const completedRevenue = deliveredOrders.reduce((acc, o) => acc + o.totalAmount, 0);

    return {
      totalSales,
      deliveredCount: deliveredOrders.length,
      pendingCount: pendingOrders.length,
      completedRevenue
    };
  }, [orders]);

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <ChevronUp className="w-3 h-3 opacity-20 inline-block ml-1" />;
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3 h-3 text-primary inline-block ml-1" />
      : <ChevronDown className="w-3 h-3 text-primary inline-block ml-1" />;
  };

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#111] uppercase tracking-tighter italic">Orders Management</h1>
          <p className="text-gray-400 font-medium">Process and track incoming store orders</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Sales</span>
          <span className="text-2xl font-black text-[#111] italic">৳ {stats.totalSales.toLocaleString()}</span>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Completed Revenue</span>
          <span className="text-2xl font-black text-green-500 italic">৳ {stats.completedRevenue.toLocaleString()}</span>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Delivered Orders</span>
          <span className="text-2xl font-black text-blue-500 italic">{stats.deliveredCount}</span>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Pending / Processing</span>
          <span className="text-2xl font-black text-orange-500 italic">{stats.pendingCount}</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by Order ID, Name or Phone..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-primary transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select 
            className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-600 outline-none focus:border-primary transition-all cursor-pointer w-full md:w-auto"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[32px] shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="px-8 py-6 cursor-pointer hover:text-[#111] transition-colors" onClick={() => handleSort('orderNumber')}>
                  Order ID <SortIcon columnKey="orderNumber" />
                </th>
                <th className="px-8 py-6 cursor-pointer hover:text-[#111] transition-colors" onClick={() => handleSort('createdAt')}>
                  Date <SortIcon columnKey="createdAt" />
                </th>
                <th className="px-8 py-6 cursor-pointer hover:text-[#111] transition-colors" onClick={() => handleSort('customerName')}>
                  Customer <SortIcon columnKey="customerName" />
                </th>
                <th className="px-8 py-6 cursor-pointer hover:text-[#111] transition-colors" onClick={() => handleSort('totalAmount')}>
                  Total <SortIcon columnKey="totalAmount" />
                </th>
                <th className="px-8 py-6 cursor-pointer hover:text-[#111] transition-colors" onClick={() => handleSort('status')}>
                  Status <SortIcon columnKey="status" />
                </th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="6" className="px-8 py-20 text-center font-black text-gray-300 uppercase tracking-widest animate-pulse">Loading Orders...</td></tr>
              ) : paginatedOrders.length === 0 ? (
                <tr><td colSpan="6" className="px-8 py-20 text-center font-black text-gray-300 uppercase tracking-widest">No orders found</td></tr>
              ) : paginatedOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className={`hover:bg-gray-50/50 transition-all group`}
                >
                  <td className="px-8 py-6">
                    <span className="font-black text-[#111] italic">{order.orderNumber}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-[#111]">{new Date(order.createdAt).toLocaleDateString()}</span>
                      <span className="text-[10px] text-gray-400 uppercase">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
                      <button onClick={(e) => { e.stopPropagation(); openOrderModal(order); }} className="p-2 text-gray-400 hover:text-primary hover:bg-primary-soft rounded-xl transition-all" title="View Details"><Eye size={18} /></button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(order.id); }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Delete Order"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-8 py-4 bg-gray-50/50 border-t border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedOrders.length)} of {filteredAndSortedOrders.length} orders
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-[11px] font-black uppercase tracking-widest text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-[11px] font-black transition-all ${
                      currentPage === i + 1 
                        ? 'bg-primary text-white shadow-md shadow-primary/20' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-[11px] font-black uppercase tracking-widest text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal (Portaled) */}
      {mounted && isModalOpen && selectedOrder && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" style={{ isolation: 'isolate' }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeOrderModal}></div>
          <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn scale-in-center">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${
                  selectedOrder.status === 'delivered' ? 'bg-green-50 text-green-500' :
                  selectedOrder.status === 'shipped' ? 'bg-blue-50 text-blue-500' :
                  selectedOrder.status === 'processing' ? 'bg-orange-50 text-orange-500' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#111] uppercase italic tracking-tighter leading-none mb-1">{selectedOrder.orderNumber}</h3>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <button onClick={closeOrderModal} className="p-2 text-gray-400 hover:text-[#111] hover:bg-gray-100 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Column: Customer & Items */}
                <div className="space-y-8">
                  {/* Customer Info */}
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-[3px] border-b border-gray-100 pb-2">Customer & Shipping</h4>
                    <div className="bg-gray-50 p-5 rounded-2xl space-y-4">
                      <div className="flex items-center gap-3 text-sm font-bold text-[#111]"><User size={18} className="text-[var(--color-primary)]" /> {selectedOrder.customerName}</div>
                      <div className="flex items-center gap-3 text-sm font-bold text-[#111]"><Phone size={18} className="text-[var(--color-primary)]" /> {selectedOrder.customerPhone}</div>
                      <div className="flex items-start gap-3 text-sm font-bold text-gray-500"><MapPin size={18} className="text-[var(--color-primary)] mt-1 shrink-0" /> {selectedOrder.customerAddress}, {selectedOrder.customerCity}</div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-[3px] border-b border-gray-100 pb-2">Order Items</h4>
                    <div className="space-y-3">
                      {selectedOrder.orderItems?.map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[var(--color-primary)]/30 transition-colors">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-[#111] leading-tight">{item.productName}</span>
                            <span className="text-[11px] text-gray-400 font-bold mt-1">Qty: {item.quantity} × ৳ {item.price}</span>
                          </div>
                          <span className="text-base font-black text-[var(--color-primary)]">৳ {item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Totals & Actions */}
                <div className="space-y-8">
                  {/* Totals */}
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-[3px] border-b border-gray-100 pb-2">Order Summary</h4>
                    <div className="bg-gray-50 p-6 rounded-3xl space-y-3">
                       <div className="flex justify-between text-sm font-bold text-gray-500"><span>Subtotal</span><span>৳ {selectedOrder.subtotal}</span></div>
                       <div className="flex justify-between text-sm font-bold text-gray-500"><span>Shipping Fee</span><span>{selectedOrder.shippingFee === 0 ? 'FREE' : `৳ ${selectedOrder.shippingFee}`}</span></div>
                       <div className="pt-4 border-t border-gray-200 mt-2">
                          <div className="flex justify-between text-2xl font-black text-[#111] italic">
                            <span>Total</span>
                            <span className="text-[var(--color-primary)]">৳ {selectedOrder.totalAmount}</span>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Status Actions */}
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-[3px] border-b border-gray-100 pb-2">Update Status</h4>
                    <p className="text-xs text-gray-500 font-medium mb-4">Current Status: <span className="font-bold text-[#111] uppercase">{selectedOrder.status}</span></p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'processing')} 
                        className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedOrder.status === 'processing' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}
                      >
                        <Clock size={16} /> Process
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped')} 
                        className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedOrder.status === 'shipped' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                      >
                        <Truck size={16} /> Ship
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'delivered')} 
                        className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedOrder.status === 'delivered' ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                      >
                        <CheckCircle size={16} /> Deliver
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')} 
                        className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedOrder.status === 'cancelled' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                      >
                        <XCircle size={16} /> Cancel
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AdminOrders;
