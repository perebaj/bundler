// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { ChevronDown, ChevronUp, MoreHorizontal, Search } from "lucide-react";
// const itens = {
//   equipamentos: [
//     {
//       categoria: "Ferramentas de Corte",
//       itens: [
//         {
//           descricao: "Serra Circular",
//           codigo_sap: "MAT001",
//           valor_maximo: 10,
//         },
//         {
//           descricao: "Disco de Corte",
//           codigo_sap: "MAT002",
//           valor_maximo: 50,
//         },
//         {
//           descricao: "Serra de Fita",
//           codigo_sap: "MAT003",
//           valor_maximo: 15,
//         },
//         {
//           descricao: "Disco de Desbaste",
//           codigo_sap: "MAT004",
//           valor_maximo: 50,
//         },
//         {
//           descricao: "Broca de Aço Rápido 10mm",
//           codigo_sap: "MAT005",
//           valor_maximo: 100,
//         },
//         {
//           descricao: "Conjunto de Fresas para Usinagem",
//           codigo_sap: "MAT006",
//           valor_maximo: 20,
//         },
//         {
//           descricao: "Lâmina de Serra Sabre",
//           codigo_sap: "MAT007",
//           valor_maximo: 30,
//         },
//         {
//           descricao: "Lixadeira Angular",
//           codigo_sap: "EQP001",
//           valor_maximo: 10,
//         },
//       ],
//     },
//     {
//       categoria: "Ferramentas de Medição",
//       itens: [
//         {
//           descricao: "Paquímetro Digital",
//           codigo_sap: "MAT101",
//           valor_maximo: 15,
//         },
//         {
//           descricao: "Micrômetro",
//           codigo_sap: "MAT102",
//           valor_maximo: 15,
//         },
//         {
//           descricao: "Relógio Comparador",
//           codigo_sap: "MAT103",
//           valor_maximo: 10,
//         },
//         {
//           descricao: "Trena de Aço 5m",
//           codigo_sap: "MAT104",
//           valor_maximo: 25,
//         },
//         {
//           descricao: "Nível de Bolha",
//           codigo_sap: "MAT105",
//           valor_maximo: 20,
//         },
//         {
//           descricao: "Goniômetro Digital",
//           codigo_sap: "MAT106",
//           valor_maximo: 10,
//         },
//         {
//           descricao: "Manômetro para Pressão",
//           codigo_sap: "MAT107",
//           valor_maximo: 10,
//         },
//         {
//           descricao: "Calibrador de Roscas",
//           codigo_sap: "MAT108",
//           valor_maximo: 20,
//         },
//       ],
//     },
//   ],
// };

// type MaintenanceOrder = {
//   id: string;
//   title: string;
//   description: string;
//   equipment: string;
//   status: "A fazer" | "Em Progresso" | "Feito";
//   creator: { name: string; email: string; avatar: string };
//   priority: "Baixa" | "Média" | "Alta";
//   creationDate: string;
//   selectedEquipment?: string[]; // Adicionando um campo para equipamentos selecionados
// };

// const mockOrders: MaintenanceOrder[] = [
//   {
//     id: "TaskID-123781",
//     title: "Manutenção caldeira",
//     description: "A",
//     equipment: "EquipamentoID-3567",
//     status: "A fazer",
//     creator: {
//       name: "Pereira",
//       email: "perebaj@gmail.com",
//       avatar: "/placeholder.svg?height=32&width=32",
//     },
//     priority: "Baixa",
//     creationDate: "28/01/2024",
//     selectedEquipment: [], // Inicializando como vazio
//   },
//   // Add more mock data here...
// ];

