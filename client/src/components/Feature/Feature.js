import React from "react";
import {Button, Input, List} from "antd";
import s from "../Class/Class.module.scss";

export default function Feature() {

    const data = [
        'Половой тип',
        'Тип ношения',
        'Цвет',
        'Цена',
        'Размер',
    ];

    return (
        <>
            <Input.Group className={s.add_field} compact>
                <Input className={s.input} placeholder={'Введите название признака'} />
                <Button className={s.button} type="primary">Добавить</Button>
            </Input.Group>
            <List
                className={s.list}
                size={'large'}
                borded
                dataSource={data}
                renderItem={item =>
                    <List.Item className={s.list_item}>
                        <List.Item.Meta
                            title={item}/>
                        <Button danger>Удалить</Button>
                    </List.Item>
                }
            >

            </List>
        </>
    );
}