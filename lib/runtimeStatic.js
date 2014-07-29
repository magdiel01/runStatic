'use strict';

// ExpressJS
var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');

// middleware that gets a named param
app.use('/site/:site_name', function(req, res, next) {

    // create site path
    var sitePath = path.join(__dirname, 'sites/' + req.param('site_name'));

    // Rewrite URL removing leading slash
    if (req.url !== '/') {      
      if (req.url && req.url.slice(0,1) === '/' && req.url !== '/') {
        console.log(':1:req.url:' + req.url);
        req.url = req.url.slice(1);
        console.log(':2:req.url:' + req.url);
      }
    }
    else {
      console.log('::false:Url: '+req.url);
    }
        
    // check it if exists on the file system
    fs.exists(sitePath, function(exists){
        // if not move to next piece of middleware
        if (!exists) {
          // console.log('::DoNotExistsSitePath:'+sitePath);
          return next();
        }
        // if it does run express.static to return
        // a middlware function to handle that path
        // then run that function and pass it the req,res,next params
        return express.static(sitePath)(req,res,next);
    });
});



/**
 * App configuration section
 */
app.set('views', 'sites');  // Folder containing view templates
app.engine('html', require('ejs').renderFile);    // Template engine

// app.use('/Y4KkHHrfrQ', express.static('sites/Y4KkHHrfrQ'));
 
// Attach the Express app
app.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');