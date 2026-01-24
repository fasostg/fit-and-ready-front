import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../../assets/logo-text.png';
import "./card-info.css";
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface CardInfoProps {
    tipo: string,
    valor: number,
    icone: IconProp,
    unidade: string,
}

export function CardInfo({ tipo, valor, icone, unidade }: CardInfoProps) {
    return (
        <div className="card-info border border-slate-300 shadow-md shadow-slate-200 rounded-lg">
            <FontAwesomeIcon icon={icone} size="2xl" style={{color: "#0008ff"}} className='card-icon' />
            <p className="card-title">{tipo}</p>
            <p className="card-value">
                {valor} <span className='card-value-unit'>{unidade}</span>
            </p>
        </div>
    )
}