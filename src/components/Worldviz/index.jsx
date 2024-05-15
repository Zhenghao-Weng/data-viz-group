import React, { useRef, useEffect, useState } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { Slider, Popover, Modal } from 'antd';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as echarts from 'echarts';
import axios from 'axios';

import './index.css';

const Worldviz = () => {
    const mapContainer = useRef(null);
    const pieChart = useRef(null);
    const modalChartRef = useRef(null);

    const [map, setMap] = useState(null);
    const [pieData, setPieData] = useState([]);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [popoverContent, setPopoverContent] = useState('');
    const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
    const [year, setYear] = useState(2022);
    const [modalVisible, setModalVisible] = useState(false);

    const colors = ['#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#c9281a', '#a42215', '#8b1a11', '#67000d'];
    const sortedPieData = pieData.sort((a, b) => a.value - b.value);
    const enhancedPieData = sortedPieData.map((item, index) => ({
        ...item,
        itemStyle: {
            color: colors[Math.floor(index / sortedPieData.length * colors.length)]
        }
    }));



    const handleSliderChange = (value) => {
        setYear(value);
    };

    const handleMapClick = (e) => {
        if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const countryName = feature.properties.SOVEREIGNT;
            const data = [];
            const years = [];
            for (let year = 2010; year <= 2022; year++) {
                if (feature.properties[`${year}_export`]) {
                    data.push(feature.properties[`${year}_export`]);
                    years.push(year.toString());
                }
            }

            setModalVisible(true);
            setTimeout(() => {
                const modalChart = echarts.init(modalChartRef.current);
                const option = {
                    title: {
                        text: `All-time line chart for ${countryName}`
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: years
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: data,
                            type: 'line'
                        }
                    ]
                };
                modalChart.setOption(option);
                // modalChart.resize();
            }, 100);
        }
    };

    useEffect(() => {
        if (!map) return;

        const addSourceAndLayer = (geojsonData) => {
            if (map.getSource('geojson-source')) {
                map.getSource('geojson-source').setData(geojsonData);
                map.setPaintProperty('fill-layer', 'fill-color', [
                    'interpolate',
                    ['linear'],
                    ['get', `${year}_export`],
                    0, '#cccccc',
                    10000, '#ffffbf',
                    20000, '#fee090',
                    30000, '#fdae61',
                    40000, '#f46d43',
                    50000, '#d73027',
                    70000, '#c9281a',
                    100000, '#a42215',
                    150000, '#8b1a11',
                    200000, '#67000d'
                ]);
                map.on('mousemove', 'fill-layer', (e) => {
                    if (e.features.length > 0) {
                        const feature = e.features[0];
                        const mapContainerRect = mapContainer.current.getBoundingClientRect();
                        setPopoverContent(`Country: ${feature.properties.SOVEREIGNT}<br/>Export: ${feature.properties[`${year}_export`]}`);
                        setPopoverPosition({
                            x: e.point.x + mapContainerRect.left,
                            y: e.point.y + mapContainerRect.top
                        });
                        setPopoverVisible(true);
                        map.getCanvas().style.cursor = 'pointer';
                    }
                });
                map.on('mouseleave', 'fill-layer', () => {
                    map.getCanvas().style.cursor = '';
                    setPopoverVisible(false);
                });
            } else {
                map.addSource('geojson-source', {
                    type: 'geojson',
                    data: geojsonData
                });

                map.addLayer({
                    id: 'fill-layer',
                    type: 'fill',
                    source: 'geojson-source',
                    paint: {
                        'fill-color': [
                            'interpolate',
                            ['linear'],
                            ['get', `${year}_export`],
                            0, '#cccccc',
                            10000, '#ffffbf',
                            20000, '#fee090',
                            30000, '#fdae61',
                            40000, '#f46d43',
                            50000, '#d73027',
                            70000, '#c9281a',
                            100000, '#a42215',
                            150000, '#8b1a11',
                            200000, '#67000d'
                        ],
                        'fill-opacity': 0.85
                    }
                });

                map.on('mousemove', 'fill-layer', (e) => {
                    if (e.features.length > 0) {
                        const feature = e.features[0];
                        const mapContainerRect = mapContainer.current.getBoundingClientRect();
                        setPopoverContent(`Country: ${feature.properties.SOVEREIGNT}<br/>Export: ${feature.properties[`${year}_export`]}`);
                        setPopoverPosition({
                            x: e.point.x + mapContainerRect.left,
                            y: e.point.y + mapContainerRect.top
                        });
                        setPopoverVisible(true);
                        map.getCanvas().style.cursor = 'pointer';
                    }
                });


                map.on('mouseleave', 'fill-layer', () => {
                    map.getCanvas().style.cursor = '';
                    setPopoverVisible(false);
                });
            }
        };

        axios.get(process.env.PUBLIC_URL + '/data/country_export.geojson')
            .then(response => {
                const geojsonData = response.data;
                if (map.isStyleLoaded()) {
                    addSourceAndLayer(geojsonData);
                } else {
                    map.on('load', () => addSourceAndLayer(geojsonData));
                }

                const exportsByCountry = {};

                geojsonData.features.forEach(feature => {
                    const country = feature.properties.SOVEREIGNT;
                    const exportValue = feature.properties[`${year}_export`];

                    if (exportsByCountry[country]) {
                        // exportsByCountry[country] += exportValue;
                    } else {
                        exportsByCountry[country] = exportValue;
                    }
                });

                const pieChartData = Object.entries(exportsByCountry)
                    .filter(([country, value]) => value > 0)
                    .map(([country, value]) => ({
                        name: country,
                        value: value
                    }));

                const sortedData = [...pieChartData].sort((a, b) => b.value - a.value);
                const topData = sortedData.slice(0, 10);
                setPieData(topData);
            })
            .catch(error => console.error('Error loading the geojson data:', error));

    }, [map, year]);

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoibHljMTk5OTExMTEiLCJhIjoiY2t0bjMzN2xkMmMwMzJ2cWZueXZzZHN0ZSJ9.BQGI-sCp3fhGZSD8NTeFtw";
        const newMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/lyc19991111/clw5gv1bc02o301qp0lsj1f80',
            center: [0, 0],
            zoom: 1.2,
            renderWorldCopies: false,
            projection: 'equirectangular'
        });

        newMap.on('load', () => {
            setMap(newMap);
            newMap.resize();
        });
        return () => newMap.remove();
    }, []);

    useEffect(() => {
        if (pieData.length > 0 && pieChart.current) {
            const myChart = echarts.init(pieChart.current);
            const option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '0%',
                    left: 'center',
                },
                series: [
                    {
                        name: 'Country Exports',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        padAngle: 5,
                        itemStyle: {
                            borderRadius: 10
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            },
                            itemStyle: {
                                shadowBlur: 20,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                scale: 1.2
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: enhancedPieData
                    }
                ]
            };
            myChart.setOption(option);
            // const dataIndex = pieData.findIndex(item => item.name === "United Kingdom");
            // if (dataIndex !== -1) {
            //     myChart.dispatchAction({
            //         type: 'highlight',
            //         seriesIndex: 0,
            //         dataIndex: dataIndex
            //     });
            // }
            window.addEventListener('resize', () => myChart.resize());

            return () => {
                myChart.dispose();
            };
        }
    }, [pieData]);

    useEffect(() => {
        if (map) {
            map.on('click', 'fill-layer', handleMapClick);
            return () => {
                map.off('click', 'fill-layer', handleMapClick);
            };
        }
    }, [map]);

    return <div className='vizContainer'>
        <h1>Global Export Trade in Creative Services</h1>
        <CalendarOutlined />
        <Slider
            defaultValue={2022}
            min={2010}
            max={2022}
            onAfterChange={handleSliderChange}
            tooltip={{
                open: true,
                zIndex: 999,
            }}
            style={{ width: '80%', marginBottom: '20px' }}
        />
        <div className="mapAndChartContainer">
            <span ref={mapContainer} className="mapContainer" />
            {popoverVisible && (
                <Popover
                    placement='left'
                    arrow={false}
                    content={<div dangerouslySetInnerHTML={{ __html: popoverContent }} />}
                    open={popoverVisible}
                />
            )}
            <img src="/img/world_legend.png" alt="img" style={{ width: '400px', marginLeft: '-380px', marginTop: '490px', zIndex: '1000' }} />
            <span ref={pieChart} style={{ height: 500, width: '30%' }} />
            <Modal
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={800}
            >
                <div ref={modalChartRef} style={{ width: '100%', height: '400px' }} />
            </Modal>
        </div>
        <div style={{ width: '80%', textAlign: 'left' }}>
            <h2>Global Trends in Creative Industry Exports:</h2>
            <p>The data set, sourced from UNCTAD estimates based on the UNCTAD-WTO annual trade-in-services data set, provides insights into the global export trends of the creative industry from 2010 to 2022. On average, there has been a steady increase in the export values across various countries. The mean export value in 2010 was approximately $8,544.95 million, which grew to about $18,680.25 million by 2022. This indicates a significant global expansion in the creative industry's export market. The maximum export value in 2022 reached $244,344 million, highlighting a substantial concentration of export activity in leading countries. The overall trend suggests robust growth and an increasing contribution of the creative industry to the global economy.</p>
            <h2>United Kingdom's Creative Industry Export Trends:</h2>
            <p>Focusing on the United Kingdom, the data reveals a consistent upward trend in export values from 2010 to 2022. The UK's export value in 2010 was $35,885 million, which rose to $86,952 million by 2022. This represents a significant growth over the period. The growth rate varied across the years, with notable increases of 25.44% in 2021 and 15.52% in 2017. The overall growth rate for the UK was robust, reflecting the country's strengthening position in the global creative industry market. This solid growth underscores the UK's significant and expanding role in the global creative industry.</p>
        </div>
    </div>
};

export default Worldviz;




