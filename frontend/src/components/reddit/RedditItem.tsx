import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

import PostScores from "./PostScores";
import { RedditItemProps } from "../../interfaces/props/RedditItemProps.interface";

const RedditItem: React.FC<RedditItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="my-3">
      <Card.Body className="d-flex justify-content-between">
        <div>
          <Card.Title className="fw-bold">{item.title}</Card.Title>
          {isExpanded ? (
            <Card.Text>{item.selftext}</Card.Text>
          ) : (
            <Card.Text>
              {item.selftext.length > 150
                ? `${item.selftext.slice(0, 150)}...`
                : item.selftext}
            </Card.Text>
          )}
          <div>

          <div>
          {item.selftext.length > 150 && (
            <div className="d-flex justify-content-between">
              <Button variant="primary" size="sm" onClick={toggleExpansion}>
                {isExpanded ? "close" : "read more"}
              </Button>
            </div>
          )}
          </div>
          <div className="pt-2">

          <PostScores
                upvotes={item.ups}
                downvotes={item.downs}
              />
          </div>
          </div>
        </div>
        <div>
          {item.sentiment && (
            <Badge
              className={`my-2 ${
                item.sentiment === "positive"
                  ? "bg-success"
                  : item.sentiment === "negative"
                  ? "bg-danger"
                  : "bg-warning"
              }`}
            >
              {item.sentiment}
            </Badge>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default RedditItem;
