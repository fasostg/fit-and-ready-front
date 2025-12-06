import { useMask } from "@react-input/mask";

interface InputNumberProps {
    label: string;
    value?: string;
    updateValue(value: string | undefined): void;
}

export function InputNumber({ label, value, updateValue }: InputNumberProps) {

    const inputRef = useMask({
        mask: "__",
        replacement: { _: /\d/ },
    });

    const handleChange = (newValue: string | undefined) => {
        if (newValue === "" || newValue === undefined) {
            updateValue(newValue);
            return;
        }

        const num = Number(newValue);

        if (num < 1 || num > 99) return;

        updateValue(newValue);
    }

    return (
        <div>
            <label className="input-container-label">{label}</label>
            <input
                ref={inputRef}
                value={value}
                onChange={e => handleChange(e.target.value)}
            />
        </div>
    );
}
