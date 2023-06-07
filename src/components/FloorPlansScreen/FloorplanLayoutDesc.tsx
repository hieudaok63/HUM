import { makeStyles } from "@mui/styles";
import { ReactComponent as ReplayIcon } from "../../assets/icons/ReplayIcon.svg";
import { ButtonFloorPlan } from "./ButtonFloorPlan";
import { useState } from "react";
import FloorPlan3DTour from "./FloorPlan3DTour";

const useStyles = makeStyles({
  containerLayout: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    borderRadius: "15px",
    position: "relative",
  },
  bodyTopFloorPlan: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    "@media (max-width: 1200px)": {
      flexDirection: "column-reverse",
      justifyContent: "start",
      //   alignItems: "start",
    },
  },
  bodyTopFloorPlanInfo: {
    color: "white",
    marginRight: "40px",
  },
  bodyTopFloorPlanImg: {
    width: "800px",
    height: "500px",
    "@media (max-width: 1200px)": {
      width: "100%",
    },
    "@media (max-width: 640px)": {
      width: "100%",
    },
  },
  infoRooms: {
    margin: "6px 0",
  },
  button: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    bottom: "-30px",

    "@media (max-width: 1200px)": {
      bottom: "0px",
    },
  },
  iconReplace: {
    position: "absolute",
    bottom: "18px",
    left: "18px",
    cursor: "pointer",
    "@media (max-width: 640px)": {
      top: "18px",
    },
    "&:hover": {
      opacity: "0.8",
      scale: "1.1",
    },
  },
  textPadding: {
    paddingTop: "20px",
    "@media (max-width: 1200px)": {
      paddingTop: "0px",
    },
  },
});

export default function FloorplanLayoutDesc({ onClick }: any) {
  const classes = useStyles();
  const [openModal3DTour, setOpenModal3DTour] = useState<boolean>(false);
  return (
    <>
      {!openModal3DTour && (
        <div className={classes.containerLayout}>
          <div className={classes.bodyTopFloorPlan}>
            <div className={classes.bodyTopFloorPlanInfo}>
              <p
                style={{
                  fontSize: "20px",
                }}
              >
                1BR - 1BA / 5
              </p>
              <div>Desde</div>
              <span
                style={{
                  fontWeight: "900",
                  display: "block",
                  fontSize: "16px",
                  marginBottom: "12px",
                }}
              >
                $22,000 MXP
              </span>
              <p className={classes.infoRooms}>Recámaras : 1</p>
              <p className={classes.infoRooms}>Baños: 1</p>
              <p className={classes.infoRooms}>Área Total: 70.8m2</p>
              <ul>
                <li className={classes.textPadding}>Cocina SMEG</li>
                <li>Cubiertas de Granito</li>
                <li>Pisos de madera de ingeniería</li>
              </ul>
              <p className={classes.textPadding}>Disponibles: 20 unidades</p>
            </div>
            <div className={classes.bodyTopFloorPlanImg}>
              <img
                src="https://spacet-release.s3.ap-southeast-1.amazonaws.com/img/blog/2023-01-05/63b68c89b8f8826f0f13f1bf.png"
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
          <div className={classes.button}>
            <ButtonFloorPlan setOpenModal3DTour={setOpenModal3DTour} />
          </div>
          <div className={classes.iconReplace} onClick={onClick}>
            <ReplayIcon />
          </div>
        </div>
      )}
      {openModal3DTour && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "#000000E5",
          }}
        >
          <FloorPlan3DTour />
        </div>
      )}
    </>
  );
}
