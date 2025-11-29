import type { ITipoExercicio } from "./ITipoExercicio";

export interface IExercicio {
    id?: number,
    tipoExercicio: ITipoExercicio,
    numeroSeries: number,
    numeroRepeticoes: number
}