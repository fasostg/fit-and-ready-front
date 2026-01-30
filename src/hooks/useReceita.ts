import axios, { type AxiosPromise } from "axios"
import type { IReceita } from "../interface/IReceita";
import { useQuery } from "@tanstack/react-query";
import type { ITipoRefeicao } from "../interface/ITipoRefeicao";

const API_URL = "http://localhost:8080/nutricao";

const fetchData = async (): AxiosPromise<IReceita[]> => {
    const response = axios.get(API_URL + '/all')
    return response;
}

const fetchTiposRefeicaoData = async (): AxiosPromise<ITipoRefeicao[]> => {
    const response = axios.get(API_URL + '/tipos-refeicao')
    return response;
}

export function useReceita() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['receita-data'],
        retry: 2
    })

    return {
        ...query, 
        data: query.data?.data
    };
}

export function useTiposRefeicao() {
    const query = useQuery({
        queryFn: fetchTiposRefeicaoData,
        queryKey: ['tipos-refeicao-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}