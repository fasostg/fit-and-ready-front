interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: unknown): void
}

export function Input({ label, value, updateValue }: InputProps) {
    return (
        <div>
            <label className="input-container-label">{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)}></input>
        </div>
    )
}   