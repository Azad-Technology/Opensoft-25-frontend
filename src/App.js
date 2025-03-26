// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// App.jsx
import { useState } from 'react';
// import Login from './components/Login';
// import Signup from './components/Signup';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import './style.css';

export default function App() {
  const [activePage, setActivePage] = useState('login');

  return (
    <div>
      <nav className="top-nav">
        <ul>
          <li className={activePage === 'login' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActivePage('login')}>Login</li>
          <li className={activePage === 'signup' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActivePage('signup')}>Signup</li>
        </ul>
      </nav>
      {activePage === 'login' ? <Login /> : <Signup />}
    </div>
  );
}