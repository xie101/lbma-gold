import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notyf } from '../utils/notify';
import { login, setToken } from '../api';


export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { notyf.error('Please fill in all fields'); return; }
    if (!agreed) { notyf.error('Please agree to the Terms of Service'); return; }
    setLoading(true);
    try {
      const res = await login({ email, password });
      if (res.data?.token || res.data?.data?.token) {
        setToken(res.data.token || res.data.data.token);
        notyf.success('Login successful');
        nav('/home');
      } else {
        notyf.error(res.data?.message || 'Login failed');
      }
    } catch (err) {
      notyf.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="login-page min-h-[80vh] text-center bg-cover max-w-[400px] mx-auto">
      <img src="/images/auth_shang.png" alt="Login" style={{ width: '100%', display: 'block' }} />
      <div className="text-white px-5 pb-5 shadow-none font-['Urbanist',sans-serif] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/auth_xia.png')" }}>
        <form className="loginBox" onSubmit={handleSubmit}>

          {/* Email — MUI TextField with Emotion css-* classes */}
          <div className="mb-4 text-left">
            <div className="MuiFormControl-root MuiTextField-root css-i44wyl" style={{ width: '100%' }}>
              <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-standard MuiFormLabel-colorPrimary Mui-required css-4jrhyg"
                data-shrink="true">
                Email<span className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-1xpaobf"> *</span>
              </label>
              <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl css-sz7pe0">
                <input autoComplete="off" required type="email"
                  className="MuiInputBase-input MuiInput-input css-1jhxu0"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Password — with visibility IconButton */}
          <div className="mb-4 text-left">
            <div className="MuiFormControl-root MuiTextField-root css-i44wyl" style={{ width: '100%' }}>
              <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-standard MuiFormLabel-colorPrimary Mui-required css-4jrhyg"
                data-shrink="true" htmlFor="outlined-adornment-password" id="outlined-adornment-password-label">
                Password<span className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-1xpaobf"> *</span>
              </label>
              <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-adornedEnd css-sz7pe0">
                <input id="outlined-adornment-password" required
                  type={showPw ? 'text' : 'password'}
                  className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedEnd css-1jhxu0"
                  value={password} onChange={e => setPassword(e.target.value)} />
                <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd MuiInputAdornment-standard MuiInputAdornment-sizeMedium css-1ti6y9h">
                  <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd MuiIconButton-sizeSmall css-m6wte8"
                    tabIndex={0} type="button" onClick={() => setShowPw(!showPw)}>
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-8feus5" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityIcon">
                      {showPw ? (
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                      ) : (
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      )}
                    </svg>
                    <span className="MuiTouchRipple-root css-w0pj6f" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 text-left">
            <span className="cursor-pointer text-blue-500 text-sm" onClick={() => notyf.info('Please contact customer support to reset your password')}>
              Forgot Password?
            </span>
          </div>

          <div className="mt-5">
            <button type="submit" disabled={loading}
              className="w-[200px] h-[80px] bg-transparent text-[#ffed88] border-none bg-cover bg-no-repeat bg-center disabled:opacity-50"
              style={{ backgroundImage: "url('/images/auth_denglu.png')" }}>
              <span className="mt-[-20px] flex items-center justify-center">
                {loading ? 'Loading...' : 'Login'}
              </span>
            </button>
          </div>

          <div className="mt-5 text-gray-400 text-xs">
            Don't have an account?
            <span className="inline cursor-pointer text-white ml-1" onClick={() => nav('/register')}>Register</span>
          </div>

          <div className="text-left mt-4 relative" style={{ fontSize: 9, color: '#9ca3af', lineHeight: 1.4 }}>
            <label className="flex items-start gap-2 cursor-pointer" style={{ display: 'inline' }}>
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-blue-500" />
            </label>
            <span>By Continuing you agree to the </span>
            <span className="cursor-pointer text-white" style={{ fontSize: 9 }} onClick={() => nav('/terms-conditions')}>Terms of Service</span>
            <span> and </span>
            <span className="cursor-pointer text-white" style={{ fontSize: 9 }} onClick={() => nav('/privacy-policy')}>Privacy Policy</span>
          </div>
        </form>
      </div>
    </div>
  );
}
