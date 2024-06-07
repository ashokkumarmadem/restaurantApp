import DishContext from '../../context/DishContext'

import './index.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'

const Header = () => {
  return (
    <DishContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <div className="header-container">
            <div className="header-container-lg">
              <h1 className="header-container-lg-heading">UNI Resto Cafe</h1>
              <div className="cart-number">
                <p className="order-text">My Orders</p>
                <div className="dish-count-cart">
                  <p className="dish-count-number">{cartList.length}</p>
                  <AiOutlineShoppingCart className="cart-icon" />
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </DishContext.Consumer>
  )
}

export default Header
