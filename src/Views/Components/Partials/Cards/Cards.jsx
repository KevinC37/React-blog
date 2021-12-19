import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { makeStyles, CssBaseline } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import CardMenu from './CardMenu';
import stringToColor from '../../../../utils/stringToColor.js';

const useStyles = makeStyles({
  card: {
    width: '350px',
    height: '150px',
    margin: '10px',
    position: 'relative',
  },
  image: {
    maxWidth: '350px',
    maxHeight: '350px',
    height: '350px',
  },
  description: {
    alignSelf: 'end',
  },
});

function CardTemplate(props) {
  const styles = useStyles({});
  const [menuState, setMenuState] = useState(false);
  const [companyName, setCompanyName] = useState('');
  useEffect(() => {
    if (typeof props.user.company !== 'undefined') {
      return setCompanyName(props.user.company.name);
    } else {
      return setCompanyName('Terranet');
    }
  }, [props.user]);

  // console.log(props);

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

  const busMenuState = () => {
    setMenuState(!menuState);
  };

  return (
    <CssBaseline>
      <Card id={`blogpost_id_${props.id}`} className={styles.card}>
        <CardHeader
          avatar={
            <Avatar
              {...stringAvatar(props.user.name)}
              style={{
                backgroundColor: `${stringToColor(String(props.user.name))}`,
              }}
            />
          }
          title={props.user.name}
          subheader={companyName}
          action={
            <IconButton id="toggle___menu___button" onClick={busMenuState}>
              <MoreVert />
              <CardMenu
                key={props.id}
                {...props}
                menuState={menuState}
                busMenuState={busMenuState}
                hidden="true"
              />
            </IconButton>
          }
        />

        <Link to={`/posts/${props.id}`}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                color="textPrimary"
              >
                {_.capitalize(props.title)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </CssBaseline>
  );
}

export default CardTemplate;
