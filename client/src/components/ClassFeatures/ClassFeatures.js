import React, {useState} from "react";
import {Button, Input, List, Select, Switch} from "antd";
import s from "../Class/Class.module.scss";

const { Option } = Select;

export default function ClassFeatures() {

    const dataClass = [
        'Классический',
        'Спортивный',
        'Кэжуал',
        'Минимализм',
        'Гламур',
    ];

    const data = [
        'Половой тип',
        'Тип ношения',
        'Цвет',
        'Цена',
        'Размер',
    ];

    const handleChange = () => {
        console.log('changed');
    };

    return (
        <>
            <Select className={s.input_select} defaultValue={dataClass[0]} onChange={handleChange}>
                {dataClass.map((name, i) =>
                    <Option value={name}>{name}</Option>
                )}
            </Select>
            <List
                className={s.list}
                size={'large'}
                borded
                dataSource={data}
                renderItem={item =>
                    <List.Item className={s.list_item}>
                        <List.Item.Meta
                            title={item}/>
                        <Switch/>
                    </List.Item>
                }
            />
        </>
    );
}