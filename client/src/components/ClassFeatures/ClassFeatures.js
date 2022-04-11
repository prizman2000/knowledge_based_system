import React, {useEffect, useState} from "react";
import {Button, Input, List, Select, Switch} from "antd";
import s from "../Class/Class.module.scss";
import cn from "classnames";

const { Option } = Select;

export default function ClassFeatures() {

    const [styles, setStyles] = useState([]);
    const [styleSelector, setStyleSelector] = useState(null);
    const [features, setFeatures] = useState([]);
    const [featureSelector, setFeatureSelector] = useState(null);
    const [styleFeatures, setStyleFeatures] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const handleChangeStyle = (e) => {
        setStyleSelector(e);
    };

    const handleChangeFeature = (e) => {
        setFeatureSelector(e);
    };

    const addFeatureValue = (style_name, feature_name) => {
        fetch("http://localhost:8000/style-feature", {method: 'post', body: JSON.stringify({class_name: style_name, feature_name: feature_name})})
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
        fetch(`http://localhost:8000/style-feature/${id}`, {method: 'delete'})
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
        fetch("http://localhost:8000/style")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setStyleSelector(result[0].name);
                    setStyles(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        fetch("http://localhost:8000/feature")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setFeatureSelector(result[0].name);
                    setFeatures(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/style-feature/${styleSelector}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setStyleFeatures(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [styleSelector, refresh]);

    return (
        <>
            {styles[0] ?
                <Select className={s.input_select} defaultValue={styles[0].name} onChange={(e) => handleChangeStyle(e)}>
                    {styles.map((item, i) =>
                        <Option value={item.name}>{item.name}</Option>
                    )}
                </Select>
            : null}

            <List
                className={s.list}
                size={'large'}
                borded
                dataSource={styleFeatures}
                renderItem={item =>
                    <>
                        {item.feature_name &&
                            <List.Item className={s.list_item}>
                                <List.Item.Meta
                                    title={item.feature_name}/>
                                <Button onClick={() => deleteFeatureValue(item.id)} danger>Удалить</Button>
                            </List.Item>
                        }
                    </>
                }
            />

            <Input.Group className={cn(s.add_field, s.bot)} compact>
                {features[0] ?
                    <Select className={s.input_select} defaultValue={features[0].name} onChange={(e) => handleChangeFeature(e)}>
                        {features.map((item, i) =>
                            <Option value={item.name}>{item.name}</Option>
                        )}
                    </Select>
                : null}

                <Button onClick={() => addFeatureValue(styleSelector, featureSelector)} className={s.button} type="primary">Добавить</Button>
            </Input.Group>
        </>
    );
}