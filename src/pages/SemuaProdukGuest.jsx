import { useState, useMemo, useEffect } from 'react';
import NavbarGuest from '../components/NavbarGuest'; 
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination';
import { courses } from '../data/courses';
import { useNavigate } from 'react-router-dom';
import chevronIcon from '../assets/images/vector3.png';

export default function SemuaProdukGuest() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState([]);
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const [openFilters, setOpenFilters] = useState({
    bidangStudi: true,
    harga: true,
    durasi: true
  });

  const toggleFilter = (key) => {
    setOpenFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCourses = useMemo(() => {
    const parsePrice = (priceStr) => {
      if (!priceStr) return 0;
      return parseInt(priceStr.replace(/[^0-9]/g, '')) * 1000;
    };
    const parseRating = (ratingStr) => {
      if (!ratingStr) return 0;
      return parseFloat(ratingStr.split(' ')[0]);
    };

    let result = (courses || []).filter((course) => {
      const matchesSearch = (course.title || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedSubCat.length === 0 || selectedSubCat.includes(course.subCategory);
      const matchesDiscount = !showOnlyDiscount || course.isDiscount === true;
      const matchesDuration = selectedDuration.length === 0 || selectedDuration.some(range => {
        if (range === "Kurang dari 4 Jam") return course.duration < 4;
        if (range === "4 - 8 Jam") return course.duration >= 4 && course.duration <= 8;
        if (range === "Lebih dari 8 Jam") return course.duration > 8;
        return false;
      });
      return matchesSearch && matchesCategory && matchesDiscount && matchesDuration;
    });

    if (sortBy === "Harga Terendah") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "Rating Tertinggi") {
      result.sort((a, b) => parseRating(b.rating) - parseRating(a.rating));
    }
    return result;
  }, [searchQuery, selectedSubCat, showOnlyDiscount, sortBy, selectedDuration]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSubCat, showOnlyDiscount, sortBy, selectedDuration]);

  const handleSubCatChange = (sub) => {
    setSelectedSubCat(prev => prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]);
  };

  return (
    <div className="bg-[#FFFDF3] min-h-screen font-sans">
      <NavbarGuest />
      
      <main className="mx-auto max-w-[1440px] px-[20px] md:px-[120px] py-[40px] md:py-[60px]">
        <div className="mb-10">
          <h1 className="text-[24px] md:text-[32px] font-bold text-[#222222]">Koleksi Video Pembelajaran Unggulan</h1>
          <p className="text-[#737373] text-[14px] md:text-[16px]">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-[300px] flex flex-col gap-4">
            <div className="bg-white p-6 rounded-[15px] border border-[#E5E5E5] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[18px]">Filter</h3>
                <button onClick={() => { setSelectedSubCat([]); setShowOnlyDiscount(false); setSortBy(""); setSelectedDuration([]); setCurrentPage(1); }} className="text-[#FF4D4D] text-[14px] font-semibold hover:underline">Reset</button>
              </div>

              <div className="border-b border-[#F1F1F1] pb-4 mb-4">
                <div onClick={() => toggleFilter('bidangStudi')} className="flex justify-between items-center w-full mb-4 cursor-pointer">
                  <span className="font-semibold text-[#222222]">Bidang Studi</span>
                  <img src={chevronIcon} className={`w-3 transition-transform ${openFilters.bidangStudi ? 'rotate-180' : ''}`} alt="" />
                </div>
                {openFilters.bidangStudi && (
                  <div className="flex flex-col gap-3 ml-7">
                    {["Pemasaran", "Digital & Teknologi", "Pengembangan Diri", "Bisnis Manajemen"].map((sub) => (
                      <label key={sub} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={selectedSubCat.includes(sub)} onChange={() => handleSubCatChange(sub)} className="w-4 h-4 rounded accent-[#3ECF4C]" />
                        <span className="text-[#737373] text-sm">{sub}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-b border-[#F1F1F1] pb-4 mb-4">
                <div onClick={() => toggleFilter('harga')} className="flex justify-between items-center w-full mb-4 cursor-pointer">
                  <span className="font-semibold text-[#222222]">Harga</span>
                  <img src={chevronIcon} className={`w-3 transition-transform ${openFilters.harga ? 'rotate-180' : ''}`} alt="" />
                </div>
                {openFilters.harga && (
                  <div className="flex flex-col gap-3 ml-7">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={showOnlyDiscount} onChange={(e) => setShowOnlyDiscount(e.target.checked)} className="w-4 h-4 accent-[#3ECF4C]" />
                      <span className="text-[#737373] text-sm">Sedang Diskon</span>
                    </label>
                  </div>
                )}
              </div>

              <div className="pb-2">
                <div onClick={() => toggleFilter('durasi')} className="flex justify-between items-center w-full mb-4 cursor-pointer">
                  <span className="font-semibold text-[#222222]">Durasi</span>
                  <img src={chevronIcon} className={`w-3 transition-transform ${openFilters.durasi ? 'rotate-180' : ''}`} alt="" />
                </div>
                {openFilters.durasi && (
                  <div className="flex flex-col gap-3 ml-7">
                    {["Kurang dari 4 Jam", "4 - 8 Jam", "Lebih dari 8 Jam"].map((range) => (
                      <label key={range} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={selectedDuration.includes(range)} onChange={() => { if (selectedDuration.includes(range)) { setSelectedDuration(selectedDuration.filter(d => d !== range)); } else { setSelectedDuration([...selectedDuration, range]); } }} className="w-4 h-4 rounded accent-[#3ECF4C]" />
                        <span className="text-[#737373] text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <select className="md:w-[200px] h-[45px] px-4 border border-[#E5E5E5] rounded-lg bg-white outline-none text-sm cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Urutkan</option>
                <option value="Harga Terendah">Harga Terendah</option>
                <option value="Rating Tertinggi">Rating Tertinggi</option>
              </select>
              <div className="relative flex-1">
                <input type="text" placeholder="Cari Kelas..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-[45px] pl-4 pr-10 border border-[#E5E5E5] rounded-lg focus:ring-1 focus:ring-[#3ECF4C] outline-none" />
                <span className="absolute right-4 top-3 text-gray-400">🔍</span>
              </div>
            </div>

            {currentCourses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {currentCourses.map((course) => (
                    <div 
                      key={course.id} 
                      onClick={() => navigate(`/detail-produk-guest/${course.id}`)}
                      className="cursor-pointer transition-transform hover:scale-[1.02]"
                    >
                      <CourseCard course={course} hideDescription={true} />
                    </div>
                  ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-[#E5E5E5]">
                <p className="text-gray-400">Kelas tidak ditemukan.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}