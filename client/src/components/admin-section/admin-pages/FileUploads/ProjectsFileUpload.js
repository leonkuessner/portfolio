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
