import React from 'react';

import './friendCard.scss';

const FriendCard = ({ avt, name }) => {
  return (
    <div className="FriendCard">
      <img
        src={
          avt ||
          'https://www.gamasutra.com/db_area/images/news/2018/Jun/320213/supermario64thumb1.jpg'
        }
        alt="avt"
      ></img>
      <div>{name}</div>
    </div>
  );
};

export default FriendCard;
