import type { AxiosError } from "axios";
import { api } from "./auth";  // Import from auth.ts
import { useMutation } from "@tanstack/react-query";

interface LoginData {
  cpf: string;
  senha: string;
}

const postLogin = async (data: LoginData) => {
  return api.post("/login", data);  // Use api instead of axios
};

export function useLoginMutate() {
  console.log("ENTROU LOGIN MUTATE")
  const mutate = useMutation({
    mutationFn: postLogin,
    retry: 1,
    onSuccess: (res) => {
      localStorage.setItem("token", res.data);
      globalThis.location.href = "/inicio";
    },
    onError: (e: AxiosError) => {
      alert(e.response?.data);
    }
  });

  return mutate;
}