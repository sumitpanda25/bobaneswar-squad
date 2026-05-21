const http = require('http');

const data = JSON.stringify({
  output_type: 'chat',
  input_type: 'chat',
  input_value: 'Show me GlowLab product data',
  session_id: 'test-proxy-session'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/v1/run/ce0bea51-8829-4115-990b-6cbd8bb51ca3',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🧪 UNIT TEST: Testing Proxy Server');
console.log('URL:', `http://${options.hostname}:${options.port}${options.path}`);
console.log('Payload:', data);
console.log('\n---\n');

const req = http.request(options, (res) => {
  console.log(`✓ Status Code: ${res.statusCode}`);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonResponse = JSON.parse(body);
      console.log('✓ Response is valid JSON');
      
      if (res.statusCode === 200) {
        console.log('\n✅ TEST PASSED: Proxy is working correctly!');
        console.log('\nResponse structure:');
        console.log('- session_id:', jsonResponse.session_id);
        console.log('- outputs:', jsonResponse.outputs ? 'Present' : 'Missing');
        
        if (jsonResponse.outputs && jsonResponse.outputs[0]) {
          const message = jsonResponse.outputs[0].outputs[0]?.results?.message?.text;
          if (message) {
            console.log('- message text:', message.substring(0, 100) + '...');
          }
        }
      } else {
        console.log('\n❌ TEST FAILED: Unexpected status code');
        console.log('Response:', body.substring(0, 200));
      }
    } catch (e) {
      console.log('❌ TEST FAILED: Invalid JSON response');
      console.log('Error:', e.message);
      console.log('Response:', body.substring(0, 200));
    }
  });
});

req.on('error', (error) => {
  console.log('❌ TEST FAILED: Connection error');
  console.error('Error:', error.message);
});

req.write(data);
req.end();

// Made with Bob
