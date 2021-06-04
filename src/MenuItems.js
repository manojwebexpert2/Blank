import React from "react";
import { shallowEqual, useSelector } from 'react-redux';

import MenuItem from "./MenuItem";

function PureMenuList(props) {
  //console.log("MenuList Re-Render");

  //console.log("Props data ", props.menuList);
  

 


  return (
    <>
      {props.menuList.map((item, index) => {
        return  <MenuItem itemid={item.id} item={item} key={index} />
      })}
     
     
    </>
  );
}

export const MenuList = React.memo(PureMenuList);

