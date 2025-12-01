import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ExerciciosTable } from "../exercicios-table/exercicios-table";
import { Input } from "../../shared/input/input";
import { Select } from "../../shared/select/select";
import type { IGrupoMuscular } from "../../../interface/IGrupoMuscular";
import type { ITipoExercicio } from "../../../interface/ITipoExercicio";
import "./modal-criar-treino.css";
import type { ITreino } from "../../../interface/ITreino";
import type { ITipoTreino } from "../../../interface/ITipoTreino";
import type { IExercicio } from "../../../interface/IExercicio";
import { useTreinoMutate, useTreinoUpdate } from "../../../hooks/useTreinoMutate";

export interface ExercicioProps {
    id: number,
    grupoMuscular: string,
    tipoExercicio: string,
    numeroSeries: number,
    numeroRepeticoes: number
}

interface ModalCriarTreinoProps {
    treino?: ITreino,
    tiposTreino: ITipoTreino[],
    gruposMusculares: IGrupoMuscular[],
    tiposExercicios: ITipoExercicio[],
    closeModal(): void;
}

export function ModalCriarTreino({ treino, tiposTreino, gruposMusculares, tiposExercicios, closeModal }: ModalCriarTreinoProps) {
    const [nomeTreino, setNomeTreino] = useState("");
    const [tipoTreino, setTipoTreino] = useState(tiposTreino[0].nome);
    const [dataInicio, setDataInicio] = useState("");

    const [exercicios, setExercicios] = useState<ExercicioProps[]>([]);
    const [grupoMuscular, setGrupoMuscular] = useState(gruposMusculares[0].nome);
    const [tipoExercicio, setTipoExercicio] = useState(tiposExercicios[0].nome);
    const [numeroSeries, setNumeroSeries] = useState(0);
    const [numeroRepeticoes, setNumeroRepeticoes] = useState(0);
    
    const {mutate, isSuccess, isPending} = useTreinoMutate()
    const {mutateUpdate, isSuccess, isPending} = useTreinoUpdate()
    
    const getTiposExerciciosByGrupo = (nomeGrupoMuscular: string) => {
        return tiposExercicios.filter(tipo => tipo.grupoMuscular.nome == nomeGrupoMuscular);
    }

    const [tiposExerciciosByGrupo, setTiposExerciciosByGrupo] = useState(getTiposExerciciosByGrupo(grupoMuscular))

    const handleGrupoMuscularChange = (value: string) => {
        setGrupoMuscular(value);
        const tiposFiltrados = getTiposExerciciosByGrupo(value);
        setTiposExerciciosByGrupo(tiposFiltrados);
        setTipoExercicio(tiposFiltrados[0].nome);
    }

    const handleAddExercicio = () => {
        const id = exercicios.length + 1;
        const novoExercicio: ExercicioProps = {
            id,
            grupoMuscular,
            tipoExercicio,
            numeroSeries,
            numeroRepeticoes
        };

        setExercicios([...exercicios, novoExercicio]);
    }

    const handleDeleteExercicio = (id: string) => {
        const idNumber = Number.parseInt(id) + 1;

        const exerciciosAtualizados = exercicios.filter(exercicio => exercicio.id !== idNumber);
        for (let i=0; i < exerciciosAtualizados.length; i++) {
            exerciciosAtualizados[i].id = i + 1;
        }

        setExercicios(exerciciosAtualizados)
    }

    const submit = () => {
        // Validation
        if (!nomeTreino.trim()) {
            alert("Por favor, insira um nome para o treino");
            return;
        }
        if (!dataInicio.trim()) {
            alert("Por favor, insira uma data de início");
            return;
        }
        if (exercicios.length === 0) {
            alert("Por favor, adicione pelo menos um exercício");
            return;
        }

        const idTipoTreino: number | undefined = tiposTreino.find(tipo => tipo.nome === tipoTreino)?.id
        
        if (idTipoTreino === undefined) {
            alert("Tipo de treino inválido");
            return;
        }

        try {
            const exerciciosMapeados: IExercicio[] = exercicios.map(exercicio => montarExercicio(exercicio))

            const treino: ITreino = {
                tipoTreino: { id: idTipoTreino },
                nome: nomeTreino,
                dataInicio: dataInicio,
                exercicios: exerciciosMapeados,
            }
            console.log("TREINO", treino)
            mutate(treino)
            // closeModal();
        } catch (error) {
            alert("Erro ao processar exercícios: " + (error instanceof Error ? error.message : "Desconhecido"));
        }
    }

    const montarExercicio = (exercicio: ExercicioProps) => {
        const idTipoExercicio: number | undefined = tiposExercicios.find(tipo => tipo.nome === exercicio.tipoExercicio)?.id
        const idGrupoMuscular: number | undefined = gruposMusculares.find(grupo => grupo.nome === exercicio.grupoMuscular)?.id

        if (idTipoExercicio === undefined || idGrupoMuscular === undefined) {
            throw new Error(`Exercício inválido: ${exercicio.tipoExercicio}`);
        }

        return {
            tipoExercicio: {
                id: idTipoExercicio,
                nome: exercicio.tipoExercicio,
                grupoMuscular: {
                    id: idGrupoMuscular,
                    nome: exercicio.grupoMuscular
                }
            },
            numeroSeries: exercicio.numeroSeries,
            numeroRepeticoes: exercicio.numeroRepeticoes,
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <h2>Criar Treino</h2>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal}/>
            </div>
            <div className="modal-body">
                <h5 className="font-bold text-xl">Treino</h5>
                <form className="input-container grid grid-cols-3 gap-3">
                    <Input label="Nome do treino" value={nomeTreino} updateValue={setNomeTreino}/>
                    <Select label="Tipo do treino" value={tipoTreino} options={tiposTreino} updateValue={setTipoTreino}/>
                    <Input label="Data de início" value={dataInicio} updateValue={setDataInicio}/>
                </form>

                <h5 className="font-bold text-xl mt-5">Exercícios</h5>
                
                <div className="w-full flex justify-start align-top">
                    <form className="input-container grid grid-cols-4 justify-start align-top items-start gap-3">
                        <Select label="Grupo muscular" value={grupoMuscular} options={gruposMusculares} updateValue={handleGrupoMuscularChange}/>
                        <Select label="Tipo do exercício" value={tipoExercicio} options={tiposExerciciosByGrupo} updateValue={setTipoExercicio}/>
                        <Input label="Séries" value={numeroSeries} updateValue={setNumeroSeries}/>
                        <Input label="Repetições" value={numeroRepeticoes} updateValue={setNumeroRepeticoes}/>                        
                    </form>
                </div>
                <div className="w-full flex justify-end items-end align-middle pr-6">
                    <button onClick={handleAddExercicio} className="btn-primary btn-adicionar">Adicionar</button>
                </div>

                <ExerciciosTable data={exercicios} deleteExercicio={handleDeleteExercicio} />
            </div>
            <div className="modal-footer gap-2">
                <button onClick={closeModal} className="btn-secondary">Cancelar</button>
                <button onClick={submit} className="btn-primary">Confirmar</button>
            </div>
        </div>
    )
}