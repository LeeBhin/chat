import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>
      <div className="userChat">
        <img
          src="https://us-tuna-sounds-images.voicemod.net/f7afe41a-a81c-47af-9a1b-52e9b4422c14-1699941235855.png"
          alt=""
        />
        <div className="userChatInfo">
          <span>Doji</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
