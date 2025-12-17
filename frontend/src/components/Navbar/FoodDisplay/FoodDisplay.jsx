import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const {food_list1} = useContext(StoreContext);


  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list1.map((item, index) => {
          // console.log(category,item.category)
          if (category ==='ALLL' || category === item.category) {
            return <FoodItem key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image} />
          }

        })}
      </div>
    </div>
  )
}

// return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>


export default FoodDisplay