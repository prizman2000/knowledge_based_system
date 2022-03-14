import React, {useState} from "react";
import {Button, Input, List, Select} from "antd";
import s from "../Class/Class.module.scss";
import cn from 'classnames';

const { Option } = Select;

export default function FeatureValues() {

    const data = [
        'Половой тип',
        'Тип ношения',
        'Цвет',
        'Цена',
        'Размер',
    ];

    const dataValues = [
        'Мужская',
        'Женская',
        'Детская'
    ];

    const handleChange = () => {
        console.log('changed');
    };

    return (
        <>
            <Select className={s.input_select} defaultValue={data[0]} onChange={handleChange}>
                {data.map((name, i) =>
                    <Option value={name}>{name}</Option>
                )}
            </Select>
            <List
                className={s.list}
                size={'large'}
                borded
                dataSource={dataValues}
                renderItem={item =>
                    <List.Item className={s.list_item}>
                        <List.Item.Meta
                            title={item}/>
                        <Button danger>Удалить</Button>
                    </List.Item>
                }
            >

            </List>
            <Input.Group className={cn(s.add_field, s.bot)} compact>
                <Input className={s.input} placeholder={'Введите новое значение признака'}/>
                <Button className={s.button} type="primary">Добавить</Button>
            </Input.Group>
        </>
    );
}