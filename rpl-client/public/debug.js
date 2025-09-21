// Jalankan script ini di console browser untuk debug CSRF
const debugCSRF = async () => {
    console.log("🔍 Debug CSRF Token Issue");
    console.log("========================");
    
    // 1. Cek current cookies
    console.log("1. Current cookies:", document.cookie);
    
    // 2. Clear all cookies first
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    console.log("2. Cookies after clear:", document.cookie);
    
    try {
      // 3. Get CSRF cookie
      console.log("3. Getting CSRF cookie...");
      const csrfResponse = await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      console.log("   CSRF Response status:", csrfResponse.status);
      console.log("   CSRF Response headers:", [...csrfResponse.headers.entries()]);
      
      // Check Set-Cookie headers specifically
      const setCookieHeaders = csrfResponse.headers.get('set-cookie');
      console.log("   Set-Cookie headers:", setCookieHeaders);
      
      // Check all response headers
      console.log("   All headers:", Object.fromEntries(csrfResponse.headers.entries()));
      
      // 4. Check cookies after CSRF request
      console.log("4. Cookies after CSRF:", document.cookie);
      
      // 5. Parse XSRF token
      const xsrfCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='));
      
      if (!xsrfCookie) {
        console.error("❌ XSRF-TOKEN cookie not found!");
        return;
      }
      
      const xsrfToken = decodeURIComponent(xsrfCookie.split('=')[1]);
      console.log("5. XSRF Token extracted:", xsrfToken);
      
      // 6. Parse session cookie
      const sessionCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('laravel_session='));
      
      console.log("6. Session cookie:", sessionCookie ? "Present" : "Missing");
      
      // 7. Test login with extracted token
      console.log("7. Testing login...");
      const loginResponse = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrfToken,
        },
        body: JSON.stringify({
          email: 'admin@gmail.com', // Ganti dengan email yang valid
          password: 'admin123'      // Ganti dengan password yang valid
        })
      });
      
      console.log("   Login Response status:", loginResponse.status);
      console.log("   Login Response headers:", [...loginResponse.headers.entries()]);
      
      if (loginResponse.status === 419) {
        console.error("❌ Still getting 419!");
        
        // Check if session ID changed
        const newSessionCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('laravel_session='));
        
        console.log("   Session cookie after login attempt:", newSessionCookie);
        console.log("   Session changed:", sessionCookie !== newSessionCookie);
        
      } else {
        const loginText = await loginResponse.text();
        console.log("   Login Response body:", loginText);
      }
      
    } catch (error) {
      console.error("❌ Debug error:", error);
    }
  };
  
  // Jalankan debug
  debugCSRF();