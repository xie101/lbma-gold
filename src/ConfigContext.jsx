import { createContext, useContext, useState, useEffect } from 'react';
import api from './api/index.js';

const ConfigCtx = createContext({});
export const useConfig = () => useContext(ConfigCtx);

// 启动拉 /common/config（按子域名/登录代理识别），注入主题色 + site_name
export function ConfigProvider({ children }) {
  const [config, setConfig] = useState({});
  useEffect(() => {
    const sub = window.location.hostname.split('.')[0];
    api.get('/common/config', { params: { subdomain: sub } })
      .then(r => setConfig(r.data?.data || {}))
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (config.site_name) document.title = config.site_name;
    // 主题色 CSS 变量（代理可自定义，默认 #c9a44c）
    document.documentElement.style.setProperty('--brand', config.theme_color || '#c9a44c');
  }, [config]);
  return <ConfigCtx.Provider value={config}>{children}</ConfigCtx.Provider>;
}
