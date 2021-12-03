import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { makeStyles, CssBaseline } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert'

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const useStyles = makeStyles({
  card: {
    width: "350px",
    height: "150px",
    margin: "10px",

  },
  image: {
    maxWidth: '350px',
    maxHeight: "350px",
    height: "350px"
  },
  description: {
    alignSelf: "end"
  },
  avatar: {
    backgroundColor: `${stringToColor('Cujba Mihai')}`
  }
})



function CardTemplate(props) {
  const styles = useStyles();
  const [users, setUsers] = useState([]);
  const postAuthor = {
    name: '',
    company: '',
    backgroundColor: ""
  }


  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/');
        const users = await response.json();
        setUsers(users);
      } catch (e) {
        console.log(e);
        return
      }
    };
    loadUsers();
  }, [])

  function getPostAuthor() {
    users.forEach(e => e.id === props.userId ? postAuthor.name = e.name : "");
    users.forEach(e => e.id === props.userId ? postAuthor.company = e.company.name : "");
  }

  getPostAuthor();



  function stringAvatar(name) {
    try {
      const initials = name.match(/[A-Z]/g);
      return {
        children: `${initials[0]}${initials[1]}`,
      };
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <CssBaseline>
      <Card className={styles.card}>

        <CardHeader
          avatar={
            <Avatar {...stringAvatar(postAuthor.name)} style={{ backgroundColor: `${stringToColor(postAuthor.name)}` }} />
          }
          title={postAuthor.name}
          subheader={postAuthor.company}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
        />
        <CardActionArea>
          <CardContent>

            <Typography gutterBottom variant="subtitle1" component="div" color="textPrimary">
              Here {props.title}
            </Typography>

          </CardContent>
        </CardActionArea>
      </Card>
    </CssBaseline>
  );
}

export default CardTemplate;

