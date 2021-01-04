import React from 'react'
import { Link } from 'react-scroll'
// import { Link as pageLink, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/Homepage.css'
import Particles from "react-tsparticles";
import { AiOutlineArrowRight } from 'react-icons/ai'

export default function Homepage() {
    return (
        <div className="home">
            <Particles
                id="tsparticles"
                options={{
                background: {
                    color: {
                    value: "#121212",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    detectsOn: "canvas",
                    events: {
                    onClick: {
                        enable: false,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                    },
                    modes: {
                    bubble: {
                        distance: 450,
                        duration: 2,
                        opacity: 0.8,
                        size: 40,
                    },
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 120,
                        duration: 0.9,
                    },
                    },
                },
                particles: {
                    color: {
                        value: "#C52346",
                    },
                    links: {
                        color: "#C52346",
                        distance: 150,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
                        random: false,
                        speed: 7,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            value_area: 1000,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        random: true,
                        value: 5,
                    },
                },
                detectRetina: true,
                }}
            />

            <div className="flex-container">
                <div className="header-container">
                    <div className="header">
                        <div className="hello-div">
                            <h1 className="header__intro">Hello, I'm </h1>
                            <h1 className="header__name"> Leon Kuessner</h1>
                        </div>
                           
                            <h1 className="header__intro-intro">
                                I'm a Full Stack web developer
                            </h1>
                    </div>
                    <Link smooth={true} to="aboutMe__container">
                        <button className='header-button'>
                            View My Work!  <AiOutlineArrowRight className='header-button-arrow'/>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
