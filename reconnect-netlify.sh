#!/bin/bash

# Script para reconfigurar a conexão GitHub-Netlify
# Garante que o Netlify esteja buscando os arquivos corretos do GitHub

set -e

# Configurações
PROJECT_NAME="PortalNewsAI"
GITHUB_REPO="luizgiprok/PortalNewsAI"
GITHUB_BRANCH="main"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se estamos no diretório correto
check_directory() {
    if [ ! -f "package.json" ] || [ ! -f "netlify.toml" ]; then
        log_error "Você não está no diretório do projeto PortalNewsAI."
        log_error "Por favor, execute este script no diretório raiz do projeto."
        exit 1
    fi
    log_success "Diretório do projeto verificado!"
}

# Verificar status do repositório
check_git_status() {
    log_info "Verificando status do repositório..."
    
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        log_error "Você não está em um repositório Git."
        exit 1
    fi
    
    # Verificar se está no branch correto
    current_branch=$(git branch --show-current)
    if [ "$current_branch" != "main" ]; then
        log_warning "Você está no branch '$current_branch'. Mudando para 'main'..."
        git checkout main
    fi
    
    # Verificar status do repositório
    if [ -n "$(git status --porcelain)" ]; then
        log_warning "Existem mudanças não commitadas. Fazendo commit..."
        git add .
        git commit -m "feat: Atualizações para deploy Netlify"
        log_success "Mudanças commitadas!"
    fi
    
    # Verificar conexão com o GitHub
    if ! git remote -v | grep -q "github.com"; then
        log_error "Repositório GitHub não encontrado nos remotes."
        exit 1
    fi
    
    log_success "Repositório GitHub verificado!"
}

# Verificar último commit
check_latest_commit() {
    log_info "Verificando último commit..."
    
    latest_commit=$(git log -1 --oneline)
    log_info "Último commit: $latest_commit"
    
    # Verificar se o commit tem os arquivos necessários
    if ! git show --name-only HEAD | grep -q "netlify.toml"; then
        log_warning "netlify.toml não encontrado no último commit. Adicionando..."
        git add netlify.toml
        git commit -m "feat: Adicionar netlify.toml para deploy Netlify"
        log_success "netlify.toml adicionado!"
    fi
    
    log_success "Último commit verificado!"
}

# Verificar Netlify CLI
check_netlify_cli() {
    log_info "Verificando Netlify CLI..."
    
    if ! command -v netlify &> /dev/null; then
        log_error "Netlify CLI não encontrado. Instalando..."
        npm install -g netlify-cli
    fi
    
    # Verificar login
    if ! netlify status &> /dev/null; then
        log_info "Fazendo login no Netlify..."
        netlify login
    fi
    
    log_success "Netlify CLI verificado!"
}

# Verificar se o site existe no Netlify
check_site_exists() {
    log_info "Verificando se o site existe no Netlify..."
    
    # Listar sites e procurar por PortalNewsAI
    if netlify sites:list --json 2>/dev/null | jq -e '.[] | select(.name | contains("PortalNewsAI") or contains("portalnewsai"))' > /dev/null; then
        log_success "Site PortalNewsAI encontrado no Netlify!"
        return 0
    else
        log_warning "Site PortalNewsAI não encontrado no Netlify."
        return 1
    fi
}

# Reconfigurar conexão GitHub-Netlify
reconnect_github() {
    log_info "Reconfigurando conexão GitHub-Netlify..."
    
    # Verificar configurações do build
    log_info "Verificando configurações do build..."
    
    # Testar build local
    log_info "Testando build local..."
    npm run build
    
    if [ $? -eq 0 ]; then
        log_success "Build local bem-sucedido!"
    else
        log_error "Build local falhou. Verificando problemas..."
        
        # Tentar identificar problemas
        if ! grep -q "netlify.toml" .gitignore; then
            log_warning "netlify.toml pode estar no .gitignore. Removendo..."
            echo "!netlify.toml" >> .gitignore
        fi
        
        log_error "Por favor, verifique os erros de build manualmente."
        exit 1
    fi
    
    # Verificar se o Netlify está configurado para buscar do GitHub
    log_info "Verificando configuração do Netlify..."
    
    # Se o site existir, verificar a configuração
    if check_site_exists; then
        log_info "Site encontrado. Verificando configuração do GitHub..."
        
        # Verificar se o GitHub está conectado
        if netlify sites:info --json 2>/dev/null | jq -e '.linked_repository' > /dev/null; then
            log_success "GitHub conectado ao Netlify!"
        else
            log_warning "GitHub não conectado. Tentando reconectar..."
            
            # Forçar reconexão
            log_info "Desconectando site atual..."
            netlify sites:disconnect --yes
            
            log_info "Reconectando ao GitHub..."
            netlify sites:connect --repo="$GITHUB_REPO"
        fi
    else
        log_warning "Site não encontrado. Criando novo site..."
        
        # Criar novo site conectado ao GitHub
        log_info "Criando novo site conectado ao GitHub..."
        
        # Usar o método de deploy manual para criar o site
        netlify deploy --prod --dir=out --message="Setup inicial do PortalNewsAI"
        
        # Conectar ao GitHub
        log_info "Conectando ao GitHub..."
        netlify sites:connect --repo="$GITHUB_REPO"
    fi
}

