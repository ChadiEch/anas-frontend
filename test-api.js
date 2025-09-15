// Simple API test script - run with: node test-api.js
// This tests the login credentials without needing the full frontend

const API_BASE = 'http://localhost:5000/api';

async function testLogin() {
  console.log('🔧 Testing Admin Login API...\n');
  
  try {
    // Test login with correct credentials
    console.log('📧 Testing login with admin@cadcraft.com / admin123');
    
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@cadcraft.com',
        password: 'admin123'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('📄 Response:', {
        message: data.message,
        user: data.user,
        tokenLength: data.token ? data.token.length : 0
      });
      
      // Test token verification
      console.log('\n🔍 Testing token verification...');
      const verifyResponse = await fetch(`${API_BASE}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
      
      const verifyData = await verifyResponse.json();
      
      if (verifyResponse.ok) {
        console.log('✅ Token verification successful!');
        console.log('👤 User data:', verifyData.user);
      } else {
        console.log('❌ Token verification failed:', verifyData.error);
      }
      
    } else {
      console.log('❌ Login failed:', data.error);
    }
    
  } catch (error) {
    console.log('🚨 API connection error:', error.message);
    console.log('\n🔧 Make sure:');
    console.log('1. Backend server is running: cd backend && npm run dev');
    console.log('2. PostgreSQL database is running');
    console.log('3. Database is initialized: cd backend && npm run init-db');
  }
}

async function testInvalidLogin() {
  console.log('\n🔒 Testing invalid credentials...');
  
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'wrong@email.com',
        password: 'wrongpassword'
      })
    });

    const data = await response.json();
    
    if (response.status === 401) {
      console.log('✅ Invalid credentials correctly rejected');
      console.log('📄 Error message:', data.error);
    } else {
      console.log('❌ Unexpected response for invalid credentials');
    }
    
  } catch (error) {
    console.log('🚨 Error testing invalid credentials:', error.message);
  }
}

async function testHealthCheck() {
  console.log('\n❤️ Testing API health...');
  
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API is healthy!');
      console.log('📄 Health data:', data);
    } else {
      console.log('❌ API health check failed');
    }
    
  } catch (error) {
    console.log('🚨 Health check failed:', error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('🧪 CAD Craft Hub - API Login Test\n');
  console.log('=====================================\n');
  
  await testHealthCheck();
  await testLogin();
  await testInvalidLogin();
  
  console.log('\n=====================================');
  console.log('🎯 Test Summary:');
  console.log('- Health check verifies API is running');
  console.log('- Login test verifies admin credentials work');
  console.log('- Invalid test verifies security is working');
  console.log('\n🌐 Next: Test in browser at http://localhost:8080/login');
}

runTests();