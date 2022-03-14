import React, {useState} from "react";
import {List, Select, Switch} from "antd";
import s from "../Class/Class.module.scss";

const { Option } = Select;

export default function ClassFeaturesValues() {

    const dataClass = [
        'Классический',
        'Спортивный',
        'Кэжуал',
        'Минимализм',
        'Гламур',
    ];

    const dataFeature = [
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

    const handleChangeClass = () => {
        console.log('changed');
    };

    const handleChangeFeature = () => {
        console.log('changed');
    };

    return (
        <>
            <Select className={s.input_select} defaultValue={dataClass[0]} onChange={handleChangeClass}>
                {dataClass.map((name, i) =>
                    <Option value={name}>{name}</Option>
                )}
            </Select>
            <Select className={s.input_select} defaultValue={dataFeature[0]} onChange={handleChangeFeature}>
                {dataFeature.map((name, i) =>
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
                        <Switch/>
                    </List.Item>
                }
            >

            </List>
        </>
    );
}