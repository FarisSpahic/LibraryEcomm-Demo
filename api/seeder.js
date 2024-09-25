const axios = require('axios');

// Array of book objects
const books = [
  {
    "title": "1984",
    "author": "George Orwell",
    "ISBN": "123e4567-e89b-12d3-a456-426614174001",
    "publisher": "Houghton Mifflin Harcourt",
    "availability": false,
    "totalPages": 328,
    "price": 15.50,
    "imageId": 2
  },
  {
    "title": "Moby Dick",
    "author": "Herman Melville",
    "ISBN": "123e4567-e89b-12d3-a456-426614174002",
    "publisher": "Harper & Brothers",
    "availability": true,
    "totalPages": 635,
    "price": 12.00,
    "imageId": 3
  },
  {
    "title": "War and Peace",
    "author": "Leo Tolstoy",
    "ISBN": "123e4567-e89b-12d3-a456-426614174003",
    "publisher": "Penguin Classics",
    "availability": true,
    "totalPages": 1225,
    "price": 25.99,
    "imageId": 4
  },
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "ISBN": "123e4567-e89b-12d3-a456-426614174004",
    "publisher": "Penguin Books",
    "availability": true,
    "totalPages": 279,
    "price": 7.99,
    "imageId": 5
  },
  {
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "ISBN": "123e4567-e89b-12d3-a456-426614174005",
    "publisher": "Little, Brown and Company",
    "availability": false,
    "totalPages": 214,
    "price": 9.99,
    "imageId": 6
  },
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "ISBN": "123e4567-e89b-12d3-a456-426614174006",
    "publisher": "George Allen & Unwin",
    "availability": true,
    "totalPages": 310,
    "price": 14.99,
    "imageId": 7
  },
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "ISBN": "123e4567-e89b-12d3-a456-426614174007",
    "publisher": "J.B. Lippincott & Co.",
    "availability": true,
    "totalPages": 281,
    "price": 8.99,
    "imageId": 8
  },
  {
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "ISBN": "123e4567-e89b-12d3-a456-426614174008",
    "publisher": "George Allen & Unwin",
    "availability": true,
    "totalPages": 1178,
    "price": 29.99,
    "imageId": 9
  },
  {
    "title": "The Adventures of Huckleberry Finn",
    "author": "Mark Twain",
    "ISBN": "123e4567-e89b-12d3-a456-426614174009",
    "publisher": "Chatto & Windus",
    "availability": true,
    "totalPages": 366,
    "price": 11.50,
    "imageId": 10
  }
];

// Function to post books one by one
const postBooks = async () => {
  for (const book of books) {
    try {
      const response = await axios.post('http://localhost:4000/api/Book', book);
      console.log(`Book posted: ${book.title} - Status: ${response.status}`);
    } catch (error) {
      console.error(`Error posting book: ${book.title}`, error.message);
    }
  }
};

// Execute the function to post books
postBooks();
