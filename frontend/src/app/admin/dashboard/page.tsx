'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '@/app/admin/components/AdminSidebar'; 

interface LogEntry {
  id: number;
  route: string;
  errorMessage: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/logs`,
          { withCredentials: true }
        );
        setLogs(res.data);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden text-black">
      <AdminSidebar />

      <div className="flex flex-col flex-1">
        <AdminNavbar />

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <h2 className="text-2xl font-bold mb-6">Error Logs</h2>

          {loading && <p className="text-gray-500">Loading logs...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="p-3">Route</th>
                    <th className="p-3">Error</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{log.route}</td>
                      <td className="p-3 text-red-700">{log.errorMessage}</td>
                      <td className="p-3 text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
