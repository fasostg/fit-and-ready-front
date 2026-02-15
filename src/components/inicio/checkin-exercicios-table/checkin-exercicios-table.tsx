import "./checkin-exercicios-table.css";
import { InputNumber } from "../../shared/input-number/input-number";
import { Input } from "../../shared/input/input";
import type { IExercicio } from "../../../interfaces/IExercicio";
import { useEffect, useState } from "react";

interface Props {
  data: IExercicio[];
  exerciciosChange(value: IExercicio[]): void; 
}

export function CheckinExerciciosTable({ data, exerciciosChange }: Props) {

    const [exercicios, setExercicios] = useState(data);

    useEffect(() => {
        setExercicios(data);
    }, [data])

    const handleCargaChange = (carga: number, exercicio: IExercicio) => {
        const newData = exercicios.map(item => {
            if (item.id === exercicio.id) return { ...item, carga }
            else return item
        })

        setExercicios(newData)
        exerciciosChange(newData)
    }

    const handleObservacaoChange = (observacao: string, exercicio: IExercicio) => {
        const newData = exercicios.map(item => {
            if (item.id === exercicio.id) return { ...item, observacao }
            else return item
        })

        setExercicios(newData)
        exerciciosChange(newData)
    } 

    return (
        <div className="w-full overflow-x-auto mt-4">
            <div className="min-w-full border border-gray-300 rounded-lg">
                <div className="grid grid-cols-12 justify-center items-center text-center border-b border-gray-200 hover:bg-blue-100 transition">
                    <div className="flex justify-center col-span-3">
                        <span className="font-bold">Exercício</span>
                    </div>
                    <div className="flex justify-center col-span-2">
                        <span className="font-bold">Séries x <br/>Repetições</span>
                    </div>
                    <div className="flex justify-center col-span-2">
                        <span className="font-bold">Carga (kg)</span>
                    </div>
                    <div className="flex justify-center col-span-5">
                        <span className="font-bold">Observação</span>
                    </div>
                </div>
                {exercicios.map(row => (
                    <div key={row.id} className="grid grid-cols-12 justify-center items-center text-center border-b border-gray-200 hover:bg-blue-100 transition">
                        <div className="flex justify-center col-span-3 p-3">
                            <span className="table-tag">{row.tipoExercicio.nome}</span>
                        </div>
                        <div className="flex justify-center col-span-2">
                            <span className="flex justify-center text-center text-gray-800">{row.numeroSeries} x {row.numeroRepeticoes}</span>
                        </div>
                        <div className="flex justify-center col-span-2 mb-0">
                            <div className="list-input">
                                <InputNumber value={row.carga ? String(row.carga) : "0"} valueObject={row} updateValue={(value) => handleCargaChange(Number(value), row)}/>
                            </div>
                        </div>
                        <div className="flex justify-center col-span-5 mb-0">
                            <div className="list-input">
                                <Input value={row.observacao ? String(row.observacao) : ""} valueObject={row} updateValue={(value) => handleObservacaoChange(String(value), row)}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
