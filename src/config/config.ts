export default{
    jwtSecret: process.env.JSW_SECRET || 'secrettoken',
    DB:{
        URI: process.env.MONGODB_URI || 'mongodb://localhost/jwtapi',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}