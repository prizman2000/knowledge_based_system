import React from "react";
import s from './Class.module.scss';
import {List, Button, Input} from 'antd';

export default function Class() {

    const data = [
        'Классический',
        'Спортивный',
        'Кэжуал',
        'Минимализм',
        'Гламур',
    ];

    return (
        <>
            <Input.Group className={s.add_field} compact>
                <Input className={s.input} placeholder={'Введите название класса'} />
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