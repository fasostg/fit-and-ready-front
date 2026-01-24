import type { ExercicioProps } from "../components/treino/modal-criar-treino/modal-criar-treino";
import type { IExercicio } from "../interface/IExercicio";
import type { IGrupoMuscular } from "../interface/IGrupoMuscular";
import type { ITipoExercicio } from "../interface/ITipoExercicio";

export function montarExercicio(exercicio: ExercicioProps, tiposExercicios: ITipoExercicio[], gruposMusculares: IGrupoMuscular[]): IExercicio {
    const idTipoExercicio: number | undefined = tiposExercicios.find(tipo => tipo.nome === exercicio.tipoExercicio)?.id
    const idGrupoMuscular: number | undefined = gruposMusculares.find(grupo => grupo.nome === exercicio.grupoMuscular)?.id

    if (idTipoExercicio === undefined || idGrupoMuscular === undefined) {
        throw new Error(`Exercício inválido: ${exercicio.tipoExercicio}`);
    }

    return {
        tipoExercicio: {
            id: idTipoExercicio,
            nome: exercicio.tipoExercicio,
            grupoMuscular: {
                id: idGrupoMuscular,
                nome: exercicio.grupoMuscular
            }
        },
        numeroSeries: exercicio.numeroSeries,
        numeroRepeticoes: exercicio.numeroRepeticoes,
    }
}

export function montarExercicioJaExistente(exercicio: ExercicioProps): IExercicio {
    return {
        tipoExercicio: {
            id: 1,
            nome: exercicio.tipoExercicio,
            grupoMuscular: {
                id: 1,
                nome: exercicio.grupoMuscular
            }
        },
        numeroSeries: exercicio.numeroSeries,
        numeroRepeticoes: exercicio.numeroRepeticoes,
        carga: exercicio.carga
    }
}

export function recuperarExercicios(exercicios?: IExercicio[]): ExercicioProps[] {
    if (!exercicios) return [];

    return exercicios.map((exercicio, index) => ({
        id: index + 1,
        grupoMuscular: exercicio.tipoExercicio.grupoMuscular.nome,
        tipoExercicio: exercicio.tipoExercicio.nome,
        numeroSeries: exercicio.numeroSeries,
        numeroRepeticoes: exercicio.numeroRepeticoes
    }));
}