export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="text-gray-600">Carregando notícias...</span>
      </div>
    </div>
  )
}