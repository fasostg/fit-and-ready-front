import { useState } from "react";
import { CardTreino } from "../../components/treino/card-treino/card-treino";
import { ModalCriarTreino } from "../../components/treino/modal-criar-treino/modal-criar-treino";
import { useGruposMusculares, useTiposExercicios, useTiposTreino, useTreino } from "../../hooks/useTreino";
import type { IGrupoMuscular } from "../../interfaces/IGrupoMuscular";
import type { ITipoExercicio } from "../../interfaces/ITipoExercicio";
import type { ITipoTreino } from "../../interfaces/ITipoTreino";
import type { ITreino } from "../../interfaces/ITreino";


export function Treino() {
    const [isModalAddTreinoOpen, setIsModalAddTreinoOpen] = useState(false);

    const treinos: ITreino[] = useTreino().data || [];
    const treinosAtivos: ITreino[] = treinos.filter(treino => treino.dataFim == null);
    const treinosInativos: ITreino[] = treinos.filter(treino => treino.dataFim != null);

    const tiposTreinoData: ITipoTreino[] = useTiposTreino().data || [];
    const gruposMuscularesData: IGrupoMuscular[] = useGruposMusculares().data || [];
    const tiposExerciciosData: ITipoExercicio[] = useTiposExercicios().data || [];

    const handleOpenModalAddTreino = () => {
        setIsModalAddTreinoOpen(prev => !prev);
    }

    return (
        <div className="flex flex-col justify-center items-center content-center m-20 ml-[15%] mr-[15%]">
            <div className="w-full flex flex-col justify-start items-start mb-10">
                <h2 className="font-bold text-2xl">Gerencie seus treinos</h2>
                <p className="font-normal text-xl mb-2">Crie, atualize e remova treinos atuais</p>
            </div>
            <div className="mb-20 flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-end mb-5">
                    <h5 className="font-bold text-xl">Treinos atuais</h5>
                    <button onClick={handleOpenModalAddTreino} className=" btn-primary">Adicionar Treino</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    { treinosAtivos.map(treino => <CardTreino treino={treino} tiposTreino={tiposTreinoData} gruposMusculares={gruposMuscularesData} tiposExercicios={tiposExerciciosData} />) }
                </div>
            </div>
            {/* //TODO: criar linha de separação */}
            <hr className="my-4 border-2 border-gray-500"/>
            <div className="mb-20 flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-end mb-5">
                    <h5 className="font-bold text-xl">Treinos anteriores</h5>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    { treinosInativos.map(treino => <CardTreino treino={treino} tiposTreino={tiposTreinoData} gruposMusculares={gruposMuscularesData} tiposExercicios={tiposExerciciosData} />) }
                </div>
            </div>

            {isModalAddTreinoOpen && <ModalCriarTreino tiposTreino={tiposTreinoData} gruposMusculares={gruposMuscularesData} tiposExercicios={tiposExerciciosData} closeModal={handleOpenModalAddTreino}/>}
        </div>
    )
}