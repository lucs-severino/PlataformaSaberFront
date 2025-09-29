export type User = {
    id: string,
    name: string,
    email: string,
    cpf: string,
    dataNascimento?: string,
    created_at?: number
}

export type ApiSignUp = {
    user : User,
    authToken : string
}

export type ApiSignIn = {
    user : User,
    authToken : string
}

export type ApiGetUser = {
    user : User
}

export type ApiUpdateUser = {
    user : {
        id: string,
        nome: string,
        email: string,
        cpf: string,
        dataNascimento?: string
    }
}

export type ApiDeleteUser = {
    success : boolean
}
