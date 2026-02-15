import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCheckinMutate } from "../../../hooks/useCheckinMutate";
import { InputNumber } from "../../shared/input-number/input-number";
import { Select } from "../../shared/select/select";
import type { ITreino } from "../../../interfaces/ITreino";
import "./modal-realizar-checkin.css";
import { CheckinExerciciosTable } from "../checkin-exercicios-table/checkin-exercicios-table";
import type { ICheckin } from "../../../interfaces/ICheckin";
import type { IIntensidade } from "../../../interfaces/IIntensidade";

interface ModalRealizarCheckinProps {
    treinos: ITreino[];
    intensidades: IIntensidade[];
    closeModal(): void;
}

export function ModalRealizarCheckin({ treinos, intensidades, closeModal }: ModalRealizarCheckinProps) {
    console.log("intensidades no modal:", intensidades);
    const [treino, setTreino] = useState(treinos[0]?.nome || "");
    const [tempoTreino, setTempoTreino] = useState("");
    const [peso, setPeso] = useState("");
    const [intensidade, setIntensidade] = useState(intensidades[0]?.nome || "");
    const [exercicios, setExercicios] = useState(treinos[0]?.exercicios || []);

    const {mutate} = useCheckinMutate();

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

        if (!intensidade.trim()) {
            alert("Por favor, insira a intensidade do treino");
            return;
        }

        console.log("******************************")
        console.log("INTENSIDADE", intensidade)
        //criar método para setar calorias
        const idTreino = treinos.find(t => t.nome === treino)?.id;
        const idIntensidade = intensidades.find(i => i.nome === intensidade)?.id;
        console.log("ID INTENSIDADE", idIntensidade)
        const checkin: ICheckin = {
            idTreino: idTreino,
            tempoTreino: Number(tempoTreino),
            peso: Number(peso),
            idIntensidade: idIntensidade,
            exercicios: exercicios
        }

        mutate(checkin);
        closeModal();
    }


    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <h2>Registrar Check-in</h2>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal} className="clickable-icon"/>
            </div>
            <div className="modal-body">
                <form className="input-container grid grid-cols-12 gap-3">
                    <div className="col-span-4">
                        <Select label="Treino" value={treino} options={treinos} updateValue={handleTreinoChange}/>
                    </div>
                    <div className="col-span-3">
                        <InputNumber label="Tempo (min)" value={tempoTreino} updateValue={setTempoTreino}/>
                    </div>
                    <div className="col-span-3">
                        <Select label="Intensidade" value={intensidade} options={intensidades} updateValue={setIntensidade}/>
                    </div>
                    <div className="col-span-2 flex justify-center items-center align-middle">
                        <InputNumber label="Peso (kg)" value={peso} updateValue={setPeso}/>
                    </div>
                </form>

                <h5 className="font-medium text-xl mt-6">Exercícios</h5>
                <CheckinExerciciosTable data={exercicios} exerciciosChange={(value) => setExercicios(value)}></CheckinExerciciosTable>
            </div>
            <div className="modal-footer gap-2">
                <button onClick={closeModal} className="btn-secondary">Cancelar</button>
                <button onClick={submit} className="btn-primary">Confirmar</button>
            </div>
        </div>
    )
}