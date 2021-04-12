Install ejs with the comman npm i ejs ==========> this helps reduce express code by rendering ejs files in the static views folder than making a send request and use path to search for the corresponding file to render to the html DOM

install body parser using the command npm i body-parser ===========> this helps coollect the data from an html form when the form is submited using mongodb

set it up like this =====> const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended : true}))

install mongoose in other to connect nodeJs to a mongodb database ==================+> npm install mongoose

install express-fileupload in order to upload files and images using express ==========> npm i express-fileupload
