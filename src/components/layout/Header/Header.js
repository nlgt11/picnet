// import React from 'react';
// import { Link } from 'react-router-dom';

// import './header.scss';
// import Navbar from 'components/layout/Navbar/Navbar';

// const Header = () => {
//   return (
//     <header className="Header">
//       <Link to="/">
//         <div className="brandname">
//           <span style={{ color: 'black' }}>Pic Net</span>
//         </div>
//       </Link>
//       <Navbar />
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ user, isAuthenticated }) => {
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
            user.name
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
export default connect(mapStateToProps)(Header);
