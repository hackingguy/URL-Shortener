var express = require('express');
var model = require('../models/urlModel')
var validURI = require('valid-url');
var shortID = require('shortid');
var router = express.Router();

/* GET users listing. */
router.post('/shorten', async(req, res) => {
// @POST /api/shorten
  var longURL = req.body["longURL"];
  if(validURI.isUri(longURL))
  {
    let response = await model.findOne({longURL:longURL})
    if(response){
      res.send(
        {
          "response":true,
          "shortURL":response["shortURL"]
        }
      );
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
      res.send(
        {
          response:true,
          shortURL:process.env.BASE_URL+"i/"+shortCode
        }
      )
    }
  }
  else
  {
    res.send(
      {
        "response":false
      }
    )
  }
});

module.exports = router;