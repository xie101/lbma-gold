import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/home', icon: '/images/nav_ho.png', label: 'Home', shop: false },
  { path: '/packages', icon: '/images/nav_pu.png', label: 'Package Gold', shop: true },
  { path: '/record', icon: '/images/nav_tr.png', label: 'Transaction', shop: false },
  { path: '/my', icon: '/images/nav_my.png', label: 'Profile', shop: false },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <Outlet />
      <div className="max-w-[380px] mx-auto bg-[#1e2044] rounded-full p-2.5 fixed bottom-1 left-0 right-0 z-10">
        <div className="flex justify-around gap-2">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <div key={item.path}
                className={`flex flex-col items-center gap-1 text-xs w-[80px]${active ? ' active' : ''}`}
                onClick={() => navigate(item.path)} style={{ cursor: 'pointer' }}>
                <span className={`footer-icon${item.shop ? ' shop' : ''}`}>
                  <img src={item.icon} alt={item.label} height="25" />
                </span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