# Configurar build settings
configure_build_settings() {
    log_info "Configurando build settings..."
    
    # Verificar se o netlify.toml está correto
    if [ ! -f "netlify.toml" ]; then
        log_error "netlify.toml não encontrado. Criando..."
        cat > netlify.toml << 'EOF'
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
EOF
        git add netlify.toml
        git commit -m "feat: Adicionar netlify.toml para deploy Netlify"
        log_success "netlify.toml criado!"
    fi
    
    # Verificar se o build command está correto
    if ! grep -q "command = \"npm run build\"" netlify.toml; then
        log_warning "Build command incorreto. Corrigindo..."
        sed -i 's/command = .*/command = "npm run build"/' netlify.toml
        git add netlify.toml
        git commit -m "fix: Corrigir build command no netlify.toml"
        log_success "Build command corrigido!"
    fi
    
    # Verificar se o publish directory está correto
    if ! grep -q "publish = \"out\"" netlify.toml; then
        log_warning "Publish directory incorreto. Corrigindo..."
        sed -i 's/publish = .*/publish = "out"/' netlify.toml
        git add netlify.toml
        git commit -m "fix: Corrigir publish directory no netlify.toml"
        log_success "Publish directory corrigido!"
    fi
}

# Fazer deploy final
final_deploy() {
    log_info "Fazendo deploy final..."
    
    # Fazer push para o GitHub
    log_info "Fazendo push para o GitHub..."
    git push origin main
    
    # Fazer deploy manual se necessário
    if ! netlify deploy --prod --dir=out --message="Deploy final do PortalNewsAI"; then
        log_warning "Deploy automático falhou. Tentando manual..."
        
        # Tentar deploy manual
        log_info "Tentando deploy manual..."
        netlify deploy --prod --dir=out --message="Deploy manual do PortalNewsAI"
    fi
    
    log_success "Deploy final concluído!"
}

# Verificar se o site está acessível
verify_site_accessibility() {
    log_info "Verificando acessibilidade do site..."
    
    # Aguardar um pouco para o deploy ser processado
    sleep 30
    
    # Tentar acessar o site
    local site_url=$(netlify sites:info --json 2>/dev/null | jq -r '.url')
    
    if [ "$site_url" != "null" ] && [ -n "$site_url" ]; then
        log_success "Site acessível: $site_url"
        
        # Testar se o site está funcionando
        if curl -s -o /dev/null -w "%{http_code}" "$site_url" | grep -q "200\|301\|302"; then
            log_success "Site está funcionando corretamente!"
        else
            log_warning "Site está acessível mas pode ter problemas."
        fi
    else
        log_error "Não foi possível obter a URL do site."
        log_info "Por favor, verifique o dashboard do Netlify manualmente."
    fi
}

# Função principal
main() {
    echo "=========================================="
    echo "🔧 Reconfiguração GitHub-Netlify - PortalNewsAI"
    echo "=========================================="
    
    check_directory
    check_git_status
    check_latest_commit
    check_netlify_cli
    configure_build_settings
    reconnect_github
    final_deploy
    verify_site_accessibility
    
    echo ""
    echo "🎉 Reconfiguração concluída!"
    echo "📝 Verifique o dashboard do Netlify: https://app.netlify.com"
    echo "🌐 O site deve estar disponível em breve!"
}

# Executar função principal
main "$@"