import { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'
import Ads from '@/components/Ads'

export const metadata: Metadata = {
  title: 'Sobre - PortalNewsAI',
  description: 'Conheça o PortalNewsAI, seu portal de notícias inteligente com IA e análise preditiva de conteúdo.',
}

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sobre o PortalNewsAI
          </h1>
          <p className="text-gray-600">
            Conheça nossa missão, tecnologia e equipe por trás do seu portal de notícias inteligente
          </p>
        </div>

        {/* Leaderboard ad */}
        <div className="mb-8">
          <Ads unit="leaderboard" />
        </div>

        {/* Mission section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
            <p className="text-primary-100 leading-relaxed">
              O PortalNewsAI nasceu com a visão de revolucionar a forma como as pessoas consomem notícias. 
              Utilizando inteligência artificial e machine learning, nosso sistema analisa milhares de fontes 
              para trazer conteúdo relevante, personalizado e de alta qualidade para nossos leitores.
            </p>
          </div>
        </section>

        {/* Features grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Por que escolher o PortalNewsAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">Inteligência Artificial</h3>
              <p className="text-gray-600">
                Nossa IA analisa e categoriza automaticamente o conteúdo, garantindo notícias relevantes para você.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Atualização em Tempo Real</h3>
              <p className="text-gray-600">
                Monitoramos centenas de fontas 24/7 para trazer as últimas notícias assim que acontecem.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Conteúdo Personalizado</h3>
              <p className="text-gray-600">
                Receba notícias adaptadas aos seus interesses e preferências através de nossa inteligência preditiva.
              </p>
            </div>
          </div>
        </section>

        {/* Technology section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tecnologia</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Processamento de Linguagem Natural</h3>
                <p className="text-gray-600">
                  Utilizamos avançados modelos NLP para entender o contexto e relevância de cada notícia.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Machine Learning</h3>
                <p className="text-gray-600">
                  Nosso sistema aprende com o comportamento do usuário para melhorar recomendações constantemente.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Análise Preditiva</h3>
                <p className="text-gray-600">
                  Prevemos tendências e tópicos que ganharão destaque antes mesmo de se tornarem notícia principal.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Segurança e Privacidade</h3>
                <p className="text-gray-600">
                  Seus dados são protegidos com criptografia de ponta a ponta e total transparência.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <h3 className="font-semibold">Carlos Silva</h3>
              <p className="text-gray-600 text-sm">CEO & Fundador</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍💻</span>
              </div>
              <h3 className="font-semibold">Ana Paula</h3>
              <p className="text-gray-600 text-sm">CTO</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍🎨</span>
              </div>
              <h3 className="font-semibold">João Oliveira</h3>
              <p className="text-gray-600 text-sm">Head of Design</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍🔬</span>
              </div>
              <h3 className="font-semibold">Maria Santos</h3>
              <p className="text-gray-600 text-sm">Data Scientist</p>
            </div>
          </div>
        </section>

        {/* Newsletter section */}
        <div className="mb-12">
          <NewsletterForm />
        </div>

        {/* Contact section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Entre em Contato</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-primary-600 mr-3">📧</span>
                    <span>contato@portalnewsai.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary-600 mr-3">📱</span>
                    <span>+55 (11) 99999-9999</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary-600 mr-3">📍</span>
                    <span>São Paulo, Brasil</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-2xl hover:text-primary-600 transition-colors">📘</a>
                  <a href="#" className="text-2xl hover:text-primary-600 transition-colors">🐦</a>
                  <a href="#" className="text-2xl hover:text-primary-600 transition-colors">📷</a>
                  <a href="#" className="text-2xl hover:text-primary-600 transition-colors">📺</a>
                  <a href="#" className="text-2xl hover:text-primary-600 transition-colors">💼</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}