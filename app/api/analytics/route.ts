import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PROPERTY_ID = '517655408';
const CLIENT_EMAIL = 'statistik-sertifikat@indexin-6-xnmaz-7953728376189.iam.gserviceaccount.com';

// --- KUNCI RAHASIA (SUDAH SAYA MASUKKAN) ---
// Note: Saya menggunakan format string panjang agar aman.
const PRIVATE_KEY_STRING = "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9hnTs7/EW/WRF\\nbgBaC7srPRjud3ojv3ejvTWNMluHVhhJorGAjzPzPZjM7ehrFwzY3LxCPpnl1vEa\\nUNcSHHOyqlcaBrWF1DKw2Y9oyU3ix5mCZya21A7nGFGmuGS9ESpiwEGzGETDNj2L\\nECWQTHqePai+F4ZKqENzS23ySMNU+uyp4QgsEAuPk07BPnh6qT46zN4evBuQkQM+\\nderKygJ0n6hjOrV242Umek0JbVd3fkQAbrdNxhINDoJKqeSb827tYLMr9ASNJemP\\nzx0pr3gNhn4+NuRzOix7+Z80hxH7COiUMUb2iBzyZhMMwm/0bG3GzBXljZxgVKRY\\nFsyUOh99AgMBAAECggEAEu2XB2PWSvK/HS0FhXi29nRJZWWS0fepGfYHX2ToXb2U\\nOuRwAFQs/s3H0S2wgOOCMbVn6uDIK3t6RGPO+vzS9ETNYqjJX8aH0oBD8ZXrPKst\\nEmg9ZlSK8XsNCo7PZs+MUWT8msehdHKaFmWkLsNomp2zWNrOG24vIFhn8GLieT3T\\nPerF0JBxHFUUz18d0tkNZ4mbbrJqUrIuDK55QtJu6iD3nGHkbHRjF9gtghAGtxbX\\nhmL+DqkDojJdxlvywZbjMEcJpMzDDU0qmCRz/LccJ+So3ZgoaIuEPLynZf25MSds\\n4kEARgheo3K1b8S5tGV/l8bU1rvHf6fwrkZWDUdw0QKBgQDdpkqBpPg2feacoqPq\\nOWOQy8oMX2kOJ+V6wDmtXsQmwT5Fw7fylak5rmCT0IWuf2pMdk6RAm+6tHmbRWje\\nXUwV4A37cjJHunHGEOnCc8u7hgMwRSERYQIgBbl4u3ZmzREL8Q1xPDmT0cFBem9N\\nCxzJYfH6Vw+rUeiWQFZ1nHFKMQKBgQDa5aqew6EDEG9fMYb2aZoScA6LX1RDmrvV\\nWrDqDV+LFndi5xsVAItG8j9a+MJlCUQAkMil0GeHg672TfwEFRJZLDaH0cGCOvV1\\n2Cr/oX+dKT/nZpbOnTyko1nzCNZYUytSi042RnXROnvGVmN3ga9PtHpWKfV4OKfx\\nQjKD8U1LDQKBgQCpbx7xb9xWO3P4NNO8jtYvr7jqMF0sdw8TALKWdyTWw04JIo4R\\nIJrV/xjQpcwrEjd978orS4OBY8i6CxsZMJSi/D10A12wOzQRxogLH12UIeN6GL4o\\nfNGVDQs04YinGQd463HtJ66T8voaRa+jY2VEBF1nkvnlap2zjccJ7OclYQKBgDGm\\nYEHsm4vHYYuU/0jLASBnfFUOhV1kLnChRnmAGQjCSsgLJXBpFC4+ajJnNCiYpmz+\\nahR6JdFuA/RoEd6XLPc++Qtrf1nbp6tYIcCjz/9EyPLiqRgqQAQT7SYb/gpAqxXo\\n9Q+Igda4TjTZiWwk5S/N/uWmVMA1EZq+ahjVVbPNAoGBAMQ02RH2rwzz2LtZu4zt\\n96S3sTaotnWb0dSvGAtfrJKPuX02CGTI0v5Q+UqVS51Z1fJ7LWwcmqz92w4DDGMc\\nrVMGFoJAS+gRLE99Sx+CAk8udSeN0wVhwLS+go80q+oSSlGT8BOlC0xRURnnE2uZ\\n5WmyvpPc4i5A1D0KWJ5nPIpz\\n-----END PRIVATE KEY-----\\n";

// --- FUNGSI PEMBERSIH KUNCI (WAJIB) ---
// Fungsi ini memastikan semua karakter \n terbaca sebagai Enter yang benar
const fixKey = (key: string) => {
  return key.replace(/\\n/g, '\n');
};

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: CLIENT_EMAIL,
    private_key: fixKey(PRIVATE_KEY_STRING), // Kunci dibersihkan dulu sebelum dipakai
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
    return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 });
  }
}