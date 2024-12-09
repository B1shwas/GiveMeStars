import React from "react";

const Login = () => {
  return (
    <div className="h-full w-full">
      <img src="/images/login-page.png" alt="" className="w-full h-full" />
      <form action="">
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
      </form>
    </div>
  );
};

export default Login;
