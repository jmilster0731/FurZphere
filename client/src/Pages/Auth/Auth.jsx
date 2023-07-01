import React, { useState } from "react";
import CreateUserForm from "../../Components/Users/CreateUserForm";
import UserSignInForm from "../../Components/Users/UserSignInForm";
import '../../CSS/global.css'

const Auth = () => {
  const [signIn, setSignIn] = useState(true);

  const handleSetSignIn = () => {
    setSignIn(!signIn);
  };

  return (
    <div className="center-component-exclusive">
      {signIn ? (
        <UserSignInForm handleSetSignIn={handleSetSignIn} />
      ) : (
        <CreateUserForm handleSetSignIn={handleSetSignIn} />
      )}
    </div>
  );
};

export default Auth;

