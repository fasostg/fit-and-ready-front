import axios, { type AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICheckin } from "../interface/ICheckin";

const API_URL = "http://localhost:8080/checkin";

const postData = async (data: ICheckin): AxiosPromise<unknown> => {
    const response = axios.post(API_URL, data)
    return response;
}

export function useCheckinMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            //invalida os dados buscados com chave checkin-data para forçar um novo fetch
            queryClient.invalidateQueries({ queryKey: ['checkin-data'] }); 
        }
    })

    return mutate;
}