interface TextareaProps {
    label?: string;
    value?: string | number;
    updateValue(value?: string, valueObject?: object): void;
    valueObject?: unknown;
    rows?: number;
}

export function TextArea({ label, value, updateValue, valueObject, rows = 4 }: TextareaProps) {

    const handleChange = (newValue?: string) => {
        const normalizedValue = newValue ?? "";

        if (valueObject != null) {
            updateValue(normalizedValue, valueObject);
            return;
        }

        updateValue(normalizedValue);
    };

    return (
        <div>
            {label && 
                <label className="input-container-label">{label}</label>
            }

            <textarea
                value={value}
                rows={rows}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
}
