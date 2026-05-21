const axios = require('axios');

async function testAPI() {
  try {
    const response = await axios.post(
      'http://localhost:3000/langflow/api/v1/run/ce0bea51-8829-4115-990b-6cbd8bb51ca3',
      {
        input_value: 'Get product data',
        output_type: 'chat',
        input_type: 'chat',
        tweaks: {}
      },
      {
        headers: {
          'x-api-key': 'sk-F1sRs8TrNwAkWGR-DUHBs4xdFEpeRSkCO7ntvvroHhU'
        }
      }
    );
    
    console.log('=== LANGFLOW API RESPONSE ===');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAPI();

// Made with Bob
