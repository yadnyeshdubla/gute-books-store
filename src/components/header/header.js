import React from "react";
import "./header.css";

const Header = ({ bg, children, className }) => {
  return (
    <div
      className={`header ${className}`}
      style={{
        backgroundColor: bg ? "" : "white",
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="container">{children}</div>
    </div>
  );
};

export default Header;
