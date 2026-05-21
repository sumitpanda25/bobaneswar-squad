const sampleResponse = {
  "session_id": "ce0bea51-8829-4115-990b-6cbd8bb51ca3",
  "outputs": [
    {
      "outputs": [
        {
          "results": {
            "message": {
              "text": "Here is the product data extracted from the dataset:\n\n### GlowLab Products\n| Product Name                  | Category    | MRP (₹) | COGS (₹) | Pack Size | Price per Unit (₹) | Key Claims                                   | Vegan | Cruelty-Free | Harmful Ingredient | Reformulated | Launch Year |\n|-------------------------------|-------------|---------|----------|-----------|---------------------|----------------------------------------------|-------|--------------|--------------------|--------------|-------------|\n| Hydra Boost Serum (Original) | Serum       | 799.0   | 210.0    | 30ml      | 26.63               | Hydrating; Plumping; Oil-Free               | Yes   | Yes          | No                 | No           | 2023        |\n| Vitamin C Brightening Serum  | Serum       | 999.0   | 260.0    | 25ml      | 39.96               | Brightening; Anti-oxidant; Even Tone        | Yes   | Yes          | No                 | No           | 2022        |\n\n### Competitor Products\n| Product Name                  | Brand       | Category    | MRP (₹) | COGS (₹) | Pack Size | Price per Unit (₹) | Key Claims                                   | Vegan | Cruelty-Free | Harmful Ingredient | Launch Year |\n|-------------------------------|-------------|-------------|---------|----------|-----------|---------------------|----------------------------------------------|-------|--------------|--------------------|-------------|\n| Advanced Serum HA+           | Lakme       | Serum       | 850.0   | 240.0    | 30ml      | 28.33               | Hydrating; Plumping                         | No    | No           | Yes                | 2022        |"
            }
          }
        }
      ]
    }
  ]
};

function parseMarkdownTables(text) {
  try {
    console.log('=== PARSING TEXT ===');
    console.log(text.substring(0, 200) + '...\n');
    
    // Extract GlowLab Products table
    const glowLabMatch = text.match(/### GlowLab Products\s*\n\s*\|([\s\S]*?)(?=\n\n###|$)/);
    const competitorMatch = text.match(/### Competitor Products\s*\n\s*\|([\s\S]*?)(?=\n\n|$)/);
    
    console.log('GlowLab match found:', !!glowLabMatch);
    console.log('Competitor match found:', !!competitorMatch);
    
    const products = [];
    const competitors = [];
    
    if (glowLabMatch) {
      const tableText = glowLabMatch[1];
      console.log('\n=== GLOW LAB TABLE TEXT ===');
      console.log(tableText.substring(0, 300));
      
      const rows = tableText.split('\n').filter(row => row.trim() && !row.includes('---'));
      console.log('\nTotal rows:', rows.length);
      
      // Skip header row
      for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].split('|').map(cell => cell.trim()).filter(cell => cell);
        console.log(`\nRow ${i} cells:`, cells.length, cells);
        
        if (cells.length >= 11) {
          const product = {
            id: `PROD${i}`,
            name: cells[0],
            category: cells[1],
            mrp: parseFloat(cells[2]) || 0,
            revenue: parseFloat(cells[2]) * 1000,
            rating: 4.5,
            price: parseFloat(cells[2]),
          };
          console.log('Created product:', product);
          products.push(product);
        }
      }
    }
    
    console.log('\n=== FINAL RESULT ===');
    console.log('Products:', products.length);
    console.log('Competitors:', competitors.length);
    
    return {
      products,
      competitors,
      summary: {
        total_products: products.length,
        total_competitors: competitors.length,
      }
    };
  } catch (error) {
    console.error('Failed to parse:', error);
    throw error;
  }
}

// Test the parser
const text = sampleResponse.outputs[0].outputs[0].results.message.text;
const result = parseMarkdownTables(text);
console.log('\n=== PARSED DATA ===');
console.log(JSON.stringify(result, null, 2));

// Made with Bob
