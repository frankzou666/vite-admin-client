
import React, { Component ,useEffect} from 'react'
import { useNavigate,Navigate ,Outlet,Routes,Route,redirect } from 'react-router-dom'


import './linkbutton.styl'

//摸仿A标签行为的button
export default function LinkButton(props){

    return(
        <button className='link-button' {...props}>{props.children}</button>
    )
}