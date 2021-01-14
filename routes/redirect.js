const express = require('express')
const model = require('../models/urlModel')
const router = express.Router();

router.get('/:code',async(req,res)=>{
    var code = req.params.code;
    try{
        var data = await model.findOne({shortCode:code}).select({longURL:1,_id:0});
        res.redirect(data["longURL"]);
    }
    catch(err){
        res.render("Page-Not-Found");
    }
});

module.exports = router;