import React from 'react'
import {Route,Redirect} from 'react-router-dom'

const PrivateRoutes = ({component:Component, ...rest}) =>{
    return(
        <Route {...rest} render={props =>(
            localStorage.getItem('isLoggedIn')? <Component {...props} />:<Redirect to="/login" />
        )} />
    )
}
export default PrivateRoutes