import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BerandaGuest from './pages/BerandaGuest';
import SemuaProdukGuest from './pages/SemuaProdukGuest';
import DetailProdukGuest from './pages/DetailProdukGuest';
import Beranda from './pages/Beranda';
import SemuaProduk from './pages/SemuaProduk';
import DetailProduk from './pages/DetailProduk';
import Metode from './pages/Metode';
import Bayar from './pages/Bayar';
import UbahMetode from './pages/UbahMetode';
import StatusPembayaran from './pages/StatusPembayaran';
import Pesanan from './pages/Pesanan';
import Kelas from './pages/KelasSaya';
import Profil from './pages/Profil';
import Video from './pages/Video';
import AturanQuiz from './pages/AturanQuiz';
import Soal from './pages/Soal';
import HasilQuiz from './pages/HasilQuiz';
import Rangkuman from './pages/RangkumanModul';
import Sertifikat from './pages/Sertifikat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BerandaGuest />} />
        <Route path="/semua-produk-guest" element={<SemuaProdukGuest />} />
        <Route path="/detail-produk-guest/:id" element={<DetailProdukGuest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/semua-produk" element={<SemuaProduk />} />
        <Route path="/courses/:id" element={<DetailProduk />} />
        <Route path="/metode-pembayaran" element={<Metode />} />
        <Route path="/pembayaran" element={<Bayar />} />
        <Route path="pembayaran/ubah-metode" element={<UbahMetode />} />
        <Route path="/selesai" element={<StatusPembayaran />} />
        <Route path="/tertunda" element={<StatusPembayaran />} />
        <Route path="/pesanan" element={<Pesanan />} />
        <Route path="/kelas-saya" element={<Kelas />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/video-course/:id" element={<Video />} />
        <Route path="/aturan/:id" element={<AturanQuiz />} />
        <Route path="/soal-awal/:id" element={<Soal />} />
        <Route path="/hasil/:id" element={<HasilQuiz />} />
        <Route path="/rangkuman/:id" element={<Rangkuman />} />
        <Route path="/sertifikat/:id" element={<Sertifikat />} />
      </Routes>
    </Router>
  );
}

export default App;