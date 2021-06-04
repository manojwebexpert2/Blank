import React, { useState, useEffect } from "react";
import "./styles.css";
import loadFoodData from "./utilis";

import { useDispatch } from "react-redux";
import { ACTIONS } from "./redux";

import { shallowEqual, useSelector } from "react-redux";

import { MenuList } from "./MenuItems";

export default function App() {
  const stateAPIStatus = useLoadFoodData();

  // console.log(stateAPIStatus);

  // we can get all state values one by one

  // this menuList all data of all menus in object, so we can map and show and pass as props to menu item
  //const menuList=useSelector(state=>state.menuById);
  //console.log("current State, but not array, so convert ",[menuList]);

  //Redux Selectors
  //The function that we pass to useSelector hook as first argument is called a selector.
  //The selectors are run whenever any value in the Redux store changes.
  //But to improve performance Redux does one optimization.
  //It does a referential equality check between the old and new value returned by the selector.
  //In our diet selector, it was just returning a string. When the store updates, the diet selector runs and then useSelector does this comparison
  //const oldDietVal = getOldVal();
  //const newDietVal = selectorMenu(storeState);
  //newDietVal === oldDietVal

  const { cartByIds, menuById } = useSelector((state) => state);
  let cartPrice = 0;
  //{SN: {…}}
  //console.log("cartByIds ", cartByIds);

  //console.log(" menuById ", menuById[0]);

  //covert object keys into array["SN","SM"];
  const cartKeys = Object.keys(cartByIds);

  console.log("CartKeys ",cartKeys);
  

  let lengthofCart=cartKeys.length;

  console.log("length ",lengthofCart);

if(lengthofCart==0)
{
  cartPrice=0;
}
else
{





  cartKeys.forEach((id,key) => {

    console.log("ID is mm ", id);
    const item = menuById[key];
    const cartItem = cartByIds[id];   

    //console.log(`item is ${item} and cartItem is ${cartItem} `);
    const price = cartItem.quantity * item.price;
    cartPrice += price;
  });

}


  //console.log("Cart Keys is", cartKeys);



  console.log("Total Price is ",cartPrice);

  /* this will get object inside two more like obj={ {},{} } but we have to make this or convert object array to normal array
const menuList = useSelector((state)=>state.menuById);
console.log("New Menu List ",menuList);*/

  const menuList = useSelector(selectorMenu, shallowEqual);

  useEffect(() => {
    console.log("SERVER_EVENT: menu list changed");
  }, [menuList]);

  return (
    <div className="food-app">
      <header>
        <h1>Ordux</h1>
        <label>
          <input type="checkbox" name="veg-checkbox" />
          Veg Only
        </label>
      </header>

      <div className="container" id="menu">
        <section className="columns">
          <div className="column is-6">
            <div className="collection">
              <h1 className="title">Appetizers</h1>

              <MenuList menuList={menuList} />
            </div>
          </div>
        </section>

        <footer>Total Price is {cartPrice}</footer>
      </div>
    </div>
  );
}

function useLoadFoodData() {
  const [, setAPIStatus] = useState("idle");

  const dispatch = useDispatch();

  //console.log(dispatch);

  //data in form of promise, so we have use then then for get information
  //const data=loadFoodData();

  useEffect(() => {
    setAPIStatus("loading");
    loadFoodData()
      .then((data) => {
        //data start in data and call immediate dispacther to get state and update state
        dispatch({
          type: ACTIONS.LOAD_MENU,
          payload: { menu: data },
        });

        setAPIStatus("success");
      })
      .catch((error) => {
        setAPIStatus("error");
      });
  }, [dispatch]);

  return setAPIStatus;
}

function selectorMenu(state) {
  //inloading the menu only diet,menuIdList,menuById we need//
  /*First we create a fresh new menuList array. Then we find all the ids for the user’s currently selected 
  diet and then populate menuList with the data of each id. At last we return the menuList array.
  But as we saw Redux only does a referential equality check between the old and new value and in JavaScript.

[] === [] // is always false
*/
  const { diet, menuIdList, menuById } = state;
  //diet :all
  //console.log("diet ",diet);

  /*Menu list  
{all: Array(2), veg: Array(1)}
all: (2) ["SN", "SM"]
veg: ["SN"]} 
  console.log("Menu list ",menuIdList); */

  /*menuById: {
'0': {id: 'SN',label: 'Schezwan Noodles',diet: 'veg',description: 'Spicy Noodles soaked in Schezwan ',price: 8},
'1': {id: 'SM',label: 'Sausage McMuffin',description: 'Lightly seasoned sausage patty and cheese ',price: 12}
           }

           */

  // console.log("Menu by Ids", menuById);

  // it means menu_list.all
  const menuId = menuIdList[diet];

  //menuId 2) ["SN", "SM"]
  // 0: "SN"
  // 1: "SM"
  //console.log("menuId ",menuId);

  const menuList = [];

  /*
menuId having 0,1 index so loop on it 
returning array[], 
menuById[key] 
[0]= {"id": "SN","label": "Schezwan Noodles","diet": "veg","description": "Spicy Noodles soaked ","price": 8}
                     [1]={"id": "SM","label": "Sausage McMuffin","description": "Lightly seasoned sausage patty and cheese ", "price": 12
  }
   menuList.push(menuById[key]);
*/

  menuId.forEach((id, key) => {
    //menuList.push(menuById[id]);
    menuList.push(menuById[key]);
    //console.log("hi",menuById[key]);
    /*it will return array [ 0: {"id": "SN","label": "Schezwan Noodles","diet": "veg",
      "description": "Spicy Noodles soaked in Schezwan sauce and topped with exotic herbs",
      "price": 8
    }, 1: {
    "id": "SM",
    "label": "Sausage McMuffin",
    "description": "Lightly seasoned sausage patty and cheese slice on a hot toasted English muffin.",
    "price": 12
  }]*/
  });

  /// above code menuById oject { {},{} } values converted to array [ 0:{},1:{}]

  //console.log("new menu list ",menuList);

  return menuList;
}
