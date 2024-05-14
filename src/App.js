import { Anchor, Button, ConfigProvider, Divider, Layout } from 'antd';
import VideoHomePage from './components/VideoHomepage';
import OurTeam from './components/OurTeam';
import Worldviz from './components/Worldviz';
import Intro from './components/Intro';
import CountryViz from './components/Countryviz';
import Londonviz from './components/Lodonviz';
import LondonMap from './components/LondonMap';
import Deck from './components/Deck';
import Implementation from './components/Implementation';

import './App.css';
const { Footer } = Layout;

function App () {
  return (
    <div className="App">

      <div
        style={{
          // padding: '10px',
          width: '100%',
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: 'red',
                algorithm: true,
              },
              Anchor: {
                colorPrimary: 'red',
                algorithm: true,
              }
            },
          }}
        >
          <Anchor
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            direction="horizontal"
            items={[
              {
                key: 'part-1',
                href: '#part-1',
                title: <Button type="link" className="navi-btn" danger>Home</Button>,
              },
              {
                key: 'part-2',
                href: '#part-2',
                title: <Button type="link" className="navi-btn" danger >Story</Button>,
              },
              {
                key: 'part-3',
                href: '#part-3',
                title: <Button type="link" className="navi-btn" danger >Visualization</Button>,
              },
              {
                key: 'part-4',
                href: '#part-4',
                title: <Button type="link" className="navi-btn" danger >Implementation</Button>,
              },
              {
                key: 'part-5',
                href: '#part-5',
                title: <Button type="link" className="navi-btn" danger >Our Team</Button>,
              },
            ]}
          />
        </ConfigProvider>
      </div>
      <div>
        <div
          id="part-1"
          style={{
            width: '100vw',
            height: '100vh',
            textAlign: 'center',
          }}>
          <VideoHomePage />
        </div>
        <div
          id="part-2"
          style={{
            width: '100vw',
            // height: '100vh',
            textAlign: 'center',
            // background: 'rgba(0,0,255,0.02)',
          }}
        >
          <Intro />
        </div>
        <div
          id="part-3"
          style={{
            width: '100vw',
            // height: '100vh',
            textAlign: 'center',
            // background: '#FFFBE9',
          }}
        >
          <Worldviz />
          <Divider />
          <CountryViz />
          <Londonviz />
          <LondonMap />
        </div>
        <div
          id="part-4"
          style={{
            width: '100vw',
            height: '100vh',
            textAlign: 'center',
            // background: 'rgba(0,0,255,0.02)',
          }}
        >
          <Implementation />
        </div>
        <div
          id="part-5"
          style={{
            width: '100vw',
            // height: '50vh',
            textAlign: 'center',
            // background: 'rgba(0,255,0,0.02)',
            marginBottom: '50px'
          }}
        >
          <OurTeam />
          {/* <Deck /> */}
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '20px' }}>
        <h2 style={{ color: '#333' }}>References</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h3 style={{ color: '#555', fontSize: '16px' }}>Introduction Video</h3>
            <div style={{ color: '#888', fontSize: '14px', lineHeight: '1.6' }}>
              <div><a href="https://www.youtube.com/watch?v=ijcltwG7DlU" target="_blank" rel="noopener noreferrer">Creative Nation Introduction Video</a></div>
            </div>
            <h3 style={{ color: '#555', fontSize: '16px' }}>Region-level Data</h3>
            <div style={{ color: '#888', fontSize: '14px', lineHeight: '1.6' }}>
              <div><a href="https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/adhocs/14171creativeindustriesbyregion" target="_blank" rel="noopener noreferrer">ONS - Creative Industries by Region</a></div>
            </div>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h3 style={{ color: '#555', fontSize: '16px' }}>Policy</h3>
            <div style={{ color: '#888', fontSize: '14px', lineHeight: '1.6' }}>
              <div><a href="https://www.nesta.org.uk/report/creative-nation/" target="_blank" rel="noopener noreferrer">Nesta - Creative Nation Report</a></div>
              <div><a href="https://assets.publishing.service.gov.uk/media/64898de2b32b9e000ca96712/Creative_Industries_Sector_Vision__accessible_version_.pdf" target="_blank" rel="noopener noreferrer">Creative Industries Sector Vision</a></div>
            </div>
            <h3 style={{ color: '#555', fontSize: '16px' }}>City-level Data</h3>
            <div style={{ color: '#888', fontSize: '14px', lineHeight: '1.6' }}>
              <div><a href="https://www.nesta.org.uk/blog/creative-nation-open-data/" target="_blank" rel="noopener noreferrer">Nesta - Creative Nation Open Data</a></div>
            </div>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h3 style={{ color: '#555', fontSize: '16px' }}>Country-level Data</h3>
            <div style={{ color: '#888', fontSize: '14px', lineHeight: '1.6' }}>
              <div><a href="https://unctadstat.unctad.org/datacentre/dataviewer/US.CreativeServ_Indiv_Tot" target="_blank" rel="noopener noreferrer">UNCTAD - Creative Services Data</a></div>
            </div>
            <h3 style={{ color: '#555', fontSize: '16px' }}>London Data</h3>
            <div style={{ color: '#888', fontSize: '14px', lineHeight: '1.6' }}>
              <div><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/adhocs/15036jobsinthecreativeeconomyinlondonandallotherregionsoftheuk2010to2021" target="_blank" rel="noopener noreferrer">ONS - Jobs in the Creative Economy in London</a></div>
              <div><a href="https://data.london.gov.uk/dataset/cultural-infrastructure-map-2023" target="_blank" rel="noopener noreferrer">London DataStore - Cultural Infrastructure Map 2023</a></div>
            </div>
          </div>
        </div>
      </div>
      <Footer>University College London ©{new Date().getFullYear()} Created by 3 Greek Masks</Footer>
    </div >
  );
}

export default App;
