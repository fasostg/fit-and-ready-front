import { useState } from "react";
import { CardTreino } from "../components/treino/card-treino/card-treino";
import { ModalCriarTreino } from "../components/treino/modal-criar-treino/modal-criar-treino";
import { useGruposMusculares, useTiposExercicios, useTiposTreino, useTreino } from "../hooks/useTreino";
import type { IGrupoMuscular } from "../interface/IGrupoMuscular";
import type { ITipoExercicio } from "../interface/ITipoExercicio";
import type { ITipoTreino } from "../interface/ITipoTreino";
import type { ITreino } from "../interface/ITreino";


export function Treino() {
    const [isModalAddTreinoOpen, setIsModalAddTreinoOpen] = useState(false);

    const treinos: ITreino[] = useTreino().data || [];
    const treinosAtivos: ITreino[] = treinos.filter(treino => treino.dataFim == null);
    const treinosInativos: ITreino[] = treinos.filter(treino => treino.dataFim != null);

    const tiposTreinoData: ITipoTreino[] = useTiposTreino().data || [];
    const gruposMuscularesData: IGrupoMuscular[] = useGruposMusculares().data || [];
    const tiposExerciciosData: ITipoExercicio[] = useTiposExercicios().data || [];
    console.log(gruposMuscularesData)

    const handleOpenModalAddTreino = () => {
        setIsModalAddTreinoOpen(prev => !prev);
    }

    const handleOpenModalDeleteTreino = () => {
        setIsModalAddTreinoOpen(prev => !prev);
    }

    const handleOpenModalUpdateTreino = () => {
        setIsModalAddTreinoOpen(prev => !prev);
    }

    return (
        <div className="flex flex-col justify-center items-center content-center m-20">
            <h1 className="mt-10 mb-2 ml-4 font-bold text-2xl">Olá, XXXXXX</h1>
            <div className="mb-20 flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-end mb-5">
                    <h5 className="font-bold text-xl">Treinos atuais</h5>
                    <button onClick={handleOpenModalAddTreino} className=" btn-primary">Adicionar Treino</button>
                </div>
                <div className="card-grid">
                    { treinosAtivos.map(treino => <CardTreino treino={treino} tiposTreino={tiposTreinoData} gruposMusculares={gruposMuscularesData} tiposExercicios={tiposExerciciosData} />) }
                </div>
            </div>
            <div className="mb-20 flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-end mb-5">
                    <h5 className="font-bold text-xl">Treinos anteriores</h5>
                </div>
                <div className="card-grid">
                    { treinosInativos.map(treino => <CardTreino treino={treino} tiposTreino={tiposTreinoData} gruposMusculares={gruposMuscularesData} tiposExercicios={tiposExerciciosData} />) }
                </div>
            </div>

            {isModalAddTreinoOpen && <ModalCriarTreino tiposTreino={tiposTreinoData} gruposMusculares={gruposMuscularesData} tiposExercicios={tiposExerciciosData} closeModal={handleOpenModalAddTreino}/>}
        </div>
    )
}