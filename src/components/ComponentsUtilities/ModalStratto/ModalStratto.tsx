import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  ContainerModal: {
    position: "absolute",
    width: "96%",
    height: "96%",
    backgroundColor: "#fff",
    right: "56px",
    borderRadius: "14px",
  },
});

export default function ModalStratto({ children }: any) {
  const classes = useStyles();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={classes.ContainerModal}>{children}</div>
    </div>
  );
}
