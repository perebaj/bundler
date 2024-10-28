"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Search,
  Plus,
  Minus,
} from "lucide-react";
import MaintenanceOrderDialog from "./nova-ordem";
import MultiOrderMaintenanceDialog from "./ordem-audio";

type Equipment = {
  id: string;
  name: string;
  codigo_sap?: string;
  descricao?: string;
  quantity: number;
};

type Machine = {
  id: string;
  name: string;
};

type MaintenanceOrder = {
  id: string;
  title: string;
  description: string;
  equipment: Equipment[];
  machine: Machine;
  status: "A fazer" | "Em Progresso" | "Feito";
  creator: { name: string; email: string; avatar: string };
  priority: "Baixa" | "Média" | "Alta";
  creationDate: string;
};

const mockEquipments: Equipment[] = [
  { id: "eq1", name: "Caldeira Industrial", quantity: 0, codigo_sap: "123" },
  { id: "eq2", name: "Bomba Hidráulica", quantity: 0, codigo_sap: "456" },
  { id: "eq3", name: "Compressor de Ar", quantity: 0, codigo_sap: "789" },
  { id: "eq4", name: "Motor Elétrico", quantity: 0, codigo_sap: "101" },
  { id: "eq5", name: "Esteira Transportadora", quantity: 0, codigo_sap: "112" },
];

const mockMachines: Machine[] = [
  { id: "m1", name: "Máquina 1" },
  { id: "m2", name: "Máquina 2" },
  { id: "m3", name: "Máquina 3" },
  { id: "m4", name: "Máquina 4" },
  { id: "m5", name: "Máquina 5" },
];

const mockOrders: MaintenanceOrder[] = [
  {
    id: "TaskID-123781",
    title: "Manutenção caldeira",
    description: "Manutenção preventiva da caldeira principal",
    equipment: [
      {
        id: "eq1",
        name: "Caldeira Industrial",
        quantity: 1,
        codigo_sap: "123",
      },
    ],
    machine: { id: "m1", name: "Máquina 1" },
    status: "A fazer",
    creator: {
      name: "Pereira",
      email: "perebaj@gmail.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    priority: "Baixa",
    creationDate: "28/01/2024",
  },
];

export default function Component() {
  const [orders, setOrders] = useState<MaintenanceOrder[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [newOrder, setNewOrder] = useState<Partial<MaintenanceOrder>>({
    equipment: [],
    machine: mockMachines[0],
    // Add default values for the required properties
    id: "", // Add default id
    status: "A fazer", // Add default status
    creator: { name: "", email: "", avatar: "" }, // Add default creator
    creationDate: "", // Add default creationDate
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);

  const filteredOrders = orders.filter(
    (order) =>
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateOrder = (newOrder: Partial<MaintenanceOrder>) => {
    const createdOrder: MaintenanceOrder = {
      id: `TaskID-${Math.random().toString(36).substr(2, 9)}`,
      title: newOrder.title || "",
      description: newOrder.description || "",
      equipment:
        newOrder.equipment?.map((eq) => ({
          id: eq.codigo_sap || "",
          name: eq.descricao || "",
          quantity: eq.quantity || 0,
        })) || [],
      machine: newOrder.machine || mockMachines[0],
      status: newOrder.status || "A fazer",
      creator: newOrder.creator || {
        name: "Current User",
        email: "user@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      priority: newOrder.priority || "Baixa",
      creationDate:
        newOrder.creationDate || new Date().toLocaleDateString("pt-BR"),
    };
    setOrders([...orders, createdOrder]);
    setDialogOpen(false);
  };

  const handleEquipmentChange = (equipment: Equipment) => {
    setSelectedEquipment((prev) => {
      const existing = prev.find((eq) => eq.id === equipment.id);
      if (existing) {
        // Se o equipamento já estiver selecionado, removê-lo
        return prev.filter((eq) => eq.id !== equipment.id);
      } else {
        // Se não estiver selecionado, adicioná-lo
        return [...prev, { ...equipment, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (id: string, change: number) => {
    setSelectedEquipment((prev) =>
      prev
        .map((eq) => {
          if (eq.id === id) {
            const newQuantity = Math.max(0, eq.quantity + change);
            return { ...eq, quantity: newQuantity };
          }
          return eq;
        })
        .filter((eq) => eq.quantity > 0),
    );
  };

  const handleCreateOrders = (newOrders: MaintenanceOrder[]) => {
    setOrders((prevOrders) => [
      ...prevOrders,
      ...newOrders.map((order) => ({
        ...order,
        equipment: order.equipamentos || [], // Certifique-se de que equipamentos estão sendo passados corretamente
        status: order.status || "A fazer", // Certifique-se de que o status está definido
        creationDate: order.creationDate || new Date().toLocaleDateString("pt-BR"), // Certifique-se de que a data de criação está definida
      })),
    ]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Ordens de Manutenção</h1>
      <div className="mb-4 flex justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filtrar tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Search className="text-gray-400" />
        </div>
        <MaintenanceOrderDialog onCreateOrder={handleCreateOrder} />
        <MultiOrderMaintenanceDialog onCreateOrders={handleCreateOrders} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Task</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Equipamentos</TableHead>
            <TableHead>Máquina</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criador</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Data Criação</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.title}</TableCell>
              <TableCell>{order.description}</TableCell>
              <TableCell>
                {order.equipamentos && order.equipamentos.length > 0
                  ? order.equipamentos
                    .map((eq) => `${eq.descricao} (${eq.quantity})`)
                    .join(", ")
                  : "Nenhum equipamento selecionado"}
              </TableCell>
              <TableCell>{order.machine.name}</TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={order.creator.avatar}
                      alt={order.creator.name}
                    />
                    <AvatarFallback>{order.creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{order.creator.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <PriorityBadge priority={order.priority} />
              </TableCell>
              <TableCell>{order.creationDate}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function StatusBadge({ status }: { status: MaintenanceOrder["status"] }) {
  const colorMap = {
    "A fazer": "bg-yellow-100 text-yellow-800",
    "Em Progresso": "bg-blue-100 text-blue-800",
    Feito: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${colorMap[status]}`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: MaintenanceOrder["priority"];
}) {
  const colorMap = {
    Baixa: "text-green-600",
    Média: "text-yellow-600",
    Alta: "text-red-600",
  };

  const iconMap = {
    Baixa: <ChevronDown className="h-4 w-4" />,
    Média: <ChevronDown className="h-4 w-4 rotate-90" />,
    Alta: <ChevronUp className="h-4 w-4" />,
  };

  return (
    <div className={`flex items-center space-x-1 ${colorMap[priority]}`}>
      {iconMap[priority]}
      <span>{priority}</span>
    </div>
  );
}
