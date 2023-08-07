import { db } from '../../config'; // Використовуйте свій шлях до налаштування Firebase

export const testDatabaseConnection = async () => {
  try {
    // Додаємо тестовий документ у колекцію "users"
    await db.collection('users').add({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
      avatar: 'testprofilepictureUrl',
      createdAt: new Date().toISOString(),
    });

    console.log('Successfully added a test document to the "users" collection.');
  } catch (error) {
    console.error('Error adding a test:', error);
  }
};

// Викликаємо функцію для перевірки підключення