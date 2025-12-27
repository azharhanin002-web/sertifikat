import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

// --- CONFIG ---
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9hnTs7/EW/WRF\nbgBaC7srPRjud3ojv3ejvTWNMluHVhhJorGAjzPzPZjM7ehrFwzY3LxCPpnl1vEa\nUNcSHHOyqlcaBrWF1DKw2Y9oyU3ix5mCZya21A7nGFGmuGS9ESpiwEGzGETDNj2L\nECWQTHqePai+F4ZKqENzS23ySMNU+uyp4QgsEAuPk07BPnh6qT46zN4evBuQkQM+\nderKygJ0n6hjOrV242Umek0JbVd3fkQAbrdNxhINDoJKqeSb827tYLMr9ASNJemP\nzx0pr3gNhn4+NuRzOix7+Z80hxH7COiUMUb2iBzyZhMMwm/0bG3GzBXljZxgVKRY\nFsyUOh99AgMBAAECggEAEu2XB2PWSvK/HS0FhXi29nRJZWWS0fepGfYHX2ToXb2U\nOuRwAFQs/s3H0S2wgOOCMbVn6uDIK3t6RGPO+vzS9ETNYqjJX8aH0oBD8ZXrPKst\nEmg9ZlSK8XsNCo7PZs+MUWT8msehdHKaFmWkLsNomp2zWNrOG24vIFhn8GLieT3T\nPerF0JBxHFUUz18d0tkNZ4mbbrJqUrIuDK55QtJu6iD3nGHkbHRjF9gtghAGtxbX\nhmL+DqkDojJdxlvywZbjMEcJpMzDDU0qmCRz/LccJ+So3ZgoaIuEPLynZf25MSds\n4kEARgheo3K1b8S5tGV/l8bU1rvHf6fwrkZWDUdw0QKBgQDdpkqBpPg2feacoqPq\nOWOQy8oMX2kOJ+V6wDmtXsQmwT5Fw7fylak5rmCT0IWuf2pMdk6RAm+6tHmbRWje\nXUwV4A37cjJHunHGEOnCc8u7hgMwRSERYQIgBbl4u3ZmzREL8Q1xPDmT0cFBem9N\nCxzJYfH6Vw+rUeiWQFZ1nHFKMQKBgQDa5aqew6EDEG9fMYb2aZoScA6LX1RDmrvV\nWrDqDV+LFndi5xsVAItG8j9a+MJlCUQAkMil0GeHg672TfwEFRJZLDaH0cGCOvV1\n2Cr/oX+dKT/nZpbOnTyko1nzCNZYUytSi042RnXROnvGVmN3ga9PtHpWKfV4OKfx\nQjKD8U1LDQKBgQCpbx7xb9xWO3P4NNO8jtYvr7jqMF0sdw8TALKWdyTWw04JIo4R\nIJrV/xjQpcwrEjd978orS4OBY8i6CxsZMJSi/D10A12wOzQRxogLH12UIeN6GL4o\nfNGVDQs04YinGQd463HtJ66T8voaRa+jY2VEBF1nkvnlap2zjccJ7OclYQKBgDGm\nYEHsm4vHYYuU/0jLASBnfFUOhV1kLnChRnmAGQjCSsgLJXBpFC4+ajJnNCiYpmz+\nahR6JdFuA/RoEd6XLPc++Qtrf1nbp6tYIcCjz/9EyPLiqRgqQAQT7SYb/gpAqxXo\n9Q+Igda4TjTZiWwk5S/N/uWmVMA1EZq+ahjVVbPNAoGBAMQ02RH2rwzz2LtZu4zt\n96S3sTaotnWb0dSvGAtfrJKPuX02CGTI0v5Q+UqVS51Z1fJ7LWwcmqz92w4DDGMc\nrVMGFoJAS+gRLE99Sx+CAk8udSeN0wVhwLS+go80q+oSSlGT8BOlC0xRURnnE2uZ\n5WmyvpPc4i5A1D0KWJ5nPIpz\n-----END PRIVATE KEY-----\n"; // key satu baris atau multiline dengan \n

const CLIENT_EMAIL = 'statistik-sertifikat@indexin-6-xnmaz-7953728376189.iam.gserviceaccount.com';
const PROPERTY_ID = '517655408';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY.replace(/\\r/g, ''), // hapus carriage return Windows
  },
});

export async function GET() {
  try {
    // --- Realtime Users ---
    const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${PROPERTY_ID}`,
      metrics: [{ name: 'activeUsers' }],
    });

    const onlineUsers = parseInt(
      realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || '0'
    );

    // --- Historical Users ---
    const [historicalResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        { startDate: 'yesterday', endDate: 'today' },
        { startDate: '2020-01-01', endDate: 'today' },
      ],
      metrics: [{ name: 'activeUsers' }],
      dimensions: [{ name: 'date' }],
    });

    const rows = historicalResponse.rows || [];
    const totals = historicalResponse.totals?.[0]?.metricValues?.[0]?.value || '0';
    const totalUsers = parseInt(totals);

    // --- Tanggal hari ini dan kemarin ---
    const todayStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0].replace(/-/g, '');

    const todayRow = rows.find(r => r.dimensionValues?.[0]?.value === todayStr);
    const yesterdayRow = rows.find(r => r.dimensionValues?.[0]?.value === yesterdayStr);

    const todayUsers = parseInt(todayRow?.metricValues?.[0]?.value || '0');
    const yesterdayUsers = parseInt(yesterdayRow?.metricValues?.[0]?.value || '0');

    // --- Response JSON ---
    return NextResponse.json(
      {
        online: onlineUsers,
        today: todayUsers,
        yesterday: yesterdayUsers,
        total: totalUsers,
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'public, max-age=10' }, // cache 10 detik
      }
    );
  } catch (error: any) {
    console.error('GA4 API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics', details: error.message || error.toString() },
      { status: 500 }
    );
  }
}
