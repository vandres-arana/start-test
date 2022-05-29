// Dependencies
const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

// Change with the path of the json file of the project that contains credentials
const serviceAccount = require('./ucb-start-test-firebase-adminsdk-o9nau-6390c68f5b.json');

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

// Change with the name of the bucket 
const storageRef = admin.storage().bucket(`gs://ucb-start-test.appspot.com`);

// Function to upload files to firebase. Receives the path of the file and the the name for saving it.
async function uploadFile(path, filename) {
    // Upload the File
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `/uploads/hashnode/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });
    return storage[0].metadata.mediaLink;
}

// Test load local image
(async() => {
    const url = await uploadFile('./luca.jpeg', "my-image2.jpeg");
    console.log(url);
})();
