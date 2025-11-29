import logo from '../../assets/logo-text.png';
import "./card-info.css";

interface CardInfoProps {
    tipo: string,
    valor: number,
}

export function CardInfo({ tipo, valor }: CardInfoProps) {
    return (
        <div className="card-info border border-slate-300 shadow-md shadow-slate-200 rounded-lg">
            <img src={logo} className="card-icon"/>
            <p className="card-title">{tipo}</p>
            <p className="card-value">
                {valor} <span className='card-value-unit'>kcal</span>
            </p>
        </div>
    )
}