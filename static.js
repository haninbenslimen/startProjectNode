// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the schema
// const stringSchema = new Schema({
//     originalString: String,
// });

// // Add a static method to reverse a string
// stringSchema.statics.reverseString = function(originalString, callback) {
//     const reversedString = originalString.split('').reverse().join('');
//     // You can perform any other logic or database operations here if needed
//     callback(null, reversedString);
// };

// // Create a model for the collection
// const StringModel = mongoose.model('StringModel', stringSchema, 'stringCollection');

// //use in function 
// // Fetch all documents from the collection
// StringModel.find({}, (err, strings) => {
//     if (err) throw err;

//     // Use the static method for each document in the collection
//     strings.forEach(stringDoc => {
//         StringModel.reverseString(stringDoc.originalString, (err, reversed) => {
//             if (err) throw err;
//             console.log(`Original String: ${stringDoc.originalString}, Reversed String: ${reversed}`);
//         });
//     });
// });