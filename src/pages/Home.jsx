import { useNavigate } from 'react-router-dom';

const HEADER_LINKS = [
  { img: '/images/home_la.png', label: 'Language', path: '/language' },
  { img: '/images/home_ab.png', label: 'About', path: '/about' },
  { img: '/images/home_qa.png', label: 'Q&A', path: '/q-n-a' },
  { img: '/images/home_te.png', label: 'T&C', path: '/terms-conditions' },
];

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-[80vh] text-center bg-cover max-w-[400px] mx-auto pb-10">
      <img src="/images/auth_shang.png" alt="Login" />
      <div className="text-white px-3 pb-5 shadow-none font-['Urbanist',sans-serif] bg-cover bg-top bg-no-repeat pb-[200px] min-h-[80vh]"
        style={{ backgroundImage: "url('/images/home_xia.png')" }}>
        <div className="flex mb-3 gap-2 justify-around w-full">
          {HEADER_LINKS.map(item => (
            <span key={item.path} className="cursor-pointer w-[80px] flex flex-col items-center gap-1" onClick={() => nav(item.path)}>
              <img src={item.img} width="50" alt={item.label} /><span className="text-xs">{item.label}</span>
            </span>
          ))}
        </div>
        <div className="mt-4 cursor-pointer" onClick={() => nav('/deposit')}>
          <img src="/images/home_high.png" alt="Top up" />
        </div>
        <div className="mt-4 p-3 bg-white rounded-2xl mb-10">
          <h4 className="text-[#5d1502] underline text-center text-sm">GOLD PRICE QUOTES</h4>
          <div className="chart mt-3" style={{ height: '220px' }}>
            <iframe src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js?locale=en#%7B%22symbol%22%3A%22OANDA%3AXAUUSD%22%2C%22width%22%3A%22auto%22%2C%22height%22%3A%22220%22%2C%22locale%22%3A%22en%22%2C%22dateRange%22%3A%221D%22%2C%22colorTheme%22%3A%22light%22%2C%22trendLineColor%22%3A%22%2337a6ef%22%2C%22underLineColor%22%3A%22rgba(55%2C166%2C239%2C0.3)%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Atrue%2C%22largeChartUrl%22%3A%22%22%2C%22chartOnly%22%3Afalse%2C%22noTimeScale%22%3Afalse%7D"
              style={{ width: '100%', height: '100%', border: 'none' }} title="TradingView" />
          </div>
        </div>
      </div>
    </div>
  );
}
