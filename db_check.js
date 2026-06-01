import mongoose from 'mongoose';

async function check() {
    await mongoose.connect('mongodb://localhost:27017/jobportal01');
    const user = await mongoose.connection.db.collection('users').findOne();
    console.log('\n====================================');
    console.log('✅ FOUND A REAL MONGODB USER ID TO USE:');
    if (user) {
        console.log(user._id.toString());
    } else {
        console.log('NO USERS FOUND IN DATABASE!');
    }
    console.log('====================================\n');
    process.exit(0);
}

check();
