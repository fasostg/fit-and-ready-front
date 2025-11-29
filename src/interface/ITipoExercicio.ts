import type { IGrupoMuscular } from "./IGrupoMuscular";

export interface ITipoExercicio {
    id?: number,
    nome: string,
    grupoMuscular: IGrupoMuscular
}