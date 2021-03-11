import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export default function Program() {
  const theme = useTheme();
  const [programData, setProgramData] = useState([]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      // width: 1100,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    image: {
      height: "72%",
      width: "530px",
      objectFit: "cover",
      paddingBottom: 3,
    },
  }));
  useEffect(() => {
    axios
      .get("https://cryptic-shelf-72177.herokuapp.com/programs")
      .then((response) => {
        setProgramData([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ padding: "3vw" }}>
      <GridListTile key="Subheader" style={{ height: "auto" }}></GridListTile>
      <GridList
        cellHeight={550}
        cols={matches ? 1 : 3}
        className={classes.gridList}
        spacing={12}
        style={{ background: "#A52A2A		" }}
      >
        {programData.length > 0 &&
          programData.map((tile, index) => {
            return (
              <GridListTile
                key={Math.floor(Math.random() * new Date().getTime())}
                component={Link}
                to={"/programs/" + tile._id + "/programcomments"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  src={tile.programImage}
                  alt={tile.title}
                  class={classes.image}
                />
                <GridListTileBar
                  titlePosition="top"
                  title={tile.title}
                  // style={{ height: 400 }}
                />

                <Typography
                  paragraph
                  style={{
                    borderBottom: "2px solid",
                    background: "white",
                    padding: 7,
                  }}
                >
                  {tile.description.substring(0, 222)}..
                </Typography>
              </GridListTile>
            );
          })}
      </GridList>
    </div>
  );
}
