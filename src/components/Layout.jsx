import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NAV_ITEMS = [
  { path: '/home', icon: '/images/nav_ho.png', key: 'home', shop: false },
  { path: '/packages', icon: '/images/nav_pu.png', key: 'package_gold', shop: true },
  { path: '/record', icon: '/images/nav_tr.png', key: 'transaction', shop: false },
  { path: '/my', icon: '/images/nav_my.png', key: 'profile', shop: false },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
                  <img src={item.icon} alt={t(item.key)} height="25" />
                </span>
                <span>{t(item.key)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
