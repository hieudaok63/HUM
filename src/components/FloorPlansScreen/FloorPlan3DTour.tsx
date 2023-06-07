import { makeStyles } from "@mui/styles";

/* eslint-disable jsx-a11y/iframe-has-title */

const useStyles = makeStyles({
  containerModal: {
    position: "absolute",
    width: "92%",
    height: "90%",
    backgroundColor: "#FFFFFF",
    marginRight: "50px",
    borderRadius: "15px",
    padding: "16px",
    "@media (max-width: 640px)": {
      height: "100%",
      width: "100%",
      padding: "0",
      margin: "0",
      borderRadius: "0",
    },
    "@media (min-width:641px )": {
      height: "86%",
      width: "86%",
    },
  },
  containerModalChil: {
    width: "100%",
    height: "100%",
    borderRadius: "15px",
    position: "relative",
    "@media (max-width: 640px)": {
      position: "unset",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      borderRadius: "0",
    },

    "@media (max-width: 1200px)": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
  },
});

export default function FloorPlan3DTour() {
  const classes = useStyles();

  return (
    <div className={classes.containerModal}>
      <div className={classes.containerModalChil}>
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <iframe
            src="https:360s.athum.com/c8fd1740-105b-4e62-be97-10fb354b95d7/19/miyana"
            name="Miyana"
            height="100%"
            width="100%"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
