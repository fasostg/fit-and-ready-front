import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import type { ExercicioProps } from "../../treino/modal-criar-treino/modal-criar-treino";
import "./checkin-exercicios-table.css";

interface Props {
  data: ExercicioProps[];
  deleteExercicio?(id: string): void; 
}

export function CheckinExerciciosTable({ data, deleteExercicio }: Props) {
  
  const columns = useMemo<ColumnDef<ExercicioProps>[]> (
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "grupoMuscular",
        header: "Grupo Muscular",
      },
      {
        accessorKey: "tipoExercicio",
        header: "Tipo",
      },
      {
        accessorKey: "numeroSeries",
        header: "Nº de séries",
      },
      {
        accessorKey: "numeroRepeticoes",
        header: "Nº de repetições",
      },
    ], []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto mt-4">
        <table border={1} className="min-w-full border border-gray-300 rounded-lg">
          <thead>
              <tr className="text-gray-700">
                  <th className="w-2/7"></th>
                  <th className="w-1/7 px-3 py-2 text-center font-semibold select-none">
                      Séries x Repetições
                  </th>
                  <th className="px-3 py-2 text-center font-semibold select-none">
                      Carga (kg)
                  </th>
                  <th className="px-3 py-2 text-center font-semibold select-none">
                      Observação
                  </th>
              </tr>
          </thead>

          <tbody>
              {data.length === 0 && 
                <tr>
                  <td colSpan={columns.length} className="text-start px-3 py-3 text-gray-800">
                    Nenhum exercício adicionado.
                  </td>
                </tr>
              }
              {data.map(row => (
                <tr key={row.id} className="border-b border-gray-200 hover:bg-blue-100 transition">
                    <td>
                      <span className="table-tag">{row.tipoExercicio}</span>
                    </td>
                    <td key={row.id} className="px-3 py-3 text-gray-800 text-center">
                        {row.numeroSeries} x {row.numeroRepeticoes}
                    </td>
                    <td className="flex justify-center">
                      <input className="table-input"></input>
                    </td>
                    <td className="flex justify-center">
                      <input className="table-input"></input>
                    </td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
  );
}
