import React from 'react'

export const StudioLogo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <img 
        src="/logo-solusi.png" 
        alt="Logo Solusi" 
        style={{ height: '2rem', width: 'auto' }} 
      />
      {/* Teks ini opsional, hapus jika hanya ingin gambar */}
      <span style={{ fontWeight: 600, color: '#1e2338' }}>Workshop Legalitas</span>
    </div>
  )
}