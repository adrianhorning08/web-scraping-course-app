export async function createUser(email, name, id) {
  try {
    const response = await fetch('https://long-running-server.onrender.com/api/create-supa-usa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        id,
        service: 'web_scraping_course'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create user in database');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}