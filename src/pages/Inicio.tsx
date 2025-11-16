import { useState } from "react";
import { CardInfo } from "../components/card-info/card-info";
import { Checkin } from "../components/checkin/checkin";
import { ModalRealizarCheckin } from "../components/modal-realizar-checkin/modal-realizar-checkin";
import { useCheckin } from "../hooks/useCheckin";
import type { ICheckin } from "../interface/ICheckin";


export function Inicio() {
    const [isModalCheckinOpen, setIsModalCheckinOpen]= useState(false);

    //MOCKS CHECKIN
    const [checkins, setCheckins] = useState([
        { id: 1, treino: 'Treino A', data: '2024-06-01', peso: 70 },
        { id: 2, treino: 'Treino B', data: '2024-06-08', peso: 69.5 },
        { id: 3, treino: 'Treino C', data: '2024-06-15', peso: 69  },
    ])

    const checkinData: ICheckin[] = useCheckin().data || [];
    console.log(checkinData)

    //MOCKS CARDS
    const [cards, setCards] = useState([
        { tipo: "Calorias queimadas", valor: 1000 },
        { tipo: "Treinos realizados", valor: 10 },
        { tipo: "Tempo treinado", valor: 1600 },
        { tipo: "IMC médio", valor: 22 },
    ])

    const handleOpenModalCheckin = () => {
        setIsModalCheckinOpen(prev => !prev);
    }

    const handleAddCheckin = () => {
        const newCheckin = { id: 3, treino: 'Treino C', data: '2024-06-15', peso: 69  };
        setCheckins([...checkins, newCheckin]);
        console.log(checkins)

        //setIsModalCheckinOpen(prev => !prev);
    }


    const handleDeleteCheckin = () => {
        setCheckins(checkins.slice(0,-1));
        console.log(checkins)
    }


    return (
        <div className="flex flex-col mr-20 ml-20">
            <div className="flex flex-col justify-center items-center content-center m-20">
                <h1 className="mt-10 mb-2 ml-4 font-bold text-2xl">Olá, XXXXXX</h1>
                <div className="mb-20 flex justify-center items-center">
                    <div className="card-grid">
                        {cards.map(card => 
                            <CardInfo 
                                tipo={card.tipo ?? "default"}
                                valor={card.valor ?? 0}
                            />
                        )}                    
                    </div>
                </div>
                
                <div className="w-4/5">
                    <div className="w-full flex justify-between items-center ml-5">
                        <h2 className="ml-5 font-bold text-xl">Treinos recentes</h2>
                        <button onClick={handleOpenModalCheckin} className="mr-16 btn-primary">Realizar Check-in</button>
                    </div>
                </div>
                <div className="flex justify-center items-center font-display">
                    <Checkin checkins={checkinData}></Checkin>
                </div>

                <div className="flex justify-around col gap-4 mt-10">
                    <button className="btn-secondary">Check-in</button>
                    <button onClick={handleDeleteCheckin} className="btn-secondary">Delete</button>
                </div>
            </div>
            {isModalCheckinOpen && <ModalRealizarCheckin closeModal={handleOpenModalCheckin} />}
        </div>
    )
}