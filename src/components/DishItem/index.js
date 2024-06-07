import {useState} from 'react'

import DishContext from '../../context/DishContext'
import {FaPlus} from 'react-icons/fa'
import {TiMinus} from 'react-icons/ti'
import './index.css'

const DishItem = props => {
  const [count, updateCount] = useState(0)
  return (
    <DishContext.Consumer>
      {value => {
        const {cartList} = value
        const {details, addCartItem, removeCartItem} = props
        const vegan1 = details.dishType === 2 ? 'vegan-style' : 'nv-style'
        const vegan2 = details.dishType === 2 ? 'vegan-style1' : 'nv-style1'

        const onClickIncreaseBtn = () => {
          addCartItem(details)
        }

        const onClickDecreaseBtn = () => {
          removeCartItem(details)
        }

        const getQuantity = () => {
          const item = cartList.find(each => each.dishId === details.dishId)
          if (item !== undefined) {
            return item.quantity
          } else {
            return 0
          }
        }
        const showAdd = () => {
          return (
            <div className="add-minus-container">
              <button className="plus-btn" onClick={onClickDecreaseBtn}>
                <TiMinus className="icon" />
              </button>
              <p className="item-count">{getQuantity()}</p>
              <button className="plus-btn" onClick={onClickIncreaseBtn}>
                <FaPlus className="icon" />
              </button>
            </div>
          )
        }
        return (
          <li className="each-dish-list">
            <div className={`${vegan1}`}>
              <p className={`${vegan2}`}></p>
            </div>
            <div className="dish-details-container">
              <div className="dish-name-desc-container">
                <h1 className="dish-name">{details.dishName}</h1>
                <p className="dish-price">
                  {details.dishCurrency} {details.dishPrice}
                </p>
                <p className="dish-description">{details.dishDescription}</p>
                {details.dishAvailability === true ? (
                  showAdd()
                ) : (
                  <p className="not-available">Not Available</p>
                )}
                {details.addonCat.length >= 1 && (
                  <p className="show-custom">Customizations available</p>
                )}
              </div>
              <p className="calories-text">{details.dishCalories} calories</p>
              <div className="">
                <img
                  src={details.dishImage}
                  alt={details.dishName}
                  className="dish-image"
                />
              </div>
            </div>
          </li>
        )
      }}
    </DishContext.Consumer>
  )
}

export default DishItem
