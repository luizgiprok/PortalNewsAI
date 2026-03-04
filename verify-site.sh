#!/bin/bash

# Script para verificar e reconfigurar o site no Netlify
# Verifica status do site e tenta reconfigurar se necessário

set -e

# Configurações
PROJECT_NAME="PortalNewsAI"
GITHUB_REPO="luizgiprok/PortalNewsAI"
NETLIFY_SITE_ID="6803d701f0bd828c668af7aa"

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

# Verificar se o site existe no Netlify
check_site_exists() {
    log_info "Verificando se o site existe no Netlify..."
    
    if netlify sites:list --json | jq -e ".[] | select(.id == \"$NETLIFY_SITE_ID\")" > /dev/null; then
        log_success "Site encontrado no Netlify!"
        return 0
    else
        log_error "Site não encontrado no Netlify!"
        return 1
    fi
}

# Verificar status do site
check_site_status() {
    log_info "Verificando status do site..."
    
    local status=$(netlify sites:info --site $NETLIFY_SITE_ID --json | jq -r '.state')
    
    case $status in
        "active")
            log_success "Site está ativo!"
            return 0
            ;;
        "pending")
            log_warning "Site está pendente..."
            return 1
            ;;
        "error")
            log_error "Site está com erro!"
            return 1
            ;;
        *)
            log_warning "Status desconhecido: $status"
            return 1
            ;;
    esac
}

# Verificar último deploy
check_latest_deploy() {
    log_info "Verificando último deploy..."
    
    local deploy_info=$(netlify deploy:list --site $NETLIFY_SITE_ID --json | jq -r '.[0]')
    
    if [ "$deploy_info" == "null" ]; then
        log_error "Nenhum deploy encontrado!"
        return 1
    fi
    
    local deploy_status=$(echo $deploy_info | jq -r '.state')
    local deploy_url=$(echo $deploy_info | jq -r '.url')
    
    log_info "Último deploy: $deploy_status"
    log_info "URL do deploy: $deploy_url"
    
    if [ "$deploy_status" == "ready" ]; then
        log_success "Deploy está pronto!"
        return 0
    else
        log_warning "Deploy não está pronto: $deploy_status"
        return 1
    fi
}

# Reconfigurar site no Netlify
reconfigure_site() {
    log_info "Reconfigurando site no Netlify..."
    
    # Remover site existente (se houver)
    if netlify sites:list --json | jq -e ".[] | select(.id == \"$NETLIFY_SITE_ID\")" > /dev/null; then
        log_warning "Removendo site existente..."
        netlify sites:delete $NETLIFY_SITE_ID --yes
    fi
    
    # Criar novo site
    log_info "Criando novo site no Netlify..."
    
    netlify sites:create \
        --name $PROJECT_NAME \
        --dir=. \
        --git-provider=github \
        --repo=$GITHUB_REPO \
        --site-id=$NETLIFY_SITE_ID \
        --publish-dir=out \
        --build-command="npm run build"
    
    log_success "Site reconfigurado com sucesso!"
}

# Fazer deploy manual
deploy_manual() {
    log_info "Fazendo deploy manual..."
    
    netlify deploy \
        --site $NETLIFY_SITE_ID \
        --prod \
        --dir=out \
        --message="Deploy manual após reconfiguração"
    
    log_success "Deploy manual concluído!"
}

# Verificar se o site está acessível
check_site_accessibility() {
    log_info "Verificando acessibilidade do site..."
    
    local site_url=$(netlify sites:info --site $NETLIFY_SITE_ID --json | jq -r '.url')
    
    if curl -s -o /dev/null -w "%{http_code}" "$site_url" | grep -q "200\|301\|302"; then
        log_success "Site está acessível: $site_url"
        return 0
    else
        log_error "Site não está acessível: $site_url"
        return 1
    fi
}

# Função principal
main() {
    echo "=========================================="
    echo "🔍 Netlify Site Verification - $PROJECT_NAME"
    echo "=========================================="
    
    # Verificar se o Netlify CLI está instalado
    if ! command -v netlify &> /dev/null; then
        log_error "Netlify CLI não encontrado. Instalando..."
        npm install -g netlify-cli
    fi
    
    # Fazer login no Netlify
    log_info "Verificando login no Netlify..."
    if ! netlify status &> /dev/null; then
        log_info "Fazendo login no Netlify..."
        netlify login
    fi
    
    # Verificar status atual
    check_site_exists
    if [ $? -ne 0 ]; then
        log_warning "Site não encontrado. Reconfigurando..."
        reconfigure_site
    fi
    
    check_site_status
    if [ $? -ne 0 ]; then
        log_warning "Status do site não está ideal. Tentando reconfigurar..."
        reconfigure_site
    fi
    
    check_latest_deploy
    if [ $? -ne 0 ]; then
        log_warning "Sem deploy recente. Fazendo deploy manual..."
        deploy_manual
    fi
    
    # Verificar acessibilidade final
    check_site_accessibility
    if [ $? -ne 0 ]; then
        log_error "Site não está acessível. Verifique o dashboard do Netlify manualmente."
        log_info "Dashboard: https://app.netlify.com/sites/portalnewsai"
    else
        log_success "Verificação concluída com sucesso!"
        log_info "Site URL: $(netlify sites:info --site $NETLIFY_SITE_ID --json | jq -r '.url')"
    fi
}

# Executar função principal
main "$@"