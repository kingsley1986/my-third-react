import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "auto",
    height: "auto",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Gallery() {
  const classes = useStyles();
  const [selectedTile, setSelectedTile] = React.useState(null);
  const [value, setValue] = React.useState([]);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    axios
      .get("https://salty-thicket-72247.herokuapp.com/galleries")
      .then((response) => {
        setGalleryData([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleClickOpen = (tile) => {
    setSelectedTile(tile);
    console.log("clicked");
    console.log(tile);
  };

  const handleClose = () => {
    setSelectedTile(null);
  };
  return (
    <div className={classes.root}>
      <GridList cols={4}>
        className={classes.gridList}
        {/* <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
        {galleryData.map((tile) => (
          <GridListTile key={tile.id}>
            <img src={tile.galleryImage} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                  value={tile.id}
                  onClick={() => handleClickOpen(tile)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <Dialog
        fullScreen
        open={selectedTile !== null}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        {selectedTile && (
          <div style={{ textAlign: "center" }}>{selectedTile.title}</div>
        )}

        {selectedTile && (
          <img
            style={{
              display: "block",
              maxWidth: "930px",
              maxHeight: "2000px",
              width: "auto",
              height: "auto",
            }}
            src={selectedTile.galleryImage}
          />
        )}
      </Dialog>
    </div>
  );
}

// import axios from "axios";
// import React, { useState, useEffect, useCallback } from "react";
// import Galleries from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";

// export default function Gallery() {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [viewerIsOpen, setViewerIsOpen] = useState(false);
//   const [photos, setGalleryData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:9000/galleries")
//       .then((response) => {
//         setGalleryData([
//           ...response.data.map(function (gallery) {
//             return {
//               src: gallery.galleryImage,
//               width: 4,
//               height: 3,
//               title: gallery.title,
//             };
//           }),
//         ]);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, []);
//   useEffect(() => {
//     // console.log(galleryData);
//   }, [photos, setGalleryData]);

//   const openLightbox = useCallback((event, { photo, index }) => {
//     setCurrentImage(index);
//     setViewerIsOpen(true);
//   }, []);

//   const closeLightbox = () => {
//     setCurrentImage(0);
//     setViewerIsOpen(false);
//   };

//   return (
//     <div>
//       <Galleries photos={photos} onClick={openLightbox} />
//       <ModalGateway>
//         {viewerIsOpen ? (
//           <Modal onClose={closeLightbox}>
//             <Carousel
//               currentIndex={currentImage}
//               views={photos.map((x) => ({
//                 srcset: x.srcSet,
//                 caption: x.title,
//               }))}
//             />
//           </Modal>
//         ) : null}
//       </ModalGateway>
//     </div>
//   );
// }
