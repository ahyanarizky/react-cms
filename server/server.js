const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const MYDATAS_FILE = path.join(__dirname, 'mydatas.json')
const MYDATADATES_FILE = path.join(__dirname, 'mydatadates.json')

app.set('port', (process.env.PORT || 3000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.get('/api/mydatas', function(req, res) {
    fs.readFile(MYDATAS_FILE, function(err, data) {
        if (err) return console.log(err)
        res.json(JSON.parse(data))
    })
})

app.post('/api/mydatas', function(req, res) {
    fs.readFile(MYDATAS_FILE, function(err, data) {
        if (err) { console.log(err) }
        var mydatas = JSON.parse(data)
        var newMyData = {
            id: req.body.id,
            letter: req.body.letter,
            frequency: req.body.frequency
        }
        mydatas.push(newMyData)
        fs.writeFile(MYDATAS_FILE, JSON.stringify(mydatas, null, 4), function(err) {
            if (err) { console.log(err) }
            res.json(mydatas)
        })
    })
})

app.delete('/api/mydatas', function(req, res) {
	var data = fs.readFileSync(MYDATAS_FILE)
	var mydatas = JSON.parse(data)

	for (var i = 0; i < mydatas.length; i++) {
      if (mydatas[i].id == req.body.id) {
          mydatas.splice(i,1)
          fs.writeFile(MYDATAS_FILE, JSON.stringify(mydatas, null, 4), function(err) {
              if (err) {
                  console.log(err);
              } else {
                  res.json(mydatas)
              }
          })
      } else {

      }
    }
})

// buat data date

app.get('/api/mydatadates', function(req, res) {
    fs.readFile(MYDATADATES_FILE, function(err, data) {
        if (err) return console.log(err)
        res.json(JSON.parse(data))
    })
})

app.post('/api/mydatadates', function(req, res) {
    fs.readFile(MYDATADATES_FILE, function(err, data) {
        if (err) { console.log(err) }
        var mydatas = JSON.parse(data)
        var newMyData = {
            id: req.body.id,
            letter: req.body.letter,
            frequency: req.body.frequency
        }
        mydatas.push(newMyData)
        fs.writeFile(MYDATADATES_FILE, JSON.stringify(mydatas, null, 4), function(err) {
            if (err) { console.log(err) }
            res.json(mydatas)
        })
    })
})

app.delete('/api/mydatadates', function(req, res) {
  var data = fs.readFileSync(MYDATADATES_FILE)
  var mydatas = JSON.parse(data)

  for (var i = 0; i < mydatas.length; i++) {
      if (mydatas[i].id == req.body.id) {
          mydatas.splice(i,1)
          fs.writeFile(MYDATADATES_FILE, JSON.stringify(mydatas, null, 4), function(err) {
              if (err) {
                  console.log(err);
              } else {
                  res.json(mydatas)
              }
          })
      } else {

      }
    }
})

app.listen(app.get('port'), function() {
    console.log('ya udah jalan bos!')
})
