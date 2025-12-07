import { useMask } from "@react-input/mask";

interface InputDateProps {
    label?: string;
    value?: string;
    updateValue(value: string): void;
}

export function InputDate({ label, value, updateValue }: InputDateProps) {

    const inputRef = useMask({
        mask: "__/__/____",
        replacement: { _: /\d/ },
    });

    return (
        <div>
            <label className="input-container-label">{label}</label>
            <input
                ref={inputRef}
                defaultValue={value}
                onChange={(e) => updateValue(e.target.value)}
                placeholder="DD/MM/YYYY"
            />
        </div>
    );
}
