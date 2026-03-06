import { useEffect, useState } from "react";
import { useReceitaMutate, useReceitaUpdate } from "../../../hooks/useReceitaMutate";
import type { IReceita } from "../../../interfaces/IReceita";

import "./modal-criar-receita.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "../../shared/select/select";
import { Input } from "../../shared/input/input";
import type { ITipoRefeicao } from "../../../interfaces/ITipoRefeicao";
import type { IIngrediente } from "../../../interfaces/IIngrediente";
import { TextArea } from "../../shared/text-area/text-area";
import { InputNumber } from "../../shared/input-number/input-number";
import { montarIngredientesReceita, recuperarIngredientesReceita } from "../../../utils/ingredientes-mapper";
import { IngredientesTable } from "../ingredientes-table/ingredientes-table";

export interface IngredienteReceitaProps {
    id: number,
    ingrediente: string,
    quantidade?: number
}

interface ModalCreateReceitaProps {
    receita?: IReceita,
    tiposRefeicao: ITipoRefeicao[],
    ingredientes: IIngrediente[],
    closeModal(): void;
}

export function ModalCriarReceita({ receita, tiposRefeicao, ingredientes, closeModal }: ModalCreateReceitaProps) {
    const [isEdicao] = useState(!!receita);
    const [nome, setNome] = useState(receita?.nome || "");
    const [modoPreparo, setModoPreparo] = useState(receita?.modoPreparo || "");
    const [tempoPreparo, setTempoPreparo] = useState(receita?.tempoPreparo || "");
    const [tipoRefeicao, setTipoRefeicao] = useState(receita?.tipoRefeicao?.nome || tiposRefeicao[0]?.nome || "");

    const [ingredientesReceita, setIngredientesReceita] = 
        useState<IngredienteReceitaProps[]>(recuperarIngredientesReceita(receita?.ingredientesReceita));
    const [ingredienteSelecionado, setIngredienteSelecionado] = useState(ingredientes[0]?.nome || "");
    const [quantidade, setQuantidade] = useState("");
    const { mutate, isSuccess, isPending } = useReceitaMutate();
    const { mutate: mutateUpdate, isSuccess: isSuccessUpdate, isPending: isPendingUpdate } = useReceitaUpdate();

    const handleAddIngrediente = () => {
        if (ingredientesReceita.length >= 15) {
            alert("Número máximo de ingredientes atingido (15)");
            return;
        }
        
        if (!ingredienteSelecionado) {
            alert("Por favor, selecione corretamente o ingrediente e a quantidade");
            return;
        }

        if (ingredientesReceita.find(i => i.ingrediente === ingredienteSelecionado)) {
            alert("Ingrediente já adicionado");
            return;
        }

        if (!quantidade) {
            alert("Por favor, insira corretamente o número de séries e repetições");
            return;
        }

        const id = ingredientesReceita.length + 1;

        const novoIngrediente: IngredienteReceitaProps = {
            id: id,
            ingrediente: ingredienteSelecionado,
            quantidade: Number(quantidade) || 0
        };

        setIngredientesReceita([...ingredientesReceita, novoIngrediente]);
    }

    const handleDeleteExercicio = (id: string) => {
        const idNumber = Number.parseInt(id) + 1;

        const ingredientesAtualizados = ingredientesReceita.filter(ingrediente => ingrediente.id !== idNumber);
        for (let i=0; i < ingredientesAtualizados.length; i++) {
            ingredientesAtualizados[i].id = i + 1;
        }

        setIngredientesReceita(ingredientesAtualizados)
    }
    
    const submit = () => {
        if (!nome?.trim()) {
            alert("Por favor, insira um nome para a receita");
            return;
        }

        if (ingredientesReceita.length === 0) {
            alert("Por favor, adicione pelo menos um ingrediente");
            return;
        }

        const idTipoRefeicao: number | undefined = tiposRefeicao.find(tipo => tipo.nome === tipoRefeicao)?.id
        if (idTipoRefeicao == null) {
            alert("Tipo de refeição inválida");
            return;
        }

        try {
            const ingredientesReceitaMapeados = ingredientesReceita.map(
                ingredienteReceita => montarIngredientesReceita(ingredienteReceita, ingredientes));

            const receitaData: IReceita = {
                id: receita?.id,
                nome: nome,
                ingredientesReceita: ingredientesReceitaMapeados,
                modoPreparo: modoPreparo,
                tempoPreparo: Number(tempoPreparo) || 0,
                tipoRefeicao: {
                    id: idTipoRefeicao,
                    nome: tipoRefeicao
                }
            }

            if (isEdicao) {
                mutateUpdate(receitaData)
                return;
            }

            mutate(receitaData);
        } catch (error) {
            alert("Erro ao processar ingredientes: " + (error instanceof Error ? error.message : "Desconhecido"));
        }
        
    }

    //fica ouvindo uma mudança no array de variáveis (isSuccess) para fechar o modal quando a mutação for bem sucedida
    useEffect(() => {
        if (!isSuccess) return;
        
        closeModal();
    }, [isSuccess])

    useEffect(() => {
        if (!isSuccessUpdate) return;
        
        closeModal();
    }, [isSuccessUpdate])

    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <h2>Cadastre uma nova receita</h2>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal} className="clickable-icon"/>
            </div>
            <div className="modal-body">
                <form className="input-container grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <Input label="Nome da receita" value={nome} updateValue={(value) => setNome(value || "")}/>
                    </div>
                    <div className="col-span-3">
                        <Select label="Tipo de refeição" value={tipoRefeicao} options={tiposRefeicao} updateValue={(value) => setTipoRefeicao(String(value) || "")}/>
                    </div>
                    <div className="col-span-3">
                        <InputNumber label="Tempo de preparo" value={String(tempoPreparo)} updateValue={(value) => setTempoPreparo(String(value) || "")}/>
                    </div>
                    <div className="col-span-12">
                        <TextArea label="Modo de Preparo" value={modoPreparo} updateValue={(value) => setModoPreparo(value || "")}/>
                    </div>
                </form>

                <div className="w-full flex items-center mt-10">
                    <form className="input-container grid grid-cols-3 justify-start align-top items-start gap-3">
                        <Select label="Ingrediente" value={ingredienteSelecionado} options={ingredientes} updateValue={setIngredienteSelecionado}/>
                        <InputNumber label="Quantidade (g)" value={quantidade} updateValue={setQuantidade}/>
                    </form>
                    <button onClick={handleAddIngrediente} className="btn-primary btn-adicionar">Adicionar</button>

                </div>
                <div className="w-full flex justify-end items-end align-middle pr-6">
                </div>

                <IngredientesTable data={ingredientesReceita} deleteIngrediente={handleDeleteExercicio} />
            </div>
            <div className="modal-footer gap-2">
                <button onClick={closeModal} className="btn-secondary">Cancelar</button>
                <button onClick={submit} className="btn-primary">
                    {isEdicao ? (isPendingUpdate ? 'Atualizando...' : 'Confirmar') : (isPending ? 'Adicionando...' : 'Confirmar')}
                </button>
            </div>
        </div>
    )
}
