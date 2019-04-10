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
	res.render('cryptids/edit')
})

module.exports = router