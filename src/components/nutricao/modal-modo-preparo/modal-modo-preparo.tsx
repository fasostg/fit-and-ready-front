import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./modal-modo-preparo.css";
import type { IIngredienteReceita } from "../../../interfaces/IIngredienteReceita";


interface ModalModoPreparoProps {
    modoPreparo?: string,
    ingredientes?: IIngredienteReceita[],
    closeModal(): void;
}

export function ModalModoPreparo({ modoPreparo, ingredientes, closeModal }: ModalModoPreparoProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <h2>Modo de preparo da receita</h2>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal} className="cursor-pointer hover:opacity-50"/>
            </div>
            <div className="modal-body modal-body-medium">
                <div className="flex gap-4">
                    <div className="p-4 min-w-fit">
                        <h4 className="font-semibold">Ingredientes</h4>
                        <ul>
                            {ingredientes && ingredientes.map((ingrediente, index) => (
                                <li key={index}>- {ingrediente.quantidade}g de {ingrediente.ingrediente?.nome}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="h-full w-px bg-indigo-400"></div>
                    <div className="p-4">
                        <h4 className="font-semibold">Modo de preparo</h4>
                        <p>{modoPreparo}</p>
                    </div>
                </div>
            </div>
            <div className="modal-footer gap-2">
                <button onClick={closeModal} className="btn-secondary">Fechar</button>
            </div>
        </div>
    )
}