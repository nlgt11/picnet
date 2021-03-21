import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const { REACT_APP_BASE_URL } = process.env;

const GirdList = () => {
  const classes = useStyles();
  const [allPictures, setAllPictures] = useState([]);
  const [likedPictures, setLikedPictures] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/pictures');
        setAllPictures(
          response.data.map((tile) => ({
            ...tile,
            url: `${REACT_APP_BASE_URL}/${tile.url}`,
          }))
        );

        const res2 = await axios.get('/pictures/like');
        setLikedPictures(res2.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [likedPictures]);

  const handleLike = async (id) => {
    try {
      const response = await axios.put(`/pictures/like/${id}`);
      setLikedPictures(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} spacing={30} className={classes.gridList}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {allPictures.map((tile) => (
          <GridListTile key={tile.id}>
            <img src={tile.url} alt={tile.url} />
            <GridListTileBar
              title={tile.User.name}
              actionIcon={
                <IconButton
                  onClick={() => handleLike(tile.id)}
                  aria-label={`info about ${tile.id}`}
                  className={classes.icon}
                >
                  {likedPictures.includes(tile.id) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default GirdList;
