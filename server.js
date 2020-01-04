const express = require('express')
const app = express()
const port = 3000

const mongoose =require('mongoose')
mongoose.connect('mongodb://dilip:dilip123@dbh43.mlab.com:27437/chessdb', {useNewUrlParser: true})
.catch(err=>{
    console.log(err)
})

app.set('view engine','ejs')



app.get('/', (req, res) =>{
    res.render('index',{data:{
        name:'dilip',
        age:34
    }})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
