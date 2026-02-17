import logo from '../../../assets/logo-text.png';
import { Link, NavLink } from "react-router-dom";
import "./header.css";

export function Header() {
    return (
        <div className="h-20 flex justify-center items-center bg-slate-100 border-b border-slate-300 shadow-md shadow-slate-200 sticky top-0">
            <div className="w-2/5 flex justify-center items-center ml-16">
                <Link to="/inicio">
                    <img src={logo} className='w-25 mr-4'></img>
                </Link>
            </div>

            <div className="w-3/5 flex justify-end items-end">
                <ul className="header-list flex justify-between items-center mr-15">
                    <li className="header-list-item">
                        <NavLink to="/inicio">Início</NavLink>
                    </li>
                    <li className="header-list-item">
                        <NavLink to="/treino">Treino</NavLink>
                    </li>
                    <li className="header-list-item">
                        <NavLink to="/historico">Histórico</NavLink>
                    </li>
                    <li className="header-list-item">
                        <NavLink to="/nutricao">Nutrição</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}