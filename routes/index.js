var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var gen;
  request('https://api.themoviedb.org/3/genre/movie/list?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
    if (err) { return err; }
    gen=body;
  });
  setTimeout(()=>{
    res.render('index', {genres:gen.genres} );
  },500);
});

module.exports = router;
