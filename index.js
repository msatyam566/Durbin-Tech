const express = require('express')
const fileupload = require('express-fileupload')
const pdfParse = require('pdf-parse')
const bodyParser=require("body-parser");

const app = express()
app.use(fileupload())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/upload', async (req, res) => {

    try {

        const file = req.files.samplefile
        if (!req.files.samplefile && !req.files.pdfFile){
           return res.status(400).send({status:false, msg: "file not found"})
        }
        let pdfFile = await pdfParse(file).then(error => error.text)
        res.send(pdfFile)

        let finalText = pdfFile.json.stringify()
        console.log(finalText)
         return res.send(finalText)

    } catch (error) {
        return res.status(500)
       
    }

})

//==================Router file ==================//

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000));
});