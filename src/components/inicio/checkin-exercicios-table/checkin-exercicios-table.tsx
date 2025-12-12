import type { ExercicioProps } from "../../treino/modal-criar-treino/modal-criar-treino";
import "./checkin-exercicios-table.css";
import { InputNumber } from "../../shared/input-number/input-number";
import { Input } from "../../shared/input/input";

interface Props {
  data: ExercicioProps[];
  exerciciosChange(value: ExercicioProps[]): void; 
}

export function CheckinExerciciosTable({ data, exerciciosChange }: Props) {

  const handleCargaChange = (carga: number, exercicio: ExercicioProps) => {
    console.log("exercicio =>", exercicio)
    console.log("carga =>", carga)
    data.forEach(item => {
      if (item.id == exercicio.id) {
        item.carga = carga;
      }
    })

    exerciciosChange(data)
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
            {data.map(row => (
                <div key={row.id} className="grid grid-cols-12 justify-center items-center text-center border-b border-gray-200 hover:bg-blue-100 transition">
                    <div className="flex justify-center col-span-3 p-3">
                        <span className="table-tag">{row.tipoExercicio}</span>
                    </div>
                    <div className="flex justify-center col-span-2">
                        <span className="flex justify-center text-center text-gray-800">{row.numeroSeries} x {row.numeroRepeticoes}</span>
                    </div>
                    <div className="flex justify-center col-span-2 mb-0">
                        <div className="list-input">
                          //TODO CORRIGIR ESSE UPDATE
                            <InputNumber value={"1"} valueObject={row} updateValue={handleCargaChange(1, row)}/>
                        </div>
                    </div>
                    <div className="flex justify-center col-span-5 mb-0">
                        <div className="list-input">
                            <Input value={"1"} updateValue={()=>console.log(1)}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
