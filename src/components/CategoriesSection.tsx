'use client'

interface Category {
  name: string
  icon: string
  count: number
  color: string
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
          className="group cursor-pointer transform transition-all duration-200 hover:scale-105"
        >
          <div className="bg-blue-50 rounded-2xl p-2 sm:p-3 text-center border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              {/* Circular Category Logo Container */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mx-auto mb-2">
                {/* Outer Circle with Gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-2 group-hover:scale-110 transition-transform duration-300">
                  {/* Inner Circle with Category Image */}
                  <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white shadow-xl">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Floating Category Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  {category.count}
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm group-hover:text-blue-600 transition-colors duration-200">
                {category.name}
              </h3>
              <p className="text-xs text-gray-600 mb-1 font-semibold">
                {category.count.toLocaleString()} products
              </p>
              
              {/* Hover Effect Button */}
              <div className="mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Browse
                </button>
              </div>
              
              <button
                onClick={() => {
                  onCategorySelect?.(category.name);
                  // Scroll to featured products section
                  document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition-all duration-200 font-bold text-xs shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Browse Products
              </button>
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
