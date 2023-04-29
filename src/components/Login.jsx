import React from 'react';
import GoogleLogin from 'react-google-login';
import Header from './Header.jsx';

const Login = () => {
  const onSuccess = (response) => {
    const profile = response.getBasicProfile();
    localStorage.setItem(
      'User',
      JSON.stringify({
        iD: profile.getId(),
        name: profile.getName(),
        imageURL: profile.getImageUrl(),
        email: profile.getEmail()
      })
    );
    // const pro = JSON.parse(localStorage.getItem('User'));
    window.location.replace('#/news');
  };

  return (
    <div className="page">
      <Header />
      <div id="fullscreen_bg" className="fullscreen_bg">
        <div className="container">
          <div className="form-signin">
            <h1 className="title">PasaaNEWS</h1>
            <p>The recommended App for News across the globe </p>
            <span className="google-login">
              <GoogleLogin
                tag="span"
                clientId=""
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onSuccess}
              >
                <span className="fa fa-google-plus" /> Login with Google
              </GoogleLogin>
            </span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
