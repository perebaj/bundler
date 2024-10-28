"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Search, Plus, Minus } from "lucide-react";

type Item = {
  descricao: string;
  codigo_sap: string;
  valor_maximo: number;
  quantidade: number;
};

type Category = {
  categoria: string;
  itens: Item[];
};

const initialInventory: Category[] = [
  {
    categoria: "Ferramentas de Corte",
    itens: [
      {
        descricao: "Serra Circular",
        codigo_sap: "MAT001",
        valor_maximo: 10,
        quantidade: 0,
      },
      {
        descricao: "Disco de Corte",
        codigo_sap: "MAT002",
        valor_maximo: 50,
        quantidade: 0,
      },
      {
        descricao: "Serra de Fita",
        codigo_sap: "MAT003",
        valor_maximo: 15,
        quantidade: 0,
      },
      {
        descricao: "Disco de Desbaste",
        codigo_sap: "MAT004",
        valor_maximo: 50,
        quantidade: 0,
      },
      {
        descricao: "Broca de Aço Rápido 10mm",
        codigo_sap: "MAT005",
        valor_maximo: 100,
        quantidade: 0,
      },
      {
        descricao: "Conjunto de Fresas para Usinagem",
        codigo_sap: "MAT006",
        valor_maximo: 20,
        quantidade: 0,
      },
      {
        descricao: "Lâmina de Serra Sabre",
        codigo_sap: "MAT007",
        valor_maximo: 30,
        quantidade: 0,
      },
      {
        descricao: "Lixadeira Angular",
        codigo_sap: "EQP001",
        valor_maximo: 10,
        quantidade: 0,
      },
    ],
  },
  {
    categoria: "Ferramentas de Medição",
    itens: [
      {
        descricao: "Paquímetro Digital",
        codigo_sap: "MAT101",
        valor_maximo: 15,
        quantidade: 0,
      },
      {
        descricao: "Micrômetro",
        codigo_sap: "MAT102",
        valor_maximo: 15,
        quantidade: 0,
      },
      {
        descricao: "Relógio Comparador",
        codigo_sap: "MAT103",
        valor_maximo: 10,
        quantidade: 0,
      },
      {
        descricao: "Trena de Aço 5m",
        codigo_sap: "MAT104",
        valor_maximo: 25,
        quantidade: 0,
      },
      {
        descricao: "Nível de Bolha",
        codigo_sap: "MAT105",
        valor_maximo: 20,
        quantidade: 0,
      },
      {
        descricao: "Goniômetro Digital",
        codigo_sap: "MAT106",
        valor_maximo: 10,
        quantidade: 0,
      },
      {
        descricao: "Manômetro para Pressão",
        codigo_sap: "MAT107",
        valor_maximo: 10,
        quantidade: 0,
      },
      {
        descricao: "Calibrador de Roscas",
        codigo_sap: "MAT108",
        valor_maximo: 20,
        quantidade: 0,
      },
    ],
  },
  {
    categoria: "Equipamentos de Solda",
    itens: [
      {
        descricao: "Máquina de Solda MIG",
        codigo_sap: "EQP201",
        valor_maximo: 5,
        quantidade: 0,
      },
      {
        descricao: "Eletrodo de Solda Inox",
        codigo_sap: "MAT201",
        valor_maximo: 200,
        quantidade: 0,
      },
      {
        descricao: "Máscara de Solda Automática",
        codigo_sap: "MAT202",
        valor_maximo: 10,
        quantidade: 0,
      },
      {
        descricao: "Maçarico de Corte Oxiacetilênico",
        codigo_sap: "EQP202",
        valor_maximo: 5,
        quantidade: 0,
      },
      {
        descricao: "Tocha de Solda TIG",
        codigo_sap: "MAT203",
        valor_maximo: 10,
        quantidade: 0,
      },
      {
        descricao: "Fio de Solda MIG ER70S-6",
        codigo_sap: "MAT204",
        valor_maximo: 100,
        quantidade: 0,
      },
      {
        descricao: "Regulador de Pressão para Gás",
        codigo_sap: "MAT205",
        valor_maximo: 15,
        quantidade: 0,
      },
      {
        descricao: "Tubo de Gás Acetileno",
        codigo_sap: "MAT206",
        valor_maximo: 30,
        quantidade: 0,
      },
    ],
  },
  {
    categoria: "Lubrificação e Manutenção",
    itens: [
      {
        descricao: "Graxa Industrial",
        codigo_sap: "MAT301",
        valor_maximo: 50,
        quantidade: 0,
      },
      {
        descricao: "Óleo Lubrificante 10W30",
        codigo_sap: "MAT302",
        valor_maximo: 40,
        quantidade: 0,
      },
      {
        descricao: "Bomba de Graxa Pneumática",
        codigo_sap: "EQP301",
        valor_maximo: 5,
        quantidade: 0,
      },
      {
        descricao: "Limpa Contatos Elétricos",
        codigo_sap: "MAT303",
        valor_maximo: 50,
        quantidade: 0,
      },
      {
        descricao: "Spray Desengripante",
        codigo_sap: "MAT304",
        valor_maximo: 30,
        quantidade: 0,
      },
      {
        descricao: "Veda Rosca em Fita",
        codigo_sap: "MAT305",
        valor_maximo: 100,
        quantidade: 0,
      },
    ],
  },
  {
    categoria: "Equipamentos de Segurança",
    itens: [
      {
        descricao: "Capacete de Segurança com Aba",
        codigo_sap: "MAT401",
        valor_maximo: 50,
        quantidade: 0,
      },
      {
        descricao: "Luvas Térmicas de Alta Resistência",
        codigo_sap: "MAT402",
        valor_maximo: 100,
        quantidade: 0,
      },
      {
        descricao: "Óculos de Proteção Antirrespingos",
        codigo_sap: "MAT403",
        valor_maximo: 50,
        quantidade: 0,
      },
      {
        descricao: "Protetor Auricular Tipo Plug",
        codigo_sap: "MAT404",
        valor_maximo: 200,
        quantidade: 0,
      },
      {
        descricao: "Máscara Respiratória com Filtro P3",
        codigo_sap: "MAT405",
        valor_maximo: 30,
        quantidade: 0,
      },
      {
        descricao: "Cinto de Segurança para Trabalho em Altura",
        codigo_sap: "MAT406",
        valor_maximo: 20,
        quantidade: 0,
      },
      {
        descricao: "Sapato de Segurança com Biqueira de Aço",
        codigo_sap: "MAT407",
        valor_maximo: 50,
        quantidade: 0,
      },
      {
        descricao: "Protetor Facial de Policarbonato",
        codigo_sap: "MAT408",
        valor_maximo: 20,
        quantidade: 0,
      },
    ],
  },
  {
    categoria: "Equipamentos de Elevação",
    itens: [
      {
        descricao: "Talha Elétrica de Corrente",
        codigo_sap: "EQP501",
        valor_maximo: 5,
        quantidade: 0,
      },
      {
        descricao: "Corrente de Elevação de 10m",
        codigo_sap: "MAT501",
        valor_maximo: 30,
        quantidade: 0,
      },
      {
        descricao: "Gancho Giratório com Trava de Segurança",
        codigo_sap: "MAT502",
        valor_maximo: 25,
        quantidade: 0,
      },
      {
        descricao: "Cinta de Elevação com Olhal",
        codigo_sap: "MAT503",
        valor_maximo: 20,
        quantidade: 0,
      },
      {
        descricao: "Carrinho de Transporte de Bobinas",
        codigo_sap: "EQP502",
        valor_maximo: 10,
        quantidade: 0,
      },
      {
        descricao: "Macaco Hidráulico 10 Toneladas",
        codigo_sap: "EQP503",
        valor_maximo: 10,
        quantidade: 0,
      },
    ],
  },
  {
    categoria: "Componentes Mecânicos",
    itens: [
      {
        descricao: "Rolamento Esférico de Precisão",
        codigo_sap: "MAT601",
        valor_maximo: 50,
        quantidade: 0,
      },
      {
        descricao: "Parafuso de Alta Resistência M12",
        codigo_sap: "MAT602",
        valor_maximo: 200,
        quantidade: 0,
      },
      {
        descricao: "Correia de Transmissão Industrial",
        codigo_sap: "MAT603",
        valor_maximo: 20,
        quantidade: 0,
      },
      {
        descricao: "Junta de Vedação em Borracha",
        codigo_sap: "MAT604",
        valor_maximo: 100,
        quantidade: 0,
      },
      {
        descricao: "Engrenagem Cilíndrica de Aço",
        codigo_sap: "MAT605",
        valor_maximo: 15,
        quantidade: 0,
      },
      {
        descricao: "Bucha de Bronze Autolubrificante",
        codigo_sap: "MAT606",
        valor_maximo: 30,
        quantidade: 0,
      },
      {
        descricao: "Eixo de Transmissão",
        codigo_sap: "MAT607",
        valor_maximo: 20,
        quantidade: 0,
      },
      {
        descricao: "Polia de Alumínio",
        codigo_sap: "MAT608",
        valor_maximo: 25,
        quantidade: 0,
      },
    ],
  },
  {
    categoria: "Equipamentos Hidráulicos",
    itens: [
      {
        descricao: "Válvula Solenoide Hidráulica",
        codigo_sap: "EQP601",
        valor_maximo: 15,
        quantidade: 0,
      },
      {
        descricao: "Bomba Hidráulica de Pistão",
        codigo_sap: "EQP602",
        valor_maximo: 10,
        quantidade: 0,
      },
      {
        descricao: "Mangueira Hidráulica de Alta Pressão",
        codigo_sap: "MAT701",
        valor_maximo: 50,
        quantidade: 0,
      },
      {
        descricao: "Conector Hidráulico Rápido",
        codigo_sap: "MAT702",
        valor_maximo: 100,
        quantidade: 0,
      },
    ],
  },
];

