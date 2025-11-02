import { useEffect, useState } from "react";
import { useReceitaMutate } from "../../hooks/useReceitaMutate";
import type { IReceita } from "../../interface/IReceita";

import "./modal-create-receita.css"

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: unknown): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)}></input>
        </>
    )
}

interface ModalCreateReceitaProps {
    closeModal(): void
}

export function ModalCreateReceita({ closeModal }: ModalCreateReceitaProps) {
    const [nome, setNome] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [modoPreparo, setModoPreparo] = useState("");
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
            </div>
            <div className="modal-body">
                <form className="input-container">
                    <Input label="Nome" value={nome} updateValue={setNome}/>
                    <Input label="Ingredientes" value={ingredientes} updateValue={setIngredientes}/>
                    <Input label="Modo de Preparo" value={modoPreparo} updateValue={setModoPreparo}/>
                    <Input label="Tempo de Preparo" value={tempoPreparo} updateValue={setTempoPreparo}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isPending ? 'Adicionando...' : 'Salvar'}
                </button>
            </div>
        </div>
    )
}
