import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./modal-deletar-treino.css";
import { useTreinoDelete } from "../../../hooks/useTreinoMutate";

interface ModalDeletarTreinoProps {
    idTreino?: number,
    closeModal(): void;
}

export function ModalDeletarTreino({ idTreino, closeModal }: ModalDeletarTreinoProps) {
    const {mutate, isSuccess, isPending} = useTreinoDelete()
    
    const submit = () => {
        try {
            mutate(idTreino)
            closeModal();
        } catch (error) {
            alert("Erro ao deletar treino: " + (error instanceof Error ? error.message : "Desconhecido"));
        }
    }



    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <h2>Exluir Treino</h2>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal} className="cursor-pointer hover:opacity-50"/>
            </div>
            <div className="modal-body modal-body-small">
                <h3 className="font-light text-xl">Você deseja realmente excluir o treino?</h3>
                
            </div>
            <div className="modal-footer gap-2">
                <button onClick={closeModal} className="btn-secondary">Cancelar</button>
                <button onClick={submit} className="btn-primary">Confirmar</button>
            </div>
        </div>
    )
}