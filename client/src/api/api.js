// Admin Login
export const adminLogin = async (username, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Admin login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during admin login:', error);
    throw error;
  }
};

// User Login
export const userLogin = async (username, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('User login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during user login:', error);
    throw error;
  }
};

// User Signup
export const userSignup = async (username, email, name, password, phone) => {
  try {
    const response = await fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, name, password, phone }),
    });

    if (!response.ok) {
      throw new Error('User signup failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during user signup:', error);
    throw error;
  }
};

// Add Book
export const addBook = async (bookData) => {
  try {
    const formData = new FormData();

    Object.keys(bookData).forEach((key) => {
      console.log(`Appending to FormData: ${key} = ${bookData[key]}`);
      formData.append(key, bookData[key]);
    });

    const response = await fetch('http://localhost:3000/api/books/add', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error('Failed to add book. Server response:', errorResponse);
      throw new Error('Failed to add book');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during book addition:', error);
    throw error;
  }
};
