import React, {useEffect, useState} from "react";
import s from './Solver.module.scss';
import {Button, List, Select, Switch, Tabs, Collapse, Alert} from "antd";

const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;

export default function Solver() {

    const [solve, setSolve] = useState();

    const [featureList, setFeatureList] = useState([]);
    const [featureSelector, setFeatureSelector] = useState(null);
    const [featureValues, setFeatureValues] = useState([]);

    const [selectedFeatures, setSelectedFeatures] = useState({});

    const [possibleClasses, setPossibleClasses] = useState(null);

    const [checkComplete, setCheckComplete] = useState(false);

    const handleChangeFeature = (e) => {
        setFeatureSelector(e);
    };

    const selectFeature = (value, enable) => {
        let newValue = selectedFeatures;
        if (enable) {
            if (!newValue[featureSelector]) {
                newValue[featureSelector] = [];
            }
            newValue[featureSelector].push(value);
            setSelectedFeatures({...newValue});
        } else {
            newValue[featureSelector].splice(newValue[featureSelector].indexOf(value), 1);
            setSelectedFeatures({...newValue});
        }
    };

    const emptyRequest = () => {
        let result = true;
        if (Object.keys(selectedFeatures).length !== 0) {
            for (let name in selectedFeatures) {
                if (selectedFeatures[name].length > 0) {
                    result = false;
                }
            }
            return result;
        } else {
            return result;
        }
    };

    const handleSolve = () => {
        setSolve(true);
        fetch("http://localhost:8000/solve", {method: 'post', body: JSON.stringify({data: selectedFeatures})})
            .then(res => res.json())
            .then(
                (result) => {
                    setPossibleClasses(result);
                },
                (error) => {
                    console.log('Solver error: ' + error);
                }
            )
    };

    const handleCheckComplete = () => {
        fetch("http://localhost:8000/completeness-check")
            .then(res => res.json())
            .then(
                (result) => {
                    setCheckComplete(result);
                },
                (error) => {
                    console.log('Complete error: ' + error);
                }
            )
    };

    const callback = (key) => {
        console.log(key);
    };

    useEffect(() => {
        fetch("http://localhost:8000/feature")
            .then(res => res.json())
            .then(
                (result) => {
                    if (!featureSelector) {
                        setFeatureSelector(result[0].name);
                    }
                    setFeatureList(result);
                },
                (error) => {
                    console.log('Solver error: ' + error);
                }
            )
        fetch("http://localhost:8000/feature-value")
            .then(res => res.json())
            .then(
                (result) => {
                    setFeatureValues(result);
                },
                (error) => {
                    console.log('Solver error: ' + error);
                }
            )
    }, []);

    console.log(checkComplete);

    return (
        <div className={s.ctn}>
            {!solve ?
                <div className={s.solver_entry}>
                    <div className={s.left_col}>
                        {(!checkComplete || checkComplete.length > 0) &&
                            <Button onClick={handleCheckComplete} className={s.submit} type="primary">Проверить полноту</Button>
                        }
                        {checkComplete && checkComplete.status &&
                             <>
                                 {featureList.length !== 0 &&
                                 <Select className={s.input_select} defaultValue={featureList[0].name} onChange={(e) => handleChangeFeature(e)}>
                                     {featureList.map((item, i) =>
                                         <Option key={i} value={item.name}>{item.name}</Option>
                                     )}
                                 </Select>
                                 }
                                 {featureValues.length !== 0 && featureList.length !== 0 &&
                                 <List
                                     className={s.list}
                                     size={'large'}
                                     borded
                                     dataSource={featureValues}
                                     renderItem={item =>
                                         <>
                                             {item.feature_name === featureSelector &&
                                             <List.Item className={s.list_item}>
                                                 <List.Item.Meta
                                                     title={item.value}/>
                                                 <Switch onClick={(e) => selectFeature(item.value, e)} checked={selectedFeatures[featureSelector] ? selectedFeatures[featureSelector].includes(item.value) : false}/>
                                             </List.Item>
                                             }
                                         </>
                                     }
                                 />
                                 }
                                 <Button disabled={Object.keys(selectedFeatures).length === 0 || emptyRequest()} onClick={handleSolve} className={s.submit} type="primary">Результат</Button>
                             </>
                        }

                    </div>

                    <div className={s.entered_data}>
                        {(!checkComplete || checkComplete.length > 0) &&
                            <>
                                <Alert
                                    message={checkComplete.length > 0 ? "Ошибка проверка полноты" : "Необходима проверка полноты"}
                                    description={checkComplete.length > 0 ? "Следующие признаки классов не заданы. Вырнитесь в редактор и задайте недостающие значения" : "Выполните проверку полноты базы знаний для дальнейшей работы с решателем"}
                                    type={checkComplete.length > 0 ? "error" : "info"}
                                />
                            </>
                        }
                        {checkComplete.length > 0 &&
                            <div className={s.bad_list}>
                                <List
                                    className={s.list}
                                    size={'large'}
                                    borded
                                    dataSource={checkComplete}
                                    renderItem={item =>
                                        <List.Item className={s.list_item}>
                                            <List.Item.Meta
                                                title={item.class_name} description={item.feature_name}/>
                                        </List.Item>
                                    }
                                />
                            </div>
                        }
                        {checkComplete && checkComplete.status &&
                            <>
                                {!emptyRequest() ?
                                    <Collapse>
                                        {Object.keys(selectedFeatures).map((name, i) =>
                                            <>
                                                {selectedFeatures[name].length !== 0 &&
                                                <Panel header={name} key={i}>
                                                    {selectedFeatures[name].map((item, i) =>
                                                        <p key={i}>{item}</p>
                                                    )}
                                                </Panel>
                                                }
                                            </>
                                        )}
                                    </Collapse>
                                    :
                                    <Alert
                                        message="Проверка полноты завершена успешно"
                                        description="Кнопка результата станет активна после того, как будут введены входные значения признаков"
                                        type="info"
                                    />
                                }
                            </>
                        }
                    </div>
                </div>
            :
                <div className={s.right_col}>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Возможные классы" key="1">
                                {possibleClasses && JSON.parse(possibleClasses).length !== 0 ?
                                    <List
                                        className={s.list}
                                        size={'large'}
                                        borded
                                        dataSource={JSON.parse(possibleClasses)}
                                        renderItem={item =>
                                            <List.Item className={s.list_item}>
                                                <List.Item.Meta
                                                    title={item.name}/>
                                            </List.Item>
                                        }
                                    />
                                :
                                    <Alert
                                        message="Возможные классы не найдены"
                                        description="Попробуйте задать другие входные значения признаков"
                                        type="info"
                                    />
                                }
                            </TabPane>
                    </Tabs>
                    <Button onClick={() => setSolve(false)} className={s.submit_back} type="primary">Назад</Button>
                </div>
            }
        </div>
    );
}