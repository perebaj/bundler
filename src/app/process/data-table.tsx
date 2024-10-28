"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { customFilterFn } from "./colums";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SyncModal from "./SyncModal";
import { useToast } from "@/hooks/use-toast";
import { getAdminColumns } from "./adminColumns";
import { useAuth } from "@clerk/nextjs";

interface ProcessData {
  process_id: string;
  title: string;
  assignedMember?: string;
  // Add other fields as needed
}

interface DataTableProps<TData extends ProcessData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
import { RefreshCwIcon, PlusIcon } from "@/components/icons";
export function DataTable<TData extends ProcessData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { has, orgRole } = useAuth();

  const isAdmin = orgRole === "org:admin";

  const handleAssignMember = React.useCallback(
    (processId: string, member: string) => {
      console.log(`Assigning member ${member} to process ${processId}`);
      // Here you would update your data source
      // For now, let's just update the local data
      const updatedData = data.map((process) =>
        process.process_id === processId
          ? { ...process, assignedMember: member }
          : process,
      );
      // You would typically update this data in your backend and then refetch
      console.log("Updated data:", updatedData);
    },
    [data],
  );

  const allColumns = React.useMemo(() => {
    const adminColumns = getAdminColumns<TData>(isAdmin, handleAssignMember);
    return [...columns, ...adminColumns];
  }, [columns, isAdmin, handleAssignMember]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isSyncModalOpen, setIsSyncModalOpen] = React.useState(false);
  const [isAddProcessOpen, setIsAddProcessOpen] = React.useState(false);
  const [newProcessId, setNewProcessId] = React.useState("");

  const table = useReactTable({
    data,
    columns: allColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    filterFns: { customFilterFn },
    enableRowSelection: true,
  });

  const selectedProcesses = React.useMemo(() => {
    return Object.keys(rowSelection).map((index) => {
      const row = table.getRow(index);

      return {
        process_id: row.original["process_id"] as string,
        title: row.getValue("title") as string,
      };
    });
  }, [rowSelection, table]);

  const handleSync = () => {
    setIsSyncModalOpen(true);
    // Aqui você pode adicionar a lógica real de sincronização
    // Por exemplo, uma chamada de API
    setTimeout(() => {
      setIsSyncModalOpen(false);
      // Atualizar os dados da tabela após a sincronização
    }, 3000); // Simula uma sincronização de 3 segundos
  };

  const { toast } = useToast();

  const handleAddProcess = () => {
    if (newProcessId.match(/^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/)) {
      // Here you would typically call an API to add the process
      toast({
        title: "Processo adicionado",
        description: `Processo ${newProcessId} adicionado com sucesso.`,
      });
      setIsAddProcessOpen(false);
      setNewProcessId("");
    } else {
      toast({
        title: "Inválido ID de processo",
        description:
          "Por favor, insira um ID de processo válido. Exemplo: 5001668-33.2024.4.03.6345",
        variant: "destructive",
      });
    }
  };

  const noRowSelected = Object.keys(rowSelection).length === 0;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Processos</h1>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    className="p-2"
                    disabled={noRowSelected}
                    onClick={handleSync}
                  >
                    <RefreshCwIcon className="h-5 w-5" />
                  </Button>
                </div>
              </TooltipTrigger>
              {noRowSelected && (
                <TooltipContent>
                  <p>Selecione um processo para sincronizar</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="default"
            size="sm"
            className="p-2"
            onClick={() => setIsAddProcessOpen(true)}
          >
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtre processos através do título..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        ></Input>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              Status <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                table.getColumn("status")?.setFilterValue("Processo ativo")
              }
              textValue="Processo ativo"
              onChange={(event) =>
                table.getColumn("status")?.setFilterValue("Processo ativo")
              }
            >
              Processo ativo
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                table.getColumn("status")?.setFilterValue("Processo inativo")
              }
              textValue="Processo inativo"
              onChange={(event) =>
                table.getColumn("status")?.setFilterValue("Processo inativo")
              }
            >
              Processo inativo
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => table.getColumn("status")?.setFilterValue("")}
              textValue="Todos"
              onChange={(event) =>
                table.getColumn("status")?.setFilterValue("")
              }
            >
              Limpar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="w-12">
                  <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) =>
                      table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                  />
                </TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  <TableCell className="w-12">
                    <Checkbox
                      checked={row.getIsSelected()}
                      onCheckedChange={(value) => row.toggleSelected(!!value)}
                      aria-label="Select row"
                    />
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={allColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        selectedProcesses={selectedProcesses}
      />
      <Dialog open={isAddProcessOpen} onOpenChange={setIsAddProcessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar processo manualmente</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="process-id" className="text-right">
                ID do processo
              </Label>
              <Input
                id="process-id"
                value={newProcessId}
                onChange={(e) => setNewProcessId(e.target.value)}
                placeholder="5001668-33.2024.4.03.6345"
                className="col-span-3"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Obs: Por enquanto, só conseguimos coletar dados do ESAJ.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={handleAddProcess}>Adicionar Processo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
