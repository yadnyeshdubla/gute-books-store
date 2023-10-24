import React from "react";
import "./topic-card.css";
import Next from "./../../assets/Next.svg";

const TopicCard = ({ topic }) => {
  const { title, icon } = topic;
  return (
    <a className="topic-link" href={`/books?topic=${title}`}>
      <div className="topic-card">
        <img src={icon} alt={title} />
        <div className="title">{title.toUpperCase()}</div>
        <img src={Next} alt={title} />
      </div>
    </a>
  );
};

export default TopicCard;
