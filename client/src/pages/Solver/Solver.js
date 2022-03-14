import React from "react";
import s from './Solver.module.scss';
import {Button, List, Select, Switch, Tabs} from "antd";

const { TabPane } = Tabs;

const { Option } = Select;

export default function Solver() {

    const dataClass = [
        'Классический',
        'Спортивный',
        'Кэжуал',
        'Минимализм',
        'Гламур',
    ];

    const dataFeatures = [
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

    const handleChangeFeature = () => {
        console.log('changed');
    };

    const callback = (key) => {
        console.log(key);
    }

    return (
        <div className={s.ctn}>
            <div className={s.left_col}>
                <Select className={s.input_select} defaultValue={dataFeatures[0]} onChange={handleChange}>
                    {dataFeatures.map((name, i) =>
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
                />
                <Button className={s.submit} type="primary">Результат</Button>
            </div>
            <div className={s.right_col}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Возможные классы" key="1">
                        <List
                            className={s.list}
                            size={'large'}
                            borded
                            dataSource={dataClass}
                            renderItem={item =>
                                <List.Item className={s.list_item}>
                                    <List.Item.Meta
                                        title={item}/>
                                </List.Item>
                            }
                        />
                    </TabPane>
                    <TabPane tab="Несоответствуюшие классы" key="2">
                        <List
                            className={s.list}
                            size={'large'}
                            borded
                            dataSource={dataClass}
                            renderItem={item =>
                                <List.Item className={s.list_item}>
                                    <List.Item.Meta
                                        title={item}/>
                                    <Select className={s.input_select} defaultValue={dataFeatures[0]} onChange={handleChangeFeature}>
                                        {dataFeatures.map((name, i) =>
                                            <Option className={s.option} value={name}>{name}</Option>
                                        )}
                                    </Select>
                                </List.Item>
                            }
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}