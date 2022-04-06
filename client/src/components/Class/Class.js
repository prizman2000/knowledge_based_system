import React, {useEffect, useState} from "react";
import s from './Class.module.scss';
import {Button, Input, List} from 'antd';

export default function Class() {

    const [classInput, setClassInput] = useState('');

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const addClass = (name) => {
        setClassInput('');
        fetch("http://localhost:8000/style", {method: 'post', body: JSON.stringify({name: name})})
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

    const deleteClass = (id) => {
        setClassInput('');
        fetch(`http://localhost:8000/style/${id}`, {method: 'delete'})
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
                <Input value={classInput} onChange={(e) => setClassInput(e.target.value)} className={s.input} placeholder={'Введите название класса'} />
                <Button onClick={() => addClass(classInput)} className={s.button} type="primary">Добавить</Button>
            </Input.Group>
            {isLoaded ?
                <List
                    className={s.list}
                    size={'large'}
                    borded
                    dataSource={data}
                    renderItem={item =>
                        <List.Item className={s.list_item}>
                            <List.Item.Meta
                                title={item.name}/>
                            <Button onClick={() => deleteClass(item.id)} danger>Удалить</Button>
                        </List.Item>
                    }
                />
            :
                <>Loader</>
            }

        </>
    );
}