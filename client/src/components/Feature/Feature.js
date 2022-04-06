import React, {useEffect, useState} from "react";
import {Button, Input, List} from "antd";
import s from "../Class/Class.module.scss";

export default function Feature() {

    const [featureInput, setFeatureInput] = useState('');

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const addFeature = (name) => {
        setFeatureInput('');
        fetch("http://localhost:8000/feature", {method: 'post', body: JSON.stringify({name: name})})
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

    const deleteFeature = (id) => {
        setFeatureInput('');
        fetch(`http://localhost:8000/feature/${id}`, {method: 'delete'})
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
            <Input.Group className={s.add_field} compact>
                <Input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className={s.input} placeholder={'Введите название признака'} />
                <Button onClick={() => addFeature(featureInput)} className={s.button} type="primary">Добавить</Button>
            </Input.Group>
            <List
                className={s.list}
                size={'large'}
                borded
                dataSource={data}
                renderItem={item =>
                    <List.Item className={s.list_item}>
                        <List.Item.Meta
                            title={item.name}/>
                        <Button onClick={() => deleteFeature(item.id)} danger>Удалить</Button>
                    </List.Item>
                }
            >

            </List>
        </>
    );
}