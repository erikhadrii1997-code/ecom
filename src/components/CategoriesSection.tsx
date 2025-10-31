'use client'

interface Category {
  name: string
  icon?: string
  count: number
  color: string
  image: string
}

interface CategoriesSectionProps {
  categories: Category[]
  onCategorySelect?: (category: string) => void;
}

export default function CategoriesSection({ categories, onCategorySelect }: CategoriesSectionProps) {
  return (
    <section className="py-8 sm:py-12 bg-white border-b border-gray-200">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Shop by Category
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Browse our categories and discover amazing products
          </p>
        </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {categories.map((category, index) => (
        <div
          key={index}
          className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          onClick={() => {
            onCategorySelect?.(category.name);
            document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="bg-white rounded-3xl p-3 text-center border border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden h-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col justify-start items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:shadow-xl transition-shadow duration-300 mx-auto">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                  {category.count}
                </div>
                {category.icon && (
                  <div className="absolute bottom-1 left-1 text-base bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg">
                    {category.icon}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2">
                <h3 className="font-bold text-gray-900 mb-0.5 text-xs group-hover:text-blue-600 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-[10px] text-gray-600 mb-1 font-medium">
                  {typeof category.count === 'number' ? `${category.count.toLocaleString()} products` : ''}
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-1 px-2 rounded-xl font-bold text-xs shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 opacity-80 group-hover:opacity-100 mt-1">
                  Browse Products
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-6 sm:mt-8">
          <button 
            onClick={() => {
              // Clear category filter to show all products
              onCategorySelect?.('');
              // Scroll to featured products section
              document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-colors duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            View All Categories
          </button>
        </div>
      </div>
    </section>
  )
}
