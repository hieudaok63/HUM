import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ReactComponent as BathRoom } from "../../assets/icons/bathroom.svg";

const useStyles = makeStyles(() => ({
  containerScreen: {
    width: "100%",
    height: "auto",
    backgroundColor: "#222222",
    "@media (max-width: 640px)": {
      display: "flex",
      flexDirection: "row-reverse",
    },
  },
  header: {
    width: "100%",
    height: "182px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    "@media (max-width: 640px)": {
      height: "auto",
      width: "40%",
      justifyContent: "space-between",
    },
  },
  bottom: {
    padding: "12px 12px",
    "@media (max-width: 640px)": {
      width: "60%",
    },
  },
}));

export default function PropertyFloorplans() {
  const classes = useStyles();
  return (
    <div className={classes.containerScreen}>
      <div className={classes.header}>
        <img
          src="https://thoitrangwiki.com/wp-content/uploads/2017/06/mau-nha-2-phong-ngu-02-min.jpg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className={classes.bottom}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span
            style={{
              fontWeight: "400",
              fontSize: "10px",
              color: "#fff",
            }}
          >
            Desde:
          </span>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              backgroundColor: "#FFFFFF",
              width: "80px",
              height: "22px",
              borderRadius: "16px",
              padding: "0 12px",
            }}
          >
            <span
              style={{
                fontWeight: "500",
                fontSize: "10px",
              }}
            >
              Disponble
            </span>
            <div
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: "#56B0C0",
                borderRadius: "50%",
              }}
            ></div>
          </Stack>
        </Stack>
        <span
          style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: "14px",
          }}
        >
          $15,000 MXP
        </span>
        <p
          style={{
            color: "#fff",
            fontWeight: "400",
            fontSize: "12px",
            margin: "6px 0",
          }}
        >
          Studio 1
        </p>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="column">
            <Stack direction="row" alignItems="center">
              <BathRoom />
              <span
                style={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "500",
                  marginLeft: "4px",
                }}
              >
                1
              </span>
            </Stack>
            <span
              style={{
                color: "#fff",
                fontSize: "12px",
              }}
            >
              Recámaras
            </span>
          </Stack>
          <Stack direction="column">
            <Stack direction="row" alignItems="center">
              <BathRoom />
              <span
                style={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "500",
                  marginLeft: "4px",
                }}
              >
                1
              </span>
            </Stack>
            <span
              style={{
                color: "#fff",
                fontSize: "12px",
              }}
            >
              Baños
            </span>
          </Stack>
          <Stack direction="column">
            <Stack direction="row" alignItems="center">
              <BathRoom />
              <span
                style={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "500",
                  marginLeft: "4px",
                }}
              >
                70.35m2
              </span>
            </Stack>
            <span
              style={{
                color: "#fff",
                fontSize: "12px",
              }}
            >
              Área Total
            </span>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
