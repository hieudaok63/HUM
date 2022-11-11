import { Close } from "@mui/icons-material";
import { Dialog, Stack } from "@mui/material";
import { Unit } from "../../models/redux-models";
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
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px"
        }
      }}
    >
      <Stack sx={{ padding: "20px" }} spacing={2}>
        <Stack direction="row" justifyContent="end">
          <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Stack>
        <Stack direction="row" spacing={4}>
          <Images image={selectedFloorplan.attributes.cover} />
          <Stack spacing={2}>
            <Stack>
              <p style={{ margin: 0 }}>Unidad</p>
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
        </Stack>
      </Stack>
    </Dialog>
  );
};
