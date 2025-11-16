import { useState } from "react";
import { CardTreino } from "../components/card-treino/card-treino";
import { ModalCriarTreino } from "../components/modal-criar-treino/modal-criar-treino";


export function Treino() {
    const [isModalAddTreinoOpen, setIsModalAddTreinoOpen] = useState(false);

    const handleOpenModalAddTreino = () => {
        setIsModalAddTreinoOpen(prev => !prev);
    }

    return (
        <div className="flex flex-col justify-center items-center content-center m-20">
            <h1 className="mt-10 mb-2 ml-4 font-bold text-2xl">Olá, XXXXXX</h1>
            <div className="mb-20 flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-end mb-5">
                    <h5 className="font-bold text-xl">Treinos atuais</h5>
                    <button onClick={handleOpenModalAddTreino} className=" btn-primary">Adicionar Treino</button>
                </div>
                <div className="card-grid">
                    <CardTreino tipo={"Treino"} valor={300} isAtivo={true} />                   
                    <CardTreino tipo={"Treino"} valor={300} isAtivo={true} />                   
                    <CardTreino tipo={"Treino"} valor={300} isAtivo={true} />                   
                    <CardTreino tipo={"Treino"} valor={300} isAtivo={true} />
                </div>
            </div>
            <div className="mb-20 flex flex-col justify-center items-center">
                <h5>Treinos anteriores</h5>
                <div className="card-grid">
                    <CardTreino tipo={"Treino"} valor={300} isAtivo={false} />                   
                    <CardTreino tipo={"Treino"} valor={300} isAtivo={false} />                   
                    <CardTreino tipo={"Treino"} valor={300} isAtivo={false} />                   
                    <CardTreino tipo={"Treino"} valor={300} isAtivo={false} /> 
                </div>
            </div>

            {isModalAddTreinoOpen && <ModalCriarTreino closeModal={handleOpenModalAddTreino}/>}
        </div>
    )
}