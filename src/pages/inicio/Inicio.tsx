import { useState } from "react";
import { CardInfo } from "../../components/inicio/card-info/card-info";
import { Checkin } from "../../components/inicio/checkin/checkin";
import { ModalRealizarCheckin } from "../../components/inicio/modal-realizar-checkin/modal-realizar-checkin";
import { useCheckin, useIntensidade } from "../../hooks/useCheckin";
import type { ICheckin } from "../../interfaces/ICheckin";
import type { ITreino } from "../../interfaces/ITreino";
import { useTreino } from "../../hooks/useTreino";
import { faChartSimple, faClock, faFire, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import type { IIntensidade } from "../../interfaces/IIntensidade";


export function Inicio() {
    const treinos: ITreino[] = useTreino().data?.filter(treino => treino.dataFim == null) || [];
    const intensidades: IIntensidade[] = useIntensidade().data || [];

    const [isModalCheckinOpen, setIsModalCheckinOpen]= useState(false);

    const checkinData: ICheckin[] = useCheckin().data || [];

    const calcularCalorias = () => {
        return checkinData.reduce((total, checkin) => total + (checkin.calorias ?? 0), 0);
    }

    const calcularTreinos = () => {
        return checkinData.length;
    }

    const calcularTempoTreinado = () => {
        return checkinData.reduce((total, checkin) => total + (checkin.tempoTreino ?? 0), 0);
    }

    //TODO: AJUSTAR CALCULO DO IMC
    const calcularIMC = () => {
        if (checkinData.length === 0) return 0;

        return checkinData[checkinData.length - 1].peso ?? 0;
    }

    const cards = [
        {
            tipo: "Calorias queimadas",
            valor: calcularCalorias(),
            icone: faFire,
            unidade: "kcal"
        },
        {
            tipo: "Treinos realizados",
            valor: calcularTreinos(),
            icone: faPersonRunning,
            unidade: "treinos"
        },
        {
            tipo: "Tempo treinado",
            valor: calcularTempoTreinado(),
            icone: faClock,
            unidade: "minutos"
        },
        {
            tipo: "IMC médio",
            valor: calcularIMC(),
            icone: faChartSimple,
            unidade: ""
        }
    ];

    const handleOpenModalCheckin = () => {
        setIsModalCheckinOpen(prev => !prev);
    }

    return (
        <div className="flex flex-col justify-center items-center content-center m-20 ml-[15%] mr-[15%]">
            <div className="w-full flex flex-col justify-start items-start mb-10">
                <h2 className="font-bold text-2xl">Bem vindo(a)!!</h2>
                <p className="font-normal text-xl mb-2">Crie treinos para começar a realizar check-ins :)</p>
            </div>
            <div className="flex flex-col justify-center items-center content-center">
                <div className="mb-20 flex justify-center items-center">
                    <div className="card-grid">
                        {cards.map(card => 
                            <CardInfo 
                                tipo={card.tipo ?? "default"}
                                valor={card.valor ?? 0}
                                icone={card.icone}
                                unidade={card.unidade}
                            />
                        )}                    
                    </div>
                </div>
                
                <div className="w-7/10">
                    <div className="w-full flex justify-between items-center ml-5">
                        <h2 className="font-bold text-xl">Check-ins recentes</h2>
                        <button onClick={handleOpenModalCheckin} className="mr-16 btn-primary">Realizar Check-in</button>
                    </div>
                </div>
                <div className="flex justify-center items-center font-display">
                    <Checkin checkins={checkinData}></Checkin>
                </div>
            </div>
            {isModalCheckinOpen && <ModalRealizarCheckin treinos={treinos} intensidades={intensidades} closeModal={handleOpenModalCheckin} />}
        </div>
    )
}