const AWS = require('aws-sdk');
const axios = require('axios');

exports.handler = async (event) => {
    try {
        console.log("I am Inn.")
        const s3Record = event.Records[0].s3;
        const bucket = s3Record.bucket.name;
        const key = s3Record.object.key;
        console.log('s3Record.object: ', s3Record.object)
        console.log('bucket, key: ', bucket, key)
        // Extract the file name
        const fileName = key.split('/').pop(); // Adjust based on your S3 key structure
        console.log('filename: ', fileName)
        // Prepare the data for POST request
        const postData = {
            fileName: fileName,
            // Add more fields as needed
        };
        console.log('postData: ', postData)
        // Make the POST request using Axios
        const response = await axios.post('https://349d-202-47-36-211.ngrok-free.app/images/test', postData);

        console.log('POST Request Response:', response.data);

        return {
            statusCode: 200,
            body: 'POST request sent successfully.',
        };
    } catch (error) {
        console.error("Oops error logs: ", error);
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
};
