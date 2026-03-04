# 🚀 Netlify Deployment Quick Reference

Guia rápido para deployments no Netlify - PortalNewsAI

## 📝 Comandos Essenciais

### 1. Deploy Manual
```bash
# Deploy para produção
./deploy.sh deploy

# Preview deploy (para PRs)
./deploy.sh preview

# Build local
./deploy.sh build

# Limpar cache
./deploy.sh cache
```

### 2. Via Netlify CLI
```bash
# Login
netlify login

# Deploy produção
netlify deploy --prod

# Deploy preview
netlify deploy --dir=out

# Ver status
netlify status
```

## 🔧 Configurações

### netlify.toml (Padrão)
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
```

### Headers Importantes
```toml
# Segurança
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

# Cache
[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## 🚀 Fluxo de Trabalho

### 1. Desenvolvimento → Deploy
```bash
# 1. Desenvolver
git checkout -b feature/nova-funcionalidade

# 2. Commitar
git add .
git commit -m "feat: Nova funcionalidade"

# 3. Criar PR
git push origin feature/nova-funcionalidade

# 4. Preview deploy automático
# URL gerada automaticamente pelo Netlify
```

### 2. Deploy de Produção
```bash
# 1. Merge para main
git checkout main
git merge feature/nova-funcionalidade

# 2. Push para main
git push origin main

# 3. Deploy automático
# URL: https://portalnewsai.netlify.app
```

## 🔍 Troubleshooting Rápido

### Build Failed
```bash
# Verificar logs
netlify logs --site-id 6803d701f0bd828c668af7aa

# Testar build local
npm run build
```

### Módulo Não Encontrado
```bash
# Verificar imports
grep -r "import.*@/" src/

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Cache Issues
```bash
# Limpar cache
./deploy.sh cache

# Forçar deploy
git commit --allow-empty -m "force deploy"
git push
```

## 📊 Monitoramento

### URLs Importantes
- **Site:** https://portalnewsai.netlify.app
- **Dashboard:** https://app.netlify.com/portalnewsai
- **Logs:** https://app.netlify.com/portalnewsai/deploy

### Analytics
- **Tráfego:** Netlify Dashboard > Analytics
- **Performance:** Core Web Vitals
- **Erros:** Build logs > Error tracking

## 🎯 Dicas Rápidas

1. **Sempre** usar `NODE_VERSION = "18.20.8"`
2. **Nunca** esquecer de `publish = "out"`
3. **Sempre** configurar redirects para SPA
4. **Usar** headers de segurança
5. **Habilitar** cache para assets estáticos

---

🚀 Pronto para deploy!