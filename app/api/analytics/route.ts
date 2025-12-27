import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

// --- CONFIG ANTI-CACHE ---
// Ini memaksa Next.js untuk TIDAK MENYIMPAN CACHE (Selalu update realtime)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// --- KEY & CONFIG (SUDAH BENAR) ---
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9hnTs7/EW/WRFbgBaC7srPRjud3ojv3ejvTWNMluHVhhJorGAjzPzPZjM7ehrFwzY3LxCPpnl1vEaUNcSHHOyqlcaBrWF1DKw2Y9oyU3ix5mCZya21A7nGFGmuGS9ESpiwEGzGETDNj2LECWQTHqePai+F4ZKqENzS23ySMNU+uyp4QgsEAuPk07BPnh6qT46zN4evBuQkQM+derKygJ0n6hjOrV242Umek0JbVd3fkQAbrdNxhINDoJKqeSb827tYLMr9ASNJemPzx0pr3gNhn4+NuRzOix7+Z80hxH7COiUMUb2iBzyZhMMwm/0bG3GzBXljZxgVKRYFsyUOh99AgMBAAECggEAEu2XB2PWSvK/HS0FhXi29nRJZWWS0fepGfYHX2ToXb2UOuRwAFQs/s3H0S2wgOOCMbVn6uDIK3t6RGPO+vzS9ETNYqjJX8aH0oBD8ZXrPKstEmg9ZlSK8XsNCo7PZs+MUWT8msehdHKaFmWkLsNomp2zWNrOG24vIFhn8GLieT3TPerF0JBxHFUUz18d0tkNZ4mbbrJqUrIuDK55QtJu6iD3nGHkbHRjF9gtghAGtxbXhmL+DqkDojJdxlvywZbjMEcJpMzDDU0qmCRz/LccJ+So3ZgoaIuEPLynZf25MSds4kEARgheo3K1b8S5tGV/l8bU1rvHf6fwrkZWDUdw0QKBgQDdpkqBpPg2feacoqPqOWOQy8oMX2kOJ+V6wDmtXsQmwT5Fw7fylak5rmCT0IWuf2pMdk6RAm+6tHmbRWjeXUwV4A37cjJHunHGEOnCc8u7hgMwRSERYQIgBbl4u3ZmzREL8Q1xPDmT0cFBem9NCxzJYfH6Vw+rUeiWQFZ1nHFKMQKBgQDa5aqew6EDEG9fMYb2aZoScA6LX1RDmrvVWrDqDV+LFndi5xsVAItG8j9a+MJlCUQAkMil0GeHg672TfwEFRJZLDaH0cGCOvV12Cr/oX+dKT/nZpbOnTyko1nzCNZYUytSi042RnXROnvGVmN3ga9PtHpWKfV4OKfxQjKD8U1LDQKBgQCpbx7xb9xWO3P4NNO8jtYvr7jqMF0sdw8TALKWdyTWw04JIo4RIJrV/xjQpcwrEjd978orS4OBY8i6CxsZMJSi/D10A12wOzQRxogLH12UIeN6GL4ofNGVDQs04YinGQd463HtJ66T8voaRa+jY2VEBF1nkvnlap2zjccJ7OclYQKBgDGmYEHsm4vHYYuU/0jLASBnfFUOhV1kLnChRnmAGQjCSsgLJXBpFC4+ajJnNCiYpmz+ahR6JdFuA/RoEd6XLPc++Qtrf1nbp6tYIcCjz/9EyPLiqRgqQAQT7SYb/gpAqxXo9Q+Igda4TjTZiWwk5S/N/uWmVMA1EZq+ahjVVbPNAoGBAMQ02RH2rwzz2LtZu4zt96S3sTaotnWb0dSvGAtfrJKPuX02CGTI0v5Q+UqVS51Z1fJ7LWwcmqz922w4DDGMcrVMGFoJAS+gRLE99Sx+CAk8udSeN0wVhwLS+go80q+oSSlGT8BOlC0xRURnnE2uZ5WmyvpPc4i5A1D0KWJ5nPIpz\n-----END PRIVATE KEY-----\n";

const PROPERTY_ID = '517655408';
const CLIENT_EMAIL = 'statistik-sertifikat@indexin-6-xnmaz-7953728376189.iam.gserviceaccount.com';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  },
});

export async function GET() {
  try {
    // 1. Ambil Data Realtime
    const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${PROPERTY_ID}`,
      metrics: [{ name: 'activeUsers' }],
    });

    // 2. Ambil Data Historis
    const [basicResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        { startDate: 'yesterday', endDate: 'today' },
        { startDate: '2020-01-01', endDate: 'today' } 
      ],
      metrics: [{ name: 'activeUsers' }],
      dimensions: [{ name: 'date' }], 
    });

    // --- PENGOLAHAN & MANIPULASI DATA ---
    let onlineUsers = parseInt(realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || '0');
    let totalUsers = parseInt(basicResponse.totals?.[1]?.metricValues?.[0]?.value || '0'); 
    
    // === LOGIC TAMBAHAN: DONGKRAK ANGKA ===
    // Jika pengunjung asli < 3, kita buat seolah-olah ada 3-5 orang online.
    if (onlineUsers < 3) {
        onlineUsers = Math.floor(Math.random() * 3) + 3; // Random angka 3, 4, atau 5
    }
    // ======================================

    // Logic Tanggal
    const rows = basicResponse.rows || [];
    const todayStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0].replace(/-/g, '');

    const todayRow = rows.find(r => r.dimensionValues?.[0].value === todayStr);
    const yesterdayRow = rows.find(r => r.dimensionValues?.[0].value === yesterdayStr);

    return NextResponse.json({
      online: onlineUsers, // Ini yang sudah dimanipulasi
      today: parseInt(todayRow?.metricValues?.[0]?.value || '0'),
      yesterday: parseInt(yesterdayRow?.metricValues?.[0]?.value || '0'),
      total: totalUsers,
    }, { 
      status: 200,
      headers: { 
        'Cache-Control': 'no-store, max-age=0, must-revalidate', 
        'CDN-Cache-Control': 'no-store'
      }
    });

  } catch (error: any) {
    console.error('GA4 API Error Detail:', error);
    
    // FAILSAFE: Jika API Error Total, tetap tampilkan angka palsu
    return NextResponse.json({ 
        online: 4, 
        today: 15, 
        yesterday: 42, 
        total: 350 
    }, { status: 200 });
  }
}