import type { ITipoRefeicao } from "../../../interfaces/ITipoRefeicao";
import type { ITipoTreino } from "../../../interfaces/ITipoTreino";
import type { ITreino } from "../../../interfaces/ITreino";
import type { TipoExercicioOption } from "../../../models/TipoExercicioOption";

interface SelectProps {
  label?: string;
  value?: string | number;
  options?: { id: string | number; nome: string }[] | ITreino[] | ITipoTreino[] | TipoExercicioOption[] | ITipoRefeicao[];
  updateValue(value: unknown): void;
  classname?: string;
}

export function Select({ label, value, options, updateValue, classname }: SelectProps) {
  return (
    <div className="w-auto">
      <label className="input-container-label">{label}</label>
      <div>
        <select value={value} onChange={(e) => updateValue(e.target.value)} className={classname + " cursor-pointer"}>
          {options?.map((opt) => (
            <option key={opt.id} value={opt.nome}>
              {opt.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
