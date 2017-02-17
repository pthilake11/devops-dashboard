/**
 * Created by Praveen_T on 2/17/2017.
 */

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

mongoose.model("users", userSchema);

