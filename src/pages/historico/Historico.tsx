import { useState } from "react";
import { GraficoPeriodos } from "../../components/historico/grafico-periodos/grafico-periodos";
import { useCaloriasTreino, useDadosExercicios, useTempoTreino } from "../../hooks/useCheckin";
import { GraficoExercicios } from "../../components/historico/grafico-exercicios/grafico-exercicios";

export type DadoGrafico = {
  id?: number;
  nome?: string;
  data: string;
  valor: number;
};

export type Periodo = "semana" | "mes" | "ano";

export function Historico() {

  const [periodoTempoTreino, setPeriodoTempoTreino] = useState<Periodo>("semana");
  const { data: dadosPorTempoTreino = [], isPending: isLoadingTempoTreino } = 
    useTempoTreino(periodoTempoTreino);

  const [periodoCaloriasTreino, setPeriodoCaloriasTreino] = useState<Periodo>("semana");
  const { data: dadosPorCaloriasTreino = [], isPending: isLoadingCaloriasTreino } = 
    useCaloriasTreino(periodoCaloriasTreino);

  const [periodoDadosExerciciosTreino, setPeriodoDadosExerciciosTreino] = useState<Periodo>("semana");
  const { data: dadosPorExercicioTreino = [], isPending: isLoadingExercicioTreino } = 
    useDadosExercicios(periodoDadosExerciciosTreino);

  return (
    <div className="flex flex-col justify-start items-start content-start m-20 ml-[15%] mr-[15%]">
      <div className="w-full flex flex-col justify-start items-start mb-10">
        <h2 className="font-bold text-2xl">Histórico de evolução</h2>
        <p className="font-normal text-xl mb-2">Acompanhe o progresso dos seus treinos</p>
      </div>
      <div className="flex w-full gap-5">
        <GraficoPeriodos 
          titulo="Tempo de treino (min) por dia" 
          dados={dadosPorTempoTreino} 
          isLoading={isLoadingTempoTreino} 
          periodo={periodoTempoTreino} 
          setPeriodo={setPeriodoTempoTreino} 
        />
        <GraficoPeriodos 
          titulo="Calorias queimadas (kcal) por dia" 
          dados={dadosPorCaloriasTreino} 
          isLoading={isLoadingCaloriasTreino} 
          periodo={periodoCaloriasTreino} 
          setPeriodo={setPeriodoCaloriasTreino} 
        />
      </div>

      <div className="flex justify-center w-full mt-8 mb-8">
        <GraficoExercicios 
          dados={dadosPorExercicioTreino} 
          isLoading={isLoadingExercicioTreino} 
          periodo={periodoDadosExerciciosTreino} 
          setPeriodo={setPeriodoDadosExerciciosTreino} 
        />
      </div>
    </div>
  );
}
