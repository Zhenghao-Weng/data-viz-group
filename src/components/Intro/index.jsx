import React, { useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Image } from 'antd';
import { useSpring, animated, a, useTrail } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

import styles from './styles.module.css';
import './index.css';

const Trail = ({ open, children }) => {
    const items = React.Children.toArray(children);
    const trail = useTrail(items.length, {
        config: { mass: 5, tension: 2000, friction: 200 },
        opacity: open ? 1 : 0,
        x: open ? 0 : 20,
        height: open ? 110 : 0,
        from: { opacity: 0, x: 20, height: 0 },
    });
    return (
        <div>
            {trail.map(({ height, ...style }, index) => (
                <a.div key={index} className={styles.trailsText} style={style}>
                    <a.div style={{ height }}>{items[index]}</a.div>
                </a.div>
            ))}
        </div>
    );
};


const Intro = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    const slideInStyles = useSpring({
        transform: inView ? 'translateX(0)' : 'translateX(100%)',
        opacity: inView ? 1 : 0,
        config: { duration: 500 }
    });

    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        if (inView) {
            setOpen(true);
        }
    }, [inView]);

    return (
        <div>
            <div style={{ height: '210px' }}></div>
            <div style={{ height: "70vh", textAlign: 'center', }}>
                <h1 className='montserrat-font' style={{ fontSize: '70px', marginBottom: '100px' }}>What is <span style={{ color: 'red' }}>creative</span> industry?</h1>
                <div style={{ fontSize: '25px', width: '70%', marginLeft: '15%' }}>It consists of It, software and computer services; film TV, video, radio and photography; advertising and marketing, publishing; music, performing and visual arts; architecture; design, product, graphic and fashion design.
                </div>
            </div>
            <div className='scroll1'>
                <Parallax pages={2} style={{ width: '100%', height: '100%', scrollbarWidth: 'none' }}>
                    <ParallaxLayer sticky={{ start: 0, end: 2 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <div style={{
                            width: '34%',
                            height: '60vh',
                            color: 'white',
                            marginLeft: '8%',
                            textAlign: 'left'
                        }}>
                            <div style={{
                                fontSize: '50px',
                                fontWeight: 'bold',
                                fontFamily: 'Helvetica',
                                marginBottom: '70px'
                            }}>1. The creative industries are a motor of growth in local economies across the UK, and not just in London and the South East of England.
                            </div>
                            <div style={{ fontSize: '16px', fontFamily: 'Helvetica' }}>Regions from the South West, to Yorkshire and the Humber, to the West Midlands are also experiencing the benefits. Between 2011- 2014 and 2015-2016, the creative industries in the average local economy increased by 11 per cent, twice as fast as in the rest of the economy. There has also been an explosion of creative entrepreneurship: almost nine in ten local economies grew their creative business population over this period, and 83 per cent grew it faster than in other sectors.
                            </div>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={0.25} speed={1.5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <div style={{ width: '40%', height: '80vh', marginRight: '5%' }}>
                            <Image
                                src={process.env.PUBLIC_URL + "/img/story1.png"}
                            />
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1.25} speed={1.5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <div style={{ width: '40%', height: '80vh', marginRight: '5%' }}>
                            <Image
                                src={process.env.PUBLIC_URL + "/img/story2.png"}
                            />
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>

            <div className='scroll1'>
                <Parallax pages={2} style={{ width: '100%', height: '100%', scrollbarWidth: 'none' }}>
                    <ParallaxLayer sticky={{ start: 0, end: 2 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <div style={{
                            width: '34%',
                            height: '60vh',
                            color: 'white',
                            marginLeft: '8%',
                            textAlign: 'left'
                        }}>
                            <div style={{
                                fontSize: '50px',
                                fontWeight: 'bold',
                                fontFamily: 'Helvetica',
                                marginBottom: '70px'
                            }}>2. The creative industries concentrate in a small number of locations:
                            </div>
                            <div style={{ fontSize: '16px', fontFamily: 'Helvetica' }}>
                                53 per cent of employment and 44 per cent of businesses are found in the top five locations (the equivalent percentages in other sectors are 32 per cent and 30 per cent respectively).
                                Overall, creative industries employment has become more concentrated over time, mirroring developments in the wider economy. We detect a similar pattern when we look at the
                                creative industries within UK regions and nations, showing that leading cities attract most of the activity, from Manchester in the North West of England to Bristol in the South West, Cardiff in Wales, and Glasgow and Edinburgh in Scotland.
                            </div>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={0} speed={1.5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <div style={{ width: '40%', height: '80vh', marginRight: '5%' }}>
                            <Image
                                src={process.env.PUBLIC_URL + "/img/story3.jpg"}
                            />
                            <div style={{ marginTop: '25px' }}>Figure 3: Levels and Changes in Creative Industries (2015 – 2016)</div>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1} speed={1.5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <div style={{ width: '40%', height: '50vh', marginRight: '5%' }}>
                            {/* <div ref={lineChartRef} style={{ width: '100%', height: '500px' }} /> */}
                            <Image
                                src={process.env.PUBLIC_URL + "/img/story5.png"}
                            />
                            <div style={{ marginTop: '25px' }}>Figure 4: Export Trade in Creative Services (2010 - 2022)
                            </div>
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>

            <div className='scroll2'>
                <Parallax pages={3} style={{ width: '100%', height: '100%', scrollbarWidth: 'none' }}>
                    <ParallaxLayer sticky={{ start: 0, end: 3 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <div style={{ width: '40%', height: '50vh', marginLeft: '5%' }}>
                            <a target='_blank' href="https://assets.publishing.service.gov.uk/media/64898de2b32b9e000ca96712/Creative_Industries_Sector_Vision__accessible_version_.pdf" rel="noreferrer">
                                <img alt='img' src={process.env.PUBLIC_URL + "/img/story4.jpg"} style={{ width: '650px' }} />
                            </a>
                            <div style={{ fontSize: '10px', color: 'grey', marginTop: '10px' }}>Click Image to access the report</div>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={0} speed={1.5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <div style={{
                            width: '34%',
                            height: '40vh',
                            color: 'white',
                            marginRight: '8%',
                            textAlign: 'left'
                        }}>
                            <div style={{
                                fontSize: '35px',
                                fontWeight: 'bold',
                                fontFamily: 'Helvetica',
                                marginBottom: '70px'
                            }}>The UK Government’s plan to grow the creative industries by £50bn and support a million more jobs by 2030, with £77m of new funding for the sector announced.
                            </div>
                        </div>

                    </ParallaxLayer>
                    <ParallaxLayer offset={1} speed={1.5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <div style={{
                            width: '34%',
                            height: '60vh',
                            color: 'white',
                            marginRight: '8%',
                            textAlign: 'left'
                        }}>
                            <div style={{
                                fontSize: '40px',
                                fontWeight: 'bold',
                                fontFamily: 'Helvetica',
                                color: 'skyblue'
                            }}>2030 Goals and Objectives
                            </div>
                            <div style={{
                                fontSize: '20px',
                                fontFamily: 'Helvetica',
                                color: 'skyblue',
                                fontWeight: 'bold',
                                marginTop: '20px'
                            }}>
                                Goal One: Grow creative clusters across the UK, adding £50 billion more in Gross Value Added (GVA)
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>By 2030, we want to unlock the potential for growth in creative clusters across the UK and to grow opportunities for creative businesses.8 Our objectives are:
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>• 2030 Innovation Objective: Increased public and private investment in creative industries’ innovation, contributing to the UK increasing its R&D expenditure to drive R&D-led innovation.
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>• 2030 Investment Objective: Creative businesses reach their growth potential, powered by a step-change in regional investment.
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>• 2030 Exports Objective: Creative businesses grow their exports and contribute to the UK reaching £1 trillion exports per year.
                            </div>
                            <div style={{
                                fontSize: '20px',
                                fontFamily: 'Helvetica',
                                color: 'skyblue',
                                fontWeight: 'bold',
                                marginTop: '20px'
                            }}>Goal Two: Build a highly-skilled, productive and inclusive workforce for the future, supporting one million more jobs across the UK
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>By 2030, we want to ensure our creative workforce embodies the dynamism and talent of the whole of the UK, while addressing skills gaps and shortages.9 Our objectives are:
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>• 2030 Education Objective: A foundation of education and opportunities to foster creative talent from a young age.
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>• 2030 Skills Objective: Stronger skills and career pathways generate a workforce that meets the industry’s skills needs.
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>• 2030 Job Quality Objective: All parts of the creative industries are recognised for offering high quality jobs, ensuring a resilient and productive workforce that reflects the whole of the UK.
                            </div>
                            <div style={{
                                fontSize: '20px',
                                fontFamily: 'Helvetica',
                                color: 'skyblue',
                                fontWeight: 'bold',
                                marginTop: '20px'
                            }}>Goal Three: Maximise the positive impact of the creative industries on individuals and communities, the environment and the UK’s global standing
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>By 2030, we want the creative industries to further enrich lives, create pride in place across the UK, and strengthen our soft power. Our objectives are:
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>• 2030 Wellbeing Objective: Creative activities contribute to improved wellbeing, help to strengthen local communities, and promote pride in place.
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>• 2030 Environment Objective: Creative industries play a growing role in tackling environmental challenges, helping the UK reach the targets set out in the Powering Up Britain plan.
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontFamily: 'Helvetica',
                            }}>• 2030 Soft Power Objective: Creative industries increase their reach to global audiences, strengthening the UK’s soft power and positive influence on the world.
                            </div>
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
            <div ref={ref} style={{
                width: '100%',
                height: '80vh',
                textAlign: 'center',
                marginTop: '250px'
            }}>
                <Trail open={open}>
                    <div className='montserrat-font' style={{
                        fontSize: '75px',
                        fontWeight: 'bold',
                        color: 'red',
                        width: '80%',
                        marginLeft: '10%'
                    }}>How the creative industries are
                    </div>
                    <div className='montserrat-font' style={{
                        fontSize: '75px',
                        fontWeight: 'bold',
                        color: 'red',
                        width: '80%',
                        marginLeft: '10%'
                    }}>powering the UK's nations and regions?
                    </div>
                    <div className='montserrat-font' style={{
                        fontSize: '75px',
                        fontWeight: 'bold',
                        color: 'red',
                        width: '80%',
                        marginLeft: '10%'
                    }}>regions?
                    </div>
                </Trail>
                <animated.div style={{
                    ...slideInStyles,
                    fontSize: '20px',
                    fontFamily: 'Helvetica',
                    width: '60%',
                    marginLeft: '20%',
                    marginTop: '80px'
                }}>
                    We want to visualise UK’s creative industries employment and business data from international-scale to UK-scale and use London as our sample city for further analysis to support policy implementation.
                </animated.div>
            </div>
        </div >
    );
}

export default Intro;
