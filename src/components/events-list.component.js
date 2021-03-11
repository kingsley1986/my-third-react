import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GridList from "@material-ui/core/GridList";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "react-router-dom";
import moment from "moment";

export default function EventsList() {
  const theme = useTheme();
  const [tileData, setTileData] = useState([]);
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "auto",
    },
    media: {
      // height: 300,
      paddingTop: "56.25%", // 16:9
      // height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardheader: {
      fontSize: "1.6em",
      fontWeight: "bolder",
    },
  }));

  useEffect(() => {
    axios
      .get("http://localhost:9000/events")
      .then((response) => {
        setTileData([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const matchesXs = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  const classes = useStyles();

  const nowIso = new Date();
  const getTitle = (startDateTs, endDateTs) => {
    const now = Date.parse(nowIso);

    if (endDateTs <= now) {
      return "Started:" + " " + moment(startDateTs).format("lll");
    }

    if (startDateTs < now && endDateTs > now) {
      return "Live:" + " " + moment(startDateTs).format("lll");
    }

    return "Starting:" + " " + moment(startDateTs).format("lll");
  };

  const getEnded = (startDateTs, endDateTs) => {
    const now = Date.parse(nowIso);

    if (endDateTs <= now) {
      return "Ended:" + " " + moment(startDateTs).format("lll");
    }

    if (startDateTs < now && endDateTs > now) {
      return "Will End:" + " " + moment(startDateTs).format("lll");
    }

    return "Ends:" + " " + moment(startDateTs).format("lll");
  };

  const getEventTitle = (title) => {
    if (title.length > 25) {
      return title.substring(0, 24) + "..";
    } else {
      return title;
    }
  };

  return (
    <div className={classes.root} style={{ padding: "2.5vw", marginTop: 60 }}>
      <GridList
        cellHeight={420}
        className={classes.gridList}
        spacing={12}
        cols={matchesXs ? 1 : matchesMd ? 2 : 3}
      >
        {tileData.map((event, key) => {
          return (
            <Card
              style={{
                marginBottom: "2rem",
                textDecoration: "none",
                background: "#C9C9C9",
              }}
              component={Link}
              to={"/events/" + event._id + "/eventcomments"}
              key={Math.floor(Math.random() * new Date().getTime())}
            >
              <div style={{ background: "white" }}>
                <h3
                  style={{
                    background: "	#800000",
                    color: "white",
                    textAlign: "center",
                  }}
                  className={classes.cardheader}
                >
                  {getEventTitle(event.title)}
                </h3>

                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      CB
                    </Avatar>
                  }
                  title={getTitle(
                    Date.parse(event.startingDate),
                    Date.parse(event.closingDate)
                  )}
                  subheader={getEnded(
                    Date.parse(event.startingDate),
                    Date.parse(event.closingDate)
                  )}
                  style={{ background: "#DCDCDC" }}
                />
                <CardMedia
                  className={classes.media}
                  image={event.eventImage}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    style={{ color: "black", fontSize: "16px" }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {event.description.substring(0, 100)}....
                  </Typography>
                </CardContent>
              </div>
            </Card>
          );
        })}
        ;
      </GridList>
    </div>
  );
}
