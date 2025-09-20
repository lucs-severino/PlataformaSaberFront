// src/@types/Agendamento.ts
export type Aluno = {
  id: string;
  nome: string;
  email: string;
};

export type Professor = {
  id: string;
  nome: string;
  disciplina: string;
  disponivel: boolean;
};

export type Aula = {
  id: number;
  aluno: string;
  professor: string;
  disciplina: string;
  data: string;
  hora: string;
  status: "confirmed" | "pending";
};


//Agendamento
export type NovoAgendamentoData = {
    alunoId: string;
    professorId: string;
    data: string; // Formato "AAAA-MM-DD"
    hora: string; // Formato "HH:mm"
}

export type ApiGetHorariosDisponiveis = {
    horarios: string[];
};

export type AgendamentoStatus = "Agendado" | "Confirmado" | "Realizado" | "Cancelado";

export type AgendamentoLista = {
    id: string;
    disciplina: string;
    descricao: string;
    aluno: { nome: string; email: string; };
    professor: { nome: string; email: string; };
    dataHora: string;
    status: AgendamentoStatus;
};

export type ApiGetAgendamentos = {
    items: AgendamentoLista[];
    itemsTotal: number;
    pageTotal: number;
    curPage: number;
};


export type AgendamentoHistorico = {
    data: string;
    status: AgendamentoStatus;
    responsavel: string;
    motivo?: string; 
};

export type AgendamentoDetalhe = AgendamentoLista & {
    agendadoPor: string;
    dataCriacao: string;
    historico: AgendamentoHistorico[];
    motivoCancelamento?: string; 
};
export type DashboardData = {
    total: number;
    pendentes: number;
    confirmadas: number;
    canceladas: number;
};


export type AulasPorPeriodo = {
    diaDaSemana: string;
    manha: number;
    tarde: number;
    noite: number;
}[];