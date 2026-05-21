const https = require('https');

const data = JSON.stringify({
  output_type: 'chat',
  input_type: 'chat',
  input_value: 'test',
  session_id: 'test-session'
});

const options = {
  hostname: 'langflow.servicesessentials.ibm.com',
  port: 443,
  path: '/api/v1/run/ce0bea51-8829-4115-990b-6cbd8bb51ca3',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'sk-F1sRs8TrNwAkWGR-DUHBs4xdFEpeRSkCO7ntvvroHhU',
    'Content-Length': data.length
  }
};

console.log('Testing Langflow API endpoint...');
console.log('URL:', `https://${options.hostname}${options.path}`);

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Body:', body);
    if (res.statusCode === 200) {
      console.log('\n✅ API endpoint is working!');
    } else {
      console.log('\n❌ API endpoint returned error');
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();

// Made with Bob
