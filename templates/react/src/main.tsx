import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';

// Config for antdesign
// import { StyleProvider } from "@ant-design/cssinjs";
// import { ConfigProvider } from "antd";
// import viVN from "antd/locale/vi_VN";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <StyleProvider layer>
        <ConfigProvider locale={viVN}> */}
            <App />
        {/* </ConfigProvider>
    </StyleProvider> */}
  </StrictMode>,
);
