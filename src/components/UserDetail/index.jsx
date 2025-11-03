import React from "react";
import { Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography variant="body1">User not found.</Typography>;
  }

  return (
    <div>
      <Typography variant="h5">{`${user.first_name} ${user.last_name}`}</Typography>
      <Typography variant="subtitle1">{user.location}</Typography>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{ __html: user.description }}
      />
      <Typography variant="body2">Occupation: {user.occupation}</Typography>
      <div style={{ marginTop: 12 }}>
        <Button variant="contained" component={Link} to={`/photos/${user._id}`}>
          View Photos
        </Button>
      </div>
    </div>
  );
}

export default UserDetail;
