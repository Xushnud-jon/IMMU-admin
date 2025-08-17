import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
   resolve:{
    alias:[
      {find: "@", replacement:"/src/*"},
      {find: "@modules", replacement:"/src/modules"},
      {find: "@api", replacement:"/src/api"},
      {find: "@types", replacement:"/src/types"},
      {find: "@components", replacement:"/src/components"},
      
    ]
  }
})