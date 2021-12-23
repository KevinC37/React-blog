import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* Material UI Imports */
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MoreVert from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

/* Util imports */
import capitalize from '../../../../utils/textFormatters/capitalize.js';

/* Local imports */
import CardMenu from './CardMenu.jsx';
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
  const { user, id, title } = props;
  const [menuState, setMenuState] = useState(false);
  const [companyName, setCompanyName] = useState('');
  useEffect(() => {
    if (typeof user.company !== 'undefined') {
      return setCompanyName(user.company.name);
    } else {
      return setCompanyName('Terranet');
    }
  }, [user]);

  const avatarBgColor = useCallback((name) => {
    try {
      let initials = name.match(/[A-Z]/g) ?? 'AU';

      if (initials.length === 1) {
        initials += initials;
      }

      return {
        children: `${initials[0]}${initials[1]}`,
      };
    } catch (e) {
      return console.error(e);
    }
  }, []);

  const busMenuState = useCallback(() => {
    setMenuState(!menuState);
  }, [menuState]);

  return (
    <CssBaseline>
      <Card id={`blogpost_id_${id}`} className={styles.card}>
        <CardHeader
          avatar={
            <Avatar
              {...avatarBgColor(user.name)}
              style={{
                backgroundColor: `${stringToColor(String(user.name))}`,
              }}
            />
          }
          title={user.name}
          subheader={companyName}
          action={
            <IconButton id="toggle___menu___button" onClick={busMenuState}>
              <MoreVert />
              <CardMenu
                key={id}
                {...props}
                menuState={menuState}
                busMenuState={busMenuState}
                hidden="true"
              />
            </IconButton>
          }
        />

        <Link to={`/posts/${id}`}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                color="textPrimary"
              >
                {capitalize(title)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </CssBaseline>
  );
}

export default CardTemplate;
