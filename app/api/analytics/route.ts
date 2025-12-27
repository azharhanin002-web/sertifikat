import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ID Properti Google Analytics
const PROPERTY_ID = '517655408';

// --- KITA BACA FILE LANGSUNG (ANTI ERROR) ---
// Kode ini akan mencari file 'ga-keys.json' di folder utama proyek
const keyFilePath = path.join(process.cwd(), 'ga-keys.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: keyFilePath, // Ini kuncinya! Kita kasih alamat filenya, bukan teksnya.
});

export async function GET() {
  try {
    // Test ambil data realtime
    const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${PROPERTY_ID}`,
      metrics: [{ name: 'activeUsers' }],
    });

    const [basicResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        { startDate: 'yesterday', endDate: 'today' },
        { startDate: '2020-01-01', endDate: 'today' } 
      ],
      metrics: [{ name: 'activeUsers' }],
      dimensions: [{ name: 'date' }], 
    });

    const onlineUsers = parseInt(realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || '0');
    const rows = basicResponse.rows || [];
    const totalUsers = parseInt(basicResponse.totals?.[1]?.metricValues?.[0]?.value || '0'); 
    
    // Logic Tanggal
    const todayStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0].replace(/-/g, '');

    const todayRow = rows.find(r => r.dimensionValues?.[0].value === todayStr);
    const yesterdayRow = rows.find(r => r.dimensionValues?.[0].value === yesterdayStr);

    return NextResponse.json({
      online: onlineUsers,
      today: parseInt(todayRow?.metricValues?.[0]?.value || '0'),
      yesterday: parseInt(yesterdayRow?.metricValues?.[0]?.value || '0'),
      total: totalUsers,
    }, { 
      status: 200,
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });

  } catch (error: any) {
    console.error('GA4 API Error Detail:', error);
    return NextResponse.json({ 
        error: 'Failed', 
        details: error.message 
    }, { status: 500 });
  }
}