import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const f_onchange = (e) => {
    setUsername(e.target.value);
  };

  const f_passchange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/landing_page/rupee.png" />
        <title>PennyWise-Login</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/login/login.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Jost&family=Lato&family=Montserrat:wght@300;400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="container d-flex justify-content-center">
          <img className="login-image" src="/login/login.png" alt="login" style={{ marginTop: '100px' }} />
          <div className="login-container">
            <img className="PennyWise_logo" src="/landing_page/PennyWise_logo.png" />
            <h2>Login to Continue</h2>
            
            <form action="/login" method="post">
              <div className="form-group">
                <label htmlFor="email-or-phone">Username</label>
                <input onChange={f_onchange} value={username} type="text" className="form-control" id="email-or-phone" name="username" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={f_passchange} value={password} type="password" className="form-control" id="password" name="password" required />
                <a href="" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="btn btn-block btn-login">
                Login
              </button>
              <a href="/register" className="btn btn-block btn-create">
                Create Account
              </a>
            </form>
          </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js"></script>
      </body>
    </html>
  )
}

export default Login
