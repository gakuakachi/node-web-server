const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3005
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log(err);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   var now = new Date().toString();
//   var log = `${now}: ${req.method} ${req.url}`;
//   res.render('maintenance.hbs', {
//     logData: log
//   })
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  // res.send('<h1>hello Express</h1>');
  res.render('home.hbs', {
    welcomeTitle: 'Hello Handlebars',
    welcomeMessage: 'Hello I like it'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    welcomeTitle: 'About Page',
    welcomeMessage: 'Hello I like it'
  })
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    welcomeTitle: 'Welcome to portfolio page',
    welcomeMessage: 'Hello, there'
  })
});

app.get('/bad', (req, res) => {
  res.send('Error');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});