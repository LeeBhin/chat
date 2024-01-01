import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">dlqls Chat</span>
      <div className="user">
        <img src="https://us-tuna-sounds-images.voicemod.net/f7afe41a-a81c-47af-9a1b-52e9b4422c14-1699941235855.png" alt="" />
        <span>Josh</span>
        <button>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
