import { createStore } from "redux";

export const ACTIONS = {
  LOAD_MENU: "LOAD_MENU",
  CHANGE_DIET: "CHANGE_DIET",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
};

const initialState = {
  diet: "all",
  menuById: {},
  menuIdList: {
    all: [],
    veg: [],
  },
  cartByIds: {},
};

function foodReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_MENU: {
      //{menu: Array(2)}
      //console.log("New data received", action.payload);
      //new data recevied from API, Menu name Array having 2 objects values (2) [{…}, {…}]
      const { menu } = action.payload;

      //console.log("Api data destrutring means now data is in menu",menu);

      //new array creation for all menu ids values
      const allMenuId = menu.map((item) => item.id);

      //All menu ids  (2) [0: "SN", 1: "SM"]
      // console.log("All menu ids ",allMenuId);

      //create array of only using filter veg items
      const vegMenuId = menu
        .filter((item) => item.diet === "veg")
        .map((item) => item.id);

      //above code menu is object array but we need only object with data, lets convert menu.array to array

      const menuById = {}; //object

      menu.map((menudata, index) => {
        return (menuById[index] = menudata); // data insert into menuById, insert object of each value
      });

      // List of MenuIDS  {0: {first menu item information}}, 1: {second menu item information}}
      //console.log("List of MenuIDS ", menuById);

      return {
        ...state,
        menuById: menuById,
        menuIdList: {
          all: allMenuId,
          veg: vegMenuId,
        },
      };
    }

    case ACTIONS.CHANGE_DIET: {
    }

    case ACTIONS.ADD_TO_CART: {
      const { itemId } = action.payload;
      const { cartByIds } = state;
      // first time when click on add item cartByIds: {}
      //After add one item to cart  SN
      console.log("After add one item to cart ", itemId);

      // first time when click on add item cartByIds:{ SN:{quantity: 0}}      // means SN:{quantity: 0}
      const cartItem = action.payload;

      cartItem.quantity += 1;

      //updated cartByIds{ "SN":{quantity: 0} }
      const newCart = {
        ...cartByIds, //contain old cartids
        [itemId]: cartItem, //{ "SN":{quantity: 0} }
      };

      return {
        ...state,
        cartByIds: newCart,
      };
    }

    case ACTIONS.REMOVE_FROM_CART: {
      const { itemId } = action.payload;

      console.log("delete item with key ", itemId);

      const { cartByIds } = state;
 
      //check cartByIds object empty or not if empty, means no quantity , so no delete
      if (Object.keys(cartByIds).length === 0) {
        return state;
      }

      let oldQty = cartByIds[itemId].quantity;

      let newQty = oldQty - 1;

      console.log("me", newQty);

      const cartItem = cartByIds[itemId];

      if (!cartItem) {
        return state;
      }

      cartItem.quantity -= 1;

      console.log("new qty obj", cartItem);

      const newCart = {
        ...cartByIds, //contain old cartids
        [itemId]: cartItem, //{ "SN":{quantity: 1} }
      };

      return {
        ...state,
        cartByIds: newCart,
      };
    }

    default:
      return state;
  }
}

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

export function createReduxStore() {
  const store = createStore(foodReducer, enableReduxDevTools);
  return store;
}
