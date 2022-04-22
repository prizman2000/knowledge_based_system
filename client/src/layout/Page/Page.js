import React, {useState} from 'react';
import s from './Page.module.scss';

import { Layout, Menu } from 'antd';

const { Header, Content, Sider } = Layout;

export default function Page(props) {

    const handleTopMenuClick = (e) => {
        props.setTopMenu(e.key);
    };

    const handleSideMenuClick = (e) => {
        props.setSideMenu(e.key);
    };

    return (
        <Layout style={{minHeight: 100+'vh'}}>
            <Header className={s.header}>
                <Menu theme={'dark'} mode={'horizontal'} onClick={handleTopMenuClick} defaultSelectedKeys={[`${props.topMenu}`]}>
                    <Menu.Item key={'1'}>Решатель</Menu.Item>
                    <Menu.Item key={'2'}>Редактор базы знаний</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    {props.topMenu === '2' ?
                        <Sider className="site-layout-background" width={300}>
                            <Menu
                                mode="inline"
                                onClick={handleSideMenuClick}
                                defaultSelectedKeys={[`${props.sideMenu}`]}
                                style={{ height: '100%' }}
                            >
                                <Menu.Item key={'1'}>Классы</Menu.Item>
                                <Menu.Item key={'2'}>Признаки</Menu.Item>
                                <Menu.Item key={'3'}>Признаки класса</Menu.Item>
                                <Menu.Item key={'4'}>Возможные значения признаков</Menu.Item>
                                <Menu.Item key={'5'}>Значения признаков для класса</Menu.Item>
                            </Menu>
                        </Sider>
                    : null}
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {props.children}
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
}