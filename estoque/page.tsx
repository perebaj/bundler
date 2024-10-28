// "use client";

// import { useState, useMemo } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { ChevronDown, ChevronUp, Search, Plus, Minus } from "lucide-react";
// import initialIventory from "@/app/itens2.json";
// type Item = {
//   descricao: string;
//   codigo_sap: string;
//   valor_maximo: number;
//   quantidade: number;
// };

// type Category = {
//   categoria: string;
//   itens: Item[];
// };

// const initialInventory: Category[] = initialIventory;

// export default function Component() {
//   const [inventory, setInventory] = useState<Category[]>(initialInventory);
//   const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const toggleCategory = (categoryName: string) => {
//     setExpandedCategories((prev) =>
//       prev.includes(categoryName)
//         ? prev.filter((name) => name !== categoryName)
//         : [...prev, categoryName],
//     );
//   };

//   const updateItemQuantity = (
//     categoryIndex: number,
//     itemIndex: number,
//     change: number,
//   ) => {
//     const newInventory = [...inventory];
//     const item = newInventory[categoryIndex].itens[itemIndex];
//     const newQuantity = Math.max(
//       0,
//       Math.min(item.valor_maximo, item.quantidade + change),
//     );
//     item.quantidade = newQuantity;
//     setInventory(newInventory);
//   };

//   const filteredInventory = inventory
//     .map((category) => ({
//       ...category,
//       itens: category.itens.filter(
//         (item) =>
//           item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.codigo_sap.toLowerCase().includes(searchTerm.toLowerCase()),
//       ),
//     }))
//     .filter((category) => category.itens.length > 0);

//   const totalItems = useMemo(() => {
//     return inventory.reduce((total, category) => {
//       return (
//         total +
//         category.itens.reduce(
//           (categoryTotal, item) => categoryTotal + item.quantidade,
//           0,
//         )
//       );
//     }, 0);
//   }, [inventory]);

//   const maxItems = useMemo(() => {
//     return inventory.reduce((total, category) => {
//       return (
//         total +
//         category.itens.reduce(
//           (categoryTotal, item) => categoryTotal + item.valor_maximo,
//           0,
//         )
//       );
//     }, 0);
//   }, [inventory]);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="mb-4 text-2xl font-bold">
//         Gerenciador de Estoque Industrial
//       </h1>
//       <Card className="mb-4">
//         <CardContent className="pt-6">
//           <p className="mb-2 text-lg font-semibold">
//             Total de itens em estoque:{" "}
//             <span className="text-primary">{totalItems}</span> / {maxItems}
//           </p>
//           <Progress value={(totalItems / maxItems) * 100} className="w-full" />
//         </CardContent>
//       </Card>
//       <div className="relative mb-4">
//         <Input
//           type="text"
//           placeholder="Buscar item..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="pl-10"
//         />
//         <Search
//           className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
//           size={20}
//         />
//       </div>
//       {filteredInventory.map((category, categoryIndex) => (
//         <Card key={category.categoria} className="mb-4">
//           <CardHeader>
//             <CardTitle>
//               <Button
//                 variant="ghost"
//                 onClick={() => toggleCategory(category.categoria)}
//                 className="flex w-full items-center justify-between"
//                 aria-expanded={expandedCategories.includes(category.categoria)}
//               >
//                 <span>{category.categoria}</span>
//                 <span className="flex items-center">
//                   <span className="mr-2 text-sm font-normal">
//                     {category.itens.reduce(
//                       (total, item) => total + item.quantidade,
//                       0,
//                     )}{" "}
//                     /
//                     {category.itens.reduce(
//                       (total, item) => total + item.valor_maximo,
//                       0,
//                     )}{" "}
//                     itens
//                   </span>
//                   {expandedCategories.includes(category.categoria) ? (
//                     <ChevronUp className="h-4 w-4" />
//                   ) : (
//                     <ChevronDown className="h-4 w-4" />
//                   )}
//                 </span>
//               </Button>
//             </CardTitle>
//           </CardHeader>
//           {expandedCategories.includes(category.categoria) && (
//             <CardContent>
//               <ul className="space-y-2">
//                 {category.itens.map((item, itemIndex) => (
//                   <li
//                     key={item.codigo_sap}
//                     className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0"
//                   >
//                     <div className="flex-grow">
//                       <span className="font-medium">{item.descricao}</span>
//                       <span className="ml-2 text-sm text-gray-500">
//                         ({item.codigo_sap})
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Button
//                         size="icon"
//                         variant="outline"
//                         onClick={() =>
//                           updateItemQuantity(categoryIndex, itemIndex, -1)
//                         }
//                         aria-label={`Diminuir quantidade de ${item.descricao}`}
//                       >
//                         <Minus className="h-4 w-4" />
//                       </Button>
//                       <span className="w-16 text-center">
//                         {item.quantidade} / {item.valor_maximo}
//                       </span>
//                       <Button
//                         size="icon"
//                         variant="outline"
//                         onClick={() =>
//                           updateItemQuantity(categoryIndex, itemIndex, 1)
//                         }
//                         aria-label={`Aumentar quantidade de ${item.descricao}`}
//                       >
//                         <Plus className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           )}
//         </Card>
//       ))}
//     </div>
//   );
// }
