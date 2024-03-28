
import { HomeOutlined, UserOutlined,HolderOutlined,IdcardOutlined,MailOutlined,EditOutlined ,AppstoreOutlined,SettingOutlined} from '@ant-design/icons'

import store from '../store/index'

const getIcon = function (name) {
    switch(name){
        case 'product':  return <AppstoreOutlined /> ;break;
        case '商品':  return <MailOutlined /> ;break;
        case '系统':  return <div className='settOutlined'><SettingOutlined ></SettingOutlined><span className='countState'> {store.getState().count}</span></div> ;break;
        case 'user':  return <UserOutlined /> ;break;
        case 'account':  return <HolderOutlined /> ;break;
        case 'home':   return <IdcardOutlined /> ;break;
        case 'role':   return <EditOutlined /> ;break;
        default:return <HomeOutlined /> ;break;

    }
  
}


export default getIcon