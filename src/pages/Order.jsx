import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notyf } from '../utils/notify';
import { orderInfo, doOrder, rotOrder } from '../api';


export default function Order() {
  const { orderNumber } = useParams();
  const nav = useNavigate();
  const [order, setOrder] = useState({});
  const [acting, setActing] = useState(false);

  const load = () => orderInfo({ orderNumber }).then(r => setOrder(r.data?.data || {})).catch(() => {});
  useEffect(() => { load(); }, [orderNumber]);

  const act = async (fn, okMsg) => {
    if (!order.orderNo) return;
    setActing(true);
    try { await fn({ orderNo: order.orderNo }); notyf.success(okMsg); load(); }
    catch (e) { notyf.error(e.response?.data?.message || 'Failed'); }
    finally { setActing(false); }
  };

  const fields = [
    ['Order No', order.orderNo],
    ['Match time', order.createdAt],
    ['Gold Weight', order.weight],
    ['Buy Price', order.buyPrice],
    ['Sell Price', order.sellPrice],
    ['Total Order Amount', order.amount],
    ['commission', order.commission],
    ['expected return', order.expectedReturn],
    ['Status', order.status],
  ];

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-cover bg-top bg-no-repeat pb-10"
      style={{ backgroundImage: "url('/images/order_beijing.png')" }}>
      <div className="flex items-center px-4 pt-5 pb-2">
        <span className="btn-back cursor-pointer" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Gold details</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="mx-3 mt-4 rounded-xl overflow-hidden p-4"
        style={{ backgroundImage: "url('/images/order_huangjintu.png')", backgroundSize: '100% 100%' }}>
        <div className="flex justify-center"><span className="block min-h-[150px]"></span></div>
      </div>
      <div className="mx-3 mt-3 rounded-2xl overflow-hidden p-4"
        style={{ backgroundImage: "url('/images/order_kuang.png')", backgroundSize: '100% 100%' }}>
        <h4 className="text-white text-center text-sm font-bold pb-3 border-b border-gray-700">Gold details</h4>
        <div className="py-2">
          {fields.map(([label, value], i) => (
            <div key={i} className="flex justify-between py-2.5 border-b border-gray-800 last:border-b-0">
              <span className="text-gray-400 text-xs">{label}</span>
              <span className="text-white text-xs font-bold">{value ?? '--'}</span>
            </div>
          ))}
        </div>
        {order.status === 'pending' && (
          <div className="flex gap-3 mt-3">
            <button onClick={() => act(doOrder, 'Order completed')} disabled={acting}
              className="flex-1 h-[40px] rounded-lg bg-[var(--brand)] text-[#1a1a2e] font-bold text-xs disabled:opacity-50 border-none cursor-pointer">Confirm Order</button>
            <button onClick={() => act(rotOrder, 'Order cancelled')} disabled={acting}
              className="flex-1 h-[40px] rounded-lg bg-[#1a2a4a] text-white font-bold text-xs disabled:opacity-50 border border-[#2a3a5a] cursor-pointer">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
