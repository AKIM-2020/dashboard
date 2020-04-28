import clsx from "clsx";
import React from "react";
import {PrivateRoute} from '../../components';

const Content = ({classes, open, items}) => {
  return
<
  div
  className = {clsx(classes.content,
  {
    [classes.contentShift]
  :
    open
  }
)
}>
<
  div
  className = {classes.drawerHeader}
  />
  {
    items && items.map(it => < PrivateRoute
    path = {it.link}
    component = {it.component}
    roles = {it.roles}
    />) }
    < /div>;
  }
  ;

  export default Content;
