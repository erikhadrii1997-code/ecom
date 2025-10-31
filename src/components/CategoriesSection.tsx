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
          <div className="bg-white rounded-3xl p-4 text-center border border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden h-72 sm:h-80">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 h-full flex flex-col justify-center items-center">
              {/* Circular Product Image Container */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-3 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:shadow-xl transition-shadow duration-300 mx-auto">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Product Count Badge */}
                <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  {category.count}
                </div>
                
                {/* Category Icon Overlay - Only show if icon exists */}
                {category.icon && (
                  <div className="absolute bottom-2 left-2 text-xl bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
                    {category.icon}
                  </div>
                )}
              </div>
              
              {/* Category Information */}
              <div className="flex flex-col justify-center items-center mt-4">
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 font-medium">
                  {typeof category.count === 'number' ? `${category.count.toLocaleString()} products` : ''}
                </p>
                
                {/* Browse Button */}
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 opacity-80 group-hover:opacity-100">
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
