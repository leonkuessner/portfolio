import { FaRegLightbulb } from "react-icons/fa"
import {GiSpeedometer} from 'react-icons/gi'
import {GoRocket} from 'react-icons/go'
import {MdPhonelink} from 'react-icons/md'
// import {FaRegLightbulb} from 'react-icons/fa'

export const skillBarHTML = [
    {
        className: "aboutMe__skills__name",
        language: "HTML",
        progress: 90
    },
    {
        className: "aboutMe__skills__name",
        language: "CSS",
        progress: 90
    },
    {
        className: "aboutMe__skills__name",
        language: "React.js",
        progress: 90
    },
    {
        className: "aboutMe__skills__name",
        language: "Javascript",
        progress: 80
    },
    {
        className: "aboutMe__skills__name",
        language: "Express.js",
        progress: 75
    },
    {
        className: "aboutMe__skills__name",
        language: "Python",
        progress: 75
    },
    {
        className: "aboutMe__skills__name",
        language: "SQL",
        progress: 60
    },
    {
        className: "aboutMe__skills__name",
        language: "Django",
        progress: 55
    },
    {
        className: "aboutMe__skills__name",
        language: "C++",
        progress: 35
    }
]

export const hexagons = [
    {
        icon: <GiSpeedometer className='about-me-icon'/>,
        descHeader: "Fast",
        description: "Lag free interaction with fast load times are one of my top priorities!"
    },
    {
        icon: <GoRocket className='about-me-icon'/>,
        descHeader: "Dynamic",
        description: "I try to make pages as engaging and interesting as possible for the visitor!"
    },
    {
        icon: <MdPhonelink className='about-me-icon'/>,
        descHeader: "Responsive",
        description: "My websits will adjust to any screen size, huge or tiny!"
    },
    {
        icon: <FaRegLightbulb className='about-me-icon'/>,
        descHeader: "Intuitive",
        description: "I try to make websites as easy to use as possible with intuitive designs!"
    }
]