import type { IngredienteReceitaProps } from "../components/nutricao/modal-criar-receita/modal-criar-receita";
import type { IIngrediente } from "../interfaces/IIngrediente";
import type { IIngredienteReceita } from "../interfaces/IIngredienteReceita";

export function montarIngredientesReceita(
    ingredienteReceita: IngredienteReceitaProps, 
    ingredientes: IIngrediente[]
): IIngredienteReceita {

    const idIngrediente: number | undefined = 
        ingredientes.find(ingrediente => ingrediente.nome === ingredienteReceita.ingrediente)?.id

    if (idIngrediente == null) {
        throw new Error(`Ingrediente inválido: ${ingredienteReceita.ingrediente}`);
    }

    return {
        id: ingredienteReceita.id,
        ingrediente: {
            id: idIngrediente,
            nome: ingredienteReceita.ingrediente
        },
        quantidade: ingredienteReceita.quantidade
    }
}

export function montarIngredienteJaExistente(
    ingredienteReceita: IngredienteReceitaProps
): IIngredienteReceita {
    return {
        id: ingredienteReceita.id,
        ingrediente: {
            id: 1,
            nome: ingredienteReceita.ingrediente
        },
        quantidade: ingredienteReceita.quantidade
    }
}

export function recuperarIngredientesReceita(
    ingredientesReceita?: IIngredienteReceita[]
): IngredienteReceitaProps[] {
    if (!ingredientesReceita) return [];

    return ingredientesReceita.map((ingredienteReceita, index) => ({
        id: index + 1,
        ingrediente: ingredienteReceita.ingrediente?.nome ?? "",
        quantidade: ingredienteReceita.quantidade 
    }));
}