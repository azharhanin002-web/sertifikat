'use client'; 

import { useState, useEffect } from 'react';
import { FaChartBar } from 'react-icons/fa';

export default function VisitorCounter() {
  const [stats, setStats] = useState({
    online: 0, // Default 0 sambil loading
    today: 0,
    yesterday: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/analytics');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        setStats({
          online: data.online || 0,
          today: data.today || 0,
          yesterday: data.yesterday || 0,
          total: data.total || 0
        });
      } catch (error) {
        console.error("Gagal mengambil data statistik", error);
        // Jika error, biarkan 0 atau tampilkan data fallback
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    
    // Refresh data setiap 60 detik agar realtime
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#2d334c] p-6 rounded-2xl border border-gray-700/50 shadow-lg mt-8 lg:mt-0">
      
      <div className="flex items-center gap-3 mb-4 border-b border-gray-600 pb-3">
        <FaChartBar className="text-[#4ade80]" />
        <h3 className="text-white font-bold text-lg">
          Statistik Pengunjung
        </h3>
      </div>

      <ul className="space-y-3 text-sm text-gray-300">
        <li className="flex justify-between items-center">
          <span>Sedang Online</span>
          <span className="font-bold text-[#4ade80] bg-green-900/30 px-2 py-0.5 rounded text-xs animate-pulse">
             ● {loading ? '...' : stats.online}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span>Hari Ini</span>
          <span className="font-bold text-white">
            {loading ? '...' : stats.today}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span>Kemarin</span>
          <span className="font-bold text-white">
            {loading ? '...' : stats.yesterday}
          </span>
        </li>
        <li className="flex justify-between items-center border-t border-gray-600 pt-3 mt-1">
          <span className="uppercase tracking-wider text-xs font-semibold text-gray-400">Total</span>
          <span className="font-bold text-xl text-white">
            {loading ? '...' : stats.total}
          </span>
        </li>
      </ul>
    </div>
  );
}