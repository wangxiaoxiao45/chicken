import React from 'react'
import {HashRouter as Router,Route,Link} from 'react-router-dom'

import "./index.less"

//引入组件
import Home from "../home/index";
import Bazaar from "../bazaar/bazaar";
import Collect from "../collect/collect";
import NavBar from "../../components/nav/nav";
import Person from "../person/person";
import AddMenu from "../addmenu/index";
import Login from "../login/login";
import Register from "../register/register";
import bazaarlist from "../bazaarlist/bazaarlist";


export default class App extends React.Component{
    render(){
        return (
           <Router>
               <div>
                   <Route exact path="/" component={Home}/>
                   <Route path="/bazaar" component={Bazaar}/>
                   <Route path="/collect" component={Collect}/>
                   <Route path="/person" component={Person}/>
                   <Route path="/addmenu" component={AddMenu}/>
                   <Route path="/login" component={Login}/>
                   <Route path="/register" component={Register}/>
                   <Route path="/bazaarlist/:id" component={bazaarlist}/>
                   <NavBar/>
               </div>
           </Router>

        )
    }
}