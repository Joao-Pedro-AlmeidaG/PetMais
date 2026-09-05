import { mockProducts } from '../data/mockProducts';
import { formatCurrency } from './formatters';

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function listPromotions() {
  const emPromocao = mockProducts.filter(
    (p) => p.precoPromocional !== null && p.precoPromocional < p.precoAtual
  );
  if (emPromocao.length === 0) {
    return 'No momento não há produtos em promoção. Volte para conferir mais tarde!';
  }
  const linhas = emPromocao
    .map((p) => `• ${p.nome}: de ${formatCurrency(p.precoAtual)} por ${formatCurrency(p.precoPromocional)}`)
    .join('\n');
  return `Estas são as promoções de hoje:\n${linhas}`;
}

function listPuppyFood() {
  const racoesFilhote = mockProducts.filter(
    (p) => p.tipo === 'Ração' && normalize(p.nome + ' ' + p.descricao).includes('filhote')
  );
  if (racoesFilhote.length === 0) {
    return 'Recomendo escolher uma ração com a indicação "filhotes" na embalagem, que tem mais proteína e calorias para o crescimento.';
  }
  const linhas = racoesFilhote.map((p) => `• ${p.nome} — ${formatCurrency(p.precoAtual)}`).join('\n');
  return `Para filhotes, recomendo:\n${linhas}\nElas têm mais proteína, ideal para essa fase de crescimento.`;
}

const rules = [
  {
    keywords: ['filhote', 'racao', 'ração', 'alimentar'],
    response: listPuppyFood,
  },
  {
    keywords: ['promoc', 'promoç', 'desconto', 'oferta'],
    response: listPromotions,
  },
  {
    keywords: ['pagamento', 'pagar', 'cartao', 'cartão', 'pix'],
    response: () =>
      'O pagamento não é feito no aplicativo. Você monta o pedido aqui e paga no caixa da loja, no momento da retirada.',
  },
  {
    keywords: ['finaliz', 'como compro', 'como faco o pedido', 'como faço o pedido'],
    response: () =>
      'Para finalizar seu pedido: adicione produtos ao carrinho, abra "Meu carrinho" e toque em "Finalizar pedido". O pagamento é feito no caixa da loja, na retirada.',
  },
  {
    keywords: ['carrinho'],
    response: () =>
      'No carrinho você vê todos os itens adicionados e o valor total. Toque no "x" ao lado de um item para removê-lo.',
  },
  {
    keywords: ['cadastr', 'criar conta', 'conta nova'],
    response: () =>
      'Para criar uma conta, toque em "Criar cadastro" na tela de login e preencha nome completo, e-mail, CPF e senha.',
  },
  {
    keywords: ['cpf'],
    response: () =>
      'O CPF precisa ser válido (dígitos verificadores corretos) para o cadastro ser concluído. Digite apenas os números.',
  },
  {
    keywords: ['ola', 'olá', 'oi', 'bom dia', 'boa tarde', 'boa noite'],
    response: () => 'Olá! Sou o assistente do PetMais. Posso ajudar com produtos, promoções e pedidos.',
  },
  {
    keywords: ['obrigad', 'valeu'],
    response: () => 'Por nada! Se precisar de mais alguma coisa, é só chamar. 🐾',
  },
];

export function getAssistantReply(userMessage) {
  const normalized = normalize(userMessage);
  const matched = rules.find((rule) => rule.keywords.some((k) => normalized.includes(normalize(k))));
  if (matched) return matched.response();
  return 'Posso ajudar com dúvidas sobre rações, promoções, o carrinho ou como finalizar o pedido. Pode perguntar!';
}

export const suggestedQuestions = [
  'Qual ração é indicada para filhotes?',
  'Quais produtos estão em promoção hoje?',
  'Como finalizo meu pedido?',
];
