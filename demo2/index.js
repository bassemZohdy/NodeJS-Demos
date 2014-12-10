var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo-2');

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
})

var User = mongoose.model('User', userSchema);

//create new user and find it
// var user = new User({firstName:'bassem',lastName:'zohdy',enabled:true});
// user.save(function(err){
//   if (err) return handleError(err);
//   User.findById(user, function (err, user) {
//     if (err) return handleError(err);
//     console.log(user);
//   })
// });

//find list of users
// var oneYearAgo = new Date();
// oneYearAgo.setFullYear(2013);
// User.find().where('joinDate').gt(oneYearAgo).exec(function(err,users){
//   if (err) return handleError(err);
//   console.log(users);
// });

//remove user
var id='5486cfd5541ae18f276afdd8';
User.findByIdAndRemove(id,function(err,user){
  if (err) return handleError(err);
  if(user)
    console.log('user '+user+' has been deleted.');
  else
    console.log('user with id '+id+' not found.');
});
