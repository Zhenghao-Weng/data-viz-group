import React, { useEffect, useState, useRef } from 'react';
import { Radio, Space, Divider, Button, Grid } from 'antd';
import * as echarts from 'echarts';
import axios from 'axios';

import './index.css';
import { BankTwoTone } from '@ant-design/icons';

function CountryViz () {
    const [creativeType, setCreativeType] = useState('All creative industries');
    const [detail, setDetail] = useState('Employment');
    const [columnName, setcolumnName] = useState(null);
    const [mapData, setMapData] = useState([]);
    const [triggerChange, setTriggerChange] = useState(false);

    const mapDivRef = useRef(null);
    const topBarDivRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, [creativeType, detail]);

    const fetchData = async () => {
        if (!detail || !creativeType) return;

        const geojsonUrl = process.env.PUBLIC_URL + '/data/UK.json';
        try {
            const response = await axios.get(geojsonUrl);
            echarts.registerMap('UK', response.data);

            const data = response.data.features.map(feature => {
                const columnName = `${creativeType}: ${detail} 2015-2016`;
                setcolumnName(columnName)
                if (feature.properties && feature.properties['name'] && feature.properties[columnName]) {
                    return {
                        name: feature.properties['name'],
                        value: feature.properties[columnName]
                    };
                }
                return undefined;
            }).filter(item => item !== undefined);
            setMapData(data);
        } catch (error) {
            console.error('请求 GeoJSON 数据失败:', error);
        }
    };

    useEffect(() => {
        if (mapDivRef.current && mapData.length > 0 && topBarDivRef.current) {
            const myChart = echarts.init(mapDivRef.current);
            const myTopChart = echarts.init(topBarDivRef.current);
            const sortedData = mapData.sort((a, b) => a.value - b.value);
            const filteredSortedData = sortedData.filter(item => item.name !== 'London');
            const option = {
                title: {
                    text: 'UK ' + columnName,
                    subtext: 'Creative Nation open data',
                    sublink: 'https://www.nesta.org.uk/blog/creative-nation-open-data/',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2
                },
                visualMap: {
                    right: '20%',
                    top: '70%',
                    min: 10,
                    max: 10000,
                    text: ['High', 'Low'],
                    calculable: true,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    }
                },
                series: [
                    {
                        name: columnName,
                        id: 'population',
                        type: 'map',
                        roam: true,
                        map: 'UK',
                        aspectScale: 1,
                        animationDurationUpdate: 2000,
                        universalTransition: true,
                        data: mapData
                    }
                ]
            };

            const barOption = {
                title: {
                    text: 'UK ' + columnName,
                    subtext: 'Creative Nation open data',
                    sublink: 'https://www.nesta.org.uk/blog/creative-nation-open-data/',
                    left: 'center'
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    axisLabel: {
                        rotate: 0
                    },
                    data: sortedData.map(function (item) {
                        return item.name;
                    })
                },
                animationDurationUpdate: 2000,
                series: {
                    type: 'bar',
                    id: 'population',
                    data: sortedData.map(function (item) {
                        return item.value;
                    }),
                    universalTransition: true
                }
            };

            const barTopOption = {
                title: {
                    text: 'UK ' + columnName + ' Top 20 without London',
                    subtext: 'Creative Nation open data',
                    sublink: 'https://www.nesta.org.uk/blog/creative-nation-open-data/',
                    left: 'center'
                },
                grid: {
                    left: 240
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    axisLabel: {
                        rotate: 0
                    },
                    data: filteredSortedData.slice(sortedData.length - 20, sortedData.length).map(function (item) {
                        return item.name;
                    })
                },
                animationDurationUpdate: 1000,
                series: {
                    type: 'bar',
                    id: 'population',
                    data: filteredSortedData.slice(sortedData.length - 20, sortedData.length).map(function (item) {
                        return item.value;
                    }),
                    universalTransition: true
                }
            };

            myTopChart.setOption(barTopOption)
            let currentOption = option;
            myChart.setOption(option);
            setInterval(function () {
                if (triggerChange) {
                    currentOption = currentOption === option ? barOption : option;
                    myChart.setOption(currentOption, true);
                    // setTriggerChange(false)
                }
            }, 5000);

            return () => {
                myChart.dispose();
                myTopChart.dispose()
            };
        }
    }, [mapData, mapDivRef.current, triggerChange, topBarDivRef.current]);

    const changeType = (e) => {
        setCreativeType(e.target.value);
    };
    const changeDetail = (e) => {
        setDetail(e.target.value);
    };
    const changeMap = () => {
        setTriggerChange(true)
    }

    return (
        <div style={{ marginBottom: '100px' }}>
            <h1>Creative Industries Data Query</h1>
            <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'left', width: '30%', display: 'inline-block', marginLeft: '250px', marginTop: '100px' }}>
                    <Radio.Group onChange={changeType} value={creativeType} buttonStyle="solid">
                        <Space direction="vertical">
                            <Radio value={'All creative industries'}>All creative industries</Radio>
                            <Radio value={'Advertising and marketing'}>Advertising and marketing</Radio>
                            <Radio value={'Architecture'}>Architecture</Radio>
                            <Radio value={'Design: product, graphic and fashion design'}>Design: product, graphic and fashion design</Radio>
                            <Radio value={'Film, TV, video, radio and photography'}>Film, TV, video, radio and photography</Radio>
                            <Radio value={'IT, software and computer services'}>IT, software and computer services</Radio>
                            <Radio value={'Music, performing and visual arts'}>Music, performing and visual arts</Radio>
                            <Radio value={'Publishing'}>Publishing</Radio>
                        </Space>
                    </Radio.Group>
                    <Divider />
                    <Radio.Group onChange={changeDetail} value={detail} buttonStyle="solid">
                        <Radio.Button value={'Employment'}>Employment</Radio.Button>
                        <Radio.Button value={'Number of businesses'}>Number of businesses</Radio.Button>
                    </Radio.Group>
                    <Divider />
                    <Button type='primary' onClick={changeMap}>Activate Changing</Button>
                </div>
                <div ref={mapDivRef} style={{ width: '70%', height: '700px', display: 'inline-block' }} />
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'left', width: '30%', display: 'inline-block', marginLeft: '100px' }}>
                    <h2>Geographic Concentration of Creative Industries</h2>
                    <ul>
                        <li>Creative industry employment and business activities are highly concentrated in a few areas.</li>
                        <li>Major cities such as London, Manchester, Bristol, Edinburgh, and Cardiff are hubs of these activities.</li>
                    </ul>
                    <h2 style={{ marginTop: '50px' }}>Differences Among Sub-sectors</h2>
                    <ul>
                        <li>There are noticeable differences in the geographic distribution of various creative sub-sectors.</li>
                        <li>The concentration of IT-related employment increased rapidly in London, whereas the concentration of traditional publishing decreased, reflecting the relative decline of large, established clusters like Peterborough.</li>
                    </ul>
                    <h2 style={{ marginTop: '50px' }}>Contribution to Local Economies</h2>
                    <ul>
                        <li>The distribution of creative businesses within regions shows significant concentration patterns. This pattern reflects the economic contribution of creative industries in different regions.</li>
                    </ul>
                </div>
                <div ref={topBarDivRef} style={{ width: '70%', height: '700px', display: 'inline-block' }} />
            </div>
        </div>
    );
}

export default CountryViz;