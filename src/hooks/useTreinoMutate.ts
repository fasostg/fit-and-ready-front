import { type AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ITreino } from "../interfaces/ITreino";
import { api } from "./auth";

const API_URL = "http://localhost:8080/treino";

const postData = async (data: ITreino): AxiosPromise<unknown> => {
    const response = api.post(API_URL, data)
    return response;
}

const deleteData = async (idTreino?: number): AxiosPromise<unknown> => {
    const response = api.delete(API_URL + `/${idTreino}`)
    return response;
}

const patchData = async (data: ITreino): AxiosPromise<unknown> => {
    const response = api.patch(API_URL, data)
    return response;
}

export function useTreinoMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['treino-data'] }); 
        }
    })

    return mutate;
}

export function useTreinoDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['treino-data'] }); 
        }
    })

    return mutate;
}

export function useTreinoUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: patchData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['treino-data'] }); 
        }
    })

    return mutate;
}