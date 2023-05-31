import { Stack } from "@mui/material";
import {
  ButtonStratto,
  HomeIcon,
  UtilitiesStratto,
} from "../ComponentsUtilities";
import { useStyles } from "./BRollScreenStyle";

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
