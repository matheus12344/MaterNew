# Mater - Socorro Veicular Inteligente

Este é o repositório do Mater, uma plataforma que conecta motoristas a prestadores de serviço de forma rápida e eficiente.

## 🚀 Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Turborepo
- pnpm

## 📦 Estrutura do Projeto

```
mater-landing/
├── apps/
│   └── web/          # Landing page (Next.js)
├── packages/
│   ├── ui/           # Componentes compartilhados
│   └── config/       # Configurações compartilhadas
└── package.json
```

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/mater-landing.git
cd mater-landing
```

2. Instale as dependências:
```bash
pnpm install
```

3. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

## 📝 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Compila o projeto para produção
- `pnpm lint` - Executa o linter em todos os pacotes
- `pnpm test` - Executa os testes

## 🎨 Design System

O projeto utiliza uma paleta de cores baseada em:
- Preto (#000000)
- Amarelo (#FFD700)
- Cinza Metálico (#2C3E50)

## 📱 Responsividade

O projeto é desenvolvido com abordagem mobile-first, garantindo uma experiência otimizada em todos os dispositivos.

## 🔄 CI/CD

O projeto está configurado para deploy automático na Vercel.

## 📄 Licença

Este projeto está sob a licença MIT.
