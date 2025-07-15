---

## `todo-frontend/README.md`  (Vue 3 + Vite)

```markdown
# Todo Frontend – Vue 3 + Vite

A minimalist single‑page app that consumes the Todo API.  
Live demo: <https://upscalefe-production.up.railway.app/>

---

## ✨ Features

- **Vue 3 Composition API**
- **Pinia** for state management
- **Vue Router 4** with public & protected routes
- **Axios** wrapper with auth interceptor
- **Bootstrap 5** for quick styling
- Environment‑based API URL (`VITE_API_URL`)
- Unit & component tests with **Vitest** / **@vue/test‑utils**

---

## 🚀 Quick start

```bash
git clone <repo-url>
cd todo-frontend
npm install      # or pnpm / yarn

# copy env & set backend URL
cp .env.example .env
echo "VITE_API_URL=http://localhost:8000" >> .env

npm run dev      # hot‑reload at http://localhost:5173
```
