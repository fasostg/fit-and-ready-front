import './App.css'
import type { IReceita } from './interface/IReceita';
import { useReceita } from './hooks/useReceita';
import { ModalCreateReceita } from './components/modal-create-receita/modal-create-receita';
import { useState } from 'react';
import { CardReceita } from './components/card-receita/card-receita';
import { ModalRealizarCheckin } from './components/modal-realizar-checkin/modal-realizar-checkin';
import { Checkin } from './components/checkin/checkin';

function App() {
  const data: IReceita[] = useReceita().data || [];
  const [isModalReceitaOpen, setIsModalReceitaOpen]= useState(false);
  const [isModalCheckinOpen, setIsModalCheckinOpen]= useState(false);

  //MOCKS
  const [checkins, setCheckins] = useState([
    { id: 1, treino: 'Treino A', date: '2024-06-01', weight: 70 },
    { id: 2, treino: 'Treino B', date: '2024-06-08', weight: 69.5 },
    { id: 3, treino: 'Treino C', date: '2024-06-15', weight: 69  },
  ])

  const handleOpenModalReceita = () => {
    setIsModalReceitaOpen(prev => !prev);
  }

  const handleOpenModalCheckin = () => {
    setIsModalCheckinOpen(prev => !prev);
  }

  return (
    <div className="w-screen h-screen bg-slate-100 ">
      <div className="bg-slate-500 flex justify-center items-center font-display">
        <h1 className="text-slate-800 text-3xl text-center font-bold">Fit & Ready</h1>
      </div>

      <div className="mt-5 flex justify-center items-center font-display">
        <div className="card-grid">
          {data.map(receita => 
            <CardReceita 
              nome={receita.nome} 
              tempoPreparo={receita.tempoPreparo} 
              calorias={receita.calorias ?? 0} 
              proteinas={receita.proteinas ?? 0} 
              carboidratos={receita.carboidratos ?? 0} 
              gorduras={receita.gorduras ?? 0}
            />
          )}
        </div>
      </div>

      <div className="flex justify-around col gap-4 mt-10">
        {isModalReceitaOpen && <ModalCreateReceita closeModal={handleOpenModalReceita} />}
        <button onClick={handleOpenModalReceita} className="btn-primary">Adicionar</button>

        {isModalCheckinOpen && <ModalRealizarCheckin closeModal={handleOpenModalCheckin} />}
        <button onClick={handleOpenModalCheckin} className="btn-primary">Check-in</button>
      </div>

      <div className="mt-5 flex justify-center items-center font-display">
        <Checkin checkins={checkins}></Checkin>
      </div>

    </div>
  )
}

export default App
