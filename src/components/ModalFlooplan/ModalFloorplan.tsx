import { Close } from "@mui/icons-material";
import { Box, Chip, Dialog, Grid, Stack } from "@mui/material";
import { useMemo } from "react";
import { Unit } from "../../models/redux-models";
import { status } from "../FloorplanCard";
import { fills } from "../InteractiveFloorplan";
import { Images } from "./Images";

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedFloorplan: Unit;
}
export const ModalFloorplan = ({
  open,
  handleClose,
  selectedFloorplan
}: Props) => {
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);
  const images = useMemo(() => {
    const carouselImages = [];

    if (!!selectedFloorplan.attributes.cover)
      carouselImages.push(selectedFloorplan.attributes.cover);

    if (!!selectedFloorplan.attributes.pictures?.length)
      carouselImages.push(...selectedFloorplan.attributes.pictures);

    if (!!selectedFloorplan.attributes.plans.length)
      carouselImages.push(...selectedFloorplan.attributes.plans);

    return carouselImages;
  }, [
    selectedFloorplan.attributes.cover,
    selectedFloorplan.attributes.pictures,
    selectedFloorplan.attributes.plans
  ]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
          height: "553px"
        }
      }}
    >
      <Grid container spacing={3} sx={{ height: "100%", padding: "30px" }}>
        <Grid item sm={6}>
          <Box sx={{ width: "100%", height: "100%" }}>
            <Images images={images} />
          </Box>
        </Grid>
        <Grid item sm={6}>
          <Stack spacing={2}>
            <Stack>
              <Stack direction="row" justifyContent="space-between">
                <Stack
                  direction="row"
                  justifyItems="center"
                  alignItems="center"
                  alignContent="center"
                  justifyContent="center"
                  spacing={1}
                >
                  <h1 style={{ margin: 0 }}>Unidad</h1>
                  <Chip
                    label={status[selectedFloorplan.status]}
                    sx={{ backgroundColor: fills[selectedFloorplan.status] }}
                  />
                </Stack>
                <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
              </Stack>
              <h2 style={{ margin: 0, fontWeight: "900", fontSize: " 24px" }}>
                {selectedFloorplan.name}
              </h2>
            </Stack>
            <Stack>
              <p style={{ margin: 0 }}>Valor de la vivienda</p>
              <h2
                style={{ margin: 0, fontWeight: "700", fontSize: " 18px" }}
              >{`${numberFormat.format(
                selectedFloorplan.attributes.price
              )} MXN`}</h2>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <p style={{ margin: 0 }}>Tipología: </p>
              <h2 style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}>
                {selectedFloorplan.typology}
              </h2>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <p style={{ margin: 0 }}>Área Total: </p>
              <h2 style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}>
                {selectedFloorplan.attributes.area_total} m2
              </h2>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <p style={{ margin: 0 }}>Habitaciones: </p>
                <h2 style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}>
                  {selectedFloorplan.attributes.bedroom}
                </h2>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <p style={{ margin: 0 }}>Baños: </p>
                <h2 style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}>
                  {selectedFloorplan.attributes.bathroom}
                </h2>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Dialog>
  );
};
