'use client'

import { useState } from 'react'

type Product = {
  id: number
  name: string
  price: number
  category: string
  emoji: string
}

type CartItem = Product & {
  quantity: number
}

const products: Product[] = [
  { id: 1, name: 'Classic White T-Shirt', price: 29.99, category: 'Tops', emoji: '👕' },
  { id: 2, name: 'Slim Fit Jeans', price: 79.99, category: 'Bottoms', emoji: '👖' },
  { id: 3, name: 'Leather Jacket', price: 199.99, category: 'Outerwear', emoji: '🧥' },
  { id: 4, name: 'Summer Dress', price: 89.99, category: 'Dresses', emoji: '👗' },
  { id: 5, name: 'Casual Hoodie', price: 59.99, category: 'Tops', emoji: '🧥' },
  { id: 6, name: 'Running Shoes', price: 119.99, category: 'Footwear', emoji: '👟' },
  { id: 7, name: 'Wool Sweater', price: 69.99, category: 'Tops', emoji: '🧶' },
  { id: 8, name: 'Denim Shorts', price: 49.99, category: 'Bottoms', emoji: '🩳' },
  { id: 9, name: 'Winter Coat', price: 249.99, category: 'Outerwear', emoji: '🧥' },
  { id: 10, name: 'Striped Shirt', price: 44.99, category: 'Tops', emoji: '👔' },
  { id: 11, name: 'Maxi Dress', price: 94.99, category: 'Dresses', emoji: '👗' },
  { id: 12, name: 'Sneakers', price: 89.99, category: 'Footwear', emoji: '👟' },
]

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="logo">FASHION</div>
          <ul className="nav-links">
            <li><a href="#new">New Arrivals</a></li>
            <li><a href="#men">Men</a></li>
            <li><a href="#women">Women</a></li>
            <li><a href="#sale">Sale</a></li>
          </ul>
          <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
            🛒
            {getTotalItems() > 0 && (
              <span className="cart-count">{getTotalItems()}</span>
            )}
          </div>
        </nav>
      </header>

      <section className="hero">
        <h1>Your Style, Your Story</h1>
        <p>Discover the latest trends in fashion</p>
        <a href="#products" className="btn">Shop Now</a>
      </section>

      <div className="container" id="products">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.emoji}</div>
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">${product.price}</div>
                <button className="add-to-cart" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`cart-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price} x {item.quantity}</div>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getTotalPrice()}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Shop</h3>
            <ul>
              <li><a href="#new">New Arrivals</a></li>
              <li><a href="#men">Men</a></li>
              <li><a href="#women">Women</a></li>
              <li><a href="#sale">Sale</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>About</h3>
            <ul>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul>
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#pinterest">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Fashion Store. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
