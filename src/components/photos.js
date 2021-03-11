// import axios from "axios";
// import React, { useState, useEffect } from "react";

// function Photos() {
//   const [galleryData, setGalleryData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:9000/galleries")
//       .then((response) => {
//         setGalleryData([...response.data]);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, []);

//   const photos = [];
//   galleryData.map(function (gallery) {
//     module.exports = {
//       photos: [
//         {
//           src: gallery.galleryImage,
//           title: gallery.title,
//           width: 4,
//           height: 3,
//         },
//       ],
//     };
//     return photos;
//   });
// }
// export default photos;
