var express = require('express')
var layouts = require('express-ejs-layouts')

var app = express()

app.set('view engine', 'ejs')
app.use(layouts)

app.get('/', (req, res) => {
	res.send('Stubbalubs')
})




app.listen(3000, () => console.log('You are not insane'))