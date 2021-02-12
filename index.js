const express = require('express');
const http = require('http');
const cors = require('cors')
const app = express();
const { writeFileSync } = require('fs')
const ics = require('ics')

app.use(cors())

app.get('/', (req, res) => {
  ics.createEvent({
    title: 'Dinner',
    description: 'Nightly thing I do',
    busyStatus: 'FREE',
    start: [2018, 1, 15, 6, 30],
    duration: { minutes: 50 }
  }, (error, value) => {
    if (error) {
      console.log(error)
    }

    // writeFileSync(`${__dirname}/event.ics`, value)
    const file = `${__dirname}/event.ics`;
    res.download(file);
  })
});

const server = http.createServer(app);
server.listen(3000);