export default function Component() {
  const [inventory, setInventory] = useState<Category[]>(initialInventory);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    );
  };

  const updateItemQuantity = (
    categoryIndex: number,
    itemIndex: number,
    change: number,
  ) => {
    const newInventory = [...inventory];
    const item = newInventory[categoryIndex].itens[itemIndex];
    const newQuantity = Math.max(
      0,
      Math.min(item.valor_maximo, item.quantidade + change),
    );
    item.quantidade = newQuantity;
    setInventory(newInventory);
  };

  const filteredInventory = inventory
    .map((category) => ({
      ...category,
      itens: category.itens.filter(
        (item) =>
          item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.codigo_sap.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.itens.length > 0);

  const totalItems = useMemo(() => {
    return inventory.reduce((total, category) => {
      return (
        total +
        category.itens.reduce(
          (categoryTotal, item) => categoryTotal + item.quantidade,
          0,
        )
      );
    }, 0);
  }, [inventory]);

  const maxItems = useMemo(() => {
    return inventory.reduce((total, category) => {
      return (
        total +
        category.itens.reduce(
          (categoryTotal, item) => categoryTotal + item.valor_maximo,
          0,
        )
      );
    }, 0);
  }, [inventory]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Gerenciador de Estoque Industrial
      </h1>
      <Card className="mb-4">
        <CardContent className="pt-6">
          <p className="mb-2 text-lg font-semibold">
            Total de itens em estoque:{" "}
            <span className="text-primary">{totalItems}</span> / {maxItems}
          </p>
          <Progress value={(totalItems / maxItems) * 100} className="w-full" />
        </CardContent>
      </Card>
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Buscar item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
          size={20}
        />
      </div>
      {filteredInventory.map((category, categoryIndex) => (
        <Card key={category.categoria} className="mb-4">
          <CardHeader>
            <CardTitle>
              <Button
                variant="ghost"
                onClick={() => toggleCategory(category.categoria)}
                className="flex w-full items-center justify-between"
                aria-expanded={expandedCategories.includes(category.categoria)}
              >
                <span>{category.categoria}</span>
                <span className="flex items-center">
                  <span className="mr-2 text-sm font-normal">
                    {category.itens.reduce(
                      (total, item) => total + item.quantidade,
                      0,
                    )}{" "}
                    /
                    {category.itens.reduce(
                      (total, item) => total + item.valor_maximo,
                      0,
                    )}{" "}
                    itens
                  </span>
                  {expandedCategories.includes(category.categoria) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </span>
              </Button>
            </CardTitle>
          </CardHeader>
          {expandedCategories.includes(category.categoria) && (
            <CardContent>
              <ul className="space-y-2">
                {category.itens.map((item, itemIndex) => (
                  <li
                    key={item.codigo_sap}
                    className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0"
                  >
                    <div className="flex-grow">
                      <span className="font-medium">{item.descricao}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({item.codigo_sap})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateItemQuantity(categoryIndex, itemIndex, -1)
                        }
                        aria-label={`Diminuir quantidade de ${item.descricao}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-16 text-center">
                        {item.quantidade} / {item.valor_maximo}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateItemQuantity(categoryIndex, itemIndex, 1)
                        }
                        aria-label={`Aumentar quantidade de ${item.descricao}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
