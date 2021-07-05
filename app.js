// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
//require movies.json
const restaurantList = require('./restaurant.json')
// routes setting
app.get('/', (req, res) => {
  // create a variable to store movieOne
  res.render('index', {
    restaurant: restaurantList.results
  })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantOne = restaurantList.results.filter(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', {
    restaurant: restaurantOne[0]
  })
})

app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    if (restaurant.category.includes(keyword)) {
      return restaurant.category.includes(keyword)
    } else if (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    }

  })
  console.log(restaurants)
  res.render('index', {
    restaurant: restaurants,
    keyword: keyword
  })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})