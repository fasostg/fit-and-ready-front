import { type AxiosPromise } from "axios"
import { useQuery } from "@tanstack/react-query";
import type { ICheckin } from "../interfaces/ICheckin";
import type { IIntensidade } from "../interfaces/IIntensidade";
import type { DadoGrafico } from "../pages/historico/Historico";
import type { ITipoExercicio } from "../interfaces/ITipoExercicio";
import { api } from "./auth";

const API_URL = "http://localhost:8080/checkin";
type Periodo = "semana" | "mes" | "ano";

const fetchData = async (): AxiosPromise<ICheckin[]> => {
    return api.get(API_URL + '/all');
}

const fetchIntensidadesData = async (): AxiosPromise<IIntensidade[]> => {
    return api.get(API_URL + '/intensidades');
}

const fetchTempoTreinoData = async (periodo: Periodo): AxiosPromise<DadoGrafico[]> => {
    return api.get(`${API_URL}/tempo-treino`, {
        params: { periodo }
    });
};

const fetchCaloriasTreinoData = async (periodo: Periodo): AxiosPromise<DadoGrafico[]> => {
    return api.get(`${API_URL}/calorias-treino`, {
        params: { periodo }
    });
};

const fetchDadosExerciciosData = async (periodo: Periodo): AxiosPromise<DadoGrafico[]> => {
    console.log("fetchDadosExerciciosData chamado com periodo:", periodo);
    return api.get(`${API_URL}/dados-exercicios`, {
        params: { periodo }
    });
};

const fetchTiposExerciciosUsuarioData = async (): AxiosPromise<ITipoExercicio[]> => {
    return api.get(`${API_URL}/tipos-exercicios-usuario`);
};

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

export function useIntensidade() {
    const query = useQuery({
        queryFn: fetchIntensidadesData,
        queryKey: ['intensidades-data'],
        retry: 2
    })
    
    return {
        ...query,
        data: query.data?.data
    }
}

export function useTempoTreino(periodo: Periodo) {
    console.log("useTempoTreino chamado com periodo:", periodo);
    const query = useQuery({
        queryFn: () => fetchTempoTreinoData(periodo),
        queryKey: ["tempo-treino-data", periodo],
        retry: 2,
    });

    return {
        ...query,
        data: query.data?.data,
    };
}

export function useCaloriasTreino(periodo: Periodo) {
    console.log("useCaloriasTreino chamado com periodo:", periodo);
    const query = useQuery({
        queryFn: () => fetchCaloriasTreinoData(periodo),
        queryKey: ["calorias-treino-data", periodo],
        retry: 2,
    });

    return {
        ...query,
        data: query.data?.data,
    };
}

export function useDadosExercicios(periodo: Periodo) {
    console.log("useDadosExercicios chamado com periodo:", periodo);
    const query = useQuery({
        queryFn: () => fetchDadosExerciciosData(periodo),
        queryKey: ["dados-exercicios-data", periodo],
        retry: 2,
    });

    return {
        ...query,
        data: query.data?.data,
    };
}

export function useTiposExerciciosUsuario() {
    const query = useQuery({
        queryFn: fetchTiposExerciciosUsuarioData,
        queryKey: ["tipo-exercicio-treino-data"],
        retry: 2,
    });

    return {
        ...query,
        data: query.data?.data,
    };
}