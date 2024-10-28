"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { PlugIcon, UnplugIcon } from "@/components/icons";

export type Process = {
  id: string;
  title: string;
  status: "Processo ativo" | "Processo inativo";
  process_id: string;
  action: string;
  court: string;
  client: string;
  last_update: string;
};

export const customFilterFn = (row: any, columnId: any, filterValue: any) => {
  const { title, status, process_id } = row.original;
  const searchValue = filterValue.toLowerCase();

  return (
    title.toLowerCase().includes(searchValue) ||
    status.toLowerCase().includes(searchValue) ||
    process_id.toLowerCase().includes(searchValue)
  );
};

export const columns: ColumnDef<Process>[] = [
  {
    id: "title",
    header: "Título",
    accessorKey: "title",
    cell: ({ row }) => (
      <div>
        <div className="flex items-center space-x-2">
          {row.original.status === "Processo ativo" ? (
            <PlugIcon />
          ) : (
            <UnplugIcon />
          )}
          <span className="font-medium">{row.original.title}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {row.original.status}
        </div>
        <div className="text-sm text-muted-foreground">
          {row.original.process_id}
        </div>
      </div>
    ),
    filterFn: customFilterFn,
  },
  {
    id: "client",
    header: "Cliente",
    accessorKey: "client",
  },
  {
    id: "action-court",
    header: "Ação/Foro",
    accessorKey: "action-court",
    cell: ({ row }) => (
      <div>
        <div className="text-sm">{row.original.action}</div>
        <div className="text-sm text-muted-foreground">
          {row.original.court}
        </div>
      </div>
    ),
  },
  {
    id: "last_update",
    header: "Últ. Mov",
    accessorKey: "last_update",
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
  },
];
