import React, {useEffect, useState} from "react";
import {Button, Input, List, Select, Switch} from "antd";
import s from "../Class/Class.module.scss";
import cn from "classnames";

const { Option } = Select;

export default function ClassFeaturesValues() {

    const [featureList, setFeatureList] = useState([]);
    const [featureSelector, setFeatureSelector] = useState(null);
    const [styleList, setStyleList] = useState([]);
    const [styleSelector, setStyleSelector] = useState([]);
    const [classValues, setClassValues] = useState([]);
    const [featureValue, setFeatureValue] = useState([]);
    const [featureValueSelector, setFeatureValueSelector] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    const [refresh, setRefresh] = useState(false);

    const handleChangeClass = (e) => {
        setStyleSelector(e);
    };

    const handleChangeFeature = (e) => {
        setFeatureValueSelector(null);
        setFeatureSelector(e);
    };

    const handleChangeFeatureValue = (e) => {
        setFeatureValueSelector(e);
    };

    const addStyleFeatureValue = (class_name, feature_name, feature_value) => {
        fetch("http://localhost:8000/style-feature-value", {method: 'post', body: JSON.stringify({class_name: class_name, feature_name: feature_name, feature_value: feature_value})})
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

    const handleDeleteStyleValue = (id) => {
        fetch(`http://localhost:8000/style-feature-value/${id}`, {method: 'delete'})
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

    useEffect(() => {
        fetch("http://localhost:8000/feature")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setFeatureSelector(result[0].name)
                    setFeatureList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        fetch("http://localhost:8000/style")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setStyleSelector(result[0].name)
                    setStyleList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        fetch("http://localhost:8000/feature-value")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setFeatureValue(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    useEffect(() => {
        fetch("http://localhost:8000/style-feature-value")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setClassValues(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [refresh]);



    return (
        <>
            {styleList.length !== 0 &&
                <Select className={s.input_select} defaultValue={styleList[0].name} onChange={(e) => handleChangeClass(e)}>
                    {styleList.map((item, i) =>
                        <Option key={i} value={item.name}>{item.name}</Option>
                    )}
                </Select>
            }
            {featureList.length !== 0 &&
                <Select className={s.input_select} defaultValue={featureList[0].name} onChange={(e) => handleChangeFeature(e)}>
                    {featureList.map((item, i) =>
                        <Option key={i} value={item.name}>{item.name}</Option>
                    )}
                </Select>
            }

            <List
                className={s.list}
                size={'large'}
                borded
                dataSource={classValues}
                renderItem={item =>
                    <>
                        {item.class_name === styleSelector && item.feature_name === featureSelector &&
                            <List.Item className={s.list_item}>
                                <List.Item.Meta
                                    title={item.feature_value}/>
                                <Button onClick={() => handleDeleteStyleValue(item.id)} danger>Удалить</Button>
                            </List.Item>
                        }
                    </>
                }
            />

            <Input.Group className={cn(s.add_field, s.bot)} compact>
                {featureValue.length !== 0 &&
                    <Select className={s.input_select} value={featureValueSelector} onChange={(e) => handleChangeFeatureValue(e)}>
                        {featureValue.map((item, i) =>
                            <>
                                {featureSelector === item.feature_name &&
                                    <Option value={item.value}>{item.value}</Option>
                                }
                            </>
                        )}
                    </Select>
                }

                <Button onClick={() => addStyleFeatureValue(styleSelector, featureSelector, featureValueSelector)} className={s.button} type="primary">Добавить</Button>
            </Input.Group>
        </>
    );
}