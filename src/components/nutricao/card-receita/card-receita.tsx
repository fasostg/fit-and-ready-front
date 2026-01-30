import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { ButtonCircle } from "../../shared/button-circle/button-circle"
import "./card-receita.css"

interface CardReceitaProps {
    nome: string,
    tempoPreparo: number,
    calorias: number,
    proteinas: number,
    carboidratos: number,
    gorduras: number,
}

export function CardReceita({ nome, tempoPreparo, calorias, proteinas, carboidratos, gorduras } : CardReceitaProps) {
    
    const handleDeleteTreino = () => {
        // setIsModalDeleteOpen(prev => !prev);
    }

    const handleEditTreino = () => {
        // setIsModalEditOpen(prev => !prev);
    }
    
    return (
        <div className="card-receita">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="card-buttons">
                        <ButtonCircle icon={faPencil} size={"sm"} callback={handleEditTreino}/>
                        <ButtonCircle icon={faTrash} size={"sm"} callback={handleDeleteTreino}/>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 p-4">
                        Torta de liquidificador com frango
                    </h3>

                    <div className="flex mt-2">
                        <span className="ml-3 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
                        Jantar
                        </span>
                        <span className="ml-3 px-3 py-1 text-sm bg-gray-100 rounded-full">
                        4 porções
                        </span>
                        <span className="ml-3 px-3 py-1 text-sm bg-gray-100 rounded-full">
                        60 min
                        </span>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
                <div className="tag">
                    <p>Calorias</p>
                    <span className="font-semibold text-xl">{calorias}g</span>
                </div>
                <div className="tag">
                    <p>Proteinas</p>
                    <span className="font-semibold text-xl">{proteinas}g</span>
                </div>
                <div className="tag">
                    <p>Carboidratos</p>
                    <span className="font-semibold text-xl">{carboidratos}g</span>
                </div>
                <div className="tag">
                    <p>Gorduras</p>
                    <span className="font-semibold text-xl">{gorduras}g</span>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-2">
                <button className="btn-primary text-sm">
                    Ingredientes
                </button>
                <button className="btn-primary text-sm">
                    Modo de preparo
                </button>
            </div>
        </div>
    )
}