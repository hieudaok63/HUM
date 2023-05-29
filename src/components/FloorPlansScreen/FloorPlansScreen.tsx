import { FiltersStratto } from "../ComponentsUtilities";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  containerFloorPlans: {
    width: "100%",
    height: "100%",
    backgroundColor: "",
    "@media (max-width: 1280px)": {
      height: "100%",
      width: "unset",
    },
  },
}));

export default function FloorPlansScreen() {
  const classes = useStyles();
  return (
    <div className={classes.containerFloorPlans}>
      <FiltersStratto />
    </div>
  );
}
