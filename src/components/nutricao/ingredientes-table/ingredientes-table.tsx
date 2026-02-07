import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { IngredienteReceitaProps } from "../modal-criar-receita/modal-criar-receita";

interface Props {
  data: IngredienteReceitaProps[];
  deleteIngrediente?(id: string): void; 
}

export function IngredientesTable({ data, deleteIngrediente }: Props) {
  
  const columns = useMemo<ColumnDef<IngredienteReceitaProps>[]> (
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "ingrediente",
        header: "Ingrediente",
      },
      {
        accessorKey: "quantidade",
        header: "Quantidade (gramas)",
      }
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
                    {deleteIngrediente != null && <th></th>}
                </tr>
              ))}
          </thead>

          <tbody>
              {data.length === 0 && 
                <tr>
                  <td colSpan={columns.length} className="text-start px-3 py-3 text-gray-800">
                    Nenhum ingrediente adicionado.
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
                    {deleteIngrediente != null &&
                      <td>
                        <button className="cursor-pointer" onClick={() => deleteIngrediente(row.id)}>
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
