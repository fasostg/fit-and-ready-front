import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import type { ExercicioProps } from "../modal-criar-treino/modal-criar-treino";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  data: ExercicioProps[];
  deleteExercicio?(id: string): void; 
}

export function ExerciciosTable({ data, deleteExercicio }: Props) {
  
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
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-gray-100 text-gray-700">
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="px-3 py-2 text-left font-semibold select-none hover:bg-gray-200 transition">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                    {deleteExercicio != null && <th></th>}
                </tr>
              ))}
          </thead>

          <tbody>
              {data.length === 0 && 
                <tr>
                  <td colSpan={columns.length} className="text-start px-3 py-3 text-gray-800">
                    Nenhum exercício adicionado.
                  </td>
                </tr>
              }
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-gray-200 hover:bg-blue-100 transition">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-3 py-3 text-gray-800">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                    {deleteExercicio != null &&
                      <td>
                        <button className="cursor-pointer" onClick={() => deleteExercicio(row.id)}>
                          <FontAwesomeIcon icon={faXmark}/>
                        </button>
                      </td>
                    }
                </tr>
              ))}
          </tbody>
        </table>
    </div>
  );
}
