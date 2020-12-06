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

/* GET gender view page. */
router.get('/genresView/:id,:page', function(req, res, next) {
  var movies;
  request('https://api.themoviedb.org/3/discover/movie?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+req.params.page+'&with_genres='+req.params.id, { json: true }, (err, res, body) => {
    if (err) { return err; }
    movies=body;
  });
  setTimeout(()=>{
    res.render('genresView', {movies:movies,genre:req.params.id} );
  },500);
});

/* GET movie view page. */
router.get('/movieView/:id', function(req, res, next) {
  var movie;
  request('https://api.themoviedb.org/3/movie/'+req.params.id+'?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
    if (err) { return err; }
    movie=body;
  });
  var trailer;
  request('https://api.themoviedb.org/3/movie/'+req.params.id+'/videos?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
    if (err) { return err; }
    trailer=body;
  });
  var images;
  request('https://api.themoviedb.org/3/movie/'+req.params.id+'/images?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
    if (err) { return err; }
    images=body;
  });
  var reviews;
  request('https://api.themoviedb.org/3/movie/'+req.params.id+'/reviews?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
    if (err) { return err; }
    reviews=body;
  });
  var movies;
  request('https://api.themoviedb.org/3/movie/'+req.params.id+'/similar?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
    if (err) { return err; }
    movies=body;
  });
  setTimeout(()=>{
    res.render('movieView', {movie:movie,trailer:trailer.results,images:images.backdrops,reviews:reviews.results,movies} );
  },1500);
});

/* POST movie rating function. */
router.post('/movieRating/:id', function(req, res, next) {
  var suc;
  request('https://api.themoviedb.org/3/movie/'+req.params.id+'/rating?api_key=43779b994fff2552ad53eaabd3b38390', { json: true,method: "POST",body:{value:parseFloat(req.body.value)}}, (err, res, body) => {
    if (err) { return err; }
    suc=body.success;
  });
  setTimeout(()=>{
    var movie;
    request('https://api.themoviedb.org/3/movie/'+req.params.id+'?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
      if (err) { return err; }
      movie=body;
    });
    var trailer;
    request('https://api.themoviedb.org/3/movie/'+req.params.id+'/videos?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
      if (err) { return err; }
      trailer=body;
    });
    var images;
    request('https://api.themoviedb.org/3/movie/'+req.params.id+'/images?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
      if (err) { return err; }
      images=body;
    });
    var reviews;
    request('https://api.themoviedb.org/3/movie/'+req.params.id+'/reviews?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
      if (err) { return err; }
      reviews=body;
    });
    var movies;
    request('https://api.themoviedb.org/3/movie/'+req.params.id+'/similar?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US', { json: true }, (err, res, body) => {
      if (err) { return err; }
      movies=body;
    });
    setTimeout(()=>{
      res.render('movieView', {movie:movie,suc,trailer:trailer.results,images:images.backdrops,reviews:reviews.results,movies:movies} );
    },700);
  },500);
});

/* GET search view page. */
router.post('/movieSearch/', function(req, res, next) {
  var movies;
  request('https://api.themoviedb.org/3/search/movie?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US&query='+req.body.val.replace(' ','%')+'&page=1&include_adult=false', { json: true }, (err, res, body) => {
    if (err) { return err; }
    movies=body;
  });
  setTimeout(()=>{
    res.render('movieSearch', {movies:movies,val:req.body.val} );
  },500);
});

/* GET search view page with paginate. */
router.get('/movieSearch/:val,:page', function(req, res, next) {
  var movies;
  request('https://api.themoviedb.org/3/search/movie?api_key=43779b994fff2552ad53eaabd3b38390&language=en-US&query='+req.params.val.replace(' ','%')+'&page='+req.params.page+'&include_adult=false', { json: true }, (err, res, body) => {
    if (err) { return err; }
    movies=body;
  });
  setTimeout(()=>{
    res.render('movieSearch', {movies:movies,val:req.params.val} );
  },500);
});

module.exports = router;
