"use client";

import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
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
import MaintenanceOrder from "./page"; // Ajuste o caminho conforme necessário

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

const mockMachines = [
  { id: "1", name: "Máquina A" },
  { id: "2", name: "Máquina B" },
  { id: "3", name: "Máquina C" },
];

type MaintenanceOrderDialogProps = {
  onCreateOrder: (order: MaintenanceOrder) => void;
};

export default function MaintenanceOrderDialog({
  onCreateOrder,
}: MaintenanceOrderDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<MaintenanceOrder>({
    title: "",
    description: "",
    equipment: [],
    machine: mockMachines[0],
    priority: "Média",
  });
  const [equipmentData, setEquipmentData] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snippet-W72o1AHZDGD93Q86ySRZao4as4TaPO.txt",
    )
      .then((response) => response.json())
      .then((data) => setEquipmentData(data.equipamentos));
  }, []);

  const handleEquipmentSelect = (item: Item) => {
    setNewOrder((prev) => {
      const existingItem = prev.equipment.find(
        (i) => i.codigo_sap === item.codigo_sap,
      );
      if (existingItem) {
        return {
          ...prev,
          equipment: prev.equipment.map((i) =>
            i.codigo_sap === item.codigo_sap
              ? { ...i, quantity: Math.min(i.quantity + 1, i.valor_maximo) }
              : i,
          ),
        };
      } else {
        return {
          ...prev,
          equipment: [...prev.equipment, { ...item, quantity: 1 }],
        };
      }
    });
  };

  const handleQuantityChange = (codigo_sap: string, change: number) => {
    setNewOrder((prev) => ({
      ...prev,
      equipment: prev.equipment
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
        .filter((item) => item.quantity > 0),
    }));
  };

  const handleCreateOrder = () => {
    console.log("Nova ordem criada:", newOrder);
    onCreateOrder(newOrder); // Chame a função passada como prop
    setDialogOpen(false);
    setNewOrder({
      title: "",
      description: "",
      equipment: [],
      machine: mockMachines[0],
      priority: "Média",
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Nova Ordem</Button>
      </DialogTrigger>
      <DialogContent className="flex h-[90vh] w-full max-w-[90vw] flex-col">
        <DialogHeader>
          <DialogTitle>Criar Nova Ordem de Manutenção</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da nova ordem de manutenção aqui.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newOrder.title}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newOrder.description}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, description: e.target.value })
                  }
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="machine">Máquina</Label>
                <Select
                  onValueChange={(value) =>
                    setNewOrder({
                      ...newOrder,
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
                    setNewOrder({
                      ...newOrder,
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
              {newOrder.equipment.length > 0 && (
                <div className="space-y-2">
                  <Label>Equipamentos Selecionados</Label>
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      {newOrder.equipment.map((item) => (
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
        <DialogFooter>
          <Button type="submit" onClick={handleCreateOrder}>
            Criar Ordem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
