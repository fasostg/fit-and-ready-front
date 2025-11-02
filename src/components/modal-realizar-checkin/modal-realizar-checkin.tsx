import { faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalRealizarCheckinProps {
    closeModal(): void;
}

export function ModalRealizarCheckin({ closeModal }: ModalRealizarCheckinProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <h2>Registrar Check-in</h2>
                <FontAwesomeIcon icon={faCross} onClick={closeModal}/>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer"></div>
        </div>
    )
}