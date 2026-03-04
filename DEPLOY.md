# 🚀 PortalNewsAI - Netlify Deployment Guide

Guia completo para deployment do PortalNewsAI no Netlify com integração GitHub.

## 📋 Pré-requisitos

1. **Conta Netlify:** [Criar conta](https://app.netlify.com/signup)
2. **Repositório GitHub:** Repositório do PortalNewsAI
3. **Node.js:** Versão 18.20.8 ou superior
4. **Git:** Para controle de versão

## 🔧 Configuração Inicial

### 1. Conectar GitHub ao Netlify

1. Acesse o [Netlify Dashboard](https://app.netlify.com)
2. Clique em "New site from Git"
3. Selecione o repositório `PortalNewsAI`
4. Configure as opções de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
5. Clique em "Deploy site"

### 2. Configurar Variáveis de Ambiente

No Netlify Dashboard:
1. Vá para "Site settings" > "Build & deploy" > "Environment"
2. Adicione variáveis de ambiente (se necessário):
   ```
   NODE_VERSION=18.20.8
   NEWS_API_KEY=sua-chave-api
   NEWSLETTER_PROVIDER=resend
   NEWSLETTER_API_KEY=sua-chave-de-api
   ```

### 3. Configurar Domínio (Opcional)

1. Vá para "Site settings" > "Domain management"
2. Adicione seu domínio customizado
3. Siga as instruções de DNS

## 🚀 Fluxo de Deploy

### 1. Deploy Automático (Recomendado)

O deploy é automático quando:
- **Push no branch `main`:** Deploy de produção
- **Pull Request:** Deploy de preview
- **Tag Git:** Release automática

### 2. Manual via Script

Usar o script de deploy automático:

```bash
# Deploy completo para produção
./deploy.sh deploy

# Criar preview deploy
./deploy.sh preview

# Fazer build local
./deploy.sh build

# Limpar cache
./deploy.sh cache
```

### 3. Manual via CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Fazer login
netlify login

# Deploy
netlify deploy --prod
```

## 🔧 Configurações do Netlify

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18.20.8"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers de segurança
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"

# Cache para assets estáticos
[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## 📊 Monitoramento

### 1. Logs de Build

Acessar logs:
1. Netlify Dashboard > "Deploys"
2. Clicar no deploy desejado
3. Ver "Build logs"

### 2. Analytics

Acessar analytics:
1. Netlify Dashboard > "Analytics"
2. Ver tráfego, performance, erros

### 3. Deploy Previews

- **URL:** Gerada automaticamente para cada PR
- **Validação:** Testar antes de mesclar
- **Auto-clean:** Removido após merge

## 🔍 Troubleshooting

### 1. Erros Comuns

#### Build Failed
```bash
# Verificar logs
netlify logs --site-id $NETLIFY_SITE_ID

# Testar build local
npm run build
```

#### Module Not Found
```bash
# Verificar imports
grep -r "import.*@/" src/

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Error
```bash
# Verificar versão do Node.js
node --version

# Atualizar netlify.toml
[build.environment]
  NODE_VERSION = "18.20.8"
```

### 2. Performance Issues

#### Build Lento
```toml
# Habilitar build caching
[build]
  cache = true
```

#### Cache Issues
```bash
# Limpar cache
./deploy.sh cache

# Forçar novo deploy
git commit --allow-empty -m "force deploy"
git push
```

### 3. Security Issues

#### Headers de Segurança
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'self'"
```

## 🔄 Workflows GitHub Actions

### 1. Deploy Automático

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build project
        run: npm run build
        
      - name: Deploy to Netlify
        uses: netlify/actions/deploy@master
        with:
          args: --prod
```

### 2. Preview Deploy

```yaml
name: Preview Deploy

on:
  pull_request:
    branches: [ main ]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build project
        run: npm run build
        
      - name: Deploy preview
        uses: netlify/actions/deploy@master
        with:
          args: --dir=public
```

## 📚 Recursos

### 1. Documentação
- [Netlify Docs](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/nextjs/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)

### 2. Ferramentas
- [Netlify Plugin Registry](https://www.netlify.com/plugins/)
- [Netlify Analytics](https://docs.netlify.com/analytics/overview/)
- [Core Web Vitals](https://web.dev/vitals/)

### 3. Templates
- [Next.js + Netlify Template](https://github.com/netlify/nextjs-netlify-starter)
- [React + Netlify Template](https://github.com/netlify/create-react-app)

## 🎯 Melhores Práticas

### 1. Versionamento
- Usar versão específica do Node.js
- Manter dependências atualizadas
- Usar lock files

### 2. Performance
- Habilitar cache
- Otimizar assets
- Monitorar Core Web Vitals

### 3. Segurança
- Configurar headers de segurança
- Usar HTTPS
- Validar inputs

### 4. Monitoramento
- Monitorar builds
- Acompanhar analytics
- Configurar alertas

---

🚀 Pronto para deploy! Use `./deploy.sh deploy` para começar.