import type { AgendamentoLista, ApiGetAgendamentos } from "../@types/Agendamento";

const allAgendamentos: AgendamentoLista[] = Array.from({ length: 50 }, (_, i) => ({
    id: `${i + 1}`,
    nomeAluno: `Aluno ${i + 1}`,
    nomeProfessor: `Professor ${(i % 5) + 1}`,
    dataHora: new Date(2025, 8, 15 + (i % 10), 9 + i, 0).toISOString(),
    status: (["Agendado", "Confirmado", "Realizado", "Cancelado"] as const)[i % 4],
}));

export const getMockedAgendamentos = (
    page: number, 
    filters: { nomeAluno?: string, nomeProfessor?: string, status?: string }
): Promise<ApiGetAgendamentos> => {
    
    return new Promise(resolve => {
        setTimeout(() => {
            let data = [...allAgendamentos];

            if (filters.nomeAluno) {
                data = data.filter(a => a.nomeAluno.toLowerCase().includes(filters.nomeAluno!.toLowerCase()));
            }
            if (filters.nomeProfessor) {
                data = data.filter(a => a.nomeProfessor.toLowerCase().includes(filters.nomeProfessor!.toLowerCase()));
            }
            if (filters.status) {
                data = data.filter(a => a.status === filters.status);
            }

            const pageSize = 10;
            const itemsTotal = data.length;
            const pageTotal = Math.ceil(itemsTotal / pageSize);
            const offset = (page - 1) * pageSize;
            const items = data.slice(offset, offset + pageSize);

            resolve({
                items,
                itemsTotal,
                pageTotal,
                curPage: page,
            });
        }, 500); // Simula o atraso da rede
    });
};