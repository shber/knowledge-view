/*
 * @Author: Shber
 * @Date: 2025-03-04 10:44:54
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-05 18:12:39
 * @Description: 
 */
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
