import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useMatch } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  // Matches for routes with params
  const matchUser = useMatch("/users/:userId");
  const matchPhotos = useMatch("/photos/:userId");

  let rightText = "Users";
  if (matchPhotos) {
    const uid = matchPhotos.params.userId;
    const u = models.userModel(uid);
    rightText = u ? `Photos of ${u.first_name} ${u.last_name}` : "Photos";
  } else if (matchUser) {
    const uid = matchUser.params.userId;
    const u = models.userModel(uid);
    rightText = u ? `${u.first_name} ${u.last_name}` : "User";
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
          Nguyễn Huy Trung-B22DCAT307
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {rightText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
