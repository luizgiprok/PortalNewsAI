import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">📰 Portal de Notícias</h3>
            <p className="text-gray-300">
              Seu portal de notícias com conteúdo atualizado das principais fontes.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li><Link href="/ultimas" className="text-gray-300 hover:text-white transition-colors">Últimas</Link></li>
              <li><Link href="/tecnologia" className="text-gray-300 hover:text-white transition-colors">Tecnologia</Link></li>
              <li><Link href="/esportes" className="text-gray-300 hover:text-white transition-colors">Esportes</Link></li>
              <li><Link href="/politica" className="text-gray-300 hover:text-white transition-colors">Política</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li><Link href="/sobre" className="text-gray-300 hover:text-white transition-colors">Sobre</Link></li>
              <li><Link href="/contato" className="text-gray-300 hover:text-white transition-colors">Contato</Link></li>
              <li><Link href="/privacidade" className="text-gray-300 hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link href="/termos" className="text-gray-300 hover:text-white transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Contato</h4>
            <p className="text-gray-300 mb-2">
              Email: contato@portalnoticias.com
            </p>
            <p className="text-gray-300">
              Redes Sociais:
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  📘 Facebook
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  🐦 Twitter
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  📷 Instagram
                </a>
              </div>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Portal de Notícias. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}