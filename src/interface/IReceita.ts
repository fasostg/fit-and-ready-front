import type { IIngredienteReceita } from "./IIngredienteReceita";
import type { ITipoRefeicao } from "./ITipoRefeicao";

export interface IReceita {
    id?: number,
    nome: string,
    ingredientesReceita: IIngredienteReceita[],
    modoPreparo: string,
    tempoPreparo: number,
    tipoRefeicao?: ITipoRefeicao,
    calorias?: number,
    proteinas?: number,
    carboidratos?: number,
    gorduras?: number,
}