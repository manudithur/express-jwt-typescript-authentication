import db from '../db/config';

const userSchema = new db.Schema({
    userId: String,
    role: String,

    email: String,
    password: String,

    name: {
        first: String,
        last: String
    },
    
    phoneNumber: String,

    address: {
        country: String,
        city: String,
        street: String,
        zip: String
    }
});

const User = db.model('User', userSchema);

export default User;