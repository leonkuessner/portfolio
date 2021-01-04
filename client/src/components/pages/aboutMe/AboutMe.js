import React, { useEffect, useState } from "react";
import "./styles/AboutMe.css";
import { skillBarHTML, hexagons } from "./Data";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-scroll";
// import aboutMeJs from './AboutMeJs'

function AboutMe() {
    //   const topBottomContainer = useRef(null);
    const [rotateHex, setRotateHex] = useState([]);
    const [transitionHex, setTransitionHex] = useState();
    const [translateZStyle, setTranslateZStyle] = useState({})
    // const [innerWidth, setInnerWidth] = useState()

    useEffect(() => {
        AOS.init({
            disable: window.innerWidth < 1024
        })
        window.addEventListener("resize", () => {
            AOS.init({
                disable: window.innerWidth < 1024
            })
                console.log(window.innerWidth)
        });
        
    }, []);

    function hexMouseFunc(e) {
        if (window.innerWidth < 1300) {
            return
        }

        if (e._reactName === "onMouseOver") {
            let xAxis = (window.innerWidth / 2 - e.pageX) / 250;
            let yAxis = (window.innerHeight/0.65 - e.pageY) / 150;
            setRotateHex([yAxis, xAxis]);
        }
        if (e._reactName === "onMouseEnter") {
            setTransitionHex("none")
            setTranslateZStyle({hexagon: 30, desc: 60})
        }

        if (e._reactName === "onMouseLeave") {
            setTransitionHex("all 0.5s ease")
            setRotateHex([0, 0])
            setTranslateZStyle({hexagon: 0, desc: 0})
        }
    }
    // document.addEventListener('mousemove', (e) => {
    //     let xAxis = (window.innerWidth/2 - e.pageX)
    //     let yAxis = (window.innerHeight/2 - e.pageY)
    //     console.log(xAxis, yAxis)
    // })

    return (
        <>
            <div className="aboutMe__horizontal-transition"></div>
            <div className="aboutMe__container">
                <div className="aboutMe__top-container">
                    <div className="aboutMe__top-top-container">
                        <h1 data-aos="fade-right">About Me</h1>
                        <div
                        data-aos="fade-right"
                        data-aos-delay="200"
                        className="aboutMe__header-bar"
                        ></div>
                    </div>
                <div
                //   ref={topBottomContainer}
                onMouseEnter={hexMouseFunc}
                onMouseOver={hexMouseFunc}
                onMouseLeave={hexMouseFunc}
                className="aboutMe__top-bottom-container"
                style={{
                    transform: `rotateY(${rotateHex[1]}deg) rotateX(${rotateHex[0]}deg)`,
                    transition: `${transitionHex}`
                    }}
                >
                {hexagons.map((hexagon, index) => (
                    <div key={index} className="aboutMe__hexagon-container">
                    <div className="aboutMe__hexagon" data-aos="flip-left" style={{
                        transform: `translateZ(${translateZStyle.hexagon}px)`
                    }}>
                        {hexagon.icon}
                    </div>
                    <div className="aboutMe__hexagon-description" data-aos="flip-left" style={{
                            transform: `translateZ(${translateZStyle.desc}px)`
                        }}>
                        <h1 className='aboutMe__hexagon-header'>
                        {hexagon.descHeader}</h1> 
                        <h4 className="aboutMe__hexagon-desc">{hexagon.description}</h4>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="aboutMe__main">
                <div className="aboutMe__left-container">
                <div className="aboutMe__image-container" data-aos="fade-right">
                    <div className="aboutMe__img-hexagon hexagon1">
                    <div className="aboutMe__hexagon-helper-1">
                        <div className="aboutMe__hexagon-helper-2">
                        <img
                            className="aboutMe__profilepic"
                            src="images/profile-pic.JPG"
                            alt="profile pictures"
                        />
                        </div>
                    </div>
                    </div>
                </div>
                <div className="aboutMe__text-container" data-aos="fade-right">
                    <h1 className="aboutMe__header-about-me">Who am I?</h1>
                    <div className="aboutMe__text-about-me">
                        Im a software developer from Winchester, UK <br/>
                        I have a huge passion for web development, because I love creating dynamic websites, full of life. Im also find AI extremely interesting! <br/> <br/>
                        <Link to="contact">So lets create something special!</Link>
                    </div>
                </div>
                </div>
                <div className="aboutMe__right-container">
                <div data-aos="fade-left" className="aboutMe__skills-container">
                    <h1 className="aboutMe__skills__header">My Skills</h1>
                    {skillBarHTML.map((skill, index) => (
                    <div key={index} className="aboutMe__skill-progress">
                        <div className={skill.className} key={index}>
                        {skill.language}
                        </div>
                        <div className="aboutMe__skills__progress-container">
                        <div
                            className="aboutMe__skills__progress-bar"
                            data-aos="fade-right"
                            style={{ width: `${skill.progress}%` }}
                        ></div>
                        <div className="aboutMe__skills__percentage">{skill.progress}%</div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default AboutMe;
