import { type AxiosPromise } from "axios"
import { useQuery } from "@tanstack/react-query";
import type { IGrupoMuscular } from "../interfaces/IGrupoMuscular";
import type { ITipoExercicio } from "../interfaces/ITipoExercicio";
import type { ITipoTreino } from "../interfaces/ITipoTreino";
import type { ITreino } from "../interfaces/ITreino";
import { api } from "./auth";

const API_URL = "http://localhost:8080/treino";

const fetchData = async (): AxiosPromise<ITreino[]> => {
    const response = api.get(API_URL + '/all')
    return response;
}

const fetchTiposTreinoData = async (): AxiosPromise<ITipoTreino[]> => {
    const response = api.get(API_URL + '/tipos-treino')
    return response;
}

const fetchGruposMuscularesData = async (): AxiosPromise<IGrupoMuscular[]> => {
    const response = api.get(API_URL + '/grupos-musculares')
    return response;
}

const fetchTiposExerciciosData = async (): AxiosPromise<ITipoExercicio[]> => {
    const response = api.get(API_URL + '/tipos-exercicios')
    return response;
}

export function useTreino() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['treino-data'],
        retry: 2
    })

    return {
        ...query, 
        data: query.data?.data
    };
}

export function useTiposTreino() {
    const query = useQuery({
        queryFn: fetchTiposTreinoData,
        queryKey: ['tipos-treino-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}

export function useGruposMusculares() {
    const query = useQuery({
        queryFn: fetchGruposMuscularesData,
        queryKey: ['grupos-musculares-data'],
        retry: 2
    })
    
    return {
        ...query,
        data: query.data?.data
    }
}

export function useTiposExercicios() {
    const query = useQuery({
        queryFn: fetchTiposExerciciosData,
        queryKey: ['tipos-exercicios-data'],
        retry: 2
    })
    
    return {
        ...query,
        data: query.data?.data
    }
}