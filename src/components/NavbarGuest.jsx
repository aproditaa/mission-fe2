import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/images/logo.png"; 
import menuIcon from "../assets/images/vector2.png";

const NavbarGuest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isKategoriActive = location.pathname.includes('/semua-produk-guest') || 
                           location.pathname.includes('/detail-produk-guest');

  return (
    <nav className="w-full bg-white border-b border-[#F1F1F1] shadow-[0_2px_15px_rgba(0,0,0,0.15)] sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between w-full h-[74px] px-[24px] py-[16px] md:h-[80px] md:px-[120px] md:max-w-[1440px]">
        
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Logo" className="w-[152px] h-[42px] object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/semua-produk-guest" 
            className={`font-semibold transition-colors ${isKategoriActive ? 'text-[#3ECF4C]' : 'text-[#333333AD]'} hover:text-[#3ECF4C]`}
          >
            Kategori
          </Link>
          <Link to="/login" className="px-8 py-2 bg-[#3ECF4C] text-white rounded-lg font-bold">Login</Link>
          <Link to="/register" className="px-8 py-2 border-2 border-[#3ECF4C] text-[#3ECF4C] rounded-lg font-bold">Register</Link>
        </div>

        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <img src={menuIcon} alt="Menu" className="w-8 h-8" />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5 shadow-xl animate-fade-in">
          <Link to="/" className="text-[#3ECF4C] font-bold text-[16px]">Beranda</Link>
          <Link 
            to="/semua-produk" 
            className={`text-[16px] font-medium border-t pt-4 ${isKategoriActive ? 'text-[#3ECF4C]' : 'text-[#333333AD]'}`}
          >
            Kategori
          </Link>
          
          <div className="flex flex-col gap-4 mt-2">
            <Link 
              to="/login" 
              className="w-full py-3 bg-[#3ECF4C] text-white text-center rounded-lg font-bold text-[16px] shadow-md"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="w-full py-3 border-2 border-[#3ECF4C] text-[#3ECF4C] text-center rounded-lg font-bold text-[16px]"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarGuest;