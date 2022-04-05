const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))



//this  /  gets you to port 8000 
app.get('/', (req, res) =>{
    res.render('home')
})



app.get('/add', (req, res) => {
    res.render('add')   
})



app.post('/add', (req, res) => {
    const title = req.body.title
    const detail = req.body.detail

    if (title.trim() === '' && detail.trim() === '') {
        res.render('add', { error: true })
    }   else {
        fs.readFile('./data/notes.json', (err, data) => {
            if (err) throw err 

            const notes = JSON.parse(data)

            notes.push({
                id: id (),
                title: title,
                detail: detail,
            })

            fs.writeFile('./data/notes.json', JSON.stringify(notes), err => {
                if (err) throw err 

                res.render('add', {succes: true})
            })
        })
    }
})



app.get('/notes', (req, res) =>{

    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err

        const notes = JSON.parse(data)

        res.render('notes', { notes: notes })
    })
})



app.get('/notes/:id', (req, res) => {

    const id = req.params.id

    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err

        const notes = JSON.parse(data)

        const note = notes.filter( note => note.id == id)[0]

        res.render('detail', { note: note })
    }) 
})



app.listen(8000, err=>{
    if (err) console.log(err)

    console.log('Server port is 8000...')
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };