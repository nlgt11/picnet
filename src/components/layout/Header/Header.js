import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { MdCloudUpload } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },

  title: {
    flexGrow: 1,
  },
}));

const Header = ({ user, isAuthenticated, logout }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <span>Pic</span>
            <span style={{ fontWeight: 'bolder' }}>Net</span>
          </Typography>
          {isAuthenticated && user ? (
            <div>
              <Button style={{ color: 'white' }} disabled>
                {user.name}
              </Button>

              <Link to="/upload">
                <MdCloudUpload
                  style={{
                    verticalAlign: 'middle',
                    color: 'white',
                    margin: '0 5px',
                  }}
                  size={18}
                />
              </Link>
              <Link to="/friends">
                <FaUserFriends
                  style={{
                    verticalAlign: 'middle',
                    color: 'white',
                    margin: '0 5px',
                  }}
                  size={18}
                />
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  logout();
                }}
              >
                <ExitToAppIcon />
              </Button>
            </div>
          ) : (
            <Button color="inherit" href="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
