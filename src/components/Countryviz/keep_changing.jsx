import React, { useEffect, useState, useRef } from 'react';
import { Radio, Space, Divider, Button } from 'antd';
import * as echarts from 'echarts';
import axios from 'axios';

import './index.css';

function CountryViz () {
    const [creativeType, setCreativeType] = useState('All creative industries');
    const [detail, setDetail] = useState('Employment');
    const [columnName, setcolumnName] = useState(null);
    const [mapData, setMapData] = useState([]);

    const mapDivRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, [creativeType, detail]);

    const fetchData = async () => {
        if (!detail || !creativeType) return;

        const geojsonUrl = '/data/UK.json';
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
        if (mapDivRef.current && mapData.length > 0) {
            const myChart = echarts.init(mapDivRef.current);
            const sortedData = mapData.sort((a, b) => a.value - b.value);
            const option = {
                title: {
                    text: 'UK all creative industries Employment (2015-2016)',
                    subtext: 'Creative Nation open data',
                    sublink: 'https://www.nesta.org.uk/blog/creative-nation-open-data/',
                    left: 'right'
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2
                },
                visualMap: {
                    right: '5%',
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
                        animationDurationUpdate: 1000,
                        universalTransition: true,
                        data: mapData
                    }
                ]
            };

            const barOption = {
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
                animationDurationUpdate: 1000,
                series: {
                    type: 'bar',
                    id: 'population',
                    data: sortedData.map(function (item) {
                        return item.value;
                    }),
                    universalTransition: true
                }
            };

            let currentOption = option;
            myChart.setOption(option);
            setInterval(function () {
                currentOption = currentOption === option ? barOption : option;
                myChart.setOption(currentOption, true);
            }, 3000);

            return () => {
                myChart.dispose();
            };
        }
    }, [mapData, mapDivRef.current]);

    const changeType = (e) => {
        setCreativeType(e.target.value);
    };
    const changeDetail = (e) => {
        setDetail(e.target.value);
    };
    const changeMap = () => {
        console.log('change map');
    }

    return (
        <div>
            <h1>Creative Industries Data Query</h1>
            <div style={{ width: '70%', display: 'flex', alignItems: 'flex-start', paddingLeft: '10%' }}>
                <div style={{ textAlign: 'left', width: '27%', display: 'inline-block' }}>
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
                    <Button onClick={changeMap}>change map</Button>
                </div>
                <div ref={mapDivRef} style={{ width: '65%', height: '700px', display: 'inline-block' }} />
            </div>
        </div>
    );
}

export default CountryViz;