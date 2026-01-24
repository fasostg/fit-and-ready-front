import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DadoGrafico, Periodo } from "../../../pages/Historico";

interface GraficoPeriodosProps {
  titulo: string;
  dados: DadoGrafico[];
  isLoading: boolean;
  periodo: Periodo;
  setPeriodo: (periodo: Periodo) => void;
}

export function GraficoPeriodos({ titulo, dados, isLoading, periodo, setPeriodo }: GraficoPeriodosProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 min-w-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">
                    {titulo}
                </h2>
    
                {/* Toggle */}
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
    
            {/* Chart */}
            <div style={{ width: "100%", height: 280 }}>
                {isLoading ? (
                <div className="flex justify-center items-center h-full text-gray-400">
                    Carregando gráfico...
                </div>
                ) : 
                    dados.length === 0 ? (
                        <div className="flex justify-center items-center h-full text-gray-400">
                            Nenhum dado disponível para o período selecionado
                        </div>
                    ) :
                    (
                    <ResponsiveContainer>
                        <LineChart data={dados}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="data" />
                            <YAxis domain={[0, "auto"]} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="valor"
                                stroke="#2A34FF"
                                strokeWidth={2}
                                dot
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    )
                }
            </div>
        </div>
    )
}