import axios, { type AxiosPromise } from "axios"
import { useQuery } from "@tanstack/react-query";
import type { ICheckin } from "../interface/ICheckin";

const API_URL = "http://localhost:8080/checkin";

const fetchData = async (): AxiosPromise<ICheckin[]> => {
    const response = axios.get(API_URL + '/all')
    return response;
}

export function useCheckin() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['checkin-data'],
        retry: 2
    })

    return {
        ...query, 
        data: query.data?.data
    };
}