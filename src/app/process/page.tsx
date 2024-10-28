import { Process, columns } from "./colums";
import { DataTable } from "./data-table";

async function getData(): Promise<Process[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      title: "Carlos Eduardo Gonzales Lobo x Hurb Technologies S A",
      status: "Processo ativo",
      process_id: "1009585-60.2024.8.26.0344",
      action: "Procedimento do Juizado Especial Cível",
      court: "Vara Do Juizado Especial Cível",
      client: "Carlos Eduardo Gonzales Lobo",
      last_update: "02/08/2024",
    },
    {
      id: "2",
      title: "Diego Pereira de Almeida x Salmourão Urbanizadora Spe Ltda",
      status: "Processo inativo",
      process_id: "1002482-07.2024.8.26.0407",
      action: "Rescisão do contrato e devolução do dinheiro",
      court: "2ª Vara",
      client: "Diego Pereira de Almeida",
      last_update: "02/08/2024",
    },
    {
      id: "3",
      title:
        "Graciele Cristina Campanari De Oliveira x Instituto Nacional Do Seguro Social Inss",
      status: "Processo ativo",
      process_id: "5001668-33.2024.4.03.6345",
      action: "Procedimento do Juizado Especial Cível",
      court: "1ª Vara",
      client: "Graciele Cristina Campanari De Oliveira",
      last_update: "02/08/2024",
    },
    {
      id: "4",
      title: "Elisa Regina Tanaka Pereira x Banco Pan Sa",
      status: "Processo ativo",
      process_id: "1010372-89.2024.8.26.0344",
      action: "Procedimento Comum Cível",
      court: "4ª Vara Cível",
      client: "Elisa Regina Tanaka Pereira",
      last_update: "29/07/2024",
    },
    {
      id: "5",
      title: "Banco Bradesco Sa x Renato Sergio Serafim",
      status: "Processo ativo",
      process_id: "0001984-98.2019.8.26.0407",
      action: "Contratos Bancários",
      court: "2ª Vara",
      client: "Banco Bradesco Sa",
      last_update: "23/07/2024",
    },
    {
      id: "6",
      title: "Ana Maria Silva Santos x Hospital Santa Clara",
      status: "Processo ativo",
      process_id: "1029384-12.2024.8.26.0011",
      action: "Indenização por Danos Morais",
      court: "3ª Vara Cível",
      client: "Ana Maria Silva Santos",
      last_update: "01/08/2024",
    },
    {
      id: "7",
      title: "João Carlos Pereira x Construtora Almeida Ltda",
      status: "Processo ativo",
      process_id: "2038475-34.2024.8.26.0456",
      action: "Rescisão Contratual",
      court: "5ª Vara Cível",
      client: "João Carlos Pereira",
      last_update: "28/07/2024",
    },
    {
      id: "8",
      title: "Maria Fernanda Lopes x Companhia de Energia Elétrica",
      status: "Processo inativo",
      process_id: "3948576-98.2024.8.26.0345",
      action: "Ação de Cobrança",
      court: "Vara Única",
      client: "Maria Fernanda Lopes",
      last_update: "30/07/2024",
    },
    {
      id: "9",
      title: "Ricardo Oliveira Souza x Empresa de Transportes S/A",
      status: "Processo inativo",
      process_id: "4857692-65.2024.8.26.0678",
      action: "Danos Materiais",
      court: "2ª Vara do Trabalho",
      client: "Ricardo Oliveira Souza",
      last_update: "31/07/2024",
    },
    {
      id: "10",
      title: "Patrícia Costa Lima x Universidade Federal de São Paulo",
      status: "Processo ativo",
      process_id: "5768923-45.2024.4.03.0001",
      action: "Mandado de Segurança",
      court: "1ª Vara Federal",
      client: "Patrícia Costa Lima",
      last_update: "02/08/2024",
    },
    {
      id: "11",
      title: "Gabriel Almeida Correia x Banco do Brasil S/A",
      status: "Processo ativo",
      process_id: "6592837-23.2024.8.26.0022",
      action: "Revisão de Contrato Bancário",
      court: "6ª Vara Cível",
      client: "Gabriel Almeida Correia",
      last_update: "29/07/2024",
    },
    {
      id: "12",
      title: "Juliana Alves Rodrigues x Operadora de Telefonia XYZ",
      status: "Processo inativo",
      process_id: "7283948-90.2024.8.26.0044",
      action: "Cobrança Indevida",
      court: "2ª Vara do Juizado Especial Cível",
      client: "Juliana Alves Rodrigues",
      last_update: "27/07/2024",
    },
    {
      id: "13",
      title: "Marcos Paulo Ferreira x Rede de Supermercados ABC",
      status: "Processo ativo",
      process_id: "8394756-12.2024.8.26.0567",
      action: "Responsabilidade Civil",
      court: "4ª Vara Cível",
      client: "Marcos Paulo Ferreira",
      last_update: "01/08/2024",
    },
    {
      id: "14",
      title: "Larissa Mendes Costa x Agência de Viagens Viajar",
      status: "Processo ativo",
      process_id: "9456783-34.2024.8.26.0789",
      action: "Reparação de Danos",
      court: "5ª Vara do Juizado Especial Cível",
      client: "Larissa Mendes Costa",
      last_update: "31/07/2024",
    },
    {
      id: "15",
      title: "Bruno Henrique Silva x Clínica de Saúde Bem-Estar",
      status: "Processo inativo",
      process_id: "0567892-45.2024.8.26.0123",
      action: "Indenização por Erro Médico",
      court: "3ª Vara Cível",
      client: "Bruno Henrique Silva",
      last_update: "30/07/2024",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
