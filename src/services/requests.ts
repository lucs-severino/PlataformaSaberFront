import type { ApiDeleteUser, ApiGetUser, ApiSignIn, ApiSignUp, ApiUpdateUser } from "../@types/Auth"
import type { ApiDeleteTransaction, ApiGetDashboard, ApiGetTransaction, ApiGetTransactions, ApiNewTransaction, ApiUpdateTransaction, TransactionStatus } from "../@types/Transaction"
import type { ApiGetUsuarios, ApiGetUsuario, ApiNewUsuario, ApiUpdateUsuario, ApiDeleteUsuario, ApiGetAlunos, ApiGetProfessores, ApiGetAlunosPorMes, UsuarioStats} from "../@types/Usuario" // Adicione UsuarioStats aqui
import { formatDate } from "../utils/formatDate"
import type { UsuarioFormData } from "../pages/Usuario/Edit/EditarUsuario"
import { api } from "./api"
import type { AgendamentoDetalhe, ApiGetAgendamentos, ApiGetHorariosDisponiveis, DashboardData, NovoAgendamentoData } from "../@types/Agendamento"

export type AulasPorPeriodo = {
    diaDaSemana: string;
    manha: number;
    tarde: number;
    noite: number;
}[];

// Auth
export const signUp = async (name: string, email: string, password: string) =>{
    return await api <ApiSignUp>({
        endpoint: '/Auth/login', method: 'POST', data:{ name, email, password}, withAuth: false
    })
}

export const signIn = async (email: string, password: string) =>{
    return await api <ApiSignIn>({
        endpoint: 'Auth/login', method: 'POST', data:{email, password}, withAuth: false
    })
}

// User
export const getUser = async () => {
    return await api<ApiGetUser>({
        endpoint: 'Auth/login'
    })
}

export const updateUser = async (nome: string, email: string) => {
    if (!nome || !email) {
        throw new Error("Nome e email devem ser fornecidos.");
    }

    return await api<ApiUpdateUser>({
        endpoint: 'usuarios/meu-usuario',
        method: 'PUT',
        data: { Nome: nome, Email: email }
    });
}



export const deleteUser = async () => {
    return await api<ApiDeleteUser>({
        endpoint: 'usuarios', method: 'DELETE'
    })
}

export const updatePassword = async (currentPassword: string, newPassword: string) => {
    return await api<{ message: string }>({
        endpoint: 'usuarios/alterar-senha', 
        method: 'PUT',
        data: { currentPassword, newPassword }
    });
}

// Transactions 
export const getTransactions = async (page: number) => {
    return await api<ApiGetTransactions>({
        endpoint: 'transactions', data: {page}
    })
}

export const getTransaction = async (id: number) => {
    return await api<ApiGetTransaction>({
        endpoint: `transactions/${id}`
    })
}

export const newTransaction = async (title: string, amount: number, status?: TransactionStatus) => {
    return await api<ApiNewTransaction>({
        endpoint: 'transactions', method: 'POST', data: {title, amount, status}
    })
}

export const updateTransaction = async (id: number, title: string, amount: number, status: TransactionStatus) => {
    return await api<ApiUpdateTransaction>({
        endpoint: `transactions/${id}`, method: 'PUT', data: {title, amount, status}
    })
}

export const deleteTransaction = async (id: number) => {
    return await api<ApiDeleteTransaction>({
        endpoint: `transactions/${id}`, method: 'DELETE'
    })
}


//// Usuarios
export const getUsuarios = async (page: number, nome?: string, tipo?: string) => {
    const params: { page: number; nome?: string; tipo?: string } = { page };
    if (nome && nome.trim() !== '') {
        params.nome = nome;
    }
    if (tipo && tipo.trim() !== '') {
        params.tipo = tipo;
    }

    return await api<ApiGetUsuarios>({
        endpoint: 'usuarios',
        data: params
    });
}

export const getUsuariosStats = async () => {
    return await api<UsuarioStats>({
        endpoint: 'usuarios/stats'
    });
};

