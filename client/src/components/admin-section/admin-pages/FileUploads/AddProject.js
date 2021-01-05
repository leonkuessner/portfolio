import React, { useState } from 'react'
import './AddProjectsStyles/AddProjects.css'
import axios from 'axios'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
// import {getExistingProjects} from './ProjectEdit'


function Addproject() {
    const [newProjectView, setNewProjectView] = useState(false)

    const [projectText, setProjectText] = useState({
        title: "",
        languages: "",
        description: "",
    })
    const [thumbnail, setThumbnail] = useState()
    const [slideshow, setSlideshow] = useState()
    const [uploadedThumbnail, setUploadedThumbnail] = useState({})
    const [uploadedSlideshow, setUploadedSlideshow] = useState([])
    console.log(uploadedSlideshow)
    const [slideshowIndex, setSlideshowIndex] = useState(0)

    const onChangeThumbnail = (e) => {
        e.preventDefault()
        console.log(e)
        if (e.target.files.length !== 0) {
            setThumbnail(e.target.files[0])
        }
    }
    const onChangeSlideshow = (e) => {
        e.preventDefault()
        console.log(e)
        if (e.target.files.length !== 0) {
            setSlideshow(e.target.files[0])
        }
    }

    const onSubmitThumbnail = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('thumbnail', thumbnail)
        formData.append('title', projectText.title)
        try {
            const res = await axios.post('http://localhost:5000/upload-thumbnail', formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            console.log(res.data)
            const { fileName, filePath } = res.data.thumbnail
            setUploadedThumbnail({ fileName, filePath })
            console.log('File Uploaded!')
        } catch(err) {
            if (err.response.status === 500) {
                console.log("Problem with Server")
            } else {
                console.log(err.response.data.msg)
            }
        }
    }
    const onSubmitSlideshow = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', projectText.title)
        formData.append('slideshow', slideshow)
        formData.append('index', uploadedSlideshow.length)

        try {
            const res = await axios.post('http://localhost:5000/upload-slideshow', formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            console.log(res.data.slideshow)
            const { fileName, filePath } = res.data.slideshow
            setUploadedSlideshow([...uploadedSlideshow, filePath ])
            console.log('File Uploaded!')
        } catch(err) {
            console.log(err)
            if (err.response.status === 500) {
                console.log("Problem with Server")
            } else {
                console.log(err.response.data.msg)
            }
        }
    }

    const uploadProject = async() => {

        try {
            const res = await axios.post('http://localhost:5000/upload-project', {
                thumbnailPath: uploadedThumbnail.filePath,
                title: projectText.title,
                languages: projectText.languages,
                description: projectText.description,
                slideshowPaths: uploadedSlideshow
            }
            )
        } catch(err) {
            if (err.response.status === 500) {
                console.log("Problem with Server")
            } else {
                console.log(err.response.data.msg)
            }
        }
        // getExistingProjects()
    }

    return (
        <div>
            {newProjectView ?                  
        
            <div className="addProjects__container">
                <div className="addProjects__text-inputs">
                    <h2>Text Inputs</h2>
                    <input 
                        onChange={(e) => setProjectText({...projectText, title: e.target.value})} 
                        placeholder="Title" 
                        type="text"
                    />
                    <input
                        onChange={(e) => setProjectText({...projectText, languages: e.target.value})}
                        placeholder="Languages" 
                        type="text"
                    />
                    <textarea
                        onChange={(e) => setProjectText({...projectText, description: e.target.value})} 
                        placeholder="Description" 
                        type="text"
                    />
                </div>

                
                <div className="addProjects__image-inputs">
                    <h2>Image Inputs</h2>
                    <div className="addProjects__thumbnail-container addProjects__image-sub">
                        <h4>Thumbnail Image</h4>
                        <form onSubmit={onSubmitThumbnail} className="addProjects__thumbnail-input">
                            <div className="input-group mb-3"
                                onClick={() => setUploadedThumbnail()}>
                                <input 
                                    onChange={onChangeThumbnail}
                                    type="file" 
                                    className="form-control" 
                                    id="inputGroupFile02"/>
                            </div>

                            <button type="submit" className="btn btn-primary addProjects__upload-btn">
                                Upload
                            </button>
                        </form>
                        <div className="addProjects__uploaded-img-container">
                        {console.log(uploadedThumbnail)}
                            {uploadedThumbnail ? 
                                <img 
                                    src={uploadedThumbnail.filePath} 
                                    style={{ 
                                        height: '100%',
                                        width: 'auto'
                                    }}/>
                            : null} 
                        </div>

                    </div>


                    <div className="addProjects__slideshow-container addProjects__image-sub">
                        <h4>Slideshow Images</h4>
                        <form onSubmit={onSubmitSlideshow} className="addProjects__thumbnail-input">
                            <div className="input-group mb-3">
                                <input 
                                    onChange={onChangeSlideshow}
                                    type="file" 
                                    className="form-control" 
                                    id="inputGroupFile02"/>
                            </div>

                            <button type="submit" className="btn btn-primary addProjects__upload-btn">
                                Upload
                            </button>
                        </form>
                        <div className="addProject__show-slides">
                            {uploadedSlideshow ? 
                                uploadedSlideshow.map((slide, key) => {
                                    return (
                                    <div 
                                        key={key} 
                                        className="addProject__slide-preview">
                                        <img src={slide} style={{width: "60px", margin: "0 5px"}}/>
                                    </div>
                                    )
                                }) 
                                
                            : null}
                        </div>
                        <div className="addProject__slideshow">
                            {uploadedSlideshow ?
                                <Slide easing="ease">
                                    {uploadedSlideshow.map((slide, key) =>{ 
                                        return(
                                        <div className="each-slide" key={key}>
                                            <img style={{height: "200px", width: "300px"}} src={slide}/>
                                        </div>
                                        )
                                    })}
                                </Slide> 
                                
                            : null}
                        </div>
                    </div>
                </div>


                <div onClick={uploadProject} className="addProjects__add-button">
                    <button>Upload</button>
                </div>
            </div>
             : <button onClick={() => setNewProjectView(prev => !prev)} >Add New</button>
        }
        </div>
    )
}

export default Addproject
