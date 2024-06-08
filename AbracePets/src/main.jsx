import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// eslint-disable-next-line no-unused-vars
function mudarCorDeFundo(novaCor) {
  document.body.style.backgroundColor = novaCor;
  document.documentElement.style.backgroundColor = novaCor;
}