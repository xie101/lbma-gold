import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { setName } from '../api';

const notyf = new Notyf({ position: { x: 'center', y: 'top' }, duration: 3000 });
const inp = { width: '100%', padding: '10px 12px', background: '#0a0e1a', border: '1px solid #374151', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' };
const toBase64 = (file) => file ? new Promise(r => { const rd = new FileReader(); rd.onload = () => r(rd.result); rd.readAsDataURL(file); }) : Promise.resolve('');

export default function Realname() {
  const nav = useNavigate();
  const [name, setNameVal] = useState('');
  const [idType, setIdType] = useState('ID Card');
  const [idNumber, setIdNumber] = useState('');
  const [idFront, setIdFront] = useState('');
  const [idBack, setIdBack] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!name) { notyf.error('Enter your name'); return; }
    setLoading(true);
    try { await setName({ realName: name, idType, idNumber, idFront, idBack }); notyf.success('Verification submitted'); nav(-1); }
    catch (err) { notyf.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Real Name Verification</span>
        <span className="w-[18px]"></span>
      </div>
      <form onSubmit={handle} className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 space-y-4">
          <div><label className="text-gray-400 text-xs block mb-2">Real Name</label><input type="text" style={inp} value={name} onChange={e => setNameVal(e.target.value)} placeholder="Enter your real name" required /></div>
          <div><label className="text-gray-400 text-xs block mb-2">ID Type</label>
            <select style={inp} value={idType} onChange={e => setIdType(e.target.value)}>
              <option>ID Card</option><option>Passport</option><option>Driver License</option>
            </select>
          </div>
          <div><label className="text-gray-400 text-xs block mb-2">ID Number</label><input type="text" style={inp} value={idNumber} onChange={e => setIdNumber(e.target.value)} placeholder="Enter ID number" /></div>
          <div><label className="text-gray-400 text-xs block mb-2">ID Front Photo</label><input type="file" accept="image/*" style={{ color: '#fff', fontSize: 12 }} onChange={async e => setIdFront(await toBase64(e.target.files[0]))} /></div>
          <div><label className="text-gray-400 text-xs block mb-2">ID Back Photo</label><input type="file" accept="image/*" style={{ color: '#fff', fontSize: 12 }} onChange={async e => setIdBack(await toBase64(e.target.files[0]))} /></div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: '#c9a44c', color: '#000', fontWeight: 'bold', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
