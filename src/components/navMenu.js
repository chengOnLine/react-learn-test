import React , {forwardRef , useEffect} from "react";
import {
    Menu
} from "antd";
import { withRouter } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu , Item } = Menu;
const navConfig = {
    title:"",
    key:"/",
    children:[
        {
            title:"登录",
            key:"/mockLogin",
        },
        {
            title:"css",
            key:'/layout',
            children:[
                {
                    title:"双飞翼布局",
                    key:'/layout/test1',
                },
                {
                    title:"clientXScreenXPageX",
                    key:"/layout/clientXScreenXPageX"
                },
                {
                    title:"css 的‘奇技淫巧’",
                    key:"/layout/funcss",
                    children:[
                        {
                            title:"css 画龙",
                            key:"/layout/funcss/dragon",
                        },
                        {
                            title:"css 画波浪",
                            key:"/layout/funcss/wave"
        
                        }
                    ]
                }
            ]
        },
        {
            title:"组件通信",
            key:"/communication",
            children:[
                // {
                //     title:"context",
                //     key:"/communication/context",
                // },
                // {
                //     title:"redux",
                //     key:"/communication/redux",
                // },
                // {
                //     title:"react-redux",
                //     key:"/communication/redux-redux",
                // },
                // {
                //     title:"route",
                //     key:"/communication/route",
                // },
            ]
        },
        {
            title:"API",
            key:'/api',
            children:[
                {
                    title:"react apis",
                    key:'/api/react',
                },
                {
                    title:"hooks",
                    key:"/api/hooks",
                }

            ]
        },
    ]
}

// 导航菜单
function NavMenu(props) {
    const {children = []} = navConfig;

    function  jump( item) {
        const {key} = item;
        key && props.history.push({
            pathname:key,
        })
    }

    function renderMenuItem(children = []) {
        return children.map( (item)=>{
            const { children:list , key , title , url } = item;
            if(list && list.length > 0){
                return <SubMenu key={key} title={title} icon={<AppstoreOutlined/>}>
                {renderMenuItem(list)}
                </SubMenu>
            }else{
                return <Menu.Item key={key} onClick={()=>{ url && jump(url) }}>{title}</Menu.Item>
            }
        })
    }
    return <React.Fragment>
        <Menu mode="inline"
            onClick = {jump}
        >
            {renderMenuItem(children)}
        </Menu>
    </React.Fragment>
}

export default withRouter(forwardRef( (props , ref) => <NavMenu ref = {ref} {...props}/>))