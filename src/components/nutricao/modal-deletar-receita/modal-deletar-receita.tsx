import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./modal-deletar-receita.css";
import { useReceitaDelete } from "../../../hooks/useReceitaMutate";


interface ModalDeletarReceitaProps {
    idReceita?: number,
    closeModal(): void;
}

export function ModalDeletarReceita({ idReceita, closeModal }: ModalDeletarReceitaProps) {
    const {mutate, isSuccess, isPending} = useReceitaDelete()
    
    const submit = () => {
        try {
            mutate(idReceita)
            closeModal();
        } catch (error) {
            alert("Erro ao deletar receita: " + (error instanceof Error ? error.message : "Desconhecido"));
        }
    }



    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <h2>Excluir Receita</h2>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal} className="cursor-pointer hover:opacity-50"/>
            </div>
            <div className="modal-body modal-body-small">
                <h3 className="font-light text-xl">Você deseja realmente excluir a receita?</h3>
                
            </div>
            <div className="modal-footer gap-2">
                <button onClick={closeModal} className="btn-secondary">Cancelar</button>
                <button onClick={submit} className="btn-primary">Confirmar</button>
            </div>
        </div>
    )
}