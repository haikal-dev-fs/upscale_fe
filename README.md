# Todo Frontend – Vue 3 + Vite

A minimalist single‑page app that consumes the Todo API.  
Live demo: <https://upscalefe-production.up.railway.app/>

---

## 1️⃣ Instruksi Setup (Project)

```bash
git clone <repo-frontend-url>
cd todo-frontend
npm install                   # atau pnpm / yarn

cp .env.example .env          # salin env
echo "VITE_API_URL=http://localhost:8000" >> .env

npm run dev                   # hot‑reload at http://localhost:5173
```

### Perintah Tambahan

| Script            | Fungsi                                |
| ----------------- | ------------------------------------- |
| `npm run build`   | Build produksi → `/dist`              |
| `npm run preview` | Pratinjau build produksi secara lokal |
| `npm run test`    | Unit & component tests (Vitest)       |
| `npm run lint`    | ESLint + Prettier                     |

---

## 2️⃣ Struktur Proyek (Singkat)

```
todo-frontend/
├─ public/                 # static index.html
└─ src/
   ├─ assets/              # ikon, gambar, style global
   ├─ components/          # UI reusable
   ├─ views/               # halaman (router‑view)
   ├─ stores/              # Pinia (auth, tasks ...)
   ├─ services/            # wrapper Axios & helper API
   ├─ router/              # konfigurasi Vue Router 4
   ├─ App.vue
   └─ main.js
```

---

## 3️⃣ Teknologi yang Digunakan

| Kategori  | Teknologi / Library               | Peran                |
| --------- | --------------------------------- | -------------------- |
| Framework | **Vue 3 (Composition API)**       | UI Reactif           |
| Bundler   | **Vite**                          | Dev‑server & build   |
| State     | **Pinia**                         | Global store         |
| Routing   | **Vue Router 4**                  | SPA navigation       |
| HTTP      | **Axios** + interceptor JWT       | Konsumsi REST API    |
| UI Kit    | **Bootstrap 5**                   | Styling cepat        |
| Testing   | **Vitest** + `@vue/test-utils`    | Unit/component tests |
| Deploy    | Railway Static / Netlify / Vercel | Host file statik     |
