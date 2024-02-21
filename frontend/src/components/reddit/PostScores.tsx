import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { PostScoresProps } from '../../interfaces/props/PostScoresProps.interface';

const PostScores: React.FC<PostScoresProps> = ({ upvotes, downvotes }) => {
    return (
      <div>
        <div className='d-flex'>
          <FontAwesomeIcon icon={faThumbsUp} className='px-1 color-liteblue'/> {upvotes} &nbsp;
          <FontAwesomeIcon icon={faThumbsDown} className='px-1 color-liteblue'/> {downvotes} &nbsp;
        </div>
      </div>
    );
  };

export default PostScores;
