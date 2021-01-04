import React, { useEffect, useState } from 'react'
import './styles/Projects.css'
import axios from 'axios'
// import ProjectsFileUpload from './FileUploads/ProjectsFileUpload'
import Addproject from './FileUploads/AddProject'
import ProjectEdit from './FileUploads/ProjectEdit'

function Projects() {
    // const [existingProjects, setExistingProjects] = useState([])
    // const [editCond, setEditCond] = useState("")
    // const shortProjectVars = ["title", "languages"]
    // const longProjectVars = ["title", "languages", "description"]


    // const [newProject, setNewProject] = useState({
    //     title: "",
    //     languages: "",
    //     description: "",
    // })

    // const getExistingProjects = () => {
    //     axios.get("http://localhost:5000/getExisting").then((response) =>{
    //         setExistingProjects(response.data)
    //         console.log(response.data)
    //     })
    // }

    // useEffect(() => {
    //     getExistingProjects()
    // }, [])

    // const addProject = () => {
    //     console.log(newProject)
    //     axios.post("http://localhost:5000/addProject", {
    //         title: newProject.title,
    //         languages: newProject.languages,
    //         description: newProject.description,
    //         thumbnail: newProject.thumbnail,
    //     }).then(() => {
    //         console.log("Success")
    //         getExistingProjects()
    //     })
    // }

    // const [newProjectView, setNewProjectView] = useState(false)

    return (
        <div className="admin__projects">
            <div className="adminProjects__existing-projects">
                <ProjectEdit/>
            </div>
            <Addproject/>
            {/* {console.log(uploadedThumbnail)} */}
            {/* <div>
                {newProjectView ? 
                <div>
                    <Addproject />
                </div> : null
                }
            </div> */}
            {/* <button onClick={() => setNewProjectView(prev => !prev)} >Add New</button> */}
        </div>
    )
}

export default Projects
