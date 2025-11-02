export interface IReceita {
    id?: number,
    nome: string,
    ingredientes: string,
    modoPreparo: string,
    tempoPreparo: number,
    calorias?: number,
    proteinas?: number,
    carboidratos?: number,
    gorduras?: number,
}