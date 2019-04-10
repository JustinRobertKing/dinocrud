var express = require('express')
var router = express.Router()

var fs = require('fs')

var dinoData = fs.readFileSync('./dinosaurs.json')
dinoData = JSON.parse(dinoData)

// index / GET
router.get('/', (req, res) => {
	res.render('dinosaurs/index', { myDinos: dinoData })
})

// new /new GET
router.get('/new', (req, res) => {
	res.render('dinosaurs/new')
})

// create / POST
router.post('/', (req, res) => {
	dinoData.push(req.body)
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
	res.redirect('/dinosaurs')
})

// edit /edit/:id GET
router.get('/edit/:id', (req, res) => {
	var dinoIndex = parseInt(req.params.id)
	res.render('dinosaurs/edit', { myDino: dinoData[dinoIndex], dinoIndex: dinoIndex })
})

// show /:id GET
router.get('/:id', (req, res) => {
	var dinoIndex = parseInt(req.params.id)
	res.render('dinosaurs/show', { myDino: dinoData[dinoIndex], dinoIndex: dinoIndex })
})


// update /:id PUT
router.put('/:id', (req, res) => {
	dinoData[req.params.id].name = req.body.name
	dinoData[req.params.id].type = req.body.type
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
	res.redirect(`/dinosaurs/${req.params.id}`)	
})

// destroy /:id DELETE 
router.delete('/:id', (req, res) => {
	dinoData.splice(req.params.id, 1)
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
	res.redirect('/dinosaurs')
})

module.exports = router




