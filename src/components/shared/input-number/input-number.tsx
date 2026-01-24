import { useMask } from "@react-input/mask";

interface InputNumberProps {
    label?: string;
    value?: string;
    updateValue(value?: unknown, valueObject?: unknown): void;
    valueObject?: unknown;
}

export function InputNumber({ label, value, updateValue, valueObject }: InputNumberProps) {

    const inputRef = useMask({
        mask: "___",
        replacement: { _: /\d/ },
    });

    const handleChange = (newValue: string | undefined) => {
        if (newValue === "" || newValue === undefined) {
            if (valueObject != null) {
                updateValue(newValue, valueObject)
                return
            }

            updateValue(newValue);
            return;
        }

        const num = Number(newValue);

        if (num < 1 || num > 999) return;
        
        if (valueObject != null) {
            updateValue(newValue, valueObject)
            return
        }
        updateValue(newValue);
    }

    return (
        <div>
            {label != null && 
                <label className="input-container-label">{label}</label>
            }
            <input
                ref={inputRef}
                value={value}
                onChange={e => handleChange(e.target.value)}
            />
        </div>
    );
}
