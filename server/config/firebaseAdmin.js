const admin = require("firebase-admin")
const serviceAccount = require("./voltstream-32617-firebase-adminsdk-hp9w9-f5440d19c6.json")


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://voltstream-32617.appspot.com"
})

module.exports = admin