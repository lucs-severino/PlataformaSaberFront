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
        pageTotal: number, // <-- Total de páginas adicionado aqui
        items: Usuario[]
    }
}

export type ApiGetUsuario = {
    usuario: Usuario;
}

export type ApiNewUsuario = {
    usuario: Usuario;
}

export type ApiUpdateUsuario = {
    usuario: Usuario;
}

export type ApiDeleteUsuario = {
    success: boolean;
}