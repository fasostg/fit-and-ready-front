import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCheckinMutate } from "../../hooks/useCheckinMutate";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: unknown): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <div>
            <label className="input-container-label">{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)}></input>
        </div>
    )
}

interface ModalRealizarCheckinProps {
    closeModal(): void;
}

export function ModalRealizarCheckin({ closeModal }: ModalRealizarCheckinProps) {
    const [treino, setTreino] = useState("");
    const [tempoTreino, setTempoTreino] = useState(0);
    const [calorias, setCalorias] = useState(0);
    const [peso, setPeso] = useState(0);
    const [intensidade, setIntensidade] = useState("");
    const {mutate, isSuccess, isPending} = useCheckinMutate()

    const submit = () => {
        const checkin = {
            treino,
            tempoTreino,
            calorias,
            peso,
        }

        mutate(checkin);
        closeModal();
    }


    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <h2>Registrar Check-in</h2>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal}/>
            </div>
            <div className="modal-body">
                <form className="input-container flex gap-3">
                    <Input label="Treino" value={treino} updateValue={setTreino}/>
                    <Input label="Tempo (min)" value={tempoTreino} updateValue={setTempoTreino}/>
                    <Input label="Intensidade" value={intensidade} updateValue={setIntensidade}/>
                    <Input label="Peso (kg)" value={peso} updateValue={setPeso}/>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>TITULO</th>
                            <th>SUBTITULO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="modal-footer gap-2">
                <button onClick={closeModal} className="btn-secondary">Cancelar</button>
                <button onClick={submit} className="btn-primary">Confirmar</button>
            </div>
        </div>
    )
}