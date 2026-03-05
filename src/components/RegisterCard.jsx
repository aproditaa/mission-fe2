import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import googleIcon from '../assets/images/google-icon.png';
import idFlag from '../assets/images/Indonesia(ID).png';

export default function RegisterCard() {
  const navigate = useNavigate();

  const goTo = (path) => navigate(path);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pendaftaran diproses, silakan login melalui LoginCard.");
  };

  return (
    <div className="bg-white rounded-[4px] border border-gray-200 shadow-sm flex flex-col mx-auto w-full max-w-[320px] md:max-w-[590px] p-[20px] md:p-[36px] gap-[20px] md:gap-[36px]">
      
      <div className="flex flex-col gap-[10px] text-center w-full">
        <h1 className="font-poppins text-[20px] md:text-[24px] font-semibold text-[#222222]">Pendaftaran Akun</h1>
        <p className="font-dmsans text-[#737373] text-[12px] md:text-[14px]">Yuk, daftarkan akunmu sekarang juga!</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-[20px] md:gap-[24px]">
        <Input label="Nama Lengkap" id="name" required />
        <Input label="E-Mail" type="email" id="email" required />

        <div className="flex flex-col gap-[4px]">
          <label className="text-sm text-gray-700 font-dmsans">No. HP <span className="text-red-500">*</span></label>
          <div className="flex gap-2">
            <div className="relative shrink-0">
              <select className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-8 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500 h-full">
                <option value="62">+62</option>
              </select>
              <img src={idFlag} className="absolute left-3 top-1/2 -translate-y-1/2 w-5" alt="ID" />
            </div>
            <input type="tel" placeholder="8123456789" className="flex-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-green-500" />
          </div>
        </div>

        <Input label="Kata Sandi" type="password" id="password" required />
        <Input label="Konfirmasi Kata Sandi" type="password" id="confirm" required />

        <div className="flex flex-col gap-[12px] mt-2">
          <Button variant="primary" type="submit">
            Daftar
          </Button>
          
          <Button 
            variant="secondary" 
            type="button" 
            onClick={() => goTo('/login')}
          >
            Masuk
          </Button>
        </div>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-3 text-gray-400 text-xs">atau</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <Button variant="outline" type="button">
          <img src={googleIcon} alt="Google" className="w-5 h-5" />
          Daftar dengan Google
        </Button>
      </form>
    </div>
  );
}