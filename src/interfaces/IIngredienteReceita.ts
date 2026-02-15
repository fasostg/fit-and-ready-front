import type { IIngrediente } from "./IIngrediente";

export interface IIngredienteReceita {
    id: number,
    ingrediente?: IIngrediente,
    quantidade?: number,
}