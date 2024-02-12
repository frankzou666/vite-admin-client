
import { HomeOutlined, UserOutlined,HolderOutlined,IdcardOutlined,MailOutlined,EditOutlined} from '@ant-design/icons'


const getIcon = function (name) {
    switch(name){
        case 'product':  return <UserOutlined /> ;break;
        case '商品':  return <MailOutlined /> ;break;
        case '首页':  return <HomeOutlined /> ;break;
        case 'User':  return <UserOutlined /> ;break;
        case 'Account':  return <HolderOutlined /> ;break;
        case 'Home':   return <IdcardOutlined /> ;break;
        case 'Role':   return <EditOutlined /> ;break;
        default:return <HomeOutlined /> ;break;

    }
  
}


export default getIcon