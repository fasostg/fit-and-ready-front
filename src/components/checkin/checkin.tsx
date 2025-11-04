import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface CheckinProps {
    id: number;
    treino: string;
    data: string;
    peso: number;
}

export function Checkin({ checkins }: { checkins: CheckinProps[] }) {
    console.log(checkins)
    return (
        <ul className="w-screen flex flex-col items-center">
            {checkins.map((checkin: CheckinProps) => (
                <li key={checkin.data} className="w-2/3 flex text-stone-800 shadow-md shadow-stone-300 border border-stone-400 rounded-md mt-5 p-4">
                    <div className="w-1/20 flex items-center m-2 mr-5">
                        <FontAwesomeIcon icon={faDumbbell} size="2xl"/>
                    </div>
                    <div className="w-4/5 flex flex-col justify-start">
                        <h4 className="font-bold text-xl">{checkin.treino}</h4>
                        <p className="text-lg text-blue-700">120 min / 500 calorias</p>
                    </div>
                    <div className="w-3/20 flex flex-col items-end">
                        <h5 className="font-bold text-">Quarta, 15/05</h5>
                    </div>
                </li>
            ))}
        </ul>
    )
}