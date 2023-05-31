import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
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
