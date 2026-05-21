/**
 * Test Dashboard Data Transformation
 * Verify that Langflow API data is correctly transformed for dashboard
 */

const https = require('https');

const LANGFLOW_URL = 'https://langflow.servicesessentials.ibm.com';
const FLOW_ID = 'ce0bea51-8829-4115-990b-6cbd8bb51ca3';
const API_KEY = 'sk-F1sRs8TrNwAkWGR-DUHBs4xdFEpeRSkCO7ntvvroHhU';

async function testDashboardData() {
  console.log('Testing Dashboard Data Transformation...\n');

  const payload = JSON.stringify({
    input_value: 'Show me all GlowLab products and competitor products',
    output_type: 'chat',
    input_type: 'chat',
    tweaks: {
      "ChatInput-Hn0Wd": {},
      "Prompt-zqoLo": {},
      "ChatOutput-Aq5Ub": {},
      "AstraDB-Ry0Ub": {},
      "ParseData-Ry0Ub": {},
      "OpenAIModel-Ry0Ub": {}
    }
  });

  const options = {
    hostname: 'langflow.servicesessentials.ibm.com',
    path: `/api/v1/run/${FLOW_ID}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('✅ API Response Status:', res.statusCode);
          
          // Extract message text
          const messageText = response.outputs?.[0]?.outputs?.[0]?.results?.message?.text || '';
          console.log('\n📄 Message Text Length:', messageText.length);
          console.log('\n📄 First 500 chars:', messageText.substring(0, 500));
          
          // Parse markdown tables
          const glowLabMatch = messageText.match(/### GlowLab Products\s*\n\s*\|([\s\S]*?)(?=\n\n###|$)/);
          const competitorMatch = messageText.match(/### Competitor Products\s*\n\s*\|([\s\S]*?)(?=\n\n|$)/);
          
          console.log('\n🔍 GlowLab Products Table Found:', !!glowLabMatch);
          console.log('🔍 Competitor Products Table Found:', !!competitorMatch);
          
          if (glowLabMatch) {
            const tableText = glowLabMatch[1];
            const rows = tableText.split('\n').filter(row => row.trim() && !row.includes('---'));
            console.log('\n📊 GlowLab Products Rows:', rows.length - 1); // -1 for header
            
            if (rows.length > 1) {
              const headerCells = rows[0].split('|').map(cell => cell.trim()).filter(cell => cell);
              console.log('📋 Headers:', headerCells);
              
              const firstRow = rows[1].split('|').map(cell => cell.trim()).filter(cell => cell);
              console.log('📋 First Product Cells:', firstRow.length);
              console.log('📋 First Product:', firstRow);
            }
          }
          
          if (competitorMatch) {
            const tableText = competitorMatch[1];
            const rows = tableText.split('\n').filter(row => row.trim() && !row.includes('---'));
            console.log('\n📊 Competitor Products Rows:', rows.length - 1);
            
            if (rows.length > 1) {
              const headerCells = rows[0].split('|').map(cell => cell.trim()).filter(cell => cell);
              console.log('📋 Headers:', headerCells);
              
              const firstRow = rows[1].split('|').map(cell => cell.trim()).filter(cell => cell);
              console.log('📋 First Competitor Cells:', firstRow.length);
              console.log('📋 First Competitor:', firstRow);
            }
          }
          
          resolve();
        } catch (error) {
          console.error('❌ Failed to parse response:', error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

testDashboardData().catch(console.error);

// Made with Bob
