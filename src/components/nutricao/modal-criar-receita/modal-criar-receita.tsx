import { useEffect, useState } from "react";
import { useReceitaMutate } from "../../../hooks/useReceitaMutate";
import type { IReceita } from "../../../interface/IReceita";

import "./modal-criar-receita.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "../../shared/select/select";
import { Input } from "../../shared/input/input";

export interface ExercicioProps {
    id: number,
    grupoMuscular: string,
    tipoExercicio: string,
    numeroSeries: number,
    numeroRepeticoes: number,
    carga?: number
}

interface ModalCreateReceitaProps {
    receita?: IReceita,
    tiposTreino: ITipoTreino[],
    gruposMusculares: IGrupoMuscular[],
    tiposExercicios: ITipoExercicio[],
    closeModal(): void;
}

export function ModalCriarReceita({ closeModal }: ModalCreateReceitaProps) {
    const [nome, setNome] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [modoPreparo, setModoPreparo] = useState("");
    const [tipoRefeicao, setTipoRefeicao] = useState("");
    const [tempoPreparo, setTempoPreparo] = useState(0);
    const { mutate, isSuccess, isPending } = useReceitaMutate();
    
    const submit = () => {
        console.log('chegou submit')
        const receita: IReceita = {
            nome,
            ingredientes,
            modoPreparo,
            tempoPreparo,
        }

        mutate(receita);
    }

    //fica ouvindo uma mudança no array de variáveis (isSuccess) para fechar o modal quando a mutação for bem sucedida
    useEffect(() => {
        if (!isSuccess) return;
        
        closeModal();
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <h2>Cadastre uma nova receita</h2>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal} className="clickable-icon"/>
            </div>
            <div className="modal-body">
                <form className="input-container grid grid-cols-6 gap-4">
                    <div className="col-span-2">
                        <Input label="Nome da receita" value={nome} updateValue={(value) => setNome(value || "")}/>
                    </div>
                    <div className="col-span-2">
                        <Select label="Tipo de refeição" value={tipoRefeicao} updateValue={(value) => setTipoRefeicao(value || "")}/>
                    </div>
                    <div className="col-span-2">
                        <Input label="Tempo de preparo" value={tempoPreparo} updateValue={(value) => setTempoPreparo(Number(value) || 0)}/>
                    </div>
                    <div className="col-span-2">
                        <Input label="Modo de Preparo" value={modoPreparo} updateValue={(value) => setModoPreparo(value || "")}/>
                    </div>
                    <div className="col-span-2">
                        <Input label="Ingredientes" value={ingredientes} updateValue={(value) => setIngredientes(value || "")}/>
                    </div>
                </form>

                <div className="w-full flex justify-start align-top">
                    <form className="input-container grid grid-cols-4 justify-start align-top items-start gap-3">
                        <Select label="Grupo muscular" value={grupoMuscular} options={gruposMusculares} updateValue={handleGrupoMuscularChange}/>
                        <Select label="Tipo de exercício" value={tipoExercicio} options={tiposExerciciosByGrupo} updateValue={setTipoExercicio}/>
                        <InputNumber label="Séries" value={numeroSeries} updateValue={setNumeroSeries}/>
                        <InputNumber label="Repetições" value={numeroRepeticoes} updateValue={setNumeroRepeticoes}/>                        
                    </form>
                </div>
                <div className="w-full flex justify-end items-end align-middle pr-6">
                    <button onClick={handleAddExercicio} className="btn-primary btn-adicionar">Adicionar</button>
                </div>

                <ExerciciosTable data={exercicios} deleteExercicio={handleDeleteExercicio} />
                <button onClick={submit} className="btn-primary">
                    {isPending ? 'Adicionando...' : 'Salvar'}
                </button>
            </div>
        </div>
    )
}
