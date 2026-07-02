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
            <p>Olbe Movie Company Introduction</p>
            <p>&nbsp;</p>
            <p>1. Olbe Movie System: Creating More Value for Movie Enthusiasts</p>
            <p>&nbsp;</p>
            <p>Olbe Movie, a significant branch of the VUE Group in the UK, is dedicated to enhancing the visibility and sales of cinemas worldwide. As an intermediary platform, Olbe Movie specifically connects passionate moviegoers with businesses looking to boost their sales and reservations. Our system ensures that once tickets are purchased, the relevant ticket fees and commissions are promptly and securely returned to their accounts. To guarantee quality service, we have established a professional online customer service team to provide necessary task permissions to users. Our platform supports both part-time and full-time employees, offering opportunities for up to 25 and 50 task orders respectively.</p>
            <p>&nbsp;</p>
            <p>2. Olbe Movie Headquarters and Global Presence</p>
            <p>&nbsp;</p>
            <p>Olbe Movie is headquartered in the UK and, as part of the Vue Group, we inherit the group's extensive global business network. The Vue Group is renowned not only in the entertainment industry but also has numerous successful chains in cinema, hospitality, and entertainment venues. Olbe Movie benefits from the group's global perspective, enabling us to better understand and serve customers and markets worldwide.</p>
            <p>&nbsp;</p>
            <p>3. Unique Features of Olbe Movie</p>
            <p>&nbsp;</p>
            <p>Olbe Movie's core advantage lies in its innovative and user-friendly service model. We combine the latest e-commerce technology with traditional movie ticketing services to provide users with a seamless, secure, and efficient ticket purchasing experience. Additionally, our commission rebate mechanism offers users extra value while motivating them to contribute to increased sales.</p>
            <p>&nbsp;</p>
            <p>4. Optimization and Future Outlook</p>
            <p>&nbsp;</p>
            <p>We continuously optimize our platform to ensure that user experience remains at the highest level. Our goal is to become the most trusted ticketing and promotion platform in the film industry. Through continuous technological innovation and quality service, we aim to support the growth and prosperity of the film industry.</p>
            <p>&nbsp;</p>
            <p>Join Olbe Movie and help drive the future development of the film industry with us.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
