import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Import CSS directly - this will apply all styles
import './styles/global.css'

// Also add Bootstrap for services page if needed
const bootstrapLink = document.createElement('link');
bootstrapLink.rel = 'stylesheet';
bootstrapLink.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
document.head.appendChild(bootstrapLink);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)