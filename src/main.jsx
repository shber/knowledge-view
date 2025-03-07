/*
 * @Author: Shber
 * @Date: 2025-03-04 10:44:54
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-05 17:47:09
 * @Description: 
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css'
import './index.css'
import App from './App.jsx'
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
