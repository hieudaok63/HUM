import { Stack } from "@mui/material";
import {
  ButtonStratto,
  HomeIcon,
  UtilitiesStratto,
} from "../ComponentsUtilities";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  videoScreen: {
    position: "relative",
    width: "100%",
    height: "unset",
    "@media (max-width: 1280px)": {
      height: "100%",
      width: "unset",
    },
  },
  buttonBroll: {
    position: "absolute",
    zIndex: "10",
    bottom: "30px",
    width: "100%",
    justifyContent: "center",
  },
  containerBroll: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    "@media (max-width: 1280px)": {
      height: "100%",
      width: "unset",
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
    },
  },
  utilitiesBroll: {
    "@media (max-width: 1280px)": {
      position: "absolute",
      bottom: "50px",
      right: "0px",
    },
  },
}));

export default function BRollScreen() {
  const classes = useStyles();
  return (
    <div className={classes.containerBroll}>
      <video controls autoPlay className={classes.videoScreen}>
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </video>
      <HomeIcon />
      <Stack direction="row" spacing={4} className={classes.buttonBroll}>
        <ButtonStratto name="Depas" path="floorplans" />
        <ButtonStratto name="Amenidades" path="" />
      </Stack>
      <div className={classes.utilitiesBroll}>
        <UtilitiesStratto />
      </div>
    </div>
  );
}
