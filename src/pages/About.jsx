import { useNavigate } from 'react-router-dom';

export default function About() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">about</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl p-4 text-gray-300 text-sm leading-relaxed">
          <div>
            <p>Olbe Movie&nbsp;Company Introduction</p>
            <p>&nbsp;</p>
            <p>1. Olbe Movie&nbsp;System: Creating More Value for Movie Enthusiasts</p>
            <p>&nbsp;</p>
            <p>Olbe Movie, a significant branch of the VUE Group in the UK, is dedicated to enhancing the visibility and sales of cinemas worldwide. As an intermediary platform, Olbe Movie specifically connects passionate moviegoers with businesses looking to boost their sales and reservations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
