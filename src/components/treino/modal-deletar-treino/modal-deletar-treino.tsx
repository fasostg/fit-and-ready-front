import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./modal-criar-treino.css";
import type { ITreino } from "../../../interface/ITreino";
import type { IExercicio } from "../../../interface/IExercicio";
import { useTreinoMutate } from "../../../hooks/useTreinoMutate";

interface ModalDeletarTreinoProps {
    idTreino: number,
    closeModal(): void;
}

export function ModalCriarTreino({ idTreino, closeModal }: ModalDeletarTreinoProps) {
    const {mutate, isSuccess, isPending} = useTreinoMutate()
    
    const submit = () => {
        try {
            mutate(treino)
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
                
            </div>
            <div className="modal-footer gap-2">
                <button onClick={closeModal} className="btn-secondary">Cancelar</button>
                <button onClick={submit} className="btn-primary">Confirmar</button>
            </div>
        </div>
    )
}