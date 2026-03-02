import { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'
import Ads from '@/components/Ads'

export const metadata: Metadata = {
  title: 'Contato - PortalNewsAI',
  description: 'Entre em contato com o PortalNewsAI para parcerias, suporte ou enviar sugestões de conteúdo.',
}

export default function ContatoPage() {
  return (
    <div className="min-h-screen">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h1>
          <p className="text-gray-600">
            Temos interesse em ouvir sua opinião, sugestões ou propostas de parceria
          </p>
        </div>

        {/* Leaderboard ad */}
        <div className="mb-8">
          <Ads unit="leaderboard" />
        </div>

        {/* Contact form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  required
                >
                  <option value="">Selecione o assunto</option>
                  <option value="parceria">Proposta de Parceria</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="conteudo">Sugestão de Conteúdo</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
                  placeholder="Escreva sua mensagem aqui..."
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                  Gostaria de receber nossa newsletter com notícias exclusivas
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Endereço</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">📍</span>
                    <div>
                      <p className="font-medium">PortalNewsAI</p>
                      <p className="text-gray-600">Av. Paulista, 1234</p>
                      <p className="text-gray-600">São Paulo, SP - 01310-100</p>
                      <p className="text-gray-600">Brasil</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Contato</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-primary-600 mr-3">📧</span>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">contato@portalnewsai.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-primary-600 mr-3">📱</span>
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-gray-600">+55 (11) 99999-9999</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-primary-600 mr-3">🕒</span>
                    <div>
                      <p className="font-medium">Horário de Atendimento</p>
                      <p className="text-gray-600">Segunda a Sexta: 9h às 18h</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                    <span className="text-xl">📘</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                    <span className="text-xl">🐦</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                    <span className="text-xl">📷</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                    <span className="text-xl">📺</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                    <span className="text-xl">💼</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="mb-12">
          <NewsletterForm />
        </div>

        {/* Map placeholder */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nosso Local</h2>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <p className="text-gray-600">Mapa da localização</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}