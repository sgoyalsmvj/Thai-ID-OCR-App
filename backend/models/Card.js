const mongoose = require('mongoose')
const cardSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  dateOfBirth: String,
  identificationNumber: String,
  dateOfIssue: String,
  dateOfExpiry: String,
},{timestamps:true});
const Card = mongoose.model("Card", cardSchema);
module.exports = Card;