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