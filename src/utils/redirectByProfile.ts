import type { User } from '../@types/Auth';

export const getRedirectPathByProfile = (user: User | null): string => {
    if (!user) {
        return '/signin';
    }
    
    return user.tipoPessoa === 'Administracao' ? '/' : '/agendamento';
};




