import type { IIngrediente } from "./IIngrediente";
import type { IUnidadeMedida } from "./IUnidadeMedida";

export interface IIngredienteReceita {
    id: number,
    ingrediente?: IIngrediente,
    quantidade?: number,
    unidadeMedida?: IUnidadeMedida
}