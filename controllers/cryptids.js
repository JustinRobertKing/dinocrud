var express = require('express')
var router = express.Router()

var fs = require('fs')

var cryptidData = fs.readFileSync('./cryptids.json')
cryptidData = JSON.parse(cryptidData)

// index / GET
router.get('/', (req, res) => {
	// add a filter function
	var searchParams = req.query.searchParams
	var activeCryptids = []
	cryptidData.forEach((cryptid, index) => {
		activeCryptids.push({ cryptid: cryptid, id: index })
	})

	if (searchParams) {
		activeCryptids = activeCryptids.filter((cryptid, index) => {
			return cryptid.cryptid.name.toLowerCase().includes(searchParams.toLowerCase())
		})
	}

	res.render('cryptids/index', { myCryptids: activeCryptids })
})

// new /new GET
router.get('/new', (req, res) => {
	res.render('cryptids/new')
})

// create / POST
router.post('/', (req, res) => {
	cryptidData.push(req.body)
	fs.writeFileSync('./cryptids.json', JSON.stringify(cryptidData))
	res.redirect('/cryptids')
})

// show /:id GET
router.get('/:id', (req, res) => {
	var cryptidIndex = parseInt(req.params.id)
	res.render('cryptids/show', { myCryptid: cryptidData[cryptidIndex], cryptidIndex: cryptidIndex})
})

// edit /edit/:id GET
router.get('/edit/:id', (req, res) => {
	var cryptidIndex = parseInt(req.params.id)
	res.render('cryptids/edit', { myCryptid: cryptidData[cryptidIndex], cryptidIndex: cryptidIndex })
})

// update /:id PUT
router.put('/:id', (req, res) => {
	cryptidData[req.params.id].name = req.body.name
	cryptidData[req.params.id].type = req.body.type
	fs.writeFileSync('./cryptids.json', JSON.stringify(cryptidData))
	res.redirect(`/cryptids/${req.params.id}`)	
})

// destroy /:id DELETE 
router.delete('/:id', (req, res) => {
	cryptidData.splice(req.params.id, 1)
	fs.writeFileSync('./cryptids.json', JSON.stringify(cryptidData))
	res.redirect('/cryptids')
})

module.exports = router










