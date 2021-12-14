import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';


/* Material UI Imports */
import { Card } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { makeStyles, CssBaseline } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert'

/* Local imports */
import CardMenu from '../Partials/Cards/CardMenu';


function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}

const useStyles = makeStyles({
  card: {
    width: "350px",
    height: "150px",
    margin: "10px",
    position: 'relative',
  },
  image: {
    maxWidth: '350px',
    maxHeight: "350px",
    height: "350px"
  },
  description: {
    alignSelf: "end"
  }
})



function WrappedComponent(props) {
  const styles = useStyles({});
  const [menuState, setMenuState] = useState(false);


  function stringAvatar(name) {
    try {
      const initials = name.match(/[A-Z]/g);
      return {
        children: `${initials[0]}${initials[1]}`,
      };
    } catch (e) {
      return console.error(e);
    }
  }



  const toggleMenu = () => {
    setMenuState(!menuState);
  }


  return (
    <CssBaseline>
      <Card id={`blogpost_id_${props.id}`} className={styles.card}>

        <CardHeader
          avatar={<Avatar {...stringAvatar(props.user.name)} style={{ backgroundColor: `${stringToColor(String(props.user.name))}` }} />}
          title={props.user.name}
          subheader={props.user.company.name}
          action={
            <IconButton id="toggle___menu___button" onClick={toggleMenu}>
              <MoreVert />
            </IconButton>
          }
        />

        {menuState ? <CardMenu key={props.id} {...props} onClick={toggleMenu.bind(this)} /> : <></>}

        <Link to={`/posts/${props.id}`}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="subtitle1" component="div" color="textPrimary">
                {_.capitalize(props.title)}
              </Typography>

            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </CssBaseline>
  );
}
WrappedComponent.prototype.toggleMenu = function () {
  return false;
}


export const CardMain = memo(WrappedComponent);

export default CardMain;

