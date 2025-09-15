// Test script for homepage API endpoints
import api from './src/lib/api.js';

async function testHomepageAPI() {
  try {
    console.log('Testing homepage API endpoints...');
    
    // Test get homepage settings
    console.log('1. Testing GET /api/homepage');
    const homepageSettings = await api.homepage.get();
    console.log('Homepage settings:', homepageSettings);
    
    // Test update homepage settings
    console.log('2. Testing PUT /api/homepage');
    const updatedSettings = await api.homepage.update({
      banner_title: 'Updated Title',
      banner_subtitle: 'Updated Subtitle',
      banner_description: 'Updated Description'
    });
    console.log('Updated settings:', updatedSettings);
    
    console.log('Homepage API tests completed successfully!');
  } catch (error) {
    console.error('Error testing homepage API:', error);
  }
}

// Run the test
testHomepageAPI();