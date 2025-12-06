import type { ITreino } from "../../../interface/ITreino";

interface SelectProps {
  label?: string;
  value?: string | number;
  options?: { id: string | number; nome: string }[] | ITreino[];
  updateValue(value: string | number |  undefined): void;
}

export function Select({ label, value, options, updateValue }: SelectProps) {
  return (
    <div className="w-auto">
      <label className="input-container-label">{label}</label>
      <select value={value} onChange={(e) => updateValue(e.target.value)}>
        {options?.map((opt) => (
          <option key={opt.id} value={opt.nome}>
            {opt.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
