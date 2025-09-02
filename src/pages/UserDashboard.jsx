

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {

    // Filters and sorting state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
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
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/pickups/my${query}`, {
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                <h2 className="text-3xl font-extrabold text-green-900 drop-shadow-lg animate-fadeIn">User Dashboard</h2>
                <form className="flex flex-wrap gap-4 items-center w-full md:w-auto bg-white bg-opacity-80 rounded-xl shadow-lg p-4 animate-fadeIn" onSubmit={e => { e.preventDefault(); fetchPickups(); }}>
                    <div className="flex flex-col">
                        <label htmlFor="status"
                            className="text-xs font-normal ml-1 text-gray-600">
                            Status
                        </label>
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
                <div className='flex justify-center items-center h-[400px]'>
                    <div className="text-center text-lg bg-white bg-opacity-80 rounded-xl shadow-lg p-8 animate-fadeIn">
                        <p className='text-lg font-bold text-red-900 drop-shadow'>Something went wrong.</p>
                        <p className='text-sm text-gray-800'> Please try again later!
                        </p>
                        <button
                            onClick={fetchPickups}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all duration-300"
                        >
                            <span className="inline-block animate-pulse">Retry</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto animate-fadeIn">
                    <table className="min-w-full bg-white rounded-2xl shadow-2xl border border-green-200">
                        <thead>
                            <tr className="bg-gradient-to-r from-green-400 via-green-300 to-green-200 text-green-900">
                                <th className="px-4 py-2">Address</th>
                                <th className="px-4 py-2">Scheduled Date</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pickups.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-4 text-green-700">No pickups found.</td></tr>
                            ) : (
                                pickups.map((pickup, idx) => (
                                    <tr key={pickup._id} className={`border-t transition-all duration-300 hover:bg-green-50 ${idx % 2 === 0 ? 'bg-green-100' : 'bg-white'} animate-fadeIn`}>
                                        <td className="px-4 py-2 font-semibold text-green-900">{pickup.address}</td>
                                        <td className="px-4 py-2">{new Date(pickup.scheduledDate).toLocaleString()}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold shadow ${pickup.status === 'completed' ? 'bg-green-500 text-white' : pickup.status === 'scheduled' ? 'bg-yellow-400 text-green-900' : 'bg-red-400 text-white'}`}>{pickup.status}</span>
                                        </td>
                                        <td className="px-4 py-2">{new Date(pickup.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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

export default UserDashboard;