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

// show /:id GET
router.get('/:id', (req, res) => {
	var dinoIndex = parseInt(req.params.id)
	res.render('dinosaurs/show', { myDino: dinoData[dinoIndex] })
})

// edit /edit/:id GET
router.get('/edit/:id', (req, res) => {
	res.render('dinosaurs/edit')
})

// update /:id PUT

// destroy /delete/:id DELETE

module.exports = router