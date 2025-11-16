import './App.css';

import { Route, Routes } from 'react-router-dom';

import { Header } from './components/header/header';
import { Historico } from './pages/Historico';
import { Inicio } from './pages/Inicio';
import { Nutricao } from './pages/Nutricao';
import { Treino } from './pages/Treino';

function App() {
  return (
    <div className="w-screen h-screen bg-slate-100 font-display">
      <div>
        <Header />
        <Routes>
          <Route path="/inicio" element={<Inicio />}/>
          <Route path="/treino" element={<Treino />}/>
          <Route path="/historico" element={<Historico />}/>
          <Route path="/nutricao" element={<Nutricao />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
