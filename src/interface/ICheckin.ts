import type { IExercicio } from "./IExercicio";

export interface ICheckin {
    id?: number,
    idTreino?: number,
    nomeTreino?: string,
    tempoTreino: number,
    dataTreino?: string,
    calorias?: number,
    peso?: number,
    idIntensidade?: number,
    exercicios?: IExercicio[]
}