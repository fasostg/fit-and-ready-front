import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCheckinMutate } from "../../../hooks/useCheckinMutate";
import { InputNumber } from "../../shared/input-number/input-number";
import { Select } from "../../shared/select/select";
import type { ITreino } from "../../../interface/ITreino";
import { ExerciciosTable } from "../../treino/exercicios-table/exercicios-table";
import { recuperarExercicios } from "../../../utils/exercicios-mapper";

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
    treinos: ITreino[];
    closeModal(): void;
}

export function ModalRealizarCheckin({ treinos, closeModal }: ModalRealizarCheckinProps) {
    console.log("Treinos no modal:", treinos);
    const [treino, setTreino] = useState(treinos[0]?.nome || "");
    const [tempoTreino, setTempoTreino] = useState("");
    const [calorias, setCalorias] = useState();
    const [peso, setPeso] = useState("");
    const [tempoDescanso, setTempoDescanso] = useState("");
    const [exercicios, setExercicios] = useState(treinos[0]?.exercicios || []);

    const {mutate, isSuccess, isPending} = useCheckinMutate();

    const handleTreinoChange = (value: string | number | undefined) => {
        setTreino(value as string);
        setExercicios(treinos.find(t => t.nome === value)?.exercicios || []);
    }

    const submit = () => {
        if (!treino?.trim()) {
            alert("Por favor, selecione o treino realizado");
            return;
        }

        if (!tempoTreino.trim()) {
            alert("Por favor, insira o tempo de treino");
            return;
        }

        if (!tempoDescanso.trim()) {
            alert("Por favor, insira o tempo de descanso entre séries");
            return;
        }

        console.log("TIPOS TREINO", tiposTreino)
        const idTipoTreino: number | undefined = tiposTreino.find(tipo => tipo.nome === tipoTreino)?.id
        if (idTipoTreino == null) {
            alert("Tipo de treino inválido");
            return;
        }

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
                <form className="input-container flex grid grid-cols-12 gap-3">
                    <div className="col-span-4">
                        <Select label="Treino" value={treino} options={treinos} updateValue={handleTreinoChange}/>
                    </div>
                    <div className="col-span-3">
                        <InputNumber label="Tempo (min)" value={tempoTreino} updateValue={setTempoTreino}/>
                    </div>
                    <div className="col-span-3">
                        <InputNumber label="Tempo de descanso (min)" value={tempoDescanso} updateValue={setTempoDescanso}/>
                    </div>
                    <div className="col-span-2">
                        <InputNumber label="Peso (kg)" value={peso} updateValue={setPeso}/>
                    </div>
                </form>

                <h5 className="font-medium text-xl mt-6">Exercícios</h5>
                {exercicios.map(exercicio => 
                    <div>
                        <p>{exercicio.tipoExercicio.nome}</p>
                        <p></p>

                    </div>
                )}
                <ExerciciosTable data={recuperarExercicios(exercicios)}/>
            </div>
            <div className="modal-footer gap-2">
                <button onClick={closeModal} className="btn-secondary">Cancelar</button>
                <button onClick={submit} className="btn-primary">Confirmar</button>
            </div>
        </div>
    )
}