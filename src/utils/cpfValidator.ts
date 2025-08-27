/**
 * Valida um número de CPF brasileiro (versão simplificada).
 * @param cpf - O CPF a ser validado (pode conter máscara).
 * @returns `true` se o CPF tiver 11 dígitos numéricos, `false` caso contrário.
 */
export const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCpf = cpf.replace(/[^\d]+/g, '');

  // Verifica se o CPF tem 11 dígitos e se não são todos iguais
  if (cleanCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanCpf)) {
    return false;
  }

  // Se passou na verificação de 11 dígitos, retorna true.
  return true;
};

/**
 * Aplica a máscara de CPF (XXX.XXX.XXX-XX) a uma string.
 * @param value - A string de CPF a ser mascarada.
 * @returns O CPF com a máscara aplicada.
 */
export const maskCPF = (value: string): string => {
  return value
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígitos
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca um hífen entre o nono e o décimo dígitos
    .substring(0, 14); // Limita o tamanho máximo
};