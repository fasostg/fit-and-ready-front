interface InputProps {
    label?: string;
    value?: string | number;
    placeholder?: string;
    type?: string;
    maxLength?: number;
    updateValue(value?: string, valueObject?: object): void;
    valueObject?: unknown;
}

export function Input({ label, value, placeholder, type, maxLength, updateValue, valueObject }: InputProps) {

    const handleChange = (newValue?: string) => {
        const normalizedValue = newValue ?? "";
        
        if (valueObject != null) {
            updateValue(normalizedValue, valueObject);
            return;
        }
        updateValue(normalizedValue);
    }

    return (
        <div className="flex flex-col">
            {label != null &&
                <label className="input-container-label">{label}</label>
            }
            <input
                type={type} 
                value={value} 
                placeholder={placeholder}
                maxLength={maxLength}
                onChange={e => handleChange(e.target.value)}>
            </input>
        </div>
    )
}   