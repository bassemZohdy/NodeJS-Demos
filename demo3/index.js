'use strict';
var mongoose = require('mongoose');
var restify = require('restify');
var autoIncrement = require('mongoose-auto-increment');
var _ = require('lodash');

mongoose.connect('mongodb://localhost/demo-3');
autoIncrement.initialize(mongoose.connection);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('open DB connection');
});

var userSchema = mongoose.Schema({
  firstName: String,
  lastName:   String,
  joinDate: { type: Date, default: Date.now },
  enabled: Boolean
});
//userSchema.plugin(autoIncrement.plugin, 'User');
var User = mongoose.model('User', userSchema);


var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
//list
server.get('/user',function (req, res, next) {
  User.find(function(err, users){
    if (err) res.send(err);
    res.send(users);
  });
  next();
});
//get
server.get('/user/:id',function (req, res, next) {
  User.findById(req.params.id).lean().exec(function(err, user){
    if (err) res.send(err);
    if (!user) res.send(404);
    res.send(user);
  });
  next();
});
//add
server.post('/user',function (req, res, next) {
  var user = new User(req.body);
  user.save(function (err) {
    if (err) res.send(err);
    res.send(201);
  });
  next();
});
//update
server.put('/user/:id',function (req, res, next) {
  User.findById(req.params.id, function (err, e) {
    if (err) res.send(err);
    if (!e) res.send(404);
    var newE = req.body;
    _.keys(newE).forEach(function (k) {
      e[k] = newE[k]
    });
    e.save();
    res.send(204);
  });
  next();
});
//delete
server.del('/user/:id',function (req, res, next) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) res.send(err);
    if (!user) res.send(404);
    res.send(204);
  });
  next();
});

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
