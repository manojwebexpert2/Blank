import React from "react";
import { ACTIONS } from './redux';


import { useSelector, useDispatch } from 'react-redux';

const MenuItem = (props) => {
  //console.log(props);
  const { item } = props;

  //each menu item information
  console.log("selector data use", item);


const cartByIds = useSelector(state => state.cartByIds) ; 
const dispatch = useDispatch();

/*now we get only cartids which is blank now, 
we have to make code like this item.id= SM or SN one by one loop will check
{ cartByIds:{
    SM:{"quantity": 1},
    SN:{"quantity": 1}
    }
}*/
console.log("for Item id ",item.id); //

const quantity = cartByIds[item.id]?.quantity ?? 0;

console.log("Quantity ",quantity);


function handleIncrement() {
    dispatch({
       type: ACTIONS.ADD_TO_CART,
       payload: {
         itemId: item.id,
       },
     });
 }

 function handleDecrement() {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: {
        itemId: item.id,
      },
    });
  }


  return (
    <article
      className="media menu_item"
      data-key={props.item.id}
      key={props.item.id}
    >
      <div className="media-content">
        <h3 className="name">{props.item.lable}</h3>
        <span className="price is-pulled-right">${props.item.price}</span>
        <p className="desc">{props.item.description}</p>
        <div>
        <button  className="menu-btn-add" onClick={handleIncrement}> Add <IconPlus /></button>
        <button  className="menu-btn-add" onClick={()=>handleDecrement}> Delete <IconMinus /></button>
        </div>


          
        
      </div>
    </article>
  );
};

export default MenuItem;

///Button Component///
const AddBtn = (props) => {
  return (
    <button
      aria-label={`Add ${props.label} to cart`}
      className="menu-btn-add"
      onClick={props.handleIncrement}
    >
      Add <IconPlus />
    </button>
  );
};

export function IconPlus() {
  return (
    <svg
      className="icon-plus"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

// source- https://feathericons.com/
export function IconMinus() {
  return (
    <svg
      className="icon-minus"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}



 


/* Buttons add but we have run event or action on click and update store, 
which can possible using only dispatch, data will pull from store using 
useSelector((state)=>state.cartByIds);
because first we will get how many cart items available in store
new cart id will addinto 
{ cartByIds:{
            SM:{"quantity": 1}
            }
}
*/




