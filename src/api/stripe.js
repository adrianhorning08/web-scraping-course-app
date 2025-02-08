async function getUserCountry() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error('Error detecting country:', error);
    return null; // Return null if we can't detect the country
  }
}

export async function createCheckoutSession(email, userId) {
  try {
    const countryCode = await getUserCountry();
    
    const response = await fetch('https://long-running-server.onrender.com/api/create-checkout-session-web-scraping-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        userId,
        countryCode
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}