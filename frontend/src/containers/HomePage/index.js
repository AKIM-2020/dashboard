import React, {useEffect, useState} from "react";
import {getUserItems} from "../../helpers";
import Sidebar from "../Sidebar";
import Content from "../Content";
import Header from "../Header";
import {useStyles} from "./style.js";

const HomePage = ({user}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    setItems(getUserItems(user))
  }, [open]);

  return
<
  div
  className = {classes.root} >
    < Header
  classes = {classes}
  open = {open}
  handleDrawerOpen = {()
=>
  setOpen(true)
}
  />
  < Sidebar
  classes = {classes}
  open = {open}
  handleDrawerClose = {()
=>
  setOpen(false)
}
  items = {items}
  />
  < Content
  classes = {classes}
  open = {open}
  items = {items}
  />
  < /div>
};

export default HomePage;
