import React from 'react'

export const WordPressLayout = (props: any) => {
  return (
    <>
      <style>{`
        /* --- 1. MEMAKSA SIDEBAR JADI HITAM --- */
        
        /* Target Panel Menu Utama secara spesifik */
        [data-testid="structure-menu-pane"] {
            background-color: #1d2327 !important; /* Hitam WP */
            --card-bg-color: #1d2327 !important;  /* Timpa variabel Sanity */
            --card-fg-color: #f0f0f1 !important;  /* Teks Putih */
            border-right: 1px solid #2c3338 !important;
        }

        /* Pastikan child element juga mewarisi background hitam */
        [data-testid="structure-menu-pane"] > div {
            background-color: #1d2327 !important;
        }

        /* --- 2. HEADER SIDEBAR (JUDUL MENU UTAMA) --- */
        [data-testid="structure-menu-pane"] [data-ui="PaneHeader"] {
            background-color: #1d2327 !important;
            border-bottom: 1px solid #2c3338 !important;
        }
        
        /* Warna Judul "Menu Utama" */
        [data-testid="structure-menu-pane"] [data-ui="PaneHeader"] h2 {
             color: #ffffff !important;
             font-weight: bold !important;
        }

        /* --- 3. ITEM MENU (LIST) --- */

        /* Warna Tombol Normal */
        [data-testid="structure-menu-pane"] [data-ui="Button"] {
            background-color: transparent !important;
            color: #f0f0f1 !important;
            border-radius: 0 !important; /* Kotak kaku ala WP */
            margin: 0 !important;
        }

        /* Warna Ikon & Teks Normal */
        [data-testid="structure-menu-pane"] [data-ui="Button"] svg,
        [data-testid="structure-menu-pane"] [data-ui="Button"] span {
            color: #f0f0f1 !important;
        }

        /* --- 4. ITEM MENU SAAT DI-HOVER (DISENTUH MOUSE) --- */
        [data-testid="structure-menu-pane"] [data-ui="Button"]:hover {
            background-color: #13171a !important; /* Lebih gelap dikit */
            --card-bg-color: #13171a !important;
        }
        
        /* Teks jadi Biru saat Hover */
        [data-testid="structure-menu-pane"] [data-ui="Button"]:hover span,
        [data-testid="structure-menu-pane"] [data-ui="Button"]:hover svg {
            color: #72aee6 !important; /* Biru Muda WP */
        }

        /* --- 5. ITEM MENU SAAT AKTIF (DIPILIH) --- */
        [data-testid="structure-menu-pane"] [data-ui="Button"][data-selected],
        [data-testid="structure-menu-pane"] [data-ui="Button"][aria-pressed="true"] {
            background-color: #2271b1 !important; /* Biru WP */
            --card-bg-color: #2271b1 !important;
            color: #ffffff !important;
        }

        /* Pastikan teks & ikon putih saat aktif */
        [data-testid="structure-menu-pane"] [data-ui="Button"][data-selected] svg,
        [data-testid="structure-menu-pane"] [data-ui="Button"][data-selected] span {
            color: #ffffff !important;
        }

        /* --- 6. NAVBAR ATAS HITAM --- */
        [data-ui="Navbar"] {
            background-color: #1d2327 !important;
            border-bottom: 1px solid #2c3338 !important;
            --card-fg-color: #ffffff !important;
        }
        /* Tombol di Navbar */
        [data-ui="Navbar"] button {
            color: #f0f0f1 !important;
        }
      `}</style>

      {/* Render Dashboard Asli */}
      {props.renderDefault(props)}
    </>
  )
}