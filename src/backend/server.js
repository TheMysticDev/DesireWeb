// src/backend/server.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'desirehub'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor', error: err });
    }
    if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign({ userId: user.id }, 'tu_secreto_secreto', { expiresIn: '1h' });
      return res.json({ message: 'Login exitoso', token });
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  const queryCheck = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(queryCheck, [username, email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al verificar el usuario', error: err });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: 'El usuario o el email ya están en uso' });
    } else {
      const queryInsert = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(queryInsert, [username, email, password], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error al registrar el usuario', error: err });
        }
        return res.json({ message: 'Usuario registrado con éxito', userId: results.insertId });
      });
    }
  });
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, 'tu_secreto_secreto', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.userId = decoded.userId;
    next();
  });
}

app.get('/messages', verifyToken, (req, res) => {
  const token = req.headers.authorization;
  console.log('Token JWT:', token);
  res.json({ message: 'Acceso permitido a la página de mensajes' });
});


app.post('/update-settings', verifyToken, (req, res) => {
  const { userId } = req;
  const { email, newPassword } = req.body; 
  
  const query = 'UPDATE users SET email = ?, password = ? WHERE id = ?';
  db.query(query, [email, newPassword, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar la configuración', error: err });
    }
    return res.json({ message: 'Configuración actualizada correctamente' });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});



// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   database: 'desirehub'
// });

// db.connect(err => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     return;
//   }
//   console.log('Conectado a la base de datos MySQL');
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
//   db.query(query, [username, password], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error en el servidor', error: err });
//     }
//     if (results.length > 0) {
//       return res.json({ message: 'Login exitoso', user: results[0] });
//     } else {
//       return res.status(401).json({ message: 'Credenciales incorrectas' });
//     }
//   });
// });

// app.post('/register', (req, res) => {
//   const { username, email, password } = req.body;

//   const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//   db.query(query, [username, email, password], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error en el servidor', error: err });
//     }
//     return res.json({ message: 'Registro exitoso', userId: results.insertId });
//   });
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
