//************************************************************************************ */
//************************************************************************************ */
//************************************************************************************ */
//******************** BLOG POST APP BY THE YANNDEVS ********************************* */
//************************************************************************************ */
//************************************************************************************ */
//************************************************************************************ */
//************************************************************************************ */


// our blogposts 


const express = require('express')

const app = express()

// *********** this is not really needed ********
const ejs = require('ejs') // *******************
const path = require('path')// ******************
//********************************************* */


// ******************************** connecting to the bd and importing blogposts **************************************************
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog_post_db' , {useNewUrlParser : true})

const BlogPost = require('./models/Blogpost')

// file upload (images and all the rest)

const fileUpload = require('express-fileupload') //this add the file property to the request object so that we can obtain the file via req.files


// ************************************** setting up the viewengine to ejs ***************************************************************
app.set('view engine' , 'ejs') // we place our view engine to ejs

app.use(express.static('public'))


//*************************************************** Setting up our body parser ************************************************ */
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended : true}))

app.use(fileUpload())

// *********************************************** Our get requests **************************************************************
app.get('/' , async (req , res) => {
    const blogposts = await BlogPost.find({})
    res.render('index' , {
        blogposts
    })
})


app.get('/about' , (req , res) => {
    res.render('about')
})

app.get('/post/:id' , async (req , res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post' , {
        blogpost
    })
})

app.get('/contact' , (req , res) => {
    res.render('contact')
})

app.get('/new' , (req , res) => {
    res.render('create')
})

// ***************************************** the posts requests ************************************************************************

app.post('/create/post' , (req , res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname , 'public/img' , image.name) , async (error) => { // the function mv moves the uploaded file to somewhere on our disk
        await BlogPost.create({
            ...req.body , 
            image:'/img/'+image.name
        })
        res.redirect('/')
    })
        
})

app.post('/post/search' , async (req , res) => {
   res.redirect('/')
})
















// Starting the server on port 3000
app.listen(3000 , () => {
    console.log(`App running on port 3000`)
})