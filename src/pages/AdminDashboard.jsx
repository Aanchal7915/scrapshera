import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMapMarkerAlt } from "react-icons/fa";

const AdminDashboard = () => {
    // Modal state for updating status
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [updateStatus, setUpdateStatus] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    // Open modal for status update
    const openModal = (pickup) => {
        setSelectedPickup(pickup);
        setUpdateStatus(pickup.status);
        setModalOpen(true);
        setUpdateError('');
        setUpdateSuccess('');
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedPickup(null);
        setUpdateStatus('');
        setUpdateError('');
        setUpdateSuccess('');
    };

    // Update status API call
    const handleUpdateStatus = async () => {
        if (!selectedPickup) return;
        setUpdateLoading(true);
        setUpdateError('');
        setUpdateSuccess('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/pickups/${selectedPickup._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: updateStatus }),
            });
            const data = await response.json();
            if (!response.ok) {
                setUpdateError('Failed to update status');
                setUpdateLoading(false);
                return;
            }
            setUpdateSuccess('Status updated successfully!');
            toast.success('Status updated successfully!');
            setUpdateLoading(false);
            closeModal();
            fetchPickups();
        } catch (err) {
            setUpdateError('Something went wrong. Please try again.');
            setUpdateLoading(false);
        }
    };

    // Filters and sorting state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sort, setSort] = useState('desc');

    const [pickups, setPickups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const buildQuery = () => {
        const params = [];
        if (page) params.push(`page=${page}`);
        if (limit) params.push(`limit=${limit}`);
        if (email) params.push(`email=${encodeURIComponent(email)}`);
        if (status) params.push(`status=${status}`);
        if (startDate) params.push(`startDate=${startDate}`);
        if (endDate) params.push(`endDate=${endDate}`);
        if (sort) params.push(`sort=${sort}`);
        return params.length ? `?${params.join('&')}` : '';
    };

    const fetchPickups = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const query = buildQuery();
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/pickups${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to fetch pickups');
            }
            const data = await response.json();
            setPickups(data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPickups();
        // eslint-disable-next-line
    }, [page, limit, status, startDate, endDate, sort]);

    return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-4">
            <ToastContainer position="top-right" />
            <div className="flex flex-col md:justify-between md:items-center mb-4 gap-4">
                <h2 className="text-3xl font-extrabold text-green-900 drop-shadow-lg animate-fadeIn">Admin Dashboard</h2>
                <form className="flex flex-wrap gap-4 items-center w-full md:w-auto bg-white bg-opacity-80 rounded-xl shadow-lg p-4 animate-fadeIn" onSubmit={e => { e.preventDefault(); fetchPickups(); }}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-xs font-normal ml-1 text-gray-600">Search by Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="User Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    fetchPickups();
                                }
                            }}
                            className="px-2 py-1 border rounded min-w-[120px]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="status" className="text-xs font-normal ml-1 text-gray-600">Status</label>
                        <select id="status" value={status} onChange={e => setStatus(e.target.value)} className="px-2 py-1 border rounded">
                            <option value="">All Status</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-normal ml-1 text-gray-600">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="px-2 py-1 border rounded min-w-[140px]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-normal ml-1 text-gray-600">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="px-2 py-1 border rounded min-w-[140px]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="sort"
                            className="text-xs font-normal ml-1 text-gray-600">Sort</label>
                        <select id="sort" value={sort} onChange={e => setSort(e.target.value)} className="px-2 py-1 border rounded">
                            <option value="desc">Desc</option>
                            <option value="asc">Asc</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="limit"
                            className="text-xs font-normal ml-1 text-gray-600">Limit</label>
                        <input
                            id="limit"
                            type="number"
                            min={1}
                            value={limit}
                            onChange={e => setLimit(Number(e.target.value))}
                            className="px-2 py-1 border rounded w-16"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all duration-300 mt-6"
                        disabled={loading}
                    >
                        <span className="inline-block animate-pulse">Refresh</span>
                    </button>
                </form>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <svg className="animate-spin h-10 w-10 text-green-500 drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                </div>
            ) : error ? (
                <div className='h-[400px] flex justify-center items-center'>
                    <div className="text-center text-lg bg-white bg-opacity-80 rounded-xl shadow-lg p-8 animate-fadeIn">
                        <p className='text-lg font-bold text-red-900 drop-shadow'>Something went wrong.</p>
                        <p className='text-sm text-gray-800'>Please try again later!</p>
                        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all duration-300 animate-pulse" onClick={fetchPickups}>Retry</button>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto animate-fadeIn">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full bg-white rounded-2xl shadow-2xl border border-green-200 text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-gradient-to-r from-green-400 via-green-300 to-green-200 text-green-900">
                                    <th className="px-2 sm:px-4 py-2">User Name</th>
                                    <th className="px-2 sm:px-4 py-2">User Email</th>
                                    <th className="px-2 sm:px-4 py-2">Phone Number</th>
                                    <th className="px-2 sm:px-4 py-2">Address</th>
                                    <th className="px-2 sm:px-4 py-2">Scheduled Date</th>
                                    <th className="px-2 sm:px-4 py-2">Status</th>
                                    <th className="px-2 sm:px-4 py-2">Created At</th>
                                    <th className="px-2 sm:px-4 py-2">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pickups.length === 0 ? (
                                    <tr><td colSpan={7} className="text-center py-4 text-green-700">No pickups found.</td></tr>
                                ) : (
                                    pickups.map((pickup, idx) => (
                                        <tr key={pickup._id} className={`border-t transition-all duration-300 hover:bg-green-50 ${idx % 2 === 0 ? 'bg-green-100' : 'bg-white'} animate-fadeIn`}>
                                            <td className="px-2 sm:px-4 py-2 font-semibold text-green-900">{pickup.user?.name}</td>
                                            <td className="px-2 sm:px-4 py-2">{pickup.user?.email}</td>
                                            <td className="px-2 sm:px-4 py-2">{pickup.user?.phoneNu || '-'}</td>
                                            <td className="px-2 sm:px-4 py-2">
                                                {pickup.location ? (
                                                    <a
                                                        href={pickup.location}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-green-700 hover:underline"
                                                        title="View on Google Maps"
                                                    >
                                                        <FaMapMarkerAlt className="inline-block text-red-500" />
                                                        <span>{pickup.address}</span>
                                                    </a>
                                                ) : (
                                                    pickup.address
                                                )}
                                            </td>
                                            <td className="px-2 sm:px-4 py-2">{new Date(pickup.scheduledDate).toLocaleString()}</td>
                                            <td className="px-2 sm:px-4 py-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold shadow ${pickup.status === 'completed' ? 'bg-green-500 text-white' : pickup.status === 'scheduled' ? 'bg-yellow-400 text-green-900' : 'bg-red-400 text-white'}`}>{pickup.status}</span>
                                            </td>
                                            <td className="px-2 sm:px-4 py-2">{new Date(pickup.createdAt).toLocaleString()}</td>
                                            <td className="px-2 sm:px-4 py-2">
                                                <button
                                                    className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 w-full transition-all duration-300 animate-pulse"
                                                    onClick={() => openModal(pickup)}
                                                >Update</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Modal for updating status */}
                    {modalOpen && selectedPickup ? (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-2 border border-green-200 animate-fadeIn">
                                <h3 className="text-xl font-extrabold mb-4 text-green-900 drop-shadow">Update Pickup Status</h3>
                                <div className="mb-2 text-xs sm:text-base"><span className="font-semibold">User:</span> {selectedPickup.user?.name} ({selectedPickup.user?.email})</div>
                                <div className="mb-2 text-xs sm:text-base"><span className="font-semibold">Address:</span> {selectedPickup.address}</div>
                                <div className="mb-2 text-xs sm:text-base"><span className="font-semibold">Scheduled Date:</span> {new Date(selectedPickup.scheduledDate).toLocaleString()}</div>
                                <div className="mb-2 text-xs sm:text-base"><span className="font-semibold">Current Status:</span> {selectedPickup.status}</div>
                                <div className="mb-4">
                                    <label htmlFor="updateStatus" className="block text-sm font-medium mb-1">New Status</label>
                                    <select
                                        id="updateStatus"
                                        value={updateStatus}
                                        onChange={e => setUpdateStatus(e.target.value)}
                                        className="px-2 py-1 border rounded w-full focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="scheduled">Scheduled</option>
                                        <option value="completed">Completed</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </div>
                                {updateLoading && (
                                    <div className="flex items-center justify-center mb-2">
                                        <svg className="animate-spin h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        Updating...
                                    </div>
                                )}
                                {updateError && (
                                    <div className="text-red-500 text-sm text-center mb-2">{updateError}</div>
                                )}
                                {updateSuccess && (
                                    <div className="text-green-500 text-sm text-center mb-2">{updateSuccess}</div>
                                )}
                                <div className="flex flex-col sm:flex-row justify-end gap-2">
                                    <button
                                        className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400 transition-all duration-300"
                                        onClick={closeModal}
                                        disabled={updateLoading}
                                    >Cancel</button>
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all duration-300 animate-pulse"
                                        onClick={handleUpdateStatus}
                                        disabled={updateLoading}
                                    >{updateLoading ? 'Updating...' : 'Update'}</button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {/* Pagination Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 animate-fadeIn">
                        <div className="text-sm text-green-900 mb-2 md:mb-0 font-semibold">Page {page} | Showing {limit} per page</div>
                        <div className="flex gap-2">
                            <button
                                className="px-3 py-1 bg-green-200 rounded-lg shadow hover:bg-green-400 transition-all duration-300 disabled:opacity-50"
                                onClick={() => setPage(page > 1 ? page - 1 : 1)}
                                disabled={page <= 1 || loading}
                            >
                                Previous
                            </button>
                            <button
                                className="px-3 py-1 bg-green-200 rounded-lg shadow hover:bg-green-400 transition-all duration-300 disabled:opacity-50"
                                onClick={() => setPage(page + 1)}
                                disabled={loading || pickups.length < limit}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;