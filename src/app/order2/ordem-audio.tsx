"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type Item = {
  descricao: string;
  codigo_sap: string;
  valor_maximo: number;
};

type Category = {
  categoria: string;
  itens: Item[];
};

type SelectedItem = Item & { quantity: number };

type MaintenanceOrder = {
  title: string;
  description: string;
  equipment: SelectedItem[];
  machine: { id: string; name: string };
  priority: "Baixa" | "Média" | "Alta";
};

type ApiOrderData = {
  title: string;
  description: string;
};

const mockMachines = [
  { id: "1", name: "Máquina A" },
  { id: "2", name: "Máquina B" },
  { id: "3", name: "Máquina C" },
];

type MultiOrderMaintenanceDialogProps = {
  onCreateOrders: (orders: MaintenanceOrder[]) => void;
};

const mockApiData: ApiOrderData[] = [
  {
    title: "Ordem de Manutenção 1",
    description: "Descrição da ordem 1",
  },
  {
    title: "Ordem de Manutenção 2",
    description: "Descrição da ordem 2 teskjlraslkdj alksj dla",
  },
];

export default function MultiOrderMaintenanceDialog({
  onCreateOrders,
}: MultiOrderMaintenanceDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orders, setOrders] = useState<MaintenanceOrder[]>([
    {
      title: "Ordem Inicial",
      description: "Descrição da ordem inicial",
      equipment: [],
      machine: mockMachines[0],
      priority: "Média" as const,
    },
  ]); // Estado inicial com uma ordem padrão
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [equipmentData, setEquipmentData] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [audioFile, setAudioFile] = useState<File | null>(null); // Estado para armazenar o arquivo de áudio
  const [apiResponse, setApiResponse] = useState<ApiOrderData | null>(null); // Estado para armazenar a resposta da API
  const [isLoading, setIsLoading] = useState(false); // Estado para controle de loading

  useEffect(() => {
    // Fetch equipment data
    fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snippet-W72o1AHZDGD93Q86ySRZao4as4TaPO.txt",
    )
      .then((response) => response.json())
      .then((data) => setEquipmentData(data.equipamentos));

    // Use mock API order data directly
    if (mockApiData.length > 0) {
      const initialOrders = mockApiData.map((apiOrder) => ({
        title: apiOrder.title,
        description: apiOrder.description,
        equipment: [],
        machine: mockMachines[0],
        priority: "Média" as const,
      }));
      setOrders(initialOrders);
    } else {
      setOrders([
        {
          title: "",
          description: "",
          equipment: [],
          machine: mockMachines[0],
          priority: "Média" as const,
        },
      ]);
    }
  }, []);

  const currentOrder = orders[currentOrderIndex] || {
    title: "",
    description: "",
    equipment: [],
    machine: mockMachines[0],
    priority: "Média" as const,
  };

  const updateCurrentOrder = (updatedOrder: MaintenanceOrder) => {
    const newOrders = [...orders];
    newOrders[currentOrderIndex] = updatedOrder;
    setOrders(newOrders);
  };

  const handleEquipmentSelect = (item: Item) => {
    const updatedOrder = { ...currentOrder };
    const existingItem = updatedOrder.equipment.find(
      (i) => i.codigo_sap === item.codigo_sap,
    );
    if (existingItem) {
      updatedOrder.equipment = updatedOrder.equipment.map((i) =>
        i.codigo_sap === item.codigo_sap
          ? { ...i, quantity: Math.min(i.quantity + 1, i.valor_maximo) }
          : i,
      );
    } else {
      updatedOrder.equipment = [
        ...updatedOrder.equipment,
        { ...item, quantity: 1 },
      ];
    }
    updateCurrentOrder(updatedOrder);
  };

  const handleQuantityChange = (codigo_sap: string, change: number) => {
    const updatedOrder = { ...currentOrder };
    updatedOrder.equipment = updatedOrder.equipment
      .map((item) =>
        item.codigo_sap === codigo_sap
          ? {
              ...item,
              quantity: Math.min(
                Math.max(0, item.quantity + change),
                item.valor_maximo,
              ),
            }
          : item,
      )
      .filter((item) => item.quantity > 0);
    updateCurrentOrder(updatedOrder);
  };

  const handleAddOrder = () => {
    setOrders([
      ...orders,
      {
        title: "",
        description: "",
        equipment: [],
        machine: mockMachines[0],
        priority: "Média",
      },
    ]);
    setCurrentOrderIndex(orders.length);
  };

  const handleSubmitOrders = () => {
    onCreateOrders(orders);
    setDialogOpen(false);
    setOrders([]);
    setCurrentOrderIndex(0);
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleSubmitAudio = async () => {
    if (!audioFile) return;

    setIsLoading(true); // Inicia o loading

    // Simulação de um delay como se fosse uma chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dados mockados que a API retornaria
    const mockApiResponse = [
      {
        title: "Ordem de Manutenção 1",
        description: "Descrição da ordem 1",
        machine: "Máquina A",
      },
      {
        title: "Ordem de Manutenção 2",
        description: "Descrição da ordem 2",
        machine: "Máquina B",
      },
      {
        title: "Ordem de Manutenção 3",
        description: "Descrição da ordem 3",
        machine: "Máquina C",
      },
    ];

    // Armazena a resposta mockada
    setApiResponse(mockApiResponse);

    // Atualiza as ordens com os dados mockados
    const initialOrders = mockApiResponse.map((item) => ({
      title: item.title,
      description: item.description,
      equipment: [],
      machine:
        mockMachines.find((m) => m.name === item.machine) || mockMachines[0],
      priority: "Média" as const,
    }));
    setOrders(initialOrders); // Atualiza as ordens com os dados da API

    setIsLoading(false); // Finaliza o loading
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Criar Ordens</Button>
      </DialogTrigger>
      <DialogContent className="flex h-[90vh] w-full max-w-[90vw] flex-col">
        <DialogHeader>
          <DialogTitle>Criar Ordens de Manutenção</DialogTitle>
          <DialogDescription>
            Preencha os detalhes das ordens de manutenção aqui. Use as setas
            para navegar entre as ordens.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6 p-6">
            {/* Campo para upload de áudio */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="audioUpload">Enviar Áudio</Label>
                <Input
                  id="audioUpload"
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                />
                <Button onClick={handleSubmitAudio} disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar Áudio"}
                </Button>
                {isLoading && <p>Carregando...</p>} {/* Indicador de loading */}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={currentOrder.title}
                  onChange={(e) =>
                    updateCurrentOrder({
                      ...currentOrder,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={currentOrder.description}
                  onChange={(e) =>
                    updateCurrentOrder({
                      ...currentOrder,
                      description: e.target.value,
                    })
                  }
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="machine">Máquina</Label>
                <Select
                  onValueChange={(value) =>
                    updateCurrentOrder({
                      ...currentOrder,
                      machine:
                        mockMachines.find((m) => m.id === value) ||
                        mockMachines[0],
                    })
                  }
                >
                  <SelectTrigger id="machine">
                    <SelectValue placeholder="Selecione a máquina" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMachines.map((machine) => (
                      <SelectItem key={machine.id} value={machine.id}>
                        {machine.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select
                  onValueChange={(value) =>
                    updateCurrentOrder({
                      ...currentOrder,
                      priority: value as MaintenanceOrder["priority"],
                    })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Equipamentos</Label>
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentData.map((category) => (
                      <SelectItem
                        key={category.categoria}
                        value={category.categoria}
                      >
                        {category.categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedCategory && (
                <div className="space-y-2">
                  <Label>Item</Label>
                  <Select
                    onValueChange={(value) => {
                      const item = equipmentData
                        .find((c) => c.categoria === selectedCategory)
                        ?.itens.find((i) => i.codigo_sap === value);
                      if (item) handleEquipmentSelect(item);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um item" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentData
                        .find((c) => c.categoria === selectedCategory)
                        ?.itens.map((item) => (
                          <SelectItem
                            key={item.codigo_sap}
                            value={item.codigo_sap}
                          >
                            {item.descricao}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {currentOrder.equipment.length > 0 && (
                <div className="space-y-2">
                  <Label>Equipamentos Selecionados</Label>
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      {currentOrder.equipment.map((item) => (
                        <div
                          key={item.codigo_sap}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{item.descricao}</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                handleQuantityChange(item.codigo_sap, -1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                handleQuantityChange(item.codigo_sap, 1)
                              }
                              disabled={item.quantity >= item.valor_maximo}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() =>
                setCurrentOrderIndex(Math.max(0, currentOrderIndex - 1))
              }
              disabled={currentOrderIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            <span>
              {currentOrderIndex + 1} de {orders.length}
            </span>
            <Button
              onClick={() =>
                setCurrentOrderIndex(
                  Math.min(orders.length - 1, currentOrderIndex + 1),
                )
              }
              disabled={currentOrderIndex === orders.length - 1}
            >
              Próxima <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={handleAddOrder}>Adicionar Ordem</Button>
            <Button onClick={handleSubmitOrders} disabled={orders.length === 0}>
              Submeter Ordens
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
