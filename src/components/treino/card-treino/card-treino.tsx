import logo from '../../../assets/logo-text.png';
import "./card-treino.css";
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ButtonCircle } from '../../shared/button-circle/button-circle';
import type { ITreino } from '../../../interface/ITreino';
import { useState } from 'react';
import { ModalDeletarTreino } from '../modal-deletar-treino/modal-deletar-treino';
import { ModalCriarTreino } from '../modal-criar-treino/modal-criar-treino';
import type { ITipoTreino } from '../../../interface/ITipoTreino';
import type { IGrupoMuscular } from '../../../interface/IGrupoMuscular';
import type { ITipoExercicio } from '../../../interface/ITipoExercicio';

interface CardTreinoProps {
    treino: ITreino,
    tiposTreino: ITipoTreino[],
    gruposMusculares: IGrupoMuscular[],
    tiposExercicios: ITipoExercicio[],
}

export function CardTreino({ treino, tiposTreino, gruposMusculares, tiposExercicios }: CardTreinoProps) {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const handleDeleteTreino = () => {
        setIsModalDeleteOpen(prev => !prev);
    }

    const handleEditTreino = () => {
        setIsModalEditOpen(prev => !prev);
    }

    return (
        <>
            <div className="card-info border border-slate-300 shadow-md shadow-slate-200 rounded-lg">
                {treino?.dataFim == null &&
                    <div className="card-buttons">
                        <ButtonCircle icon={faPencil} size={"sm"} callback={handleEditTreino}/>
                        <ButtonCircle icon={faTrash} size={"sm"} callback={handleDeleteTreino}/>
                    </div>
                }
                <img src={logo} className="card-icon"/>
                <p className="card-title">{treino?.nome}</p>
                <p className="card-tag">
                    {treino?.tipoTreino?.nome} 
                </p>
                <div className="card-sub-tag-box">
                    {treino?.exercicios?.map(exercicio => 
                        <span className='card-sub-tag'>{exercicio?.tipoExercicio?.nome}</span>
                    )}                
                </div>
            </div>

            {isModalEditOpen && <ModalCriarTreino treino={treino} tiposTreino={tiposTreino} gruposMusculares={gruposMusculares} tiposExercicios={tiposExercicios} closeModal={handleEditTreino}/>}
            {isModalDeleteOpen && <ModalDeletarTreino idTreino={treino.id} closeModal={handleDeleteTreino}/>}
        </>
    )
}