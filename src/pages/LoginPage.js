// // // src/pages/LoginPage.js



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LoginPage.css';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [credentials, setCredentials] = useState({ username: '', email: '', password: '', confirmPassword: '' });

//   const toggleForm = () => {
//     setIsRegistering(!isRegistering);
//   };

//   const handleInputChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://127.0.0.1:3001/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username: credentials.username, password: credentials.password }),
//       });

//       if (response.ok) {
//         localStorage.setItem('userToken', 'true');
//         navigate('/'); 
//       } else {
//         console.error('Error en el login:', response.status);
//       }
//     } catch (error) {
//       console.error('Error en la solicitud:', error);
//     }
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     if (credentials.password !== credentials.confirmPassword) {
//       console.error('Las contraseñas no coinciden');
//       return;
//     }
//     try {
//       const response = await fetch('http://127.0.0.1:3001/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username: credentials.username, email: credentials.email, password: credentials.password }),
//       });

//       if (response.ok) {
//         toggleForm(); // Cambiar al formulario de inicio de sesión
//       } else {
//         console.error('Error en el registro:', response.status);
//       }
//     } catch (error) {
//       console.error('Error en la solicitud:', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="form-container">
//         {isRegistering ? (
//           <form className="register-form" onSubmit={handleRegisterSubmit}>
//             <h2>Register</h2>
//             <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleInputChange} />
//             <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleInputChange} />
//             <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleInputChange} />
//             <input type="password" name="confirmPassword" placeholder="Confirm Password" value={credentials.confirmPassword} onChange={handleInputChange} />
//             <button type="submit">Register</button>
//             <button type="button" className="toggle-form" onClick={toggleForm}>Already have an account? Login</button>
//           </form>
//         ) : (
//           <form className="login-form" onSubmit={handleLoginSubmit}>
//             <h2>Login</h2>
//             <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleInputChange} />
//             <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleInputChange} />
//             <button type="submit">Login</button>
//             <button type="button" className="toggle-form" onClick={toggleForm}>Need an account? Register</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';


const LoginPage = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: credentials.username, password: credentials.password }),
      });

      if (response.ok) {
        localStorage.setItem('userToken', 'true');
        navigate('/');
        window.location.reload(); 
      } else {
        console.error('Error en el login:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: credentials.username, email: credentials.email, password: credentials.password }),
      });

      if (response.ok) {
        toggleForm(); 
      } else {
        console.error('Error en el registro:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        {isRegistering ? (
          <form className="register-form" onSubmit={handleRegisterSubmit}>
            <h2>Register</h2>
            <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleInputChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={credentials.confirmPassword} onChange={handleInputChange} />
            <button type="submit">Register</button>
            <button type="button" className="toggle-form" onClick={toggleForm}>Already have an account? Login</button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
            <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleInputChange} />
            <button type="submit">Login</button>
            <button type="button" className="toggle-form" onClick={toggleForm}>Need an account? Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
