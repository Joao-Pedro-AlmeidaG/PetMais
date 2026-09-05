export function validateNomeCompleto(nome) {
  const trimmed = (nome || '').trim();
  if (!trimmed) return 'Informe o nome completo.';
  if (trimmed.length < 2) return 'O nome deve ter no mínimo 2 caracteres.';
  return null;
}

export function validateEmail(email) {
  const trimmed = (email || '').trim();
  if (!trimmed) return 'Informe o e-mail.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) return 'Informe um e-mail válido.';
  return null;
}

export function cleanCPF(value) {
  return (value || '').replace(/\D/g, '');
}

export function formatCPF(value) {
  const digits = cleanCPF(value).slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function isValidCPF(rawValue) {
  const cpf = cleanCPF(rawValue);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const digits = cpf.split('').map(Number);

  const checkDigit = (base) => {
    let sum = 0;
    let weight = base.length + 1;
    for (let i = 0; i < base.length; i += 1) {
      sum += base[i] * weight;
      weight -= 1;
    }
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const base9 = digits.slice(0, 9);
  const dv1 = checkDigit(base9);
  const dv2 = checkDigit([...base9, dv1]);

  return dv1 === digits[9] && dv2 === digits[10];
}

export function validateCPF(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return 'Informe o CPF.';
  if (!isValidCPF(trimmed)) return 'Informe um CPF válido.';
  return null;
}

export function validateSenha(senha) {
  if (!senha) return 'Informe a senha.';
  return null;
}

export function validateRepetirSenha(senha, repetir) {
  if (!repetir) return 'Repita a senha.';
  if (senha !== repetir) return 'As senhas não coincidem.';
  return null;
}
