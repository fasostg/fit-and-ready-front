import { api } from "./auth";  // Import from auth.ts
import { useMutation } from "@tanstack/react-query";

interface LoginData {
  cpf: string;
  senha: string;
}

const postLogin = async (data: LoginData) => {
  return api.post("/auth/login", data);  // Use api instead of axios
};

export function useLoginMutate() {
  const mutate = useMutation({
    mutationFn: postLogin,
    retry: 2,
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      globalThis.location.href = "/inicio";
    },
  });

  return mutate;
}