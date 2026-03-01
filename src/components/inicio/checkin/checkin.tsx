import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ICheckin } from "../../../interfaces/ICheckin";

export interface CheckinProps {
    id: number;
    treino: string;
    data: string;
    peso: number;
}

export function Checkin({ checkins }: { checkins: ICheckin[] }) {
    const existeCheckins: boolean = checkins?.length > 0
    const getDataFormatada = (dataString?: string): string => {
        if (!dataString) return "-"

        const [ano, mes, dia] = dataString.split("-").map(Number);

        const data = new Date(ano, mes - 1, dia);

        const diaMes = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        const nomeDiaSemana = data.toLocaleDateString('pt-BR', { weekday: 'long' });
        return diaMes + ", " + nomeDiaSemana;
    }

    return (
        <div className="w-screen flex flex-col items-center">
            {!existeCheckins && 
                <p className="flex w-2/3 items-start mt-4">
                    Não há check-ins recentes
                </p>
            }
            {existeCheckins && 
                <ul className="w-screen flex flex-col items-center">
                    {checkins.map((checkin: ICheckin) => (
                        <li key={checkin.id} className="w-2/3 flex text-stone-800 shadow-md shadow-stone-300 border border-stone-400 rounded-md mt-5 p-4">
                            <div className="w-1/20 flex items-center m-2 mr-5">
                                <FontAwesomeIcon icon={faDumbbell} size="2xl"/>
                            </div>
                            <div className="w-4/5 flex flex-col justify-start">
                                <h4 className="font-bold text-xl">{checkin.nomeTreino}</h4>
                                <p className="text-lg text-blue-700">{checkin.tempoTreino} min / {checkin.calorias} kcal</p>
                            </div>
                            <div className="w-3/20 flex flex-col items-end">
                                <h5 className="font-bold text-sm">{getDataFormatada(checkin.dataTreino)}</h5>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}