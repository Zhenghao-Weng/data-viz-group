import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Radio, Switch } from 'antd';

const LondonMap = () => {
    const [type, setType] = useState('Cinema');
    const [showZones, setShowZones] = useState(true);

    const mapContainer = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoicnVpY2kiLCJhIjoiY2x0aGRlMjd3MDN1ajJxczRwNmhwa2VuaCJ9.F-ONPLfld00epFA86qec6g';
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [-0.1278, 51.5074],
            zoom: 10.3,
            minZoom: 6,
            maxZoom: 16
        });

        map.on('load', () => {
            map.addSource('highlighted-areas', {
                type: 'geojson',
                data: process.env.PUBLIC_URL + '/data/wgs84_CEZ.geojson'
            });

            map.addLayer({
                id: 'highlighted-areas-fill',
                type: 'fill',
                source: 'highlighted-areas',
                paint: {
                    'fill-color': '#FF4500',
                    'fill-opacity': 0.3
                },
            });

            map.addSource('cinemas', {
                type: 'geojson',
                // data: 'https://raw.githubusercontent.com/ruicixia1/Group-Mini-Project/main/Cinema_s.geojson',
                data: process.env.PUBLIC_URL + '/data/' + type + '_s.geojson',
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });

            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'cinemas',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#51bbd6',
                        10,
                        '#f1f075',
                        100,
                        '#FF4500'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        10,
                        30,
                        100,
                        50
                    ]
                }
            });

            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'cinemas',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });

            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'cinemas',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            map.on('click', 'clusters', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                map.getSource('cinemas').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;

                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });

            map.on('click', 'unclustered-point', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const name = e.features[0].properties.name;

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`<strong>Name:</strong> ${name}`)
                    .addTo(map);
            });

            map.on('mousemove', 'clusters', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'clusters', () => {
                map.getCanvas().style.cursor = '';
            });
            const visibility = showZones ? 'visible' : 'none';
            map.setLayoutProperty('highlighted-areas-fill', 'visibility', visibility);
        });

        return () => map.remove();
    }, [type, showZones]);

    const changeType = (e) => {
        setType(e.target.value);
    };

    const toggleZones = (checked) => {
        setShowZones(checked);
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <h1>London {type.toString().replace(/_/g, ' ')} Cluster Map
                <Switch checked={showZones} checkedChildren="with Creative Enterprise zones" onChange={toggleZones} style={{ marginLeft: '10px' }} />
            </h1>
            <Radio.Group defaultValue={"Cinema"} onChange={changeType} buttonStyle="solid">
                <Radio.Button value={"Cinema"}>Cinema</Radio.Button>
                <Radio.Button value={"Creative_Workspace"}>Creative Workspace</Radio.Button>
                <Radio.Button value={"Dance"}>Dance</Radio.Button>
                <Radio.Button value={"Fashion_Textile_Jewellery"}>Fashion Textile Jewellery</Radio.Button>
                <Radio.Button value={"Library_and_Archive"}>Library and Archive</Radio.Button>
                <Radio.Button value={"Museum_and_Art_Gallery"}>Museum and Art Gallery</Radio.Button>
                <Radio.Button value={"Music"}>Music</Radio.Button>
                <Radio.Button value={"Theatre_and_Production"}>Theatre and Production</Radio.Button>
            </Radio.Group>

            <div ref={mapContainer} style={{ width: '80%', height: '75vh', marginLeft: "10%", marginTop: '20px' }} />
        </div>
    );
};

export default LondonMap;
