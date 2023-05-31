import {
  ButtonStratto,
  FiltersStratto,
  UtilitiesStratto,
} from "../ComponentsUtilities";
import { makeStyles } from "@mui/styles";
import PropertyFloorplans from "./PropertyFloorplans";
import { Box, Grid, Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  containerFloorPlans: {
    display: "block",
    width: "100%",
    height: "90%",
    overflow: "hidden",
    "@media (max-width: 960px)": {
      height: "100%",
    },
  },
  bodyFloorPlans: {
    margin: "80px 50px",
    paddingRight: "5px",
    overflowY: "scroll",
    height: "86%",
    "::-webkit-scrollbar": {
      width: "6px",
      backgroundColor: "#F5F5F5",
    },

    "@media (max-width: 640px)": {
      margin: "20px",
    },
  },
  utilities: {
    "@media (max-width: 640px)": {
      position: "absolute",
      bottom: "40px",
      right: "12px",
    },
  },
}));

const arrNumber = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2,
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4,
  5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export default function FloorPlansScreen() {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundColor: "#1a1919",
        width: "100%",
        height: "100%",
      }}
    >
      <div className={classes.utilities}>
        <UtilitiesStratto />
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <FiltersStratto />
      </div>
      <div className={classes.containerFloorPlans}>
        <div className={classes.bodyFloorPlans}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              {arrNumber.map(() => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <PropertyFloorplans />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>
      <Stack
        sx={{
          position: "absolute",
          bottom: "16px",
          width: "100%",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <ButtonStratto name="Amenidades" path="b-roll" />
      </Stack>
    </div>
  );
}
