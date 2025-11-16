import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCheckinMutate } from "../../hooks/useCheckinMutate";
import { ButtonCircle } from "../button-circle/button-circle";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: unknown): void
}

interface ExercicioProps {
    key: number,
    grupoMuscular: string,
    tipoExercicio: string,
    series: number,
    repeticoes: number
}

const exercicioDefault: ExercicioProps = {
    key: 0,
    grupoMuscular: "",
    tipoExercicio: "",
    series: 0,
    repeticoes: 0,
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <div>
            <label className="input-container-label">{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)}></input>
        </div>
    )
}

interface ModalCriarTreinoProps {
    closeModal(): void;
}

export function ModalCriarTreino({ closeModal }: ModalCriarTreinoProps) {
    const [nomeTreino, setNomeTreino] = useState("");
    const [tipoTreino, setTipoTreino] = useState(0);
    const [dataInicio, setDataInicio] = useState("");

    const [exercicios, setExercicios] = useState([exercicioDefault]);

    const [exerciciosCounter, setExerciciosCounter] = useState(0);

    // const [key, setKey] = useState(0)
    // const [grupoMuscular, setGrupoMuscular] = useState("");
    // const [tipoExercicio, setTipoExercicio] = useState("");
    // const [series, setSeries] = useState(0);
    // const [repeticoes, setRepeticoes] = useState(0);
    const {mutate, isSuccess, isPending} = useCheckinMutate()

    const handleAddExercicio = () => {
        const novoExercicio = {...exercicioDefault};
        if (exercicios.length > 0) {
            const lastKey = exercicios[exercicios.length - 1].key;
            novoExercicio.key = lastKey + 1;
        }

        console.log("EXERCICIOS ANTES", exercicios)
        setExercicios([...exercicios, novoExercicio]);
        console.log(exercicios)
    }

    const submit = () => {
        const treino = {
            nomeTreino,
            tipoTreino,
            dataInicio,
            exercicios,
        }

        closeModal();
    }


    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <h2>Criar Treino</h2>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal}/>
            </div>
            <div className="modal-body">
                <h5 className="font-bold text-xl">Treino</h5>
                <form className="input-container flex gap-3">
                    <Input label="Nome do treino" value={nomeTreino} updateValue={setNomeTreino}/>
                    <Input label="Tipo do treino" value={tipoTreino} updateValue={setTipoTreino}/>
                    <Input label="Data de início" value={dataInicio} updateValue={setDataInicio}/>
                </form>

                <h5 className="font-bold text-xl mt-5">Exercícios</h5>
                
                {exercicios.map(exercicio => {
                    return(
                        <div>
                            <p>{exercicios.length > 0 ? exercicios.indexOf(exercicio) + 1 : ""}</p>
                            <form className="input-container h-4/5 flex justify-start align-top items-start gap-3">
                                <Input label="Grupo muscular" value={exercicio.grupoMuscular} updateValue={()=>console.log("a")}/>
                                <Input label="Tipo do exercício" value={exercicio.tipoExercicio} updateValue={()=>console.log("b")}/>
                                <Input label="Séries" value={exercicio.series} updateValue={()=>console.log("c")}/>
                                <Input label="Repetições" value={exercicio.repeticoes} updateValue={()=>console.log("d")}/>
                            </form>
                        </div>
                    )}
                )}
                <ButtonCircle icon={faAdd} size={"sm"} callback={handleAddExercicio}/>
            </div>
            <div className="modal-footer gap-2">
                <button onClick={closeModal} className="btn-secondary">Cancelar</button>
                <button onClick={submit} className="btn-primary">Confirmar</button>
            </div>
        </div>
    )
}