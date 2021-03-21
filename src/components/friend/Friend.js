import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import React, { useEffect, useState } from 'react';
import FriendCard from './FriendCard/FriendCard';

import Typography from '@material-ui/core/Typography';
import './Friend.scss';

const Friend = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get('/users/friend/infer');
        setFriends(uniqBy(res.data, 'id'));
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
  }, []);

  return (
    <div className="Friend">
      <div className="header">
        <Typography component="h1" variant="h5">
          Friends with same interest 👯‍♂️
        </Typography>
      </div>
      <div className="cards">
        {!isEmpty(friends)
          ? friends.map((f) => <FriendCard avt={f.avatar_url} name={f.name} />)
          : 'loading'}
      </div>
    </div>
  );
};

export default Friend;
