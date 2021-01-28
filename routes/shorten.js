var express = require('express');
var model = require('../models/urlModel')
var validURI = require('valid-url');
var shortID = require('shortid');
var router = express.Router();


module.exports.getShortURL = async(longURL)=>{
  console.log(longURL);
  if(validURI.isUri(longURL))
  {
    let response = await model.findOne({longURL:longURL})
    if(response){
      
       return  {
          "response":true,
          "shortURL":response["shortURL"]
        }
    }
    else{
      let shortCode = shortID.generate();
      const urlObject = new model({
        "longURL":longURL,
        "shortCode":shortCode,
        "shortURL":process.env.BASE_URL+"i/"+shortCode,
        "date": new Date()
      })
      urlObject.save();
      
      return  {
          response:true,
          shortURL:process.env.BASE_URL+"i/"+shortCode
        }
      
    }
  }
  else
  {
    
    return  {
        "response":false,
        "error":"Invalid URL"
      }
  }
}

/* GET users listing. */
router.post('/shorten', async(req, res) => {
// @POST /api/shorten
  var longURL = req.body["longURL"];
  var response = await getShortURL(longURL);
  res.send(response);
});

module.exports.router = router;