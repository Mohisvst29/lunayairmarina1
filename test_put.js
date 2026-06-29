
const http = require('http');

const data = JSON.stringify({
    relatedServices: ["692b4b4932caa55e46a818b1"]
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/admin/services/692b4b5732caa55e46a818ba',
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => {
        responseData += chunk;
    });
    res.on('end', () => {
        console.log('Response Status:', res.statusCode);
        console.log('Response Body:', responseData);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
