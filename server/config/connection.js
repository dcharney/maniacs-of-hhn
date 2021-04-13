const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/maniacs-of-hhn', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false, // fixes warning; set to false since we don't use this and it's depreciated (see https://mongoosejs.com/docs/deprecations.html#findandmodify)
});

module.exports = mongoose.connection;