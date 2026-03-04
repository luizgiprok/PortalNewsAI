#!/bin/bash

# Netlify Deployment Script for PortalNewsAI
# Script para automatizar deployments no Netlify

set -e

# Configurações
PROJECT_NAME="PortalNewsAI"
GITHUB_REPO="luizgiprok/PortalNewsAI"
NETLIFY_SITE_ID="6803d701f0bd828c668af7aa"
DEPLOY_ENVIRONMENT="production"

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

# Verificar dependências
check_dependencies() {
    log_info "Verificando dependências..."
    
    if ! command -v git &> /dev/null; then
        log_error "Git não encontrado. Instale o Git primeiro."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm não encontrado. Instale o Node.js primeiro."
        exit 1
    fi
    
    if ! command -v netlify &> /dev/null; then
        log_warning "Netlify CLI não encontrado. Instalando..."
        npm install -g netlify-cli
    fi
    
    log_success "Dependências verificadas!"
}

# Verificar status do repositório
check_repo_status() {
    log_info "Verificando status do repositório..."
    
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        log_error "Você não está em um repositório Git."
        exit 1
    fi
    
    # Verificar se há mudanças não commitadas
    if [ -n "$(git status --porcelain)" ]; then
        log_warning "Existem mudanças não commitadas. Fazendo commit..."
        git add .
        git commit -m "feat: Atualizações para deploy Netlify"
        log_success "Mudanças commitadas!"
    fi
    
    log_success "Repositório pronto para deploy!"
}

# Instalar dependências
install_dependencies() {
    log_info "Instalando dependências..."
    
    npm install
    log_success "Dependências instaladas!"
}

# Build do projeto
build_project() {
    log_info "Fazendo build do projeto..."
    
    npm run build
    
    if [ $? -eq 0 ]; then
        log_success "Build realizado com sucesso!"
    else
        log_error "Falha no build do projeto."
        exit 1
    fi
}

# Deploy para Netlify
deploy_to_netlify() {
    log_info "Iniciando deploy para Netlify..."
    
    # Opções de deploy
    DEPLOY_OPTIONS="--site $NETLIFY_SITE_ID --prod"
    
    # Adicionar flags adicionais se necessário
    if [ "$1" == "preview" ]; then
        DEPLOY_OPTIONS="--site $NETLIFY_SITE_ID"
        log_info "Criando preview deploy..."
    fi
    
    # Realizar deploy
    netlify deploy $DEPLOY_OPTIONS
    
    if [ $? -eq 0 ]; then
        log_success "Deploy realizado com sucesso!"
    else
        log_error "Falha no deploy."
        exit 1
    fi
}

# Verificar deploy
verify_deployment() {
    log_info "Verificando status do deploy..."
    
    # Aguardar alguns segundos para o deploy ser processado
    sleep 10
    
    # Verificar status do deploy
    netlify sites:info --site $NETLIFY_SITE_ID
    
    log_success "Deploy verificado!"
}

# Limpar cache (opcional)
clear_cache() {
    log_info "Limpando cache do Netlify..."
    
    netlify cache:clear --site $NETLIFY_SITE_ID
    
    log_success "Cache limpo!"
}

# Função principal
main() {
    echo "=========================================="
    echo "🚀 Netlify Deployment Script - $PROJECT_NAME"
    echo "=========================================="
    
    # Parse de argumentos
    case "${1:-}" in
        "deps")
            check_dependencies
            ;;
        "status")
            check_repo_status
            ;;
        "build")
            build_project
            ;;
        "deploy")
            check_dependencies
            check_repo_status
            install_dependencies
            build_project
            deploy_to_netlify
            verify_deployment
            ;;
        "preview")
            check_dependencies
            check_repo_status
            install_dependencies
            build_project
            deploy_to_netlify "preview"
            verify_deployment
            ;;
        "cache")
            clear_cache
            ;;
        "clean")
            clear_cache
            log_info "Removendo node_modules..."
            rm -rf node_modules
            rm -rf .next
            log_success "Limpeza concluída!"
            ;;
        *)
            echo "Uso: $0 [opção]"
            echo ""
            echo "Opções:"
            echo "  deps        - Verificar dependências"
            echo "  status      - Verificar status do repositório"
            echo "  build       - Fazer build do projeto"
            echo "  deploy      - Fazer deploy completo para produção"
            echo "  preview     - Fazer preview deploy"
            echo "  cache       - Limpar cache do Netlify"
            echo "  clean       - Limpar cache e arquivos temporários"
            echo ""
            echo "Exemplos:"
            echo "  $0 deploy    - Deploy completo para produção"
            echo "  $0 preview   - Criar preview deploy"
            echo "  $0 cache     - Limpar cache"
            exit 1
            ;;
    esac
}

# Executar função principal
main "$@"