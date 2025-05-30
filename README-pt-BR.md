# Rubrion Engage Hub - Plataforma Empresarial

Uma plataforma multilíngue e multi-tenant white-label que serve como a solução empresarial principal dentro do ecossistema da Rubrion. Esta plataforma permite que organizações e empresas implementem sua própria presença digital com marca personalizada e suporte completo de localização, aproveitando o modelo "sem código, sem taxa de licença" da Rubrion.

## 🚀 Demo Ao Vivo

Experimente a plataforma em ação com dados simulados:

**[https://engage-hub.rubrion.com/](https://engage-hub.rubrion.com/)**

## Sobre a Rubrion

A Rubrion oferece serviços digitais avançados para organizações usando um modelo **"sem código, sem taxa de licença"**: entregamos soluções SaaS open-source pré-configuradas, hospedadas e mantidas (CMS, e-commerce, LMS, etc.) para que os clientes não precisem programar ou pagar licenças proprietárias—cobrindo apenas custos de infraestrutura e taxas baseadas no uso.

Utilizamos **arquiteturas white-label multi-tenant**: a maior parte do código é compartilhada, mas cada instância é implantada como um serviço isolado e atômico, garantindo ambientes seguros e escaláveis. Como parceiro técnico principal, automatizamos pipelines de deployment, gerenciamos parcerias de hospedagem, ajustamos planos baseados no uso real e reinvestimos parte da receita em software livre—completando um ciclo que torna a tecnologia acessível e fortalece o ecossistema de impacto.

## Visão Geral da Plataforma

A Plataforma Empresarial Engage Hub é uma solução abrangente em React + TypeScript projetada para:

- **Arquitetura Multi-tenant**: Código único servindo múltiplas instâncias isoladas de clientes
- **Suporte Multilíngue**: Implementação completa de i18n com gerenciamento de conteúdo remoto
- **Marca White-label**: Temas, conteúdo e recursos personalizáveis por tenant
- **Infraestrutura Escalável**: Construída para deployment em nuvem com CI/CD automatizado
- **Base Open Source**: Aproveitando tecnologias orientadas pela comunidade

## Índice

- [Principais Recursos](#principais-recursos)
- [Arquitetura](#arquitetura)
- [Capacidades Multi-tenant](#capacidades-multi-tenant)
- [Internacionalização](#internacionalização)
- [Primeiros Passos](#primeiros-passos)
- [Desenvolvimento](#desenvolvimento)
- [Deploy](#deploy)
- [Documentação](#documentação)
- [Contribuindo](#contribuindo)

## Principais Recursos

### Capacidades Centrais da Plataforma
- **Arquitetura Multi-tenant White-label**: Código único servindo múltiplas instâncias isoladas de clientes
- **Internacionalização Abrangente**: Traduções estáticas da UI + gerenciamento dinâmico de conteúdo remoto
- **Gerenciamento de Conteúdo em Tempo Real**: Conteúdo multilíngue baseado no Firestore com fallbacks de idioma
- **Fontes de Dados Flexíveis**: Suporte para Firestore, APIs REST e mocking MSW
- **Temas Avançados**: Temas personalizáveis por tenant com suporte a modo escuro/claro
- **Roteamento Enterprise**: Roteamento type-safe com metadados SEO e lazy loading

### Desenvolvimento e Operações
- **Stack Tecnológico Moderno**: React 19 + TypeScript + Vite para performance otimizada
- **CI/CD Automatizado**: GitHub Actions com versionamento semântico e automação de deployment
- **Garantia de Qualidade**: ESLint, Prettier, Vitest com suíte de testes abrangente
- **Ferramentas de Desenvolvimento**: MSW para mocking de API, utilitários de debug e troca de tenant
- **Segurança**: Criptografia de arquivos BlackBox para configuração sensível
- **Performance**: Divisão de código, lazy loading e estratégias otimizadas de cache

### Recursos Empresariais
- **Páginas Profissionais**: Home, Sobre, Serviços, Projetos, Blog, Contato, Equipe
- **Showcase de Conteúdo**: Portfólios de projetos, perfis de equipe, descrições de serviços
- **Integração de Parceiros**: Logotipos e informações de parceiros
- **Gerenciamento de Contato**: Formulários e informações de contato multi-canal
- **Otimização SEO**: Gerenciamento de metadados baseado no Helmet com personalização por tenant

## Arquitetura

### Design Multi-tenant
```
Deploy Único → Múltiplos Sites de Cliente
├── acme.rubrion.com (Tenant: acme)
├── beta.rubrion.com (Tenant: beta)
└── demo.rubrion.com (Tenant: demo)
```

Cada tenant possui isoladamente:
- **Configuração**: Tema, recursos, informações de contato
- **Conteúdo**: Projetos, posts de blog, membros da equipe, serviços
- **Marca**: Logo, cores, tipografia, estilo personalizado
- **Dados**: Coleções separadas do Firestore com namespace de tenant

### Stack Tecnológico
- **Frontend**: React 19, TypeScript, Material-UI, Framer Motion
- **Roteamento**: React Router com navegação type-safe
- **Gerenciamento de Estado**: React Context + TanStack Query
- **Internacionalização**: i18next com suporte a conteúdo remoto
- **Banco de Dados**: Firestore com arquitetura de dados multi-tenant
- **Desenvolvimento**: Vite, MSW, Vitest, ESLint, Prettier
- **Deploy**: GitHub Actions, versionamento automatizado

## Capacidades Multi-tenant

### Resolução de Tenant
- **Produção**: Baseado em subdomínio (`acme.rubrion.com` → `acme`)
- **Desenvolvimento**: Parâmetro de query (`localhost:3000?tenant=acme`)
- **Fallback**: Tenant demo para ambientes de desenvolvimento

### Personalização por Tenant
- **Temas**: Cores primárias/secundárias, tipografia, espaçamento
- **Recursos**: Alternar newsletter, blog, formulários de contato, analytics
- **Conteúdo**: Projetos localizados, serviços, informações da equipe
- **Marca**: Logotipos personalizados, informações da empresa, links sociais

### Isolamento de Dados
```
tenants/
├── acme/
│   ├── config: { theme, features, contact }
│   ├── projects/
│   ├── blog/
│   └── team/
├── beta/
│   └── ...
```

## Internacionalização

### Traduções Estáticas (Elementos da UI)
- **Idiomas Suportados**: Inglês, Espanhol, Português (extensível)
- **Arquivos de Tradução**: Baseados em JSON com organização hierárquica
- **Utilitários**: Funções de tradução type-safe com fallbacks
- **Desenvolvimento**: Detecção e debug de traduções ausentes

### Conteúdo Remoto Dinâmico
- **Estrutura Firestore**: Subcoleções específicas por idioma por documento
- **Transparência da API**: Retorna conteúdo com o idioma real utilizado
- **Estratégia de Fallback**: Fallback automático para inglês quando traduções indisponíveis
- **Integração MSW**: Respostas multilíngues simuladas para desenvolvimento

### Seleção de Idioma
- **Persistente**: Preferência de idioma mantida durante navegação
- **Fallback**: Degradação graciosa quando conteúdo indisponível

## Primeiros Passos

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### Início Rápido

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/rubrion/engage-hub-business.git
   cd engage-hub-business
   ```

2. **Instalar Dependências**
   ```bash
   npm install
   ```

3. **Inicializar MSW (Mock Service Worker)**
   ```bash
   npx msw init ./public --save
   ```

4. **Iniciar Servidor de Desenvolvimento**
   ```bash
   # Iniciar com tenant demo
   npm run dev
   
   # Iniciar com tenant específico
   npm run dev -- --tenant=acme
   ```

5. **Acessar a Aplicação**
   ```
   http://localhost:3000          # Tenant demo
   http://localhost:3000?tenant=acme  # Tenant específico
   ```

### Configuração de Ambiente

Crie um arquivo `.env` para seu ambiente:

```env
# Configuração Firebase (para Firestore)
VITE_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"..."}'

# Feature Flags
VITE_USE_FIRESTORE=false
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NEWSLETTER=true
VITE_MAINTENANCE_MODE=false

# Configuração da API
VITE_API_URL=https://api.rubrion.com/{tenant}
```

## Desenvolvimento

### Estrutura do Projeto
```
src/
├── components/           # Componentes UI reutilizáveis
│   ├── ui/              # Componentes UI básicos
│   ├── content/         # Componentes específicos de conteúdo
│   └── translation/     # Utilitários de tradução
├── context/             # Contextos React (Theme, Tenant, Language)
├── core/                # Utilitários centrais (resolução de tenant)
├── hooks/               # Hooks React customizados
├── i18n/                # Internacionalização
│   ├── locales/         # Arquivos de tradução
│   └── msw/             # Handlers MSW para i18n
├── pages/               # Componentes de página
├── routes/              # Configuração de roteamento
├── services/            # Serviços de API e busca de dados
├── theme/               # Configuração de tema
└── utils/               # Funções utilitárias
```

### Scripts de Desenvolvimento

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor de desenvolvimento
npm run dev:prod         # Iniciar em modo produção

# Build
npm run build            # Build para produção
npm run build:mocked     # Build com dados simulados
npm run preview          # Visualizar build de produção

# Qualidade de Código
npm run lint             # Executar ESLint
npm run lint:fix         # Corrigir problemas ESLint
npm run format           # Formatar com Prettier
npm run format:check     # Verificar formatação

# Testes
npm run test             # Executar testes
npm run test:coverage    # Gerar relatório de cobertura
npm run test:ui          # Abrir UI do Vitest

# Utilitários
npm run clean:logs:check # Verificar declarações console.log
npm run clean:logs:fix   # Substituir console.log com debugLog
```

### Adicionando um Novo Tenant

1. **Criar Configuração do Tenant** (no Firestore ou dados simulados)
   ```json
   {
     "name": "Nova Empresa",
     "theme": {
       "primary": "#1976d2",
       "secondary": "#dc004e"
     },
     "features": {
       "newsletter": true,
       "blog": true,
       "analytics": true
     },
     "contact": {
       "email": "info@novaempresa.com",
       "phone": "+5511999999999"
     }
   }
   ```

2. **Adicionar Conteúdo** (projetos, equipe, serviços)
3. **Testar Localmente**
   ```bash
   npm run dev -- --tenant=novaempresa
   ```

### Adicionando Novos Idiomas

1. **Criar Arquivos de Tradução**
   ```
   src/i18n/locales/de/
   ├── index.ts
   ├── common.json
   ├── navigation.json
   └── screens/
       ├── home.json
       ├── about.json
       └── ...
   ```

2. **Atualizar Contexto de Idioma**
   ```typescript
   // src/context/LanguageContext.tsx
   const languages = ['en', 'es', 'pt', 'de'];
   ```

3. **Adicionar Conteúdo Remoto** (no Firestore)
   ```
   projects/{projectId}/de/content/
   blogPosts/{postId}/de/content/
   ```

## Deploy

### Deploy Automatizado

A plataforma usa GitHub Actions para deploy automatizado:

1. **Desenvolvimento**: Push para branch `develop` aciona deploy de desenvolvimento
2. **Staging**: Criar branch de release para deploy de staging  
3. **Produção**: Merge para branch `main` aciona deploy de produção

### Deploy Manual

```bash
# Inicializar branch main (para novos projetos)
bash scripts/init-main-branch.sh

# Build para produção
npm run build

# Deploy para provedor de hospedagem
# (Configurar baseado na sua solução de hospedagem)
```

### Builds Específicos por Ambiente

```bash
# Build de desenvolvimento com mocks
npm run build:mocked

# Build de produção
npm run build
```

Para informações detalhadas de deploy, veja [docs/pipeline.md](./docs/pipeline.md).

## Documentação

Documentação abrangente está disponível no diretório `docs/`:

- **[Visão Geral da Arquitetura](./docs/architecture-overview.md)** - Design e estrutura do sistema
- **[Guia Multi-tenant](./docs/multi-tenant.md)** - Implementação multi-tenancy
- **[Internacionalização](./docs/i18n.md)** - Guia completo de i18n
- **[Serviços de Dados](./docs/data-services.md)** - Documentação da camada de dados
- **[Sistema de Temas](./docs/theming.md)** - Personalização de tema
- **[Sistema de Roteamento](./docs/routing-system.md)** - Navegação e roteamento
- **[Biblioteca de Componentes](./docs/component-library.md)** - Componentes UI
- **[Sistema de Debug](./docs/debug-system.md)** - Ferramentas de desenvolvimento
- **[Variáveis de Ambiente](./docs/environment-variables.md)** - Configuração
- **[Pipeline CI/CD](./docs/pipeline.md)** - Processos de deploy

## Contribuindo

### Configuração de Desenvolvimento

1. **Fork do Repositório**
2. **Criar Branch de Feature**
   ```bash
   git checkout -b feature/nova-feature
   ```
3. **Fazer Alterações**
4. **Executar Testes**
   ```bash
   npm run test
   npm run lint
   ```
5. **Submeter Pull Request**

### Padrões de Código

- **TypeScript**: Modo strict habilitado
- **ESLint**: Configuração Airbnb com regras customizadas
- **Prettier**: Formatação consistente de código
- **Testes**: Vitest com React Testing Library
- **Commits**: Mensagens de commit convencionais

### Seeding de Dados de Tenant

Use os scripts fornecidos para dados de desenvolvimento consistentes:

```bash
# Seed tenant específico
npm run seed:tenant -- --tenant=acme

# Seed todos os tenants  
npm run seed:all
```

## Segurança e Configuração

### Criptografia de Arquivos BlackBox

Para manuseio seguro de arquivos de configuração sensíveis, este projeto usa StackExchange BlackBox:

#### Instruções de Configuração

1. **Instalar BlackBox**
   ```bash
   git clone https://github.com/StackExchange/blackbox.git
   cd blackbox
   sudo make copy-install
   ```

2. **Importar Chaves GPG** (obter do mantenedor do projeto)
   ```bash
   # Importar chave pública
   echo "chave_publica_codificada_base64" | base64 --decode | gpg --import
   
   # Importar chave privada  
   echo "chave_privada_codificada_base64" | base64 --decode | gpg --import
   ```

3. **Verificar Importação**
   ```bash
   gpg --list-secret-keys
   ```

4. **Descriptografar Arquivos do Projeto**
   ```bash
   blackbox_decrypt_all_files
   ```

### Segurança de Ambiente

- Configuração sensível armazenada criptografada no repositório
- Variáveis de ambiente para configurações específicas de deploy
- Projetos Firebase separados para desenvolvimento/staging/produção
- Isolamento de segurança específico por tenant

---

## Integração do Ecossistema Rubrion

Esta plataforma faz parte do ecossistema mais amplo de soluções SaaS open-source da Rubrion:

### Plataformas Relacionadas
- **Gerenciamento de Conteúdo**: CMS headless com suporte multi-tenant
- **E-commerce**: Plataforma de loja online white-label  
- **Gerenciamento de Aprendizado**: Sistema de entrega de conteúdo educacional
- **Analytics**: Dashboard de analytics focado em privacidade

### Benefícios do Modelo de Negócio
- **Sem Codificação Necessária**: Soluções pré-configuradas prontas para deploy
- **Sem Taxas de Licença**: Base open-source com preços transparentes
- **Apenas Infraestrutura**: Clientes pagam pelo uso real, não licenças de software
- **Gerenciamento Automatizado**: Deploy, manutenção e atualizações tratados automaticamente

### Parceria Técnica
Como parceiro técnico principal da Rubrion, esta plataforma demonstra:
- **DevOps Automatizado**: Automação completa de pipeline CI/CD
- **Arquitetura Escalável**: Design multi-tenant para uso eficiente de recursos
- **Compromisso Open Source**: Reinvestimento de receita em desenvolvimento de software livre
- **Parcerias de Hospedagem**: Gerenciamento otimizado de infraestrutura em nuvem

---

## Licença

Este projeto é licenciado sob a **GNU General Public License v3.0** (GPL-3.0).

## Suporte

- **Documentação**: Guias completos no diretório `/docs`
- **Issues**: GitHub Issues para relatórios de bugs e solicitações de recursos
- **Comunidade**: Junte-se à nossa comunidade para discussões e suporte
- **Enterprise**: Contate a Rubrion para deploy enterprise e personalização

[![Donate via PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif 'Donate via PayPal')](https://www.paypal.com/donate/?hosted_button_id=KBPKKS3627FX6)

---

**Construído com ❤️ pela Equipe Rubrion**

*Tornando a tecnologia acessível através da inovação open-source*
