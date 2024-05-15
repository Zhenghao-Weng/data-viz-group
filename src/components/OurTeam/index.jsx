import React from 'react';
import { Card, Divider } from 'antd';
const { Meta } = Card;

const OurTeam = () => (
    <div>
        <Divider />
        <h1 style={{ fontSize: '70px' }}>Our Team</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '80%', margin: '0 auto' }}>
            <Card
                hoverable
                style={{ width: 260 }}
                cover={<img alt="Member 1" src={process.env.PUBLIC_URL + "/img/lyc.jpg"} />}
            >
                <Meta title="Yicong Li" description="Greek Goddess 1" />
            </Card>
            <Card
                hoverable
                style={{ width: 260 }}
                cover={<img alt="Member 2" src={process.env.PUBLIC_URL + "/img/xrc.jpg"} />}
            >
                <Meta title="Ruici Xia" description="Greek Mask 2" />
            </Card>
            <Card
                hoverable
                style={{ width: 260 }}
                cover={<img alt="Member 3" src={process.env.PUBLIC_URL + "/img/wzh.png"} />}
            >
                <Meta title="Zhenghao Weng" description="Greek Mask 3" />
            </Card>
        </div>
    </div>
);

export default OurTeam;
