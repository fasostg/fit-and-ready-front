import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';

import { Header } from './components/shared/header/header';
import { Historico } from './pages/historico/Historico';
import { Inicio } from './pages/inicio/Inicio';
import { Nutricao } from './pages/nutricao/Nutricao';
import { Treino } from './pages/treino/Treino';
import { PrivateRoute } from './components/login/private-route/private-route';

function App() {
  return (
    <div className="w-screen h-screen font-display">
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />}/>
          <Route path="/inicio" element={<PrivateRoute> <Inicio /> </PrivateRoute>}/>
          <Route path="/treino" element={<PrivateRoute> <Treino /> </PrivateRoute>}/>
          <Route path="/historico" element={<PrivateRoute> <Historico /> </PrivateRoute>}/>
          <Route path="/nutricao" element={<PrivateRoute> <Nutricao /> </PrivateRoute>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
