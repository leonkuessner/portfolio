import React from 'react'

function Addproject() {
    return (
        <div className="adminProjects__new-field">
                    <input 
                        placeholder="Title" 
                        type="text" 
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    />
                    <input 
                        placeholder="Languages" 
                        type="text"
                        onChange={(e) => setNewProject({...newProject, languages: e.target.value})}
                    />
                    <textarea 
                        placeholder="Description" 
                        type="text"
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    />
                    <input 
                        type="file" 
                        onChange={(e) => setNewProject({...newProject, thumbnail: e.target.value})}/>
                    {/* <img src={newProject.thumbnail}/> */}
                </div>
    )
}

export default Addproject



import React from 'react'
import PropTypes from 'prop-types'

const ProjectsMessage = ({msg}) => {
    return (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
            {msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

ProjectsMessage.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default ProjectsMessage

import React, { useEffect, useState } from 'react'
import './styles/Projects.css'
import axios from 'axios'
import ProjectsFileUpload from './FileUploads/ProjectsFileUpload'

function ProjectEdit() {
    const [existingProjects, setExistingProjects] = useState([])
    const [editCond, setEditCond] = useState("")
    const shortProjectVars = ["title", "languages"]
    const longProjectVars = ["title", "languages", "description"]


    const [newProject, setNewProject] = useState({
        title: "",
        languages: "",
        description: "",
    })

    const getExistingProjects = () => {
        axios.get("http://localhost:5000/getExisting").then((response) =>{
            setExistingProjects(response.data)
            console.log(response.data)
        })
    }

    useEffect(() => {
        getExistingProjects()
    }, [])

    const addProject = () => {
        console.log(newProject)
        axios.post("http://localhost:5000/addProject", {
            title: newProject.title,
            languages: newProject.languages,
            description: newProject.description,
            thumbnail: newProject.thumbnail,
        }).then(() => {
            console.log("Success")
            getExistingProjects()
        })
    }

    // const fillEdit = (vars,project) => {
    //     if (vars.includes("thumbnail") ) {
    //         return (
    //             <>
    //                 <h3>{vars}</h3>
    //                 {/* <img src={project[vars]} />
    //                 <button>delete</button>
    //                 <input type="file"/> */}
    //                 {/* <h3>{project[vars]}</h3> */}
    //             </>
    //         )
    //     } else {
    //         return (
    //             <>
    //                 <h3>{vars}</h3>
    //                 <h3>{project[vars]}</h3>
    //             </>
    //         )
    //     }
    // }
    return (
        <div className="admin__projects">
            <div className="adminProjects__existing-projects">
            {existingProjects.map((project, key)=> (
                <div key={key} className="adminProjects__single-existing">
                    {editCond !== project.id ?
                        <>
                            <div className="adminProjects__short-edit-view">
                                {shortProjectVars.map((vars, key) => {
                                    return(
                                        <div key={key} className="adminProjects__short-single-item">
                                            <h3 className="adminProjects__short-single-header">{vars}</h3>
                                            <h3>{project[vars]}</h3>
                                        </div>
                                    )
                                })}
                                </div> 
                                <button className="edit-buttons" onClick={() => {
                                    setEditCond(project.id)
                                    // setEditChange({name: val.name, age: val.age, country: val.country, position: val.position, wage: val.wage})}
                                }}>Edit</button> 
                            </>:
                            <>
                            <div className="adminProjects__long-edit-view">
                                {longProjectVars.map((vars, key) => {
                                    return(
                                        <div key={key} className="adminProjects__long-single-item">
                                            <h3>{vars}</h3>
                                            <h4>{project[vars]}</h4>
                                        </div>
                                    )
                                })}
                                <ProjectsFileUpload />
                            </div>
                            <div className="delete-buttons">
                                {/* <button className="edit-buttons" onClick={() => handleChange(val.id)}>Save</button>
                                <button className="edit-buttons" onClick={() => handleDelete(val.id)}>Delete</button> */}
                                <button className="edit-buttons" onClick={() => setEditCond("")} >Close</button>
                            </div>
                        </>
                    }
                    {/* {editCond !== project.id ? <button className="edit-buttons" onClick={() => {
                        setEditCond(project.id)
                        // setEditChange({name: val.name, age: val.age, country: val.country, position: val.position, wage: val.wage})}
                        }}>Edit</button> 
                        :
                        <div className="delete-buttons">
                            <button className="edit-buttons" onClick={() => handleChange(val.id)}>Save</button>
                            <button className="edit-buttons" onClick={() => handleDelete(val.id)}>Delete</button>
                            <button className="edit-buttons" onClick={() => setEditCond("")} >Close</button>
                        </div> } */}
                </div>
            ))}
            </div>
            <div className="adminProjects__new-field">
                    <input 
                        placeholder="Title" 
                        type="text" 
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    />
                    <input 
                        placeholder="Languages" 
                        type="text"
                        onChange={(e) => setNewProject({...newProject, languages: e.target.value})}
                    />
                    <textarea 
                        placeholder="Description" 
                        type="text"
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    />
                    <input 
                        type="file" 
                        onChange={(e) => setNewProject({...newProject, thumbnail: e.target.value})}/>
                    {/* <img src={newProject.thumbnail}/> */}
                </div>
            <button onClick={addProject} >Add New</button>
        </div>
    )
}

export default ProjectEdit

import React, { useState } from 'react'
import Message from './ProjectsMessage'
import axios from 'axios'

const ProjectsFileUpload
 = () => {

    const [file, setFile] = useState();
    const [projectName, setProjectName] = useState({ title: "", index: 0});
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({})
    const [message, setMessage] = useState('')
    const [uploadPercentage, setUploadPercentage] = useState(0)

    const onChange = e => {
        e.preventDefault()
        // console.log(e)
        console.log(projectName)
        // console.log(e.target.files.length)
        if (e.target.files.length !== 0) {
        // if (e.target.file)
            setFile(e.target.files[0])
            setFilename(e.target.files[0].name)
        }
    }

    const onSubmit = async e => {
        e.preventDefault();
        setUploadedFile(null)
        setProjectName(prev => {
            return { ...projectName, index: prev.index + 1}
        })
        const formData = new FormData();
        formData.append('file', file)
        formData.append('title', projectName.title)
        formData.append('index', projectName.index)
        console.log(formData)

        try {
            const res = await axios.post('http://localhost:5000/upload', formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            );

            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });

            setMessage('File Uploaded!')
        }catch(err) {
            if(err.response.status === 500) {
                setMessage('There was a problem with the server')
            } else {
                setMessage(err.response.data.msg)
            }
        }
    }

    return (
        <>
        <input type="text" onChange={(e) => setProjectName({...projectName, title: e.target.value})}/>
        {/* <input type="text" onChange={(e) => console.log(e)}/> */}
        {message ? <Message msg={message}/> : null}
            <form onSubmit={onSubmit}>
                {/* <div className='custom-file mb-4'>
                <input
                    type='file'
                    className='custom-file-input'
                    id='customFile'
                    onChange={onChange}
                />
                <label className='custom-file-label' htmlFor='customFile'>
                    {filename}
                </label>
                </div>

                <input
                type='submit'
                value='Upload'
                className='btn btn-primary btn-block mt-4'
                /> */}
                <div className="input-group mb-3">
                <input type="file" className="form-control" id="inputGroupFile02" onChange={onChange}/>
                
                <input
                type='submit'
                value='Upload'
                className='btn btn-primary btn-block mt-4'
                />
                </div>
            </form>
            

            { uploadedFile ? <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">
                        { uploadedFile.fileName }
                        {console.log(uploadedFile)}
                        <img src={ uploadedFile.filePath }style={{width: '100px'}}/>
                    </h3>
                </div>
            </div> : null}
        </> 
    )
}

export default ProjectsFileUpload

