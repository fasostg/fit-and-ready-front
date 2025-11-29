import axios, { type AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ITreino } from "../interface/ITreino";

const API_URL = "http://localhost:8080/treino";

const postData = async (data: ITreino): AxiosPromise<unknown> => {
    const response = axios.post(API_URL, data)
    return response;
}

export function useTreinoMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            //invalida a os dados buscados com chave receita-data para forçar um novo fetch
            queryClient.invalidateQueries({ queryKey: ['treino-data'] }); 
        }
    })

    return mutate;
}