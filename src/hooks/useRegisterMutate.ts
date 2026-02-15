import { api } from "./auth";  // Import from auth.ts
import { useMutation } from "@tanstack/react-query";

interface RegisterData {
  nome: string;
  cpf: string;
  senha: string;
}

const postRegister = async (data: RegisterData) => {
  return api.post("/auth/cadastrar", data);  // Use api instead of axios
};

export function useRegisterMutate() {
  const mutate = useMutation({
    mutationFn: postRegister,
    retry: 2,
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      globalThis.location.href = "/inicio";
    },
  });

  return mutate;
}