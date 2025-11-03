import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";
import formatDate from "../../lib/formatDate";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const user = models.userModel(userId);
  const photos = models.photoOfUserModel(userId);

  // Load images from src/images using require.context so webpack bundles them.
  let imagesReq = null;
  try {
    imagesReq = require.context("../../images", false, /\.(png|jpe?g|svg)$/);
  } catch (e) {
    imagesReq = null;
  }
  const getImage = (fileName) => {
    if (!imagesReq) return "";
    try {
      return imagesReq(`./${fileName}`);
    } catch (e) {
      return "";
    }
  };

  if (!user) {
    return <Typography variant="body1">User not found.</Typography>;
  }

  return (
    <div>
      <Typography variant="h5">
        Photos of {`${user.first_name} ${user.last_name}`}
      </Typography>
      {photos.length === 0 && <Typography>No photos for this user.</Typography>}
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginTop: 12 }}>
          <CardMedia
            component="img"
            height="400"
            image={getImage(photo.file_name)}
            alt={photo.file_name}
          />
          <CardContent>
            <Typography variant="subtitle2">
              {formatDate(photo.date_time)}
            </Typography>
            <Divider style={{ margin: "8px 0" }} />
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((c) => (
                <div key={c._id} style={{ marginBottom: 8 }}>
                  <Typography variant="caption">
                    {formatDate(c.date_time)}
                  </Typography>
                  <Typography variant="body2">
                    <Link
                      to={`/users/${c.user._id}`}
                    >{`${c.user.first_name} ${c.user.last_name}`}</Link>
                    : {c.comment}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2">No comments</Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
