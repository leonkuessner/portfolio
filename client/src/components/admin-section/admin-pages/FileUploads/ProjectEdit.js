import React, { useEffect, useState } from 'react'
// import './styles/Projects.css'
import axios from 'axios'
// import ProjectsFileUpload from './FileUploads/ProjectsFileUpload'

// export const getExistingProjects = () => {
//     axios.get("http://localhost:5000/getExisting").then((response) =>{
//         setExistingProjects(response.data)
//         console.log(response.data)
//     })
// }

function ProjectEdit() {

    const [existingProjects, setExistingProjects] = useState()

    const getExistingProjects = () => {
        axios.get("http://localhost:5000/getExisting").then((response) =>{
            setExistingProjects(response.data)
            console.log(response.data)
        })
    }
    const deleteItem = (id) => {
        console.log(id)
        axios.post("/deleteItem", {
            item: id
        }).then((response) =>{
            getExistingProjects(response.data)
        })
    }

    const uploadExisting = () => {
        getExistingProjects()
        console.log(existingProjects)
    }

    useEffect(() => {
        uploadExisting()
    }, [])

    return (
        <div>
            <button onClick={uploadExisting}>Get Projects</button>
            {existingProjects ? existingProjects.map((project, key) => (
                <div key={key} className="projectEdit__single-item">
                    <button onClick={() => deleteItem(project.id)}>Delete</button>
                    <h3>{project.title}</h3>
                    <h3>{project.languages}</h3>
                    <h3>{project.description}</h3>
                    <img src={project.thumbnailPath} style={{height:"200px"}}/>
                </div>
            )): null}
        </div>
    )
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

    // // const fillEdit = (vars,project) => {
    // //     if (vars.includes("thumbnail") ) {
    // //         return (
    // //             <>
    // //                 <h3>{vars}</h3>
    // //                 {/* <img src={project[vars]} />
    // //                 <button>delete</button>
    // //                 <input type="file"/> */}
    // //                 {/* <h3>{project[vars]}</h3> */}
    // //             </>
    // //         )
    // //     } else {
    // //         return (
    // //             <>
    // //                 <h3>{vars}</h3>
    // //                 <h3>{project[vars]}</h3>
    // //             </>
    // //         )
    // //     }
    // // }
    // return (
    //     <div className="admin__projects">
    //         <div className="adminProjects__existing-projects">
    //         {existingProjects.map((project, key)=> (
    //             <div key={key} className="adminProjects__single-existing">
    //                 {editCond !== project.id ?
    //                     <>
    //                         <div className="adminProjects__short-edit-view">
    //                             {shortProjectVars.map((vars, key) => {
    //                                 return(
    //                                     <div key={key} className="adminProjects__short-single-item">
    //                                         <h3 className="adminProjects__short-single-header">{vars}</h3>
    //                                         <h3>{project[vars]}</h3>
    //                                     </div>
    //                                 )
    //                             })}
    //                             </div> 
    //                             <button className="edit-buttons" onClick={() => {
    //                                 setEditCond(project.id)
    //                                 // setEditChange({name: val.name, age: val.age, country: val.country, position: val.position, wage: val.wage})}
    //                             }}>Edit</button> 
    //                         </>:
    //                         <>
    //                         <div className="adminProjects__long-edit-view">
    //                             {longProjectVars.map((vars, key) => {
    //                                 return(
    //                                     <div key={key} className="adminProjects__long-single-item">
    //                                         <h3>{vars}</h3>
    //                                         <h4>{project[vars]}</h4>
    //                                     </div>
    //                                 )
    //                             })}
    //                             <ProjectsFileUpload />
    //                         </div>
    //                         <div className="delete-buttons">
    //                             {/* <button className="edit-buttons" onClick={() => handleChange(val.id)}>Save</button>
    //                             <button className="edit-buttons" onClick={() => handleDelete(val.id)}>Delete</button> */}
    //                             <button className="edit-buttons" onClick={() => setEditCond("")} >Close</button>
    //                         </div>
    //                     </>
    //                 }
    //                 {/* {editCond !== project.id ? <button className="edit-buttons" onClick={() => {
    //                     setEditCond(project.id)
    //                     // setEditChange({name: val.name, age: val.age, country: val.country, position: val.position, wage: val.wage})}
    //                     }}>Edit</button> 
    //                     :
    //                     <div className="delete-buttons">
    //                         <button className="edit-buttons" onClick={() => handleChange(val.id)}>Save</button>
    //                         <button className="edit-buttons" onClick={() => handleDelete(val.id)}>Delete</button>
    //                         <button className="edit-buttons" onClick={() => setEditCond("")} >Close</button>
    //                     </div> } */}
    //             </div>
    //         ))}
    //         </div>
    //         <div className="adminProjects__new-field">
    //                 <input 
    //                     placeholder="Title" 
    //                     type="text" 
    //                     onChange={(e) => setNewProject({...newProject, title: e.target.value})}
    //                 />
    //                 <input 
    //                     placeholder="Languages" 
    //                     type="text"
    //                     onChange={(e) => setNewProject({...newProject, languages: e.target.value})}
    //                 />
    //                 <textarea 
    //                     placeholder="Description" 
    //                     type="text"
    //                     onChange={(e) => setNewProject({...newProject, description: e.target.value})}
    //                 />
    //                 <input 
    //                     type="file" 
    //                     onChange={(e) => setNewProject({...newProject, thumbnail: e.target.value})}/>
    //                 {/* <img src={newProject.thumbnail}/> */}
    //             </div>
    //         <button onClick={addProject} >Add New</button>
    //     </div>
    // )
}

export default ProjectEdit