// export default function Component() {
//   const [orders, setOrders] = useState<MaintenanceOrder[]>(mockOrders);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [newOrder, setNewOrder] = useState<Partial<MaintenanceOrder>>({});
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<MaintenanceOrder | null>(
//     null,
//   ); // Para armazenar a ordem selecionada
//   // Adicione um novo estado para armazenar os equipamentos selecionados
//   const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
//   const [equipmentQuantities, setEquipmentQuantities] = useState<{ [key: string]: number }>({});

//   const filteredOrders = orders.filter(
//     (order) =>
//       order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.description.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const handleCreateOrder = () => {
//     const createdOrder: MaintenanceOrder = {
//       id: `TaskID-${Math.random().toString(36).substr(2, 9)}`,
//       title: newOrder.title || "",
//       description: newOrder.description || "",
//       equipment: newOrder.equipment || "",
//       status: "A fazer",
//       creator: {
//         name: "Current User",
//         email: "user@example.com",
//         avatar: "/placeholder.svg?height=32&width=32",
//       },
//       priority: newOrder.priority || "Baixa",
//       creationDate: new Date().toLocaleDateString("pt-BR"),
//       selectedEquipment: [], // Inicializando como vazio
//     };
//     setOrders([...orders, createdOrder]);
//     setNewOrder({});
//     setDialogOpen(false);
//   };

//   const handleSelectEquipment = (order: MaintenanceOrder) => {
//     setSelectedOrder(order);
//   };

//   const handleEquipmentChange = (equipment: string[]) => {
//     if (selectedOrder) {
//       const updatedOrders = orders.map((order) =>
//         order.id === selectedOrder.id
//           ? { ...order, selectedEquipment: equipment }
//           : order,
//       );
//       setOrders(updatedOrders);
//       setSelectedOrder(null); // Limpa a seleção após atualizar
//     }
//   };

//   // Função para lidar com a mudança de quantidade
//   const handleQuantityChange = (codigo_sap: string, quantidade: number) => {
//     setEquipmentQuantities((prev) => ({
//       ...prev,
//       [codigo_sap]: quantidade,
//     }));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="mb-4 text-2xl font-bold">Ordens de Manutenção</h1>
//       <div className="mb-4 flex justify-between">
//         <div className="flex items-center space-x-2">
//           <Input
//             placeholder="Filtrar tarefas..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-64"
//           />
//           <Search className="text-gray-400" />
//         </div>
//         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>Nova Ordem</Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Criar Nova Ordem de Manutenção</DialogTitle>
//               <DialogDescription>
//                 Preencha os detalhes da nova ordem de manutenção aqui.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="title" className="text-right">
//                   Título
//                 </Label>
//                 <Input
//                   id="title"
//                   value={newOrder.title || ""}
//                   onChange={(e) =>
//                     setNewOrder({ ...newOrder, title: e.target.value })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="description" className="text-right">
//                   Descrição
//                 </Label>
//                 <Input
//                   id="description"
//                   value={newOrder.description || ""}
//                   onChange={(e) =>
//                     setNewOrder({ ...newOrder, description: e.target.value })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="equipment" className="text-right">
//                   Equipamento
//                 </Label>
//                 <Input
//                   id="equipment"
//                   value={newOrder.equipment || ""}
//                   onChange={(e) =>
//                     setNewOrder({ ...newOrder, equipment: e.target.value })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="priority" className="text-right">
//                   Prioridade
//                 </Label>
//                 <Select
//                   onValueChange={(value) =>
//                     setNewOrder({
//                       ...newOrder,
//                       priority: value as MaintenanceOrder["priority"],
//                     })
//                   }
//                 >
//                   <SelectTrigger className="col-span-3">
//                     <SelectValue placeholder="Selecione a prioridade" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Baixa">Baixa</SelectItem>
//                     <SelectItem value="Média">Média</SelectItem>
//                     <SelectItem value="Alta">Alta</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button type="submit" onClick={handleCreateOrder}>
//                 Criar Ordem
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Task</TableHead>
//             <TableHead>Título</TableHead>
//             <TableHead>Descrição</TableHead>
//             <TableHead>Equipamento</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Criador</TableHead>
//             <TableHead>Prioridade</TableHead>
//             <TableHead>Data Criação</TableHead>
//             <TableHead className="text-right"></TableHead>
//             <TableHead>Equipamentos Selecionados</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filteredOrders.map((order) => (
//             <TableRow key={order.id}>
//               <TableCell className="font-medium">{order.id}</TableCell>
//               <TableCell>{order.title}</TableCell>
//               <TableCell>{order.description}</TableCell>
//               <TableCell>{order.equipment}</TableCell>
//               <TableCell>
//                 <StatusBadge status={order.status} />
//               </TableCell>
//               <TableCell>
//                 <div className="flex items-center space-x-2">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage
//                       src={order.creator.avatar}
//                       alt={order.creator.name}
//                     />
//                     <AvatarFallback>{order.creator.name[0]}</AvatarFallback>
//                   </Avatar>
//                   <span>{order.creator.email}</span>
//                 </div>
//               </TableCell>
//               <TableCell>
//                 <PriorityBadge priority={order.priority} />
//               </TableCell>
//               <TableCell>{order.creationDate}</TableCell>
//               <TableCell>
//                 {/* Exibir os equipamentos selecionados e suas quantidades */}
//                 <div>
//                   {Array.isArray(order.selectedEquipment) &&
//                   order.selectedEquipment.length > 0 ? (
//                     order.selectedEquipment.map((equip) => (
//                       <span key={equip} className="block text-sm">
//                         {equip.descricao} - {equip.quantidade}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="block text-sm">
//                       Nenhum equipamento selecionado
//                     </span>
//                   )}
//                 </div>
//               </TableCell>
//               <TableCell className="text-right">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleSelectEquipment(order)}
//                 >
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       {selectedOrder && (
//         <Dialog open={true} onOpenChange={() => setSelectedOrder(null)}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Selecionar Equipamentos</DialogTitle>
//             </DialogHeader>
//             <Select
//               multiple
//               onValueChange={(value) => handleEquipmentChange(value)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Selecione os equipamentos" />
//               </SelectTrigger>
//               <SelectContent>
//                 {itens.equipamentos.map((category) =>
//                   category.itens.map((item) => (
//                     <SelectItem key={item.codigo_sap} value={item.codigo_sap}>
//                       <div className="flex justify-between items-center">
//                         <span>{item.descricao} - {item.valor_maximo} disponíveis</span>
//                         <input
//                           type="number"
//                           min="0"
//                           max={item.valor_maximo}
//                           onChange={(e) => handleQuantityChange(item.codigo_sap, Number(e.target.value))}
//                           className="ml-2 w-16"
//                           placeholder="Qtd"
//                         />
//                       </div>
//                     </SelectItem>
//                   )),
//                 )}
//               </SelectContent>
//             </Select>
//             <DialogFooter>
//               <Button onClick={() => setSelectedOrder(null)}>Fechar</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: MaintenanceOrder["status"] }) {
//   const colorMap = {
//     "A fazer": "bg-yellow-100 text-yellow-800",
//     "Em Progresso": "bg-blue-100 text-blue-800",
//     Feito: "bg-green-100 text-green-800",
//   };

//   return (
//     <span
//       className={`rounded-full px-2 py-1 text-xs font-semibold ${colorMap[status]}`}
//     >
//       {status}
//     </span>
//   );
// }

// function PriorityBadge({
//   priority,
// }: {
//   priority: MaintenanceOrder["priority"];
// }) {
//   const colorMap = {
//     Baixa: "text-green-600",
//     Média: "text-yellow-600",
//     Alta: "text-red-600",
//   };

//   const iconMap = {
//     Baixa: <ChevronDown className="h-4 w-4" />,
//     Média: <ChevronDown className="h-4 w-4 rotate-90" />,
//     Alta: <ChevronUp className="h-4 w-4" />,
//   };

//   return (
//     <div className={`flex items-center space-x-1 ${colorMap[priority]}`}>
//       {iconMap[priority]}
//       <span>{priority}</span>
//     </div>
//   );
// }
