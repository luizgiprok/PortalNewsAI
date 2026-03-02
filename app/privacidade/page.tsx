import { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'
import Ads from '@/components/Ads'

export const metadata: Metadata = {
  title: 'Política de Privacidade - PortalNewsAI',
  description: 'Entenda como coletamos, usamos e protegemos seus dados pessoais no PortalNewsAI.',
}

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-gray-600">
            Última atualizada: 2 de março de 2024
          </p>
        </div>

        {/* Leaderboard ad */}
        <div className="mb-8">
          <Ads unit="leaderboard" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introdução</h2>
            <p className="text-gray-600 leading-relaxed">
              No PortalNewsAI, levamos sua privacidade a sério. Esta política de privacidade 
              explica como coletamos, usamos, compartilhamos e protegemos suas informações 
              pessoais quando você visita nosso site ou utiliza nossos serviços.
            </p>
          </section>

          {/* Information Collection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informações que Coletamos</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Informações Pessoais</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Nome e email (ao se cadastrar na newsletter)</li>
              <li>Preferências de conteúdo e categorias de interesse</li>
              <li>Informações de perfil em redes sociais (ao conectar)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Informações de Uso</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Endereço IP e informações do navegador</li>
              <li>Páginas visitadas e tempo de permanência</li>
              <li>Dispositivo e sistema operacional utilizado</li>
              <li>Interações com anúncios e conteúdo</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.3 Cookies e Tecnologias Similares</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Utilizamos cookies para melhorar sua experiência, analisar tráfego e 
              personalizar conteúdo. Você pode gerenciar suas preferências de cookies 
              através das configurações do seu navegador.
            </p>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Como Usamos Suas Informações</h2>
            
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Fornecer e personalizar nosso conteúdo e serviços</li>
              <li>Enviar newsletters e comunicações relevantes</li>
              <li>Melhorar nossa plataforma com base no comportamento do usuário</li>
              <li>Realizar análises e pesquisas de mercado</li>
              <li>Proteger nossos direitos e propriedade intelectual</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Compartilhamento de Informações</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com 
              terceiros sem seu consentimento, exceto nas seguintes circunstâncias:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Com provedores de serviços que nos auxiliam na operação do site</li>
              <li>Quando exigido por lei ou processo legal</li>
              <li>Para proteger nossos direitos, segurança ou propriedade</li>
              <li>Em transações de negócios ou reorganizações corporativas</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Segurança dos Dados</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Implementamos medidas de segurança técnicas e organizacionais para proteger 
              suas informações contra acesso não autorizado, uso ou divulgação. 
              No entanto, nenhum sistema de segurança é 100% infalível.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Seus Direitos</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Você tem os seguintes direitos em relação às suas informações pessoais:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Acessar e corrigir suas informações</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Limitar o processamento de suas informações</li>
              <li>Exportar seus dados em formato portátil</li>
              <li>Retirar seu consentimento a qualquer momento</li>
            </ul>

            <p className="text-gray-600 leading-relaxed">
              Para exercer esses direitos, entre em contato através do email 
              <span className="font-semibold"> privacidade@portalnewsai.com</span>.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Serviços de Terceiros</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Nosso site pode conter links para serviços de terceiros, como redes sociais 
              e provedores de anúncios. Estes serviços têm suas próprias políticas de 
              privacidade e não somos responsáveis por suas práticas.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacidade de Crianças</h2>
            
            <p className="text-gray-600 leading-relaxed">
              Nosso site não é direcionado a crianças menores de 13 anos. Não 
              coletamos intencionalmente informações de crianças menores de 13 anos.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Alterações na Política</h2>
            
            <p className="text-gray-600 leading-relaxed">
              Podemos atualizar esta política periodicamente. Quaisquer alterações 
              serão postadas nesta página com uma data de atualização.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contato</h2>
            
            <p className="text-gray-600 leading-relaxed">
              Se tiver alguma dúvida sobre esta política de privacidade, entre em 
              contato conosco através do email:
              <span className="font-semibold"> privacidade@portalnewsai.com</span>
            </p>
          </section>
        </div>

        {/* Newsletter section */}
        <div className="mt-12">
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}