


export function Checkin(props: unknown) {
    console.log(props.checkins)
    return (
        <ul>
            {props.checkins.map((checkin: unknown) => (
                <li key={checkin.date} className="w-36 bg-slate-400 text-white p-4 rounded-md mt-5">
                    {checkin.treino}
                </li>
            ))}
        </ul>
    )
}