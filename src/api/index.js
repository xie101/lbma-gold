import axios from 'axios';
import { getMock } from './mock';

const API_BASE = 'http://localhost:3001/api';
const USE_MOCK = false;

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// DEV: mock API for local development
if (USE_MOCK) {
  api.interceptors.request.use((config) => {
    const mock = getMock(config.url);
    if (mock) {
      config.adapter = () => Promise.resolve({ data: mock, status: 200, statusText: 'OK', headers: {}, config });
    }
    return config;
  });
}

// Token management
const TOKEN_KEY = 'token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Request interceptor - attach token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle auth errors & network issues
api.interceptors.response.use(
  (res) => {
    if (res.data && res.data.code !== undefined && res.data.code !== 0) {
      const msg = res.data.data?.message || res.data.message || 'Request failed';
      const e = new Error(msg);
      e.response = { data: { message: msg } };
      return Promise.reject(e);
    }
    return res;
  },
  (err) => {
    if (err.response?.status === 401) {
      removeToken();
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

// ─── Auth ───
export const login = (data) => api.post('/user/login', data);
export const register = (data) => api.post('/user/register', data);
export const getProfile = () => api.post('/user/profile');

// ─── User ───
export const setPassword = (data) => api.post('/user/setPassword', data);
export const setWithdrawPassword = (data) => api.post('/user/setWithdrawPassword', data);
export const setName = (data) => api.post('/user/setName', data);
export const setBank = (data) => api.post('/user/setBank', data);
export const getBank = () => api.get('/user/getBank');
export const depositHistory = (params) => api.get('/user/depositHistory', { params });
export const withdrawHistory = (params) => api.get('/user/withdrawHistory', { params });
export const transactionHistory = (params) => api.get('/user/transactionHistory', { params });
export const teamReport = () => api.get('/user/teamReport');
export const setLang = (lang) => api.post('/user/setLang', { lang });

// ─── Trade ───
export const submitOrder = (data) => api.post('/trade/submitOrder', data);
export const doOrder = (data) => api.post('/trade/doOrder', data);
export const rotOrder = (data) => api.post('/trade/rotOrder', data);
export const getOrder = (params) => api.post('/trade/getOrder', params);
export const orderInfo = (params) => api.get('/trade/orderInfo', { params });
export const vipList = () => api.post('/trade/vipList');

// ─── Finance ───
export const postDeposit = (data) => api.post('/user/postDeposit', data);
export const postWithdraw = (data) => api.post('/user/postWithdraw', data);
export const postConvert = (data) => api.post('/user/postConvert', data);
export const postTicket = (data) => api.post('/user/postTicket', data);
export const myTickets = () => api.get('/user/tickets');

// ─── Common ───
export const getBanner = () => api.get('/common/banner');
export const getPages = () => api.get('/common/pages');
export const getAbout = () => api.get('/common/about');
export const getCountryCode = () => api.get('/common/countryCode');
export const getDepositConfig = () => api.get('/common/getDeposit');
export const getDeposit = getDepositConfig; // alias used by Deposit/Deposits pages
export const getETHConfig = () => api.get('/common/getETHConfig');
export const getSupport = () => api.post('/common/getSupport');
export const getPrivacyPolicy = () => api.get('/common/privacyPolicy');
export const getTermsCondition = () => api.get('/common/termsCondition');

export default api;
