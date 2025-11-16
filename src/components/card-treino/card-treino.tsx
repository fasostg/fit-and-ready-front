import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo-text.png';
import "./card-treino.css";
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ButtonCircle } from '../button-circle/button-circle';

interface CardInfoProps {
    tipo: string,
    valor: number,
    isAtivo: boolean
}

export function CardTreino({ tipo, valor, isAtivo }: CardInfoProps) {
    const handleDeleteTreino = () => {
        console.log("DELETE")
    }

    const handleEditTreino = () => {
        console.log("EDIT")
    }

    return (
        <div className="card-info border border-slate-300 shadow-md shadow-slate-200 rounded-lg">
            {isAtivo &&
                <div className="card-buttons">
                    <ButtonCircle icon={faPencil} size={"sm"} callback={handleEditTreino}/>
                    <ButtonCircle icon={faTrash} size={"sm"} callback={handleDeleteTreino}/>
                </div>
            }
            <img src={logo} className="card-icon"/>
            <p className="card-title">{tipo}</p>
            <p className="card-tag">
                {valor} 
            </p>
            <div className="card-sub-tag-box">
                <span className='card-sub-tag'>kcal</span>
                <span className='card-sub-tag'>kcal</span>
                <span className='card-sub-tag'>kcal</span>
                <span className='card-sub-tag'>kcal</span>
                <span className='card-sub-tag'>kcal</span>
                <span className='card-sub-tag'>kcal</span>
                <span className='card-sub-tag'>kcal</span>
            </div>
        </div>
    )
}