const express = require("express")
const fileUpload = require('express-fileupload')
const app =  express()
const mysql = require('mysql')
const cors = require('cors')
const fs = require('fs')

app.use(fileUpload())
app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password', // either this or 'password'
    database: 'portfolio'
})

app.get('/getExisting', (req, res) => {
    db.query(
        `SELECT projectdata.id, title, languages, description, thumbnailPath, group_concat(link) FROM projectdata INNER JOIN slideshowarrays ON projectdata.id = slideshowarrays.project_id GROUP BY id`,
        (err, result) => {
            if (err) {
                    console.log(err)
                } else {
                    console.log(result)           // Send Result
                }
        }
        // 'SELECT * FROM projectdata', (err, result) => {              // employees being the name of the TABLE!
        // if (err) {
        //     console.log(err)
        // } else {
        //     res.send(result)            // Send Result
        // }
    )
})
app.post('/deleteItem', (req, res) => {
    const id = req.body.item
    console.log(req.body.item)
    db.query(
        'DELETE FROM `projectdata` WHERE `id`=?',
        [id]
    );
    db.query(
        'SELECT * FROM projectdata', (err, result) => {              // employees being the name of the TABLE!
            if (err) {
                console.log(err)
            } else {
                res.send(result)            // Send Result
            }
        }
    );
})

app.post('/upload-thumbnail', (req, res) => {
    // console.log(req.body)
    console.log(req.files, req.body) 
    if(req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }
    const title = req.body.title
    const thumbnail = req.files.thumbnail
    if (thumbnail.mimetype === 'image/jpeg') {
        imgType = "jpg"
    } else if (thumbnail.mimetype === 'image/png'){
        imgType = "png"
    } else {
        return res.status(400).json({msg: 'Please upload JPG/PNG file!'})
    }

    const path = `${__dirname}/../client/public/uploads/thumbnails/${title}Thumbnail.${imgType}`
    
    try {
        fs.unlinkSync(`${__dirname}/../client/public/uploads/thumbnails/${title}Thumbnail.${imgType}`)
    } catch(err) {
        console.log("something went wrong!")
    }
    

    thumbnail.mv(path, err => {
        if(err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.json({ 
            thumbnail: {
                fileName: `${title}Thumbnail.${imgType}`, 
                filePath: `uploads/thumbnails/${title}Thumbnail.${imgType}`
            },
        })
    })
})

app.post('/upload-slideshow', (req, res) => {
    // console.log(req.body)
    console.log(req.files, req.body) 
    if(req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }
    const title = req.body.title
    const slideshow = req.files.slideshow
    const index = req.body.index
    if (slideshow.mimetype === 'image/jpeg') {
        imgType = "jpg"
    } else if (slideshow.mimetype === 'image/png'){
        imgType = "png"
    } else {
        return res.status(400).json({msg: 'Please upload JPG/PNG file!'})
    }
    path = `${__dirname}/../client/public/uploads/slideshows/${title}Slideshow${index}.${imgType}`
    
    if (fs.existsSync(path)) {
        try {
            fs.unlinkSync(path)
        } catch(err) {
            console.log("something went wrong!")
        }
    }

    slideshow.mv(`${__dirname}/../client/public/uploads/slideshows/${title}Slideshow${index}.${imgType}`, err => {
        if(err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.json({ 
            slideshow: {
                fileName: `${title}Slideshow${index}.${imgType}`, 
                filePath: `uploads/slideshows/${title}Slideshow${index}.${imgType}`
            },
        })
    }) 
}) 

app.post('/upload-project', (req, res) => {
    // console.log(req.body)
    console.log(req.body) 
    const thumbnailPath = req.body.thumbnailPath
    const title = req.body.title
    const languages = req.body.languages
    const description = req.body.description
    const slideshowPaths = req.body.slideshowPaths
    console.log(slideshowPaths)
    // console.log(`?${',?'.repeat(slideshowPaths.length-1)}`)

    if(req.body.thumbnail === null) {
        return res.status(400).json({msg: 'No image uploaded'});
    }

    db.query(
        'INSERT INTO projectdata (title, languages, description, thumbnailPath) VALUES (?,?,?,?)', 
        [title, languages, description, thumbnailPath], 
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                // const id = result.insertId
                slideshowPaths.map(path => {
                    db.query(
                        'INSERT INTO slideshowarrays (link, project_id) VALUES (?,?)',
                        [path, result.insertId]
                    )
                })
                res.send("Values inserted") // to end request it will send message to request to know that it actually worked
            }
        }
    )

}) 

app.listen(5000, () => {
    console.log("running")
})





