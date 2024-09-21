require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const PORT = process.env.PORT || 4000;
const PUBLIC_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1]; 

  jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err); // Log error for debugging
      return res.status(401).json({ error: 'Token is invalid or expired', details: err.message });
    }

    req.user = decoded;

    next(); 
  });
}

// Sample route to check if the token works
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
