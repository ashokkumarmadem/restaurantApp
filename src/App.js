import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './App.css'
import Header from './components/Header'
import DishItem from './components/DishItem'
import DishContext from './context/DishContext'

class App extends Component {
  state = {
    restaurantDetails: [],
    isLoading: true,
    activeCategory: '',
    cartList: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const apiUrl =
      'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updatedData = data.map(each => ({
      branchName: each.branch_name,
      nexturl: each.nexturl,
      restaurantId: each.restaurant_id,
      restaurantImage: each.restaurant_image,
      restaurantName: each.restaurant_name,
      tableId: each.table_id,
      tableMenuList: each.table_menu_list.map(eachTable => ({
        categoryDishes: eachTable.category_dishes.map(eachDish => ({
          addonCat: eachDish.addonCat.map(sub => ({
            addonCategory: sub.addon_category,
            addonCategoryId: sub.addon_category_id,
            addonSelection: sub.addon_selection,
            addons: sub.addons.map(eachAdd => ({
              dishAvailability: eachAdd.dish_Availability,
              dishType: eachAdd.dish_Type,
              dishCalories: eachAdd.dish_calories,
              dishCurrency: eachAdd.dish_currency,
              dishDescription: eachAdd.dish_description,
              dishId: eachAdd.dish_id,
              dishImage: eachAdd.dish_image,
              dishName: eachAdd.dish_name,
              dishPrice: eachAdd.dish_price,
            })),
            nexturl: sub.nexturl,
          })),
          dishAvailability: eachDish.dish_Availability,
          dishType: eachDish.dish_Type,
          dishCalories: eachDish.dish_calories,

          dishCurrency: eachDish.dish_currency,
          dishDescription: eachDish.dish_description,
          dishId: eachDish.dish_id,
          dishImage: eachDish.dish_image,

          dishName: eachDish.dish_name,
          dishPrice: eachDish.dish_price,
          nexturl: eachDish.nexturl,
        })),
        menuCategory: eachTable.menu_category,
        menuCategoryId: eachTable.menu_category_id,
        menuCategoryImage: eachTable.menu_category_image,
        nexturl: eachTable.nexturl,
      })),
      tableName: each.table_name,
    }))
    this.setState({
      restaurantDetails: updatedData[0],
      isLoading: false,
      activeCategory: updatedData[0].tableMenuList[0].menuCategory,
    })
  }

  getLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" height="45" width="45" color="blue" />
    </div>
  )

  changeCategory = event => {
    this.setState({activeCategory: event.target.value})
  }

  getCategoryDetails = () => {
    const {restaurantDetails, activeCategory} = this.state
    //console.log(restaurantDetails)
    return (
      <ul className="category-list-container">
        {restaurantDetails.tableMenuList.map(each => {
          const spClass =
            activeCategory === each.menuCategory ? 'underline' : ''
          return (
            <li className="each-category" key={each.menuCategoryId}>
              <button
                value={each.menuCategory}
                onClick={this.changeCategory}
                className={`${spClass} category-btn`}
              >
                {each.menuCategory}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  getDishDetails = () => {
    const {restaurantDetails, activeCategory} = this.state
    const dishes = restaurantDetails.tableMenuList.filter(
      each => each.menuCategory === activeCategory,
    )
    return (
      <ul className="dishes-list-contaiiner">
        {dishes[0].categoryDishes.map(each => (
          <DishItem
            key={each.dishId}
            details={each}
            addCartItem={this.addCartItem}
            removeCartItem={this.removeCartItem}
          />
        ))}
      </ul>
    )
  }

  getDischesCategoryDetails = () => {
    return (
      <div className="">
        {this.getCategoryDetails()}
        {this.getDishDetails()}
      </div>
    )
  }

  addCartItem = item => {
    const {cartList} = this.state
    const isExist = cartList.find(each => each.dishId === item.dishId)
    if (isExist === undefined) {
      this.setState(prev => ({
        cartList: [...prev.cartList, {...item, quantity: 1}],
      }))
    } else {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.dishId === item.dishId) {
            return {...each, quantity: each.quantity + 1}
          } else {
            return each
          }
        }),
      }))
    }
  }

  removeCartItem = item => {
    const {cartList} = this.state
    const currentItem = cartList.find(each => each.dishId === item.dishId)
    if (currentItem !== undefined) {
      if (currentItem.quantity > 0) {
        this.setState(prev => ({
          cartList: prev.cartList.map(each => {
            if (each.dishId === item.dishId) {
              return {...each, quantity: each.quantity - 1}
            } else {
              return each
            }
          }),
        }))
      }
      if (currentItem.quantity <= 1) {
        this.setState(prev => ({
          cartList: prev.cartList.filter(
            each => each.dishId !== currentItem.dishId,
          ),
        }))
      }
    }
  }

  render() {
    const {restaurantDetails, isLoading, cartList} = this.state

    return (
      <DishContext.Provider
        value={{
          cartList: cartList,
        }}
      >
        <div className="app-container">
          <Header />
          {isLoading ? this.getLoader() : this.getDischesCategoryDetails()}
        </div>
      </DishContext.Provider>
    )
  }
}

export default App
