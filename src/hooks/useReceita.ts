import axios, { type AxiosPromise } from "axios"
import type { IReceita } from "../interface/IReceita";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080/nutricao";

const fetchData = async (): AxiosPromise<IReceita[]> => {
    const response = axios.get(API_URL + '/all')
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