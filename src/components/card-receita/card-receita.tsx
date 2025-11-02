import './card-receita.css'

interface CardReceitaProps {
    nome: string,
    tempoPreparo: number,
    calorias: number,
    proteinas: number,
    carboidratos: number,
    gorduras: number,
}

export function CardReceita({ nome, tempoPreparo, calorias, proteinas, carboidratos, gorduras } : CardReceitaProps) {
    return (
        <div className="card-receita">
            <img/>
            <h2>{nome}</h2>
            <p>Tempo de preparo: {tempoPreparo}</p>
            <p>Calorias: {calorias}</p>
            <p>Proteinas: {proteinas}</p>
            <p>Carboidratos: {carboidratos}</p>
            <p>Gorduras: {gorduras}</p>
        </div>
    )
}