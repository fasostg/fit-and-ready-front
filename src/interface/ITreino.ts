import type { IExercicio } from "./IExercicio";
import type { ITipoTreino } from "./ITipoTreino";

export interface ITreino {
    id?: number,
    nome: string,
    tipoTreino?: ITipoTreino,
    dataInicio: string,
    dataFim?: string,
    exercicios: IExercicio[]
}