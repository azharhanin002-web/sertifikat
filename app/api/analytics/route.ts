import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PROPERTY_ID = '517655408';

// --- MASUKKAN KODE BASE64 DARI WEBSITE TADI DI SINI ---
// Hapus tulisan PASTE_KODE_PANJANG_DISINI dan tempel kode dari website.
// Jangan takut kodenya sangat panjang, biarkan saja jadi satu baris atau terpotong tampilan.
const ENCODED_KEY = "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiaW5kZXhpbi02LXhubWF6LTc5NTM3MjgzNzYxODkiLAogICJwcml2YXRlX2tleV9pZCI6ICI5ZGI5YmYyMTkxZDU5ZmQxOTUxYjBiMDU4OTkzODIxNTA1OTRmM2IwIiwKICAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdmdJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLZ3dnZ1NrQWdFQUFvSUJBUURNdG9UNEhTZk1sckFLXG5Tc0tMNVI3Y1kyQnJWZVFEaktuWlZaWmpoVHN2UFhVbHBGR1FaTDhQS3NDOTExU0NzamJtZmk3Y3dkMCtXaUdqXG5sUUhPY1ArWU1NR2hucUxzdnd2S2FxWGx4MmRMT1FDTnpORE5ORVllUTlicCt4UXVpVVF1cFJCMm0wL1YvZCtzXG54dWRUZkdMZ3BIYjFxYTFFZEZyT3BLQmRCMHRyemhaT0szaVkra1diNld1KzdOK1BpM2hKVjViMmFiZ1lCalNwXG40emtWT1ZucXJrVXJOR3VWaHZ3d2tiT29yM0dQY0NMd0hJWDhqQXY3Nmk1L2R1WThtanVVTFY0RHZqMFJyZWczXG5xeURodE16aGs5QzRXaWxDbnVkUXVFajVDMFZuczFYaFNwMzFTZk9QeHpjR1RFOTJiK2hyS2VEWEtjVVpiUnJjXG5SMkp3U2pnWkFnTUJBQUVDZ2dFQUNVRU9mNE5jNVZraUJlTVZpcHF0MDVkcitFb3lrNjBBRUI2My9ORjg2SkNxXG5DeXl6a2JnV01YNjBwaGhWL2c4Rm41T1FkWU1QaC9ZdDIxM2M3aXJLU1NSYUduN24vVlVSR01KTHM5aVk3U3Y3XG5ZQTJrV2tSc3o0a3dUZFUvZHkrV0hSZ3g1M1N6cmhnckRIM1UzditxWGg2ZE1KT09MVUFueXp2aXNuWG1GVTVQXG4xZDdLRnhqZDBaQ3dobjJKOXpPZ0VNeDNUSUhOM3lYV0t1TE5ha0RjL2pQdytDYUovMTNrNjNjVjJodm9aQTVHXG5mb0ppbmRtbXFnb0ZCd3REaG13b2N2cm15VVV6T3ZFbzdmN0dhUDhFMlM3KzNHMEpYR3F4OWJrd0V6TFVkNEtuXG4xZHMxbWt3TktzUDN4cXM2b01ybXhHK1pTT2VRMTIvTVNVNHUvMnNrRVFLQmdRRHg5UXhxaXp4dS95UXdvaWxCXG5zVmhERDdLYVFDTjlHeGJNeTNLeFFNS04wcU9mQWZ4OGZSSklOd3NHaWNxUGdsUDV3WTNKZmMrOWNzK2RPSmpnXG5HS0hMSTJCS0VKMjB4empYSWRsQ1d1YXJlVThkeGsxQUtBMFRvdU15clRhSXJwb3FSNWRCeVJVTFp4OE0rMzhZXG56VmFNbDh5NXBEQmxrclFiS2pWb3BMZzlVUUtCZ1FEWW1CcHlPU3FQWE5ETlVDYWRINTJBVi9CdnBuYVdVOUFtXG44ZkE2cVQ3eHcwMEIvREsvVkc4RXR4dmVMSU42UG1SNGhsUDNlMXB2Z1k4M0RITmQzT0h1QTc0L0ZmWlUrUVBEXG5HUVZZWlNJUnl2WSs3T3I3RHprMm90czZrNXBFUW9pT0hnNFlESHNlTTlCUERwZW9MZnZyajVaQVB6UUdNR1hmXG45cU9YNTlYOFNRS0JnRzhidDNMcHMzdkpJRVpSQVI4UW9GWlRUQkgzYUJTWUx2VW1hK21uc20vTURhVUVGWHpaXG5ObDhCSDhnRjJJWGtORW5acnhHYSs1MmtybUFsVUZhQUdUUWViNll6VVNobDM5MHl4d0RvbTBxYzcwN2Q5RFdFXG43dFJZbFhwOC9qRHY5UTE3U0tOR0FxcjAxTlp5V3gvNWswZ0dvVldTWjBNTmhqVi9RWDFuUHMreEFvR0JBTHB6XG5OVkRlcFNTRVlicGNKT0ZkTmRnbDIzUkJlQlF3VWg4MFpmZ1plWFhsQ1lXTDlLTi9xNUlEanBuUzk5dGptbG1tXG5TT0hoN2hmUEQ5bnpmZHh2S0k0YjZzbWp2a21ua3ZWL3RIcERsUEI4Sno1RDlJUHF0dld4ZThjUkNOdDU2dE5zXG5TL1dueU5SWEJoc0lGTVZSMEdzWFQrQStpQ3BMdjJic2lpZGFDM3NCQW9HQkFNaUJzeXRwTFIvVzFyTW50UnF6XG5pbEIzdnFnbStXdFZWTllGN0VPZkYxQnhwWVlBNWJPeXl4SkJybHVzeS9QOTZsUG9IYkRjQ1dmbjJyT0FxOVFjXG5DbGlQYjlrT3A0ekl5ZURnUlcwdW5pZGZYY1UrSkFNMnJsQ3U1Z0xLYlBkaXRFVXQzejd5YVZvN09nbjlvZzNIXG5kdGFJZmYvN056R21wZWI4YmJWQ0NoK1Rcbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsCiAgImNsaWVudF9lbWFpbCI6ICJzdGF0aXN0aWstc2VydGlmaWthdEBpbmRleGluLTYteG5tYXotNzk1MzcyODM3NjE4OS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgImNsaWVudF9pZCI6ICIxMDk4MTU1MTQwMTYxODA2MzI4MTIiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L3N0YXRpc3Rpay1zZXJ0aWZpa2F0JTQwaW5kZXhpbi02LXhubWF6LTc5NTM3MjgzNzYxODkuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLAogICJ1bml2ZXJzZV9kb21haW4iOiAiZ29vZ2xlYXBpcy5jb20iCn0K";

export async function GET() {
  try {
    // --- PROSES PENCAIRAN (DECODE) ---
    // Kita kembalikan kode acak tadi menjadi format JSON asli yang terbaca mesin
    const decodedJson = Buffer.from(ENCODED_KEY, 'base64').toString('utf-8');
    const credentials = JSON.parse(decodedJson);

    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
    });

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
    // Tampilkan pesan error jika masih gagal
    return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 });
  }
}