export const getUsuario = async (id: string) => {
    return await api<ApiGetUsuario>({
        endpoint: `usuarios/${id}`
    })
}

export const newUsuario = async (data: UsuarioFormData) => {
    return await api<ApiNewUsuario>({
        endpoint: 'usuarios',
        method: 'POST',
        data: data 
    });
}

export const updateUsuario = async (id: string, data: UsuarioFormData) => {
    return await api<ApiUpdateUsuario>({
        endpoint: `usuarios/${id}`,
        method: 'PUT',
        data: data
    })
}
export const deleteUsuario = async (id: string) => {
    return await api<ApiDeleteUsuario>({
        endpoint: `usuarios/${id}`,
        method: 'DELETE'
    })
}


// Dashboard
export const getDashboard = async(month: string, year: string) => {
    const response = await api <ApiGetDashboard>({endpoint: 'dashboard'})

    let balance = 0
    let pending_transactions = response.data?.pending_transactions ?? 0
    let completed_transactions = response.data?.completed_transactions ?? 0

    if(response.data){
        response.data.transactions.map(transaction =>{
            const date = formatDate(transaction.created_at).split('/')
            
            if(date[1] == month && date[2] == year) balance += transaction.amount
        })
    }

    return { balance, pending_transactions, completed_transactions}
}

// Nova função para o gráfico de aulas por período
export const getAulasPorPeriodo = async (month: string, year: string) => {
    return await api<AulasPorPeriodo>({
        endpoint: 'agendamentos/aulas-por-periodo',
        data: { month, year }
    });
};

/// Alunos
export const getAlunos = async (page: number, nome?: string) => {
    const params: { page: number; nome?: string } = { page };
    if (nome && nome.trim() !== '') {
        params.nome = nome;
    }


    return await api<ApiGetAlunos>({
        endpoint: 'alunos',
        data: params
    });
}

export const getAlunosPorMes = async (year: string) => {
    return await api<ApiGetAlunosPorMes>({
        endpoint: 'alunos/contagem-por-mes',
        data: { year }
    });
}

export const getTotalAlunos = async () => {
    return await api<{ total: number }>({
        endpoint: 'alunos/total'
    });
};

// Professores
export const getProfessores = async (page: number, nome?: string) => {
    const params: { page: number; nome?: string } = { page };
    if (nome && nome.trim() !== '') {
        params.nome = nome;
    }

    return await api<ApiGetProfessores>({
        endpoint: 'professores',
        data: params
    });
}

export const criarAgendamento = async (data: NovoAgendamentoData) => {
    return await api({
        endpoint: 'agendamentos',
        method: 'POST',
        data: data
    });
}

export const getHorariosDisponiveis = async (professorId: string, data: string) => {
    return await api<ApiGetHorariosDisponiveis>({
        endpoint: `agendamentos/disponiveis/${professorId}`,
        data: { data }
    });
}


// ...
export const getDashboardAgendamentos = async (month: string, year: string) => {
    return await api<DashboardData>({ 
        endpoint: 'agendamentos/dashboard-cards',
        data: { month, year }
    });
};

// Agentamentos

export const getAgendamentos = async (
    page: number, 
    filters: { nome?: string, status?: string, data?: string },
    view: 'futuras' | 'passadas' 
) => {
    return await api<ApiGetAgendamentos>({ 
        endpoint: 'agendamentos', 
        data: { page, ...filters, view }
    });
};

export const getAgendamentoDetalhes = async (id: string) => {
    return await api<AgendamentoDetalhe>({ endpoint: `agendamentos/${id}/detalhes` });
};

export const cancelarAgendamento = async (id: string, motivo: string) => {
    return await api({ endpoint: `agendamentos/${id}/cancelar`, method: 'PUT', data: { motivo } });
};

export const confirmarAgendamento = async (id: string) => {
    return await api({ endpoint: `agendamentos/${id}/confirmar`, method: 'PUT' });
};