# PortalNewsAI - Portal de Notícias Inteligente

🤖 Seu portal de notícias com inteligência artificial, análise preditiva e conteúdo personalizado.

## ✨ Features

- 📰 **Notícias em Tempo Real** - Conteúdo atualizado de múltiplas fontes
- 🤖 **Inteligência Artificial** - Análise e categorização automática de conteúdo
- 🎯 **Conteúdo Personalizado** - Recomendações baseadas em seus interesses
- 📱 **Design Responsivo** - Acesso perfeito em todos os dispositivos
- 🔍 **Busca Inteligente** - Encontre notícias por palavra-chave, categoria ou autor
- 📧 **Newsletter Personalizada** - Receba notícias conforme suas preferências
- 💰 **Monetização Integrada** - Espaços para anúncios configuráveis
- 📈 **SEO Otimizado** - Estrutura pronta para Google e outros mecanismos de busca

## 🚀 Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Notícias**: Axios, RSS Parser, Cheerio
- **Deploy**: Netlify (configurado)
- **Monetização**: Google AdSense (configurado)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/PortalNewsAI.git
cd PortalNewsAI

# Instale as dependências
npm install

# Inicie o desenvolvimento
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` com as seguintes configurações:

```env
# NewsAPI (opcional - para notícias em tempo real)
NEWS_API_KEY=sua-chave-api-aqui

# Newsletter (opcional - para integração com serviços de email)
NEWSLETTER_PROVIDER=resend
NEWSLETTER_API_KEY=sua-chave-de-api
NEWSLETTER_FROM_EMAIL=news@portalnewsai.com

# Google Analytics (opcional)
GA_TRACKING_ID=UA-XXXXXXXXX-X
```

### Fontes de Notícias

Configure as fontes de notícias em `lib/config.ts`:

```typescript
export const NEWS_SOURCES: NewsSource[] = [
  {
    id: 'newsapi',
    name: 'NewsAPI',
    type: 'api',
    url: 'https://newsapi.org/v2/everything',
    enabled: true,
    category: 'geral'
  }
  // Adicione mais fontes conforme necessário
]
```

## 📁 Estrutura do Projeto

```
site-noticias/
├── app/                    # Páginas do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── Header.tsx         # Cabeçalho
│   ├── Footer.tsx         # Rodapé
│   ├── NewsCard.tsx       # Card de notícias
│   ├── NewsGrid.tsx       # Grade de notícias
│   ├── SearchBox.tsx      # Busca
│   ├── NewsletterForm.tsx # Newsletter
│   └── Ads.tsx           # Componentes de anúncios
├── lib/                   # Utilitários
│   ├── config.ts          # Configurações
│   └── newsService.ts     # Serviço de notícias
├── types/                 # Tipos TypeScript
└── public/               # Arquivos estáticos
```

## 🌐 Deploy

### Netlify (Recomendado)

1. Conecte seu repositório GitHub ao Netlify
2. Configure as variáveis de ambiente
3. Configure o build command: `npm run build`
4. Configure o publish directory: `out`

```bash
# Build para produção
npm run build

# Export para estático (opcional)
npm run export
```

### Outras Plataformas

- **Vercel**: `npm run build`
- **GitHub Pages**: `npm run export`
- **Docker**: Verifique `Dockerfile` para instruções

## 📊 SEO

O projeto já vem com:

- Meta tags otimizadas
- Structured Data (JSON-LD)
- Sitemap automático
- Open Graph tags
- Twitter Cards

## 🎯 Monetização

Configuração pronta para:

- Google AdSense
- Anúncios responsivos
- Múltiples formatos (Leaderboard, Medium Rectangle, Skyscraper)

## 📧 Newsletter

Integração pronta com:

- Formulário de inscrição
- Preferências de categorias
- Validação de email
- Design responsivo

## 🔒 Segurança

- Proteção contra XSS
- Validação de inputs
- HTTPS configurado
- Política de privacidade inclusa

## 📈 Analytics

Pronto para integração com:

- Google Analytics
- Google Search Console
- Hotjar
- Mixpanel

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -am 'Add nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Submit um Pull Request

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🚀 Suporte

Para suporte e dúvidas:

- Email: contato@portalnewsai.com
- Issues: [GitHub Issues](https://github.com/seu-usuario/PortalNewsAI/issues)
- Discord: [Comunidade](https://discord.gg/portalnewsai)

---

🤖 Feito com ❤️ por PortalNewsAI Team