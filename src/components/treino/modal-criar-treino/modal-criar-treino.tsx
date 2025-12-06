import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
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
import { InputDate } from "../../shared/input-date/input-date";
import { validateDate } from "../../../utils/validate-date";
import { InputNumber } from "../../shared/input-number/input-number";
import { montarExercicio, recuperarExercicios } from "../../../utils/exercicios-mapper";

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
    const [isEdicao, setIsEdicao] = useState(!!treino);
    const [nomeTreino, setNomeTreino] = useState(treino?.nome);
    const [tipoTreino, setTipoTreino] = useState(treino?.tipoTreino?.nome || tiposTreino[0].nome);
    const [dataInicio, setDataInicio] = useState(treino?.dataInicio);

    const [exercicios, setExercicios] = useState<ExercicioProps[]>(recuperarExercicios(treino?.exercicios));
    const [grupoMuscular, setGrupoMuscular] = useState(gruposMusculares[0].nome);
    const [tipoExercicio, setTipoExercicio] = useState(tiposExercicios[0].nome);
    const [numeroSeries, setNumeroSeries] = useState();
    const [numeroRepeticoes, setNumeroRepeticoes] = useState();
    
    const {mutate, isSuccess, isPending} = useTreinoMutate()
    const {mutate: mutateUpdate, isSuccess: isSuccessUpdate, isPending: isPendingUpdate} = useTreinoUpdate()

    useEffect(() => {
    }, []);

    
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
        if (exercicios.length >= 15) {
            alert("Número máximo de exercícios atingido (15)");
            return;
        }
        
        if (!grupoMuscular || !tipoExercicio) {
            alert("Por favor, selecione o grupo muscular e o tipo de exercício");
            return;
        }

        if (exercicios.find(exercicio => exercicio.tipoExercicio === tipoExercicio)) {
            alert("Exercício já adicionado");
            return;
        }

        if (!numeroSeries || !numeroRepeticoes) {
            alert("Por favor, insira o número de séries e repetições");
            return;
        }

        const id = exercicios.length + 1;

        const novoExercicio: ExercicioProps = {
            id: id,
            grupoMuscular: grupoMuscular,
            tipoExercicio: tipoExercicio,
            numeroSeries: numeroSeries || 0,
            numeroRepeticoes: numeroRepeticoes || 0
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
        if (!nomeTreino?.trim()) {
            alert("Por favor, insira um nome para o treino");
            return;
        }

        const validacaoData = validateDate(dataInicio);
        if (validacaoData != null) {
            alert(validacaoData);
            return;
        }

        if (exercicios.length === 0) {
            alert("Por favor, adicione pelo menos um exercício");
            return;
        }

        console.log("TIPOS TREINO", tiposTreino)
        const idTipoTreino: number | undefined = tiposTreino.find(tipo => tipo.nome === tipoTreino)?.id
        if (idTipoTreino == null) {
            alert("Tipo de treino inválido");
            return;
        }

        try {
            const exerciciosMapeados: IExercicio[] = exercicios.map(exercicio => montarExercicio(exercicio, tiposExercicios, gruposMusculares));

            const treinoData: ITreino = {
                id: treino?.id,
                tipoTreino: { id: idTipoTreino },
                nome: nomeTreino,
                dataInicio: dataInicio,
                exercicios: exerciciosMapeados,
            }

            if (isEdicao) {
                console.log("EDITAR TREINO", treinoData);
                //mutateUpdate(treinoData);
            } else {
                console.log("CRIAR TREINO", treinoData);
                mutate(treinoData);
            }
            // closeModal();
        } catch (error) {
            alert("Erro ao processar exercícios: " + (error instanceof Error ? error.message : "Desconhecido"));
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
                <form className="input-container grid grid-cols-4 gap-3">
                    <div className="col-span-2">
                        <Input label="Nome do treino" value={nomeTreino} updateValue={setNomeTreino}/>
                    </div>
                    <div className="col-span-1">
                        <Select label="Tipo do treino" value={tipoTreino} options={tiposTreino} updateValue={setTipoTreino}/>
                    </div>
                    <div className="col-span-1">
                        <InputDate label="Data de início" value={dataInicio} updateValue={setDataInicio}/>
                    </div>
                </form>

                <h5 className="font-bold text-xl mt-5">Exercícios</h5>
                
                <div className="w-full flex justify-start align-top">
                    <form className="input-container grid grid-cols-4 justify-start align-top items-start gap-3">
                        <Select label="Grupo muscular" value={grupoMuscular} options={gruposMusculares} updateValue={handleGrupoMuscularChange}/>
                        <Select label="Tipo do exercício" value={tipoExercicio} options={tiposExerciciosByGrupo} updateValue={setTipoExercicio}/>
                        <InputNumber label="Séries" value={numeroSeries} updateValue={setNumeroSeries}/>
                        <InputNumber label="Repetições" value={numeroRepeticoes} updateValue={setNumeroRepeticoes}/>                        
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