# PetMais — App Mobile (Fase 1)

Front-end mobile em **React Native (Expo)** do PetMais. Nesta fase, tudo é visual e os dados são simulados (mock) em memória — sem back-end.

## Como rodar

Pré-requisitos: [Node.js](https://nodejs.org) (LTS) instalado e o app **Expo Go** no seu celular (Android/iOS), ou um emulador Android/iOS configurado.

```bash
cd petmais
npm install
npx expo start
```

Depois é só escanear o QR Code com o Expo Go (Android) ou a câmera (iOS), ou pressionar `a` (emulador Android), `i` (simulador iOS) ou `w` (navegador) no terminal.

> Se o `npm install` reclamar de versões, rode `npx expo install --fix` para o Expo ajustar as versões das libs à sua SDK instalada.

### Conta de teste

Já existe um usuário pré-cadastrado para testar o login sem precisar criar uma conta:

- **Login:** `ana.souza@petmais.com`
- **Senha:** `123456`

Ou toque em "Criar cadastro" na tela de login para criar sua própria conta.

## Estrutura do projeto

```
petmais/
├─ App.js                    # Providers + navegação + assistente global
├─ src/
│  ├─ screens/                # Login, Cadastro, Produtos, Detalhe, Carrinho, Pedido Finalizado
│  ├─ components/              # Button, Input, Header, ProductCard, CartItemRow, Assistente (botão + chat)
│  ├─ context/                 # AuthContext, CartContext, OrdersContext, AssistantContext
│  ├─ data/                    # mockProducts.js, mockUsers.js
│  ├─ navigation/               # AppNavigator (React Navigation - Stack)
│  ├─ theme/                    # theme.js (cores, espaçamento, tipografia)
│  └─ utils/                    # validators.js (CPF real, e-mail, senha), formatters.js, assistentResponses.js
```

## O que foi implementado

— Cadastro e login simulados (`AuthContext`), com validação completa em tempo real.
— Catálogo com busca, preço atual/promocional e botão de adicionar ao carrinho.
— Tela de carrinho com total e remoção individual de itens.
— Finalizar pedido gera um registro de compra (`nomeProduto`, `preco`, `dataDaCompra`) para cada item do carrinho e mostra a tela de confirmação.
— Assistente com IA simulado (botão flutuante "IA", disponível em todas as telas), que responde por palavras-chave sobre rações, promoções (consultando o catálogo em tempo real), carrinho e finalização de pedido.

## Decisões de projeto (por conta de pontos em aberto no enunciado)

1. **E-mail vs. login:** o modelo de dados do Usuário tem exatamente 4 atributos (`nomeCompleto`, `cpf`, `login`, `senha`), mas a tela de cadastro pede um campo "E-mail". O e-mail informado no cadastro é armazenado como o próprio valor de `login`, então o usuário loga com e-mail + senha.
2. **Itens do carrinho:** cada toque em "adicionar" cria uma nova linha no carrinho (em vez de somar quantidade), pois a `Compra` não tem campo de quantidade — isso bate com a regra "gera-se uma compra por produto no momento da finalização".
3. **CPF:** a validação usa o algoritmo real de dígitos verificadores (módulo 11), rejeitando também CPFs com todos os dígitos iguais.
