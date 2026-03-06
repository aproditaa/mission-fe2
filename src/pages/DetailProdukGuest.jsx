import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { courses } from '../data/courses';
import NavbarGuest from '../components/NavbarGuest';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import ratingIcon from '../assets/images/rating.png';
import iconCheck from '../assets/images/File_Check.png';
import iconVideo from '../assets/images/video.png';
import iconBook from '../assets/images/book-2.png';
import iconCertificate from '../assets/images/file-certificate.png';
import iconEdit from '../assets/images/File_Edit.png';
import iconWorld from '../assets/images/world.png';

export default function DetailProdukGuest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((item) => item.id === parseInt(id));
  const [openAccordion, setOpenAccordion] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return <div className="text-center py-20 font-bold text-[#222222]">Produk tidak ditemukan</div>;
  }

  const handleCheckout = () => {
    navigate('/login');
  };

  const relatedCourses = courses.filter(item => item.id !== course.id).slice(0, 3);

  const femaleAlumni = [
    "Laras Widyaningrum", "Monica Evelyn", "Sinta Maharani", 
    "Nabila Kencana", "Caca Amelia", "Nindy Larasati", 
    "Shavira Anindya", "Nadine Paramitha", "Dewi Kartika"
  ];

  return (
    <div className="bg-[#FFFDF3] min-h-screen font-sans text-[#222222]">
      <NavbarGuest />
      
      <main className="mx-auto max-w-[1440px] px-[20px] md:px-[120px] py-[40px]">
        <nav className="text-[12px] md:text-[14px] text-[#737373] mb-8">
          Beranda / {course.subCategory} / <span className="text-black font-semibold">Gapai Karier Impianmu sebagai Seorang {course.title}</span>
        </nav>

        <div className="relative w-full h-[220px] md:h-[400px] rounded-[15px] overflow-hidden mb-10">
          <img src={course.image} className="w-full h-full object-cover brightness-50" alt={course.title} />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white bg-black/40">
            <h1 className="text-[20px] md:text-[40px] font-bold mb-4 max-w-[850px] leading-tight">
              Gapai Karier Impianmu sebagai Seorang {course.title}
            </h1>
            <p className="text-[12px] md:text-[16px] mb-6 max-w-[600px] opacity-90 line-clamp-2">
              {course.desc}
            </p>
            <div className="flex items-center gap-3">
              <img src={ratingIcon} className="w-[80px] md:w-[100px]" alt="rating" />
              <span className="text-[12px] md:text-[16px] underline">({course.rating})</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white p-6 md:p-8 rounded-[15px] border border-[#E5E5E5]">
              <h2 className="text-[18px] md:text-[24px] font-bold mb-4 text-[#222222]">Deskripsi</h2>
              <p className="text-[#737373] text-[14px] md:text-[16px] leading-relaxed">
                {course.desc}
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[15px] border border-[#E5E5E5]">
              <h2 className="text-[18px] md:text-[24px] font-bold mb-6 text-[#222222]">Belajar bersama Tutor Profesional</h2>
              <div className="flex items-start gap-4 p-4 border border-[#F1F1F1] rounded-[10px] w-full md:w-fit">
                <img src={course.avatar} className="w-12 h-12 rounded-full object-cover" alt={course.mentor} />
                <div>
                  <p className="font-bold text-[14px] md:text-[16px]">{course.mentor}</p>
                  <p className="text-[#737373] text-[12px] md:text-[14px]">{course.role}</p>
                  <p className="text-[12px] text-[#737373] mt-2 max-w-[500px] leading-relaxed">{course.mentorBio}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[15px] border border-[#E5E5E5]">
              <h2 className="text-[18px] md:text-[24px] font-bold mb-6 text-[#222222]">Kamu akan Mempelajari</h2>
              <div className="flex flex-col gap-4">
                {course.syllabus.map((group, index) => (
                  <div key={index} className="border border-[#F1F1F1] rounded-[10px] overflow-hidden">
                    <button 
                      onClick={() => setOpenAccordion(openAccordion === index ? -1 : index)}
                      className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className={`text-[14px] md:text-[16px] font-semibold ${openAccordion === index ? 'text-[#3ECF4C]' : 'text-[#222222]'}`}>
                        {group.groupTitle}
                      </span>
                      <span className={`transform transition-transform text-[12px] ${openAccordion === index ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {openAccordion === index && (
                      <div className="px-4 pb-4 flex flex-col gap-3">
                        {group.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center py-2 border-t border-[#F1F1F1] text-[13px] md:text-[15px]">
                            <div className="flex items-center gap-2">
                              <span className="text-[#3ECF4C] text-[10px]">▶</span>
                              <span className="text-[#737373]">{item}</span>
                            </div>
                            <span className="text-[#3ECF4C] font-medium">Video</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[15px] border border-[#E5E5E5]">
              <h2 className="text-[18px] md:text-[24px] font-bold mb-6 text-[#222222]">Rating dan Review</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.reviews.map((rev, index) => {
                  const isFemale = femaleAlumni.includes(rev.name);
                  const profilePic = isFemale ? '/course-images/avatar-8.png' : '/course-images/avatar-9.png';
                  return (
                    <div key={index} className="bg-white p-6 rounded-[15px] border border-[#F1F1F1] shadow-sm flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <img src={profilePic} alt={rev.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-[14px] md:text-[16px] text-[#222222]">{rev.name}</p>
                          <p className="text-[10px] md:text-[12px] text-[#737373] font-medium">{rev.batch}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[12px] md:text-[14px] text-[#222222] font-semibold mb-1">{rev.role}</p>
                        <p className="text-[13px] md:text-[15px] text-[#737373] leading-relaxed italic">"{rev.comment}"</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-[380px]">
            <div className="bg-white p-6 rounded-[15px] border border-[#E5E5E5] sticky top-10 shadow-sm">
              <h2 className="text-[#222222] font-bold mb-4 text-[18px] leading-tight">
                Gapai karier impianmu sebagai Seorang {course.title}.
              </h2>
              
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[24px] font-bold text-[#3ECF4C]">{course.price}</span>
                {course.isDiscount && (
                  <span className="text-[#737373] line-through text-[16px]">{course.originalPrice}</span>
                )}
                {course.isDiscount && (
                  <span className="bg-[#FFBD3A] text-white text-[11px] px-3 py-1 rounded-full font-bold">
                    Diskon 50%
                  </span>
                )}
              </div>
              
              {course.isDiscount && (
                <p className="text-[#3ECF4C] text-[13px] font-medium mb-6">
                  Penawaran spesial tersisa 2 hari lagi!
                </p>
              )}

              <button 
                onClick={handleCheckout} 
                className="w-full bg-[#3ECF4C] text-white py-3 rounded-[10px] font-bold text-[16px] hover:bg-[#35bd42] transition-all active:scale-[0.98] mb-8"
              >
                Beli Sekarang
              </button>

              <div className="space-y-4">
                <p className="font-bold text-[#222222] text-[16px] mb-4">Kelas Ini Sudah Termasuk:</p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[13px] text-[#737373]">
                  <div className="flex items-center gap-2">
                    <img src={iconCheck} alt="" className="w-5 h-5 object-contain" />
                    <span>Ujian Akhir</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={iconVideo} alt="" className="w-5 h-5 object-contain" />
                    <span>49 Video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={iconBook} alt="" className="w-5 h-5 object-contain" />
                    <span>7 Dokumen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={iconCertificate} alt="" className="w-5 h-5 object-contain" />
                    <span>Sertifikat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={iconEdit} alt="" className="w-5 h-5 object-contain" />
                    <span>Pretest</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <p className="font-bold text-[#222222] text-[16px] mb-2">Bahasa Pengantar</p>
                <div className="flex items-center gap-2 text-[14px] text-[#737373]">
                  <img src={iconWorld} alt="" className="w-5 h-5 object-contain" />
                  <span>Bahasa Indonesia</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-20">
          <div className="mb-8">
            <h2 className="text-[20px] md:text-[28px] font-bold text-[#222222]">Video Pembelajaran Terkait Lainnya</h2>
            <p className="text-[#737373] text-[14px] md:text-[16px]">Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}