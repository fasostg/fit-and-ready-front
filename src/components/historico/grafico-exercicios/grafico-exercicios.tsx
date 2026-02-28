import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import type { DadoGrafico, Periodo } from "../../../pages/historico/Historico";
import { Select } from "../../shared/select/select";
import { TipoExercicioOption } from "../../../models/TipoExercicioOption";

interface GraficoExerciciosProps {
  dados: DadoGrafico[];
  isLoading: boolean;
  periodo: Periodo;
  setPeriodo: (periodo: Periodo) => void;
}

export function GraficoExercicios({ dados, isLoading, periodo, setPeriodo }: GraficoExerciciosProps) {
    const [tiposExercicios, setTiposExercicios] = useState<TipoExercicioOption[]>();

    useEffect(() => {
        const tiposUnicos = Array.from(
            new Map(
                dados.map(dado => [dado.nome, new TipoExercicioOption(dado.id, dado.nome)])
            ).values()
        );
        setTiposExercicios(tiposUnicos);
        setTipoExercicio(tiposUnicos[0]?.nome || "");
        setDadosFiltrados(dados.filter(dado => dado.nome === tiposUnicos[0]?.nome || ""));
    }, [dados]);

    const [tipoExercicio, setTipoExercicio] = useState<string>(tiposExercicios ? tiposExercicios[0]?.nome || "" : "");
    const [dadosFiltrados, setDadosFiltrados] = useState<DadoGrafico[]>(dados.filter(dado => dado.nome === tipoExercicio));
    console.log("dadosFiltrados:", dadosFiltrados);
    
    const handleTipoExercicioChange = (value: unknown) => {
        if (typeof value === "string") {
            setTipoExercicio(value);
            setDadosFiltrados(dados.filter(dado => dado.nome === value));
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6 min-w-4xl">
            <Select 
                value={tipoExercicio} 
                options={tiposExercicios} 
                updateValue={handleTipoExercicioChange}
                classname="border border-stone-400 rounded-md p-2 shadow-sm w-full mb-4"
            />

            <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">
                        Carga (em kg) por tipo de exercício
                    </h2>

                    <div className="flex bg-indigo-100 rounded-lg overflow-hidden">
                    {(["semana", "mes", "ano"] as Periodo[]).map((p) => (
                        <button
                        key={p}
                        onClick={() => setPeriodo(p)}
                        className={`px-4 py-1 text-sm font-medium transition ${
                            periodo === p
                            ? "bg-indigo-600 text-white"
                            : "text-indigo-600"
                        }`}
                        >
                        {p === "semana" ? "Semana" : p === "mes" ? "Mês" : "Ano"}
                        </button>
                    ))}
                    </div>
                </div>
            </div>
    
            <div style={{ width: "100%", height: 280 }}>
                {isLoading ? (
                <div className="flex justify-center items-center h-full text-gray-400">
                    Carregando gráfico...
                </div>
                ) : 
                    dadosFiltrados.length === 0 ? (
                        <div className="flex justify-center items-center h-full text-gray-400">
                            Nenhum dado disponível para o tipo de exercício selecionado
                        </div>
                    ) :
                    (
                        <ResponsiveContainer>
                            <BarChart data={dadosFiltrados} barSize={50}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="data" />
                                <YAxis width="auto" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="valor" fill="#4f39f6" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )
                }
            </div>
        </div>
    )
}