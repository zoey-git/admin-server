const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/root', { useNewUrlParser: true,useUnifiedTopology: true })


mongoose.connection.on('error', (err) => {
    console.log('mongodb connect error:' + err)
})

mongoose.connection.on('disconnected', (err) => {
    console.log('mongodb connect disconnected')
})

module.exports = mongoose