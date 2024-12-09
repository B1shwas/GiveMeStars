import React from "react";

const SignUp = () => {
  return (
    <div className="w-full h-full">
      <img src="/images/signup-page.png" alt="" />
      <form action="">
        <div>
          <input type="text" placeholder="Your name" />
          <input type="text" placeholder="email" />
        </div>
        <div>
          <input type="password" placeholder="password" />
          <input type="password" placeholder="confirm password" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
