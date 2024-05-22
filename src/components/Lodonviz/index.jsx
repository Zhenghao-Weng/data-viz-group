import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Divider, Button, Radio, Space } from "antd";
import { RedoOutlined } from '@ant-design/icons';

const Londonviz = () => {
    const [creativeType, setCreativeType] = useState('Advertising and marketing');

    const chartRef = useRef(null);
    const chart2Ref = useRef(null);
    let myChart = null;
    let myChart2 = null;

    const data = [
        { name: 'Advertising and marketing - London', value: [60, 70, 70, 73, 84, 88, 97, 98, 99, 93, 98, 109] },
        { name: 'Architecture - London', value: [34, 29, 26, 27, 27, 24, 26, 22, 31, 32, 36, 28] },
        { name: 'Crafts - London', value: [1, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1] },
        { name: 'Design: product, graphic and fashion design - London', value: [32, 33, 32, 39, 42, 36, 40, 54, 49, 44, 49, 54] },
        { name: 'Film, TV, video, radio and photography - London', value: [76, 84, 101, 99, 98, 96, 93, 108, 98, 100, 119, 122] },
        { name: 'IT, software and computer services - London', value: [96, 112, 127, 141, 140, 162, 174, 193, 213, 222, 244, 286] },
        { name: 'Museums, galleries and libraries - London', value: [26, 26, 20, 18, 22, 22, 20, 23, 28, 28, 31, 17] },
        { name: 'Music, performing and visual arts - London', value: [78, 69, 70, 63, 94, 85, 97, 78, 97, 93, 104, 95] },
        { name: 'Publishing - London', value: [66, 75, 69, 73, 73, 72, 73, 68, 83, 78, 80, 83] },

        { name: 'Advertising and marketing - All other regions in UK', value: [64, 64, 65, 67, 74, 68, 71, 82, 80, 79, 78, 79] },
        { name: 'Architecture - All other regions in UK', value: [64, 64, 65, 67, 74, 68, 71, 82, 80, 79, 78, 79] },
        { name: 'Crafts - All other regions in UK', value: [6, 7, 6, 6, 6, 5, 4, 8, 7, 8, 6, 6] },
        { name: 'Design: product, graphic and fashion design - All other regions in UK', value: [80, 70, 84, 86, 95, 97, 120, 106, 114, 126, 103, 107] },
        { name: 'Film, TV, video, radio and photography - All other regions in UK', value: [114, 126, 137, 133, 129, 138, 153, 151, 147, 139, 158, 166] },
        { name: 'IT, software and computer services - All other regions in UK', value: [352, 370, 430, 436, 468, 482, 501, 515, 516, 552, 629, 672] },
        { name: 'Museums, galleries and libraries - All other regions in UK', value: [68, 64, 66, 67, 62, 74, 74, 73, 61, 68, 71, 76] },
        { name: 'Music, performing and visual arts - All other regions in UK', value: [156, 146, 156, 180, 190, 204, 192, 203, 200, 220, 191, 199] },
        { name: 'Publishing - All other regions in UK', value: [133, 136, 151, 126, 123, 128, 121, 122, 117, 118, 118, 117] }
    ]
    const option = {
        animationDuration: 6000,
        title: {
            text: 'Total Number of Jobs by Industries (2010 - 2021)',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            order: 'valueDesc',

        },
        legend: {
            type: 'scroll',
            orient: 'horizontal',
            data: ["London creative industries",
                "London non-creative industries",
                "London all industries total",
                "All other regions creative industries",
                "All other region non-creative industries",
                "All other region all industries total"],
            selected: { "All other region non-creative industries": false, "All other region all industries total": false },
            top: 'bottom'
        },
        grid: {
            right: 275
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'London creative industries',
                type: 'line',
                data: [468, 499, 515, 535, 582, 587, 624, 646, 699, 691, 763, 795],
                itemStyle: {
                    color: '#fdae61'
                },
                endLabel: {
                    show: true,
                    formatter: function (params) {
                        return params.seriesName + ': ' + params.value;
                    },
                },
            },
            {
                name: 'London non-creative industries',
                type: 'line',
                data: [3884, 3944, 4043, 4154, 4299, 4467, 4591, 4639, 4665, 4677, 4696, 4582],
                itemStyle: {
                    color: '#d73027'
                },
                endLabel: {
                    show: true,
                    formatter: function (params) {
                        return params.seriesName + ': ' + params.value;
                    }
                },
            },
            {
                name: 'London all industries total',
                type: 'line',
                data: [4365, 4460, 4580, 4702, 4904, 5071, 5226, 5297, 5381, 5390, 5476, 5394],
                itemStyle: {
                    color: '#67000d'
                },
                endLabel: {
                    show: true,
                    formatter: function (params) {
                        return params.seriesName + ': ' + params.value;
                    }
                },
            },
            {
                name: 'All other regions creative industries',
                type: 'line',
                data: [1054, 1063, 1170, 1182, 1230, 1291, 1335, 1350, 1339, 1408, 1456, 1537],
                itemStyle: {
                    color: '#abd9e9'
                },
                endLabel: {
                    show: true,
                    formatter: function (params) {
                        return params.seriesName + ': ' + params.value;
                    }
                },
            },
            {
                name: 'All other region non-creative industries',
                type: 'line',
                data: [24400, 24477, 24349, 24682, 25121, 25579, 25667, 26011, 26183, 26515, 26227, 26069],
                itemStyle: {
                    color: '#74add1'
                },
                endLabel: {
                    show: true,
                    formatter: function (params) {
                        return params.seriesName + ': ' + params.value;
                    }
                },
            },
            {
                name: 'All other region all industries total',
                type: 'line',
                data: [25528, 25614, 25628, 25937, 26434, 26955, 27121, 27490, 27686, 28031, 27769, 27688],
                itemStyle: {
                    color: '#313695'
                },
                endLabel: {
                    show: true,
                    formatter: function (params) {
                        return params.seriesName + ': ' + params.value;
                    }
                },
            }
        ]
    };

    useEffect(() => {
        if (chart2Ref.current) {
            myChart2 = echarts.init(chart2Ref.current);
            if (myChart2) {
                myChart2.setOption({
                    animationDuration: 6000,
                    title: {
                        text: 'Job Growth by Creative Industries Group',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [creativeType + ' - London', creativeType + ' - All other regions in UK'],
                        top: 'bottom'
                    },
                    grid: {
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: creativeType + ' - London',
                        type: 'line',
                        data: data.find(item => item.name === creativeType + ' - London')?.value,
                        itemStyle: {
                            color: '#d73027'
                        },
                    },
                    {
                        name: creativeType + ' - All other regions in UK',
                        type: 'line',
                        symbol: 'triangle',
                        symbolSize: 8,
                        data: data.find(item => item.name === creativeType + ' - All other regions in UK')?.value,
                        itemStyle: {
                            color: '#313695'
                        },
                    }]
                }, true)
            }
        }
        return () => {
            if (myChart2) {
                myChart2.dispose();
            }
        };
    }, [creativeType]);

    useEffect(() => {
        if (chartRef.current) {
            myChart = echarts.init(chartRef.current);

            if (myChart) {
                myChart.setOption(option, true);
                // myChart.resize();
            }

        }

        return () => {
            if (myChart) {
                myChart.dispose();
            }
        };
    }, []);

    const replayAnima = () => {
        if (myChart) {
            myChart.clear();
            myChart.setOption(option, true);
        }
    };
    const changeType = (e) => {
        setCreativeType(e.target.value);
    };


    return (
        <div>
            <Button onClick={replayAnima} type='primary' icon={<RedoOutlined />} style={{ marginLeft: '300px', zIndex: '999' }}>Replay</Button>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '-28px' }}>
                <div ref={chartRef} style={{ display: 'inline-block', width: '70%', height: '600px', marginLeft: '10px' }} />
                <div style={{ display: 'inline-block', width: '25%', height: '600px', backgroundColor: 'black' }}>
                    <div style={{ color: 'white', textAlign: 'left', width: '80%', height: '50%', marginLeft: '10%', marginTop: '25%' }}>
                        <h2>
                            Chart 1: Total Job Numbers by Industry
                        </h2>
                        <p>This chart represents the number of jobs (in thousands) across different industry groups in London, with data spanning from 2010 to 2021. The relevant columns after the first are yearly data points.</p>

                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div ref={chart2Ref} style={{ display: 'inline-block', width: '70%', height: '600px', marginTop: '50px', marginLeft: '10px' }} />
                <div style={{ width: '25%', display: 'inline-block', textAlign: 'left' }}>
                    <div style={{ backgroundColor: "black", textAlign: 'left', color: 'white', paddingTop: '20%', paddingLeft: "10%", paddingBottom: '90px' }}>
                        <h2 style={{ width: '80%' }}>
                            Chart 2: Job Growth by Creative Industries Group
                        </h2>
                        <p style={{ width: '80%', marginBottom: '90px' }}>
                            This chart represents detailed job numbers (in thousands) across various creative industry groups from 2010 to 2021 in London.
                        </p>
                        <Radio.Group onChange={changeType} value={creativeType} buttonStyle="solid">
                            <Space direction="vertical">
                                <Radio style={{ color: 'white' }} value={'Advertising and marketing'}>Advertising and marketing</Radio>
                                <Radio style={{ color: 'white' }} value={'Architecture'}>Architecture</Radio>
                                <Radio style={{ color: 'white' }} value={'Design: product, graphic and fashion design'}>Design: product, graphic and fashion design</Radio>
                                <Radio style={{ color: 'white' }} value={'Film, TV, video, radio and photography'}>Film, TV, video, radio and photography</Radio>
                                <Radio style={{ color: 'white' }} value={'IT, software and computer services'}>IT, software and computer services</Radio>
                                <Radio style={{ color: 'white' }} value={'Music, performing and visual arts'}>Music, performing and visual arts</Radio>
                                <Radio style={{ color: 'white' }} value={'Publishing'}>Publishing</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Londonviz;
