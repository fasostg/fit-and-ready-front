import { useState } from "react";
import { Input } from "../../components/shared/input/input";
import "./Login.css";
import { useLoginMutate } from "../../hooks/useLoginMutate";
import { useRegisterMutate } from "../../hooks/useRegisterMutate";

export function Login() {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [isCadastro, setIsCadastro] = useState(false);
  const { mutate, isSuccess, isPending } = useLoginMutate();
  const { mutate: mutateRegister, isSuccess: isRegisterSuccess, isPending: isRegisterPending } = useRegisterMutate();

  const handleChangeCadastro = () => {
    setIsCadastro(prev => !prev);
  }

  const handleCadastro = () => {
    mutateRegister({ nome, cpf, senha });
    handleChangeCadastro();
  }

  return (
    <div className="flex flex-col justify-center items-center content-center m-20 ml-[15%] mr-[15%]">
      <div className="w-[50%] flex flex-col justify-center items-center mb-10 border border-gray-400 rounded-lg text-white bg-indigo-600 p-10">
        {!isCadastro && <div>
          <h2 className="font-bold text-2xl">Realize o login para iniciar</h2>
          <p className="font-normal text-lg mb-2">Ou então, <button className="text-blue-300 hover:underline cursor-pointer" onClick={handleChangeCadastro}>cadastre-se aqui</button></p>

          <form className="flex flex-col justify-start align-top items-start gap-3 mt-6 mb-8">
            <Input label="CPF" placeholder="CPF" updateValue={(value) => setCpf(value || "")} />
            <Input label="Senha" placeholder="Senha" type="password" updateValue={(value) => setSenha(value || "")} />
          </form>
          <button onClick={() => mutate({ cpf, senha })} className="btn-secondary">Entrar</button>
        </div>}

        {isCadastro && <div>
          <h2 className="font-bold text-2xl">Cadastre-se utilizando o CPF</h2>

          <form className="flex flex-col justify-start align-top items-start gap-3 mt-6 mb-8">
            <Input label="Nome" placeholder="Nome" updateValue={(value) => setNome(value || "")} />
            <Input label="CPF" placeholder="CPF" updateValue={(value) => setCpf(value || "")} />
            <Input label="Senha" placeholder="Senha" type="password" updateValue={(value) => setSenha(value || "")} />
          </form>
          <div className="flex justify-end gap-2">
            <button onClick={handleChangeCadastro} className="btn-secondary">Voltar</button>
            <button onClick={handleCadastro} className="btn-secondary">Cadastrar</button>
          </div>
        </div>}
      </div>

      
    </div>
  );
}
