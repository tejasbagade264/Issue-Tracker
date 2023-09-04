//require library
const mongoose = require('mongoose');

//connect to database
async function main() {
    const db = await mongoose.connect('mongodb+srv://tejasbagade1512:tejas123@devdatabase.u2cpw0f.mongodb.net/Issue-Tracker?retryWrites=true&w=majority')
    module.exports = db;
}

main()
.then(() => console.log('MongoDB Connected...')) //if connected
.catch(err => console.log(err)); //if error