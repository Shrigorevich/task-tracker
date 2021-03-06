const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')

const PORT = process.env.PORT || 80;

app.use(express.json({ extended: true }))

app.use(cors({
   origin: 'http://localhost:3000'
}))

app.use('/api', require('./routes/routes.js'))


app.use('/', express.static('client/build'))

app.get('*', (req, res) => {  
   console.log('prodaction1');
   
   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


app.listen(PORT, () => console.log(`App has been started on ${PORT}`))

