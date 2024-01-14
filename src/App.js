import React, { useState } from 'react';

function App() {
  // state
  const [jumlahPinjaman, setJumlahPinjaman] = useState('');
  const [tingkatBunga, setTingkatBunga] = useState('');
  const [jangkaWaktuPinjaman, setJangkaWaktuPinjaman] = useState('');
  const [pesan, setPesan] = useState('');

  const hitungCicilan = (event) => {
    event.preventDefault();

    const numericJumlahPinjaman = Number(jumlahPinjaman);
    const numericTingkatBunga = Number(tingkatBunga);
    const numericJangkaWaktuPinjaman = Number(jangkaWaktuPinjaman);

    if (
      isNaN(numericJumlahPinjaman) ||
      isNaN(numericTingkatBunga) ||
      isNaN(numericJangkaWaktuPinjaman) ||
      numericJumlahPinjaman === 0 ||
      numericTingkatBunga === 0 ||
      numericJangkaWaktuPinjaman === 0
    ) {
      alert('Masukkan nilai numerik yang valid untuk jumlah pinjaman, tingkat bunga, dan jangka waktu pinjaman');
    } else {
      // Konversi tingkat bunga tahunan menjadi tingkat bunga bulanan
      const tingkatBungaBulanan = numericTingkatBunga / 100 / 12;

      // Hitung pembayaran bulanan menggunakan rumus pinjaman
      const pembayaranBulananValue =
        (numericJumlahPinjaman * tingkatBungaBulanan) /
        (1 - Math.pow(1 + tingkatBungaBulanan, -numericJangkaWaktuPinjaman));

      // Logika untuk pesan
      setPesan(`Pembayaran bulanan pinjaman Anda adalah: ${formatRupiah(pembayaranBulananValue.toFixed(2))}`);
    }
  };

  const muatUlang = () => {
    window.location.reload();
  };

  // Fungsi untuk memformat nominal dalam bentuk Rupiah
  const formatRupiah = (nominal) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    });
    return formatter.format(nominal);
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">Bank Calculate</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            hitungCicilan(event);
          }}
        >
          <div>
            <label>Jumlah Pinjaman (Rp)</label>
            <input
              type="number"
              value={jumlahPinjaman}
              onChange={(e) => setJumlahPinjaman(e.target.value)}
            />
          </div>
          <div>
            <label>Tingkat Bunga Tahunan (%)</label>
            <input
              type="number"
              value={tingkatBunga}
              onChange={(e) => setTingkatBunga(e.target.value)}
            />
          </div>
          <div>
            <label>Jangka Waktu Pinjaman (bulan)</label>
            <input
              type="number"
              value={jangkaWaktuPinjaman}
              onChange={(e) => setJangkaWaktuPinjaman(e.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Hitung
            </button>
            <button className="btn btn-outline" onClick={muatUlang} type="button">
              Muat Ulang
            </button>
          </div>
        </form>

        <div className="center">
          <p>{pesan}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
