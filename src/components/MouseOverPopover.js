import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";

const useStyles = makeStyles(() => ({
  paper: {
    background: "#c8c8c8",
    maxWidth: "260px",
    borderRadius: "50px",
    padding: "5px",
  },
  text: {
    color: "white",
    fontSize: "10px",
    lineHeight: "13px",
    textAlign: "center",
    fontFamily: "Baron Neue",
  },
}));

export default function MouseOverPopover({
  id,
  anchorEl,
  handleCloseAnchorEl,
  text,
  options,
}) {
  const classes = useStyles();

  const open = Boolean(anchorEl);

  const anchorOrigin =
    !isEmpty(options) && !isEmpty(options.anchorOrigin)
      ? options.anchorOrigin
      : {
          vertical: "center",
          horizontal: "left",
        };
  const transformOrigin =
    !isEmpty(options) && !isEmpty(options.transformOrigin)
      ? options.transformOrigin
      : {
          vertical: "center",
          horizontal: "left",
        };

  return (
    <div className="mouse-over-popover">
      <Popover
        id={id}
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={handleCloseAnchorEl}
        disableRestoreFocus
        classes={{
          paper: classes.paper,
        }}
      >
        <Typography sx={{ p: 1 }} className={classes.text}>
          {text}
        </Typography>
      </Popover>
    </div>
  );
}
