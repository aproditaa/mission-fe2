import { useState } from 'react';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import { courses as initialData } from '../data/courses';
import BannerImg from '../assets/images/banner.png';

export default function Home() {
  // --- States ---
  const [courses, setCourses] = useState(initialData);
  const [activeTab, setActiveTab] = useState("Semua Kelas");
  const [editingId, setEditingId] = useState(null);

  // Initial state buat form biar bersih
  const emptyForm = {
    title: '',
    mentor: '',
    price: '',
    subCategory: 'Pemasaran',
    role: 'Instructor',
    avatar: '/course-images/avatar-1.png',
    image: '/course-images/bg1.png'
  };
  const [form, setForm] = useState(emptyForm);

  // --- Handlers ---

  // Handle semua input teks & select sekaligus (DRY)
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Eksekusi Simpan (Bisa Tambah atau Edit)
  const simpanCourse = (e) => {
    e.preventDefault(); // Biar gak reload page
    
    if (editingId) {
      // Logic Update
      setCourses(courses.map(item => item.id === editingId ? { ...form, id: editingId } : item));
    } else {
      // Logic Create
      const dataBaru = { ...form, id: Date.now(), rating: "4.0 (0)" };
      setCourses([dataBaru, ...courses]);
    }
    
    // Reset setelah kelar
    setForm(emptyForm);
    setEditingId(null);
  };

  // Start Edit: Tarik data ke form
  const mulaiEdit = (item) => {
    setEditingId(item.id);
    setForm(item);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Hapus Data
  const hapusCourse = (id) => {
    if (confirm("Yakin mau hapus kelas ini?")) {
      setCourses(courses.filter(item => item.id !== id));
    }
  };

  // --- Filter Logic ---
  const kategoriMenu = ["Semua Kelas", "Pemasaran", "Desain", "Pengembangan Diri", "Bisnis"];
  
  const kelasTersaring = activeTab === "Semua Kelas" 
    ? courses 
    : courses.filter(c => activeTab === "Bisnis" ? c.subCategory === "Bisnis Manajemen" : c.subCategory === activeTab);

  return (
    <div className="bg-[#FFFDF3] min-h-screen font-poppins">
      <Navbar />

      {/* Hero Banner */}
      <section className="p-5 md:py-16 md:px-[120px]">
        <div className="relative h-[350px] rounded-2xl overflow-hidden flex items-center justify-center shadow-lg">
          <img src={BannerImg} className="absolute w-full h-full object-cover brightness-[0.4]" alt="Hero" />
          <h1 className="relative text-white text-3xl md:text-5xl font-bold text-center px-4">
            Atur Koleksi Belajarmu <br className="hidden md:block"/> Sesuai Keinginan
          </h1>
        </div>
      </section>

      {/* Panel Management (CRUD Form) */}
      <section className="px-5 md:px-[120px] -mt-20 relative z-10">
        <form onSubmit={simpanCourse} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? "✏️ Edit Informasi Kelas" : "✨ Buat Kelas Baru"}
            </h2>
            <p className="text-gray-500 text-sm">Isi detail kelas di bawah ini</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Judul Kelas</label>
              <input name="title" value={form.title} onChange={handleInput} required
                placeholder="Contoh: Master of Design" className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-400 transition-all outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nama Mentor</label>
              <input name="mentor" value={form.mentor} onChange={handleInput} required
                placeholder="Nama pengajar" className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-400 transition-all outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Harga</label>
              <input name="price" value={form.price} onChange={handleInput} required
                placeholder="Rp 450K" className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-400 transition-all outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori</label>
              <select name="subCategory" value={form.subCategory} onChange={handleInput}
                className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-400 outline-none">
                <option value="Pemasaran">Pemasaran</option>
                <option value="Desain">Desain</option>
                <option value="Pengembangan Diri">Pengembangan Diri</option>
                <option value="Bisnis Manajemen">Bisnis Manajemen</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button type="submit" className="bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg shadow-green-100">
              {editingId ? "Simpan Perubahan" : "Terbitkan Kelas"}
            </button>
            {editingId && (
              <button type="button" onClick={() => {setEditingId(null); setForm(emptyForm);}} 
                className="bg-gray-100 text-gray-500 font-bold py-3 px-10 rounded-xl">Batal</button>
            )}
          </div>
        </form>
      </section>

      {/* Grid Kelas */}
      <section className="px-5 md:px-[120px] py-20">
        <div className="flex gap-8 border-b mb-10 overflow-x-auto no-scrollbar">
          {kategoriMenu.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`pb-4 font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'text-red-500 border-red-500' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {kelasTersaring.map(item => (
            <div key={item.id} className="relative flex flex-col items-center">
              <CourseCard course={item} />
              <div className="mt-4 flex gap-6">
                <button onClick={() => mulaiEdit(item)} className="text-sm font-bold text-blue-500 hover:text-blue-700 flex items-center gap-1">
                  <span>✏️</span> Edit
                </button>
                <button onClick={() => hapusCourse(item.id)} className="text-sm font-bold text-red-400 hover:text-red-600 flex items-center gap-1">
                  <span>🗑️</span> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}