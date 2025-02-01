import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// import activeIcon from "../../assets/images/DRC/Status_DRC list/Active.png";
// import deactiveIcon from "../../assets/images/DRC/Status_DRC list/Inactive.png";