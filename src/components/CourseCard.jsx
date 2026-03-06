import PropTypes from 'prop-types';
import ratingIcon from '../assets/images/rating.png';
import { Link } from 'react-router-dom';

export default function CourseCard({ course, isGuest }) {
  
  const detailPath = isGuest 
    ? `/detail-produk-guest/${course.id}` 
    : `/courses/${course.id}`;

  return (
    <Link to={detailPath} className="block">
      <div className="bg-white border border-[#F1F1F1] rounded-[10px] flex flex-row md:flex-col w-[320px] md:w-[384px] h-[147px] md:h-[426px] p-[16px] md:p-[20px] gap-[8px] md:gap-[16px] transition-shadow hover:shadow-md overflow-hidden">
        
        <div className="shrink-0">
          <img 
            src={course.image} 
            alt={course.title} 
            className="rounded-[10px] object-cover w-[82px] h-[82px] md:w-full md:h-[193px]" 
          />
        </div>

        <div className="flex flex-col flex-grow md:justify-between overflow-hidden">
          <div className="flex flex-col gap-[4px] md:gap-[8px] h-full">
            <div className="flex flex-col gap-[4px] md:gap-[8px]">
              <h3 className="font-poppins font-bold text-[#222222] text-[14px] md:text-[18px] leading-tight md:leading-snug line-clamp-2">
                {course.title}
              </h3>
              <p className="hidden md:line-clamp-2 text-[#737373] text-[14px] leading-relaxed">
                {course.desc}
              </p>
            </div>

            <div className="flex items-center gap-[8px] md:gap-[12px] md:mt-auto">
              <img 
                src={course.avatar} 
                alt={course.mentor} 
                className="rounded-full object-cover w-[24px] h-[24px] md:w-[40px] md:h-[40px] border border-gray-100" 
              />
              <div className="flex flex-col overflow-hidden">
                <p className="font-semibold text-[#222222] text-[11px] md:text-[14px] truncate">
                  {course.mentor}
                </p>
                <p className="text-[#737373] text-[9px] md:text-[12px] truncate">
                  {course.role}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full mt-auto md:mt-0">
              <div className="flex items-center gap-1">
                <img 
                  src={ratingIcon} 
                  alt="rating" 
                  className="w-[44px] md:w-[75px] object-contain" 
                />
                <span className="text-[10px] md:text-[12px] text-[#737373]">
                  ({course.rating})
                </span>
              </div>
              <p className="text-[#3ECF4C] font-bold text-[14px] md:text-[22px]">
                {course.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

CourseCard.propTypes = {
  isGuest: PropTypes.bool, 
  course: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    avatar: PropTypes.string,
    mentor: PropTypes.string,
    role: PropTypes.string,
    rating: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};