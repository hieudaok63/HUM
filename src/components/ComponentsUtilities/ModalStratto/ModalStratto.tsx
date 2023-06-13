import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  ContainerModal: {
    position: "absolute",
    width: "95%",
    height: "95%",
    backgroundColor: "#fff",
    right: "64px",
    borderRadius: "14px",
    overflow: "hidden",

    "@media (max-width: 1200px)": {
      width: "100%",
      height: "100%",
      borderRadius: "0",
      right: "0",
    },
  },
});

export default function ModalStratto({ children }: any) {
  const classes = useStyles();
  return <div className={classes.ContainerModal}>{children}</div>;
}
