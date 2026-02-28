import { type AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICheckin } from "../interfaces/ICheckin";
import { api } from "./auth";

const API_URL = "http://localhost:8080/checkin";

const postData = async (data: ICheckin): AxiosPromise<unknown> => {
    const response = api.post(API_URL, data)
    return response;
}

export function useCheckinMutate() {
    console.log("useCheckinMutate chamado");
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            //invalida os dados buscados com chave checkin-data para forçar um novo fetch
            queryClient.invalidateQueries({ queryKey: ['checkin-data'] }); 
        }
    })
    
    console.log("useCheckinMutate mutate", mutate);
    return mutate;
}