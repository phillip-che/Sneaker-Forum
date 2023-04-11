import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Layout from "./routes/Layout"
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePage from './routes/CreatePage'
import LoginPage from './routes/LoginPage'
import UpdatePage from './routes/UpdatePage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/> } >
        <Route index={true} element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:postID/update" element={<UpdatePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
