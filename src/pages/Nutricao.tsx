import { useState } from "react";
import { useReceita } from "../hooks/useReceita";
import type { IReceita } from "../interface/IReceita";
import { CardInfo } from "../components/inicio/card-info/card-info";
import { CardReceita } from "../components/nutricao/card-receita/card-receita";
import { ModalCriarReceita } from "../components/nutricao/modal-criar-receita/modal-criar-receita";
import { faBowlFood, faBreadSlice, faDroplet, faEgg, faFire } from "@fortawesome/free-solid-svg-icons";
import { NutricaoEnum } from "../models/NutricaoEnum";


export function Nutricao() {
    const data: IReceita[] = useReceita().data || [];
    const [isModalReceitaOpen, setIsModalReceitaOpen]= useState(false);

    const handleOpenModalReceita = () => {
        setIsModalReceitaOpen(prev => !prev);
    }

    const calcularMedia = (param: any) => {
        if (data?.length == null || data.length == 0) {
            return 0;
        }

        switch(param) {
            case NutricaoEnum.CALORIAS:
                return data.reduce((acc, receita) => (receita?.calorias ?? 0) + acc, 0)/data.length;
            case NutricaoEnum.PROTEINAS:
                return data.reduce((acc, receita) => (receita?.proteinas ?? 0) + acc, 0)/data.length;
            case NutricaoEnum.CARBOIDRATOS:
                return data.reduce((acc, receita) => (receita?.carboidratos ?? 0) + acc, 0)/data.length;
            case NutricaoEnum.GORDURAS:
                return data.reduce((acc, receita) => (receita?.gorduras ?? 0) + acc, 0)/data.length;
            default:
                return 0;
        }
    }

    const cards = [
        {
            tipo: "Média de calorias",
            valor: calcularMedia(NutricaoEnum.CALORIAS),
            icone: faFire,
            unidade: "kcal"
        },
        {
            tipo: "Média de proteínas",
            valor: calcularMedia(NutricaoEnum.PROTEINAS),
            icone: faEgg,
            unidade: "g"
        },
        {
            tipo: "Média de carboidratos",
            valor: calcularMedia(NutricaoEnum.CARBOIDRATOS),
            icone: faBowlFood,
            unidade: "g"
        },
        {
            tipo: "Média de gorduras",
            valor: calcularMedia(NutricaoEnum.GORDURAS),
            icone: faDroplet,
            unidade: "g"
        }
    ];

    return (
        <div className="flex flex-col items-center m-20 ml-[15%] mr-[15%]">
            <div className="w-full mb-10">
                <h2 className="font-bold text-2xl">Bem vindo(a)!!</h2>
                <p className="font-normal text-xl mb-2">Crie receitas para sua elevar a sua rotina</p>
            </div>

            <div className="flex flex-col items-center">
                <p className="btn-primary mb-4">{data.length} {data.length == 1 ? "receita criada" : "receitas criadas"}</p> 
                
                <div className="mb-20 flex justify-center">
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
            </div>

            <hr className="w-full border border-gray-300 -mt-5 mb-12" />

            <div className="w-full flex justify-end items-center mb-5">
                <button onClick={handleOpenModalReceita} className="btn-primary">Criar nova receita</button>
            </div>

            <div className="w-full mt-5 grid grid-cols-3 gap-4">
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

            <div className="flex justify-around gap-4 mt-10">
                {isModalReceitaOpen && <ModalCriarReceita closeModal={handleOpenModalReceita} />}
            </div>
        </div>
    )
}