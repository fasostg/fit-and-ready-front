import axios, { type AxiosPromise } from "axios"
import type { IReceita } from "../interface/IReceita";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080/nutricao";

const postData = async (data: IReceita): AxiosPromise<unknown> => {
    const response = axios.post(API_URL, data)
    return response;
}

export function useReceitaMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            //invalida a os dados buscados com chave receita-data para forçar um novo fetch
            queryClient.invalidateQueries({ queryKey: ['receita-data'] }); 
        }
    })

    return mutate;
}