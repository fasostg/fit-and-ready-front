import { useState } from "react";
import { useReceita } from "../hooks/useReceita";
import type { IReceita } from "../interface/IReceita";
import { CardInfo } from "../components/card-info/card-info";
import { CardReceita } from "../components/card-receita/card-receita";
import { ModalCriarReceita } from "../components/modal-criar-receita/modal-criar-receita";


export function Nutricao() {
    const data: IReceita[] = useReceita().data || [];
    const [isModalReceitaOpen, setIsModalReceitaOpen]= useState(false);

    const handleOpenModalReceita = () => {
        setIsModalReceitaOpen(prev => !prev);
    }

    return (
        <>
            <div className="mt-20 mb-20 flex justify-center items-center">
                <div className="card-grid">
                    <CardInfo />
                    <CardInfo />
                    <CardInfo />
                    <CardInfo />
                </div>
            </div>

            <div className="mt-5 flex justify-center items-center">
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
                {isModalReceitaOpen && <ModalCriarReceita closeModal={handleOpenModalReceita} />}
                <button onClick={handleOpenModalReceita} className="btn-primary">Adicionar</button>
            </div>
        </>
    )
}