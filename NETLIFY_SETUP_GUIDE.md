# 🔧 Configuração Manual do Site Netlify - PortalNewsAI

Guia passo a passo para reconfigurar o PortalNewsAI no Netlify.

## 📋 Pré-requisitos

1. **Conta Netlify:** https://app.netlify.com
2. **Repositório GitHub:** https://github.com/luizgiprok/PortalNewsAI
3. **Acesso ao terminal:** Para comandos de deploy

## 🚀 Passo a Passo de Configuração

### 1. Criar Novo Site no Netlify

1. Acesse: https://app.netlify.com
2. Clique em **"New site from Git"**
3. Selecione **GitHub** como provedor
4. Autorize o Netlify a acessar seu GitHub
5. Selecione o repositório: `luizgiprok/PortalNewsAI`

### 2. Configurar Build Settings

Na tela de configuração, preencha:

**Build settings:**
- **Build command:** `npm run build`
- **Publish directory:** `out`

**Environment variables:**
- **NODE_VERSION:** `18.20.8`

### 3. Configurar Deploy Settings

**Deploy context:**
- **Production branch:** `main`
- **Deploy preview:** Habilitado (recomendado)

**Deploy settings:**
- **Branch to deploy:** `main`
- **Deploy preview settings:** Habilitado para Pull Requests

### 4. Configurar Domínio (Opcional)

Se você tem um domínio customizado:
1. Vá para **"Site settings"** > **"Domain management"**
2. Adicione seu domínio
3. Siga as instruções de DNS

### 5. Habilitar Next.js Runtime

1. Vá para **"Site settings"** > **"Build & deploy"**
2. Em **"Next.js runtime"**, habilite:
   - ✅ **Use Next.js runtime**

### 6. Verificar Configuração do netlify.toml

Certifique-se de que o `netlify.toml` está na raiz do projeto:

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

### 7. Fazer Deploy Manual (Se Necessário)

Se o deploy automático não funcionar:

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Fazer login
netlify login

# Fazer deploy
netlify deploy --prod --dir=out
```

## 🔍 Verificação do Deploy

### 1. Acessar Dashboard
- URL: https://app.netlify.com
- Status do deploy: Em tempo real

### 2. Verificar Logs
- Vá para **"Deploys"**
- Clique no deploy desejado
- Ver **"Build logs"**

### 3. Testar Site
- URL do site: `https://random-name.netlify.app`
- O Netlify gera um nome aleatório automaticamente

## 🚀 Deploy Automático

Após a configuração, o deploy será automático:

1. **Push no `main`:** Deploy de produção
2. **Pull Request:** Preview deploy
3. **Tags Git:** Release automática

## 🔧 Troubleshooting Comum

### 1. Site não encontrado
- **Solução:** Recriar o site no Netlify
- **Passos:** Seguir o guia acima

### 2. Build Failed
- **Verificar logs:** Netlify Dashboard > Deploys > Build logs
- **Testar local:** `npm run build`

### 3. Módulos não encontrados
- **Reinstalar:** `rm -rf node_modules && npm install`
- **Verificar imports:** `grep -r "import.*@/" src/`

### 4. Cache Issues
- **Limpar cache:** Netlify Dashboard > Site settings > Build & deploy > Clear cache
- **Forçar deploy:** `git commit --allow-empty -m "force deploy"`

## 📊 Monitoramento

### 1. Analytics
- **URL:** Netlify Dashboard > Analytics
- **Métricas:** Tráfego, performance, erros

### 2. Deploy Status
- **URL:** Netlify Dashboard > Deploys
- **Status:** Tempo real

### 3. Core Web Vitals
- **URL:** Netlify Dashboard > Analytics > Core Web Vitals
- **Performance:** Monitoramento contínuo

## 🎯 URLs Importantes

- **Dashboard Netlify:** https://app.netlify.com
- **PortalNewsAI:** https://app.netlify.com/sites/portalnewsai
- **GitHub:** https://github.com/luizgiprok/PortalNewsAI
- **Documentação:** https://docs.netlify.com

---

🚀 **Depois de configurar, o site deve estar disponível em:**  
`https://[nome-aleatorio].netlify.app`

**Onde [nome-aleatorio] será gerado automaticamente pelo Netlify!**