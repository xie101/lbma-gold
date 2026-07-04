import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { myTickets, postTicket } from '../api';

const notyf = new Notyf({ position: { x: 'center', y: 'top' }, duration: 3000 });

export default function Service() {
  const nav = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const load = () => myTickets().then(r => setTickets(r.data?.data?.list || [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!message) { notyf.error('Please enter your message'); return; }
    setLoading(true);
    try {
      await postTicket({ subject, message });
      notyf.success('Ticket submitted, we will reply soon');
      setSubject(''); setMessage('');
      load();
    } catch (err) { notyf.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Help &amp; Support</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mb-3">
        <p className="text-gray-400 text-xs">Online customer service time (11:00-23:00)</p>
      </div>

      <div className="px-4 mb-4">
        <form onSubmit={submit} className="bg-[#0a1a3a] rounded-xl p-4">
          <p className="text-white text-sm font-bold mb-3">Submit a Ticket</p>
          <input className="w-full bg-[#0a0e1a] text-white text-sm rounded-lg px-3 py-2 mb-2 outline-none border border-[#1a2a4a]" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          <textarea className="w-full bg-[#0a0e1a] text-white text-sm rounded-lg px-3 py-2 mb-3 outline-none border border-[#1a2a4a]" rows={3} placeholder="Describe your issue..." value={message} onChange={e => setMessage(e.target.value)} />
          <button type="submit" disabled={loading} className="w-full h-[40px] rounded-lg bg-[var(--brand)] text-[#1a1a2e] font-bold text-sm disabled:opacity-50 border-none cursor-pointer">{loading ? 'Submitting...' : 'Submit Ticket'}</button>
        </form>
      </div>

      <div className="px-4">
        <p className="text-gray-400 text-xs mb-2">Your Tickets</p>
        <div className="bg-[#0a1a3a] rounded-xl overflow-hidden">
          {tickets.length ? tickets.map(t => (
            <div key={t.id} className="px-4 py-3 border-b border-[#1a2a4a] last:border-b-0">
              <div className="flex justify-between mb-1">
                <span className="text-white text-sm font-bold">{t.subject || '(no subject)'}</span>
                <span className="text-[var(--brand)] text-xs">{t.status}</span>
              </div>
              <p className="text-gray-400 text-xs">{t.message}</p>
              {t.reply && <p className="text-green-400 text-xs mt-2 bg-[#0a0e1a] rounded p-2">Support: {t.reply}</p>}
            </div>
          )) : <div className="text-gray-400 text-center text-sm py-10">No tickets yet</div>}
        </div>
      </div>
    </div>
  );
}
