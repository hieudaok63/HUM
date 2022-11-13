import { Paper, Stack } from "@mui/material";
import { Unit } from "../../models/redux-models";
import Close from "@mui/icons-material/Close";
import Bed from "@mui/icons-material/HotelOutlined";
import { ReactComponent as BathroomIcon } from "../../assets/icons/bathroom.svg";
import { ReactComponent as AreaIcon } from "../../assets/icons/area.svg";
import { ChevronRight } from "@mui/icons-material";

interface Props {
  x: number;
  y: number;
  selectedFloorplan: Unit;
  clearSelectedFloor: () => void;
  onClick: () => void;
}

export const FloorplanCard = ({
  x,
  y,
  selectedFloorplan,
  clearSelectedFloor,
  onClick
}: Props) => {
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);
  return (
    <Paper
      sx={{
        width: "270px",
        height: "410px",
        position: "absolute",
        zIndex: 2,
        background: "rgba(0, 0, 0, 0.8)",
        opacity: "0,5",
        borderRadius: "10px",
        boxShadow: "0px 1px 2px rgba(138, 138, 138, 0.5)",
        top: y - 150,
        left: x + 100
      }}
    >
      <Stack justifyContent="space-between" sx={{ height: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            backgroundColor: "#B4FFEE",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            padding: "0px 15px"
          }}
          alignItems="center"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <h5>{selectedFloorplan.typology}</h5>
            <h5>|</h5>
            <h5>{`${selectedFloorplan.name} `}</h5>
          </Stack>
          <Close
            style={{ cursor: "pointer" }}
            onClick={() => {
              clearSelectedFloor();
            }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="start"
          alignItems="center"
          padding="0px 15px"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={0}
            alignContent="start"
          >
            <AreaIcon />
            <h6 style={{ color: "white", margin: 0 }}>
              {selectedFloorplan.attributes.area_total} m2
            </h6>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0}
            alignContent="start"
          >
            <Bed sx={{ color: "white", width: "15px", height: "15px" }} />
            <h6 style={{ color: "white", margin: 0 }}>
              {selectedFloorplan.attributes.bedroom}
            </h6>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0}
            alignContent="start"
          >
            <BathroomIcon />
            <h6 style={{ color: "white", margin: 0 }}>
              {selectedFloorplan.attributes.bathroom}
            </h6>
          </Stack>
        </Stack>
        <Stack
          alignContent="center"
          justifyContent="center"
          alignItems="center"
          justifyItems="center"
        >
          <img
            src={selectedFloorplan.attributes.blueprint[0]}
            alt={selectedFloorplan.typology}
            style={{
              width: "95%",
              height: 185,
              objectFit: "contain",
              margin: "8px 0px"
            }}
            onClick={onClick}
          />
        </Stack>
        <Stack
          direction="row"
          sx={{ width: "100%", height: "56px", background: "#000000" }}
          justifyContent="space-between"
          alignContent="start"
          alignItems="center"
        >
          <Stack sx={{ paddingLeft: "10px" }}>
            <h5 style={{ color: "white", margin: 0 }}>
              {`${numberFormat.format(selectedFloorplan.attributes.price)} MXN`}
            </h5>
            <h6 style={{ margin: 0, color: " #B4FFEE" }}>Disponible</h6>
          </Stack>
          <Stack
            alignContent="center"
            alignItems="center"
            justifyItems="center"
            justifyContent="center"
            sx={{
              height: "100%",
              width: "54px",
              background: "#ffffff",
              cursor: "pointer"
            }}
            onClick={onClick}
          >
            <ChevronRight style={{ color: "black" }} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
