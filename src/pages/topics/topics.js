import React from "react";
import TopicCard from "../../components/topic-card/topic-card";
import { TOPICS } from "../../constants/topics";
import "./topics.css";
import Header from "../../components/header/header";
import Pattern from "./../../assets/Pattern.svg";

const Topics = () => {
  return (
    <div className="topics-page">
      <Header bg={Pattern}>
        <div className="headings">
          <div className="heading1">Gutenberg Project</div>
          <div className="heading2">
            A social cataloging website that allows you to freely search its
            database of books, annotations, and reviews.
          </div>
        </div>
      </Header>
      <div className="topics-list">
        {TOPICS.map((topic, index) => (
          <TopicCard key={topic.title} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default Topics;
