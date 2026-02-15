import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { ButtonCircle } from "../../shared/button-circle/button-circle"
import "./card-receita.css"
import { useState } from "react";
import { ModalDeletarReceita } from "../modal-deletar-receita/modal-deletar-receita";
import { ModalCriarReceita } from "../modal-criar-receita/modal-criar-receita";
import { ModalModoPreparo } from "../modal-modo-preparo/modal-modo-preparo";
import type { IReceita } from "../../../interfaces/IReceita";
import type { ITipoRefeicao } from "../../../interfaces/ITipoRefeicao";
import type { IIngrediente } from "../../../interfaces/IIngrediente";

interface CardReceitaProps {
    receita: IReceita,
    tiposRefeicao: ITipoRefeicao[],
    ingredientes: IIngrediente[],
    closeModal(): void;
}

export function CardReceita({ receita, tiposRefeicao, ingredientes, closeModal } : CardReceitaProps) {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalModoPreparoOpen, setIsModalModoPreparoOpen] = useState(false);

    const handleDeleteReceita = () => {
        setIsModalDeleteOpen(prev => !prev);
    }

    const handleEditReceita = () => {
        setIsModalEditOpen(prev => !prev);
    }

    const handleModalModoPreparo = () => {
        setIsModalModoPreparoOpen(prev => !prev);
    }

    
    return (
        <>
            <div className="card-receita">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="card-buttons">
                            <ButtonCircle icon={faPencil} size={"sm"} callback={handleEditReceita}/>
                            <ButtonCircle icon={faTrash} size={"sm"} callback={handleDeleteReceita}/>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 p-4">
                            {receita.nome}
                        </h3>

                        <div className="flex mt-2">
                            <span className="ml-3 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
                            {receita.tipoRefeicao?.nome}
                            </span>
                            <span className="ml-3 px-3 py-1 text-sm bg-gray-100 rounded-full">
                            {receita.tempoPreparo} min
                            </span>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
                    <div className="tag">
                        <p>Calorias</p>
                        <span><span className="font-semibold text-xl">{receita.calorias}</span>kcal</span>
                    </div>
                    <div className="tag">
                        <p>Proteinas</p>
                        <span><span className="font-semibold text-xl">{receita.proteinas}</span>g</span>
                    </div>
                    <div className="tag">
                        <p>Carboidratos</p>
                        <span><span className="font-semibold text-xl">{receita.carboidratos}</span>g</span>
                    </div>
                    <div className="tag">
                        <p>Gorduras</p>
                        <span><span className="font-semibold text-xl">{receita.gorduras}</span>g</span>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-2">
                    <button className="btn-primary text-sm" onClick={handleModalModoPreparo}>
                        Modo de preparo
                    </button>
                </div>
            </div>
            {isModalEditOpen && <ModalCriarReceita receita={receita} tiposRefeicao={tiposRefeicao} ingredientes={ingredientes} closeModal={handleEditReceita}/>}
            {isModalDeleteOpen && <ModalDeletarReceita idReceita={receita.id} closeModal={handleDeleteReceita}/>}
            {isModalModoPreparoOpen && <ModalModoPreparo modoPreparo={receita.modoPreparo} ingredientes={receita.ingredientesReceita} closeModal={handleModalModoPreparo}/>}
        </>
    )
}