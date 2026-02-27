import {useState, useEffect} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import './index.css'

const Content = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [productQuantities, setProductQuantities] = useState({})

  // Fetch Data (componentDidMount replacement)

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://apis2.ccbp.in/nxt-mart/category-list-details',
      )
      const data = await response.json()
      setCategories(data.categories)
      console.log(data.categories)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCategoryClick = async category => {
    setIsLoading(true)
    try {
      await new Promise(res => setTimeout(res, 1000))
      setSelectedCategory(category)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getProductById = productId => {
    const allProducts = categories.reduce(
      (acc, category) => [...acc, ...category.products],
      [],
    )
    return allProducts.find(product => product.id === productId) || null
  }

  const addToCart = product => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    const existingItem = cartItems.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.push({...product, quantity: 1})
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }

  const removeFromCart = product => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    const updatedCartItems = cartItems.filter(item => item.id !== product.id)
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
  }

  const handleIncrement = productId => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))

    const product = getProductById(productId)
    if (product) addToCart(product)
  }

  const handleDecrement = productId => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) - 1, 0),
    }))

    const product = getProductById(productId)
    if (product) removeFromCart(product)
  }

  const renderCategoryButtons = () => (
    <ul className="sidebar-list">
      <li>
        <button
          type="button"
          className={`buttonsy ${selectedCategory === null ? 'pk' : ''}`}
          onClick={() => handleCategoryClick(null)}
        >
          All Products
        </button>
      </li>
      {categories.map(category => (
        <li key={category.name}>
          <button
            type="button"
            className={`buttonsy ${
              selectedCategory?.name === category.name ? 'pk' : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  )

  const renderProducts = products =>
    products.map(product => (
      <li key={product.id} className="product-item">
        <img src={product.image} alt={product.name} className="img" />
        <div className="product-details">
          <div className="info">
            <p className="pname">{product.name}</p>
            <p className="pweight">{product.weight}</p>
            <p className="pro-price">{product.price}</p>
          </div>

          {productQuantities[product.id] ? (
            <div className="quantity-controls">
              <button
                type="button"
                className="add-button-card"
                onClick={() => handleDecrement(product.id)}
              >
                -
              </button>
              <span>{productQuantities[product.id]}</span>
              <button
                type="button"
                className="add-button-card"
                onClick={() => handleIncrement(product.id)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              id="add-button-card"
              onClick={() => handleIncrement(product.id)}
            >
              Add
            </button>
          )}
        </div>
      </li>
    ))

  return (
    <div className="content">
      <div className="main-sidebar">
        <div className="sidebar">
          <h2 className="categories">Categories</h2>
          {renderCategoryButtons()}
        </div>
      </div>

      <div className="main-content">
        {isLoading && <h2>Loading...</h2>}
        {error && <h2>Error: {error}</h2>}

        {!isLoading && !error && (
          <>
            <h2>{selectedCategory ? selectedCategory.name : 'All Products'}</h2>
            <ul className="product-list">
              {selectedCategory === null
                ? categories.map(category => (
                    <div key={category.name}>
                      <h3>{category.name}</h3>
                      {renderProducts(category.products)}
                    </div>
                  ))
                : renderProducts(selectedCategory.products)}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default Content
// export default Content
