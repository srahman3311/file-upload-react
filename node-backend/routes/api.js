const router = require("express").Router();


router.post("/", (req, res, next) => {

    let imageFile = req.files.file;
  
    // Relative file path(single dot) here may look confusing. As express fileupload module is defined and
    // being used in app.js file so mv function of this module will treat the single dot as the working 
    // directory 
    imageFile.mv(`./public/images/${req.body.filename}.jpeg`, function(err) {

        if (err) {res.status(500).send(err)};

        // As express module is serving public folders from server (app.js) so file path 
        // after __dirname + "/public" needs to be used to locate a file in any directory/subdirectory
        res.status(200).json({file: `/images/${req.body.filename}.jpeg`});
    });
    
});

  


module.exports = router;