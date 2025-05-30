/**
 * Gera um código de indicação único baseado em um ID de usuário
 * @param userId - ID do usuário
 * @returns string - Código de indicação único
 */
export const generateReferralCode = (userId: string): string => {
  // Converte o ID do usuário em um número
  const numericId = parseInt(userId.replace(/\D/g, ''), 10) || 0;
  
  // Gera um timestamp atual em milissegundos
  const timestamp = Date.now();
  
  // Combina o ID numérico com o timestamp
  const combined = numericId + timestamp;
  
  // Converte para string e pega os últimos 10 dígitos
  const code = combined.toString().slice(-10);
  
  // Garante que o código tenha exatamente 10 dígitos, preenchendo com zeros à esquerda se necessário
  return code.padStart(10, '0');
};

/**
 * Valida se um código de indicação é válido
 * @param code - Código de indicação a ser validado
 * @returns boolean - true se o código for válido, false caso contrário
 */
export const isValidReferralCode = (code: string): boolean => {
  // Verifica se o código tem exatamente 10 dígitos e contém apenas números
  return /^\d{10}$/.test(code);
}; 