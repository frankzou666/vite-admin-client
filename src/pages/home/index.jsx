import React, { Component } from 'react'
import { useSelector,useDispatch } from 'react-redux'


import './home.styl'
class HomeWrapper extends Component {
  componentDidMount=()=>{
     
  }
  render() {
    return (
      <div className='P-home'>
        <h1>欢迎使用后台系统</h1>
      </div>
    )
  }
}


function Home(props){
  const  selector = useSelector((state)=>state.user);
  const  dispatch = useDispatch();
  return   <HomeWrapper selector={selector}  dispatch={dispatch} props></HomeWrapper>

}

export default Home