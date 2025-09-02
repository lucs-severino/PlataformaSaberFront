export type UsuarioStatus = "Ativo" | "Inativo" | "Pendente"

export type TipoPessoa = "Professor" | "Administracao" | "Aluno" | "Responsavel"

export type Usuario = {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    dataNascimento: string;
    status: UsuarioStatus;
    dataCadastro: string;
    tipoPessoa: TipoPessoa;
}

export type ApiGetUsuarios = {
    usuarios: {
        itemsReceived: number,
        curPage: number,
        nextPage?: string,
        prevPage?: string,
        offset: number,
        itemsTotal: number,
        pageTotal: number, 
        items: Usuario[]
    }
}

export type ApiGetUsuario = Usuario;

export type ApiNewUsuario = {
    usuario: Usuario;
}

export type ApiUpdateUsuario = Usuario; 

export type ApiDeleteUsuario = {
    success: boolean;
}

export type ApiGetAlunos = {
    alunos: {
        itemsReceived: number,
        curPage: number,
        nextPage?: string,
        prevPage?: string,
        offset: number,
        itemsTotal: number,
        pageTotal: number,
        items: Usuario[] 
    }
}

export type ApiProfessor = {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    dataNascimento: string | null;
    status: string;
}

export type ApiGetProfessores = {
    professores: {
        itemsReceived: number,
        curPage: number,
        itemsTotal: number,
        pageTotal: number,
        items: ApiProfessor[]
    }
}

