import type { AxiosError } from "axios";
import { api } from "./auth";  // Import from auth.ts
import { useMutation } from "@tanstack/react-query";

interface RegisterData {
  nome: string;
  cpf: string;
  senha: string;
}

const postRegister = async (data: RegisterData) => {
  return api.post("/cadastrar", data);  // Use api instead of axios
};

export function useRegisterMutate() {
  const mutate = useMutation({
    mutationFn: postRegister,
    retry: 1,
    onSuccess: (res) => {
      localStorage.setItem("token", res.data);
      globalThis.location.href = "/inicio";
    },
    onError: (e: AxiosError) => {
      alert(e.response?.data)
    }
  });

  return mutate;
}