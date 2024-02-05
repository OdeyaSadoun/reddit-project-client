import React, { useState } from "react";
import { Subreddit } from "../interfaces/Subreddit.interface";
import { Card, Button } from "react-bootstrap";

interface RedditItemProps {
  item: Subreddit;
}

const RedditItem: React.FC<RedditItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title className="fw-bold">{item.title}</Card.Title>
        {isExpanded ? (
          <Card.Text>{item.selftext}</Card.Text>
        ) : (
          <Card.Text>
            {item.selftext.length > 150 ? `${item.selftext.slice(0, 150)}...` : item.selftext}
          </Card.Text>
        )}
        {item.selftext.length > 150 && (
          <Button variant="primary" size="sm" onClick={toggleExpansion}>
            {isExpanded ? "close" : "read more"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default RedditItem;
