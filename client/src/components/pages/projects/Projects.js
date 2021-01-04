import React, { useState } from 'react'
import './styles/Projects.css'
import  ProjectsSlider  from './ProjectsSlider'
import {ProjectsData} from './ProjectsData'

import { FaTimes } from 'react-icons/fa';
function Projects() {
    const [slideshow, setSlideshow] = useState(false)
    const [websiteData, setWebsiteData] = useState()

    function handleButtonClick(e) {
        if (slideshow === false) {
            document.body.style.overflow = 'hidden'
            setWebsiteData({...ProjectsData[e.target.className]})
        } else {
            document.body.style.overflow = 'scroll'
            setWebsiteData('')
            console.log(websiteData)
        }
        setSlideshow(!slideshow)
    }


    return (
        <div className="projects">
            {slideshow === true ? <div onClick={handleButtonClick} className="projects__overlay"></div> : ''}
            <div className="projects__top-container">
                    <h1 data-aos="fade-right">projects</h1>
                    <div
                    data-aos="fade-right"
                    data-aos-delay="200"
                    className="projects__header-bar"
                    ></div>
            </div>
            <div className="projects__bottom-container">
                {slideshow === true ? 
                    <div className='projects__bottom-popup-container'>
                        <FaTimes onClick={handleButtonClick}/>
                        <ProjectsSlider website={websiteData.images}/>
                        <div className="projects__slide-description">
                            <div className="projects__slide-header">
                                <h1>{websiteData.header}</h1>
                            </div>
                            <div className="projects__slide-description-desc">
                                {websiteData.description}
                            </div>
                        </div>
                    </div> 
                : ""}
                <div className="projects__all-projects-container">
                    {Object.keys(ProjectsData).map((site, index) => (
                        <div data-aos="fade-up" data-aos-duration="600" key={index} className="projects__single-project-container">
                            <div className={`projects__single-img-container ${site}`}>
                                {/* {ProjectsData[site].header} */}
                                <img src={`${ProjectsData[site].thumbnail}`} alt=""/>
                            </div>
                                <div className='projects__single-project-desc1'>
                                <div className='projects__single-project-desc'>
                                    <h1>{`${ProjectsData[site].header}`}</h1>
                                    <h3>{`${ProjectsData[site].languages}`}</h3>
                                    <button onClick={handleButtonClick} className={site}>View More</button>
                                </div>
                                </div>
                        </div>
                    ))}
                </div>
                {/* <button className="websiteOne" onClick={handleButtonClick}>website one</button>
                <button className="amazon" onClick={handleButtonClick}>Amazon</button> */}
            </div>
        </div>
    )
}

export default Projects

