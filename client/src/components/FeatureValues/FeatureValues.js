import React, {useEffect, useState} from "react";
import {Button, Input, List, Select} from "antd";
import s from "../Class/Class.module.scss";
import cn from 'classnames';

const { Option } = Select;

export default function FeatureValues() {

    const [featureSelector, setFeatureSelector] = useState('');
    const [features, setFeatures] = useState([]);

    const [valueSelector, setValueSelector] = useState('');

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const addFeatureValue = (name, value) => {
        setValueSelector('');
        fetch("http://localhost:8000/feature-value", {method: 'post', body: JSON.stringify({feature_name: name, value: value})})
            .then(res => res.json())
            .then(
                () => {
                    setRefresh(!refresh);
                },
                (error) => {
                    setRefresh(!refresh);
                    setError(error);
                }
            )
    };

    const deleteFeatureValue = (id) => {
        fetch(`http://localhost:8000/feature-value/${id}`, {method: 'delete'})
            .then(res => res.json())
            .then(
                () => {
                    setRefresh(!refresh);
                },
                (error) => {
                    setRefresh(!refresh);
                    setError(error);
                }
            )
    };

    const handleChange = (e) => {
        setFeatureSelector(e);
    };

    useEffect(() => {
        fetch("http://localhost:8000/feature")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setFeatureSelector(result[0].name)
                    setFeatures(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    useEffect(() => {
        fetch("http://localhost:8000/feature-value")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setData(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [refresh]);

    return (
        <>
            {features[0] ?
                <Select className={s.input_select} defaultValue={features[0].name} onChange={(e) => handleChange(e)}>
                    {features.map((item, i) =>
                        <Option key={i} value={item.name}>{item.name}</Option>
                    )}
                </Select>
            : null}

            <List
                className={s.list}
                size={'large'}
                borded
                dataSource={data}
                renderItem={item =>
                    <>
                        {item.feature_name === featureSelector &&
                            <List.Item className={s.list_item}>
                                <List.Item.Meta
                                    title={item.value}/>
                                <Button onClick={() => deleteFeatureValue(item.id)} danger>Удалить</Button>
                            </List.Item>
                        }
                    </>
                }
            >

            </List>
            <Input.Group className={cn(s.add_field, s.bot)} compact>
                <Input value={valueSelector} onChange={(e) => setValueSelector(e.target.value)} className={s.input} placeholder={'Введите новое значение признака'}/>
                <Button onClick={() => addFeatureValue(featureSelector, valueSelector)} className={s.button} type="primary">Добавить</Button>
            </Input.Group>
        </>
    );
}