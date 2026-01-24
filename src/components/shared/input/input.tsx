interface InputProps {
    label?: string;
    value?: string | number;
    updateValue(value?: string, valueObject?: object): void;
    valueObject?: unknown;
}

export function Input({ label, value, updateValue, valueObject }: InputProps) {

    const handleChange = (newValue: string | undefined) => {
        if (!newValue) newValue = "";
        
        if (valueObject != null) {
            updateValue(newValue, valueObject);
            return;
        }
        updateValue(newValue);
    }

    return (
        <div>
            {label != null &&
                <label className="input-container-label">{label}</label>
            }
            <input value={value} onChange={e => handleChange(e.target.value)}></input>
        </div>
    )
}   