import { Close } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Button,
  Chip,
  Dialog,
  Grid,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useMemo, useState } from "react";
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
  selectedFloorplan,
}: Props) => {
  const [showIframe, setShowIframe] = useState(false);
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
    selectedFloorplan.attributes.plans,
  ]);
  const mobile = useMediaQuery("(max-width:1024px)");

  // useEffect(() => {
  //   setShowIframe(false);
  // }, [handleClose()]);

  const handleCloseModal = () => {
    handleClose();
    setShowIframe(false);
  };

  const Show360 = (props: any) => {
    return (
      <div
        style={{
          height: "94%",
          width: "97%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: "4px 10px" }}
        >
          <ChevronLeftIcon
            onClick={() => setShowIframe(false)}
            sx={{ cursor: "pointer" }}
          />
          {!mobile && <span>#FloorplanModel</span>}
          <Close
            sx={{
              cursor: "pointer",
              "&:hover": {
                opacity: "0.8",
              },
            }}
            onClick={handleCloseModal}
          />
        </Stack>
        <iframe
          src={props.src}
          allowFullScreen
          name="Miyana"
          title={props.src}
          height="100%"
          width="100%"
          style={{
            borderRadius: "10px",
            border: "0px #ffffff none",
          }}
        ></iframe>
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      fullWidth
      maxWidth={!showIframe ? "md" : "xl"}
      sx={{
        "& .MuiDialog-paper": !mobile
          ? {
              borderRadius: "10px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }
          : {
              borderRadius: "0",
              height: "100%",
              maxHeight: "100%",
              width: "auto",
              margin: "0",
              alignItems: "center",
            },

        width: "100%",
      }}
    >
      {mobile && !showIframe && (
        <Close
          sx={{
            margin: "20px 0",
            fontSize: "30px",
            marginLeft: "88%",
          }}
          onClick={handleClose}
        />
      )}
      {showIframe ? (
        <Show360 src="https://360s.athum.com/c8fd1740-105b-4e62-be97-10fb354b95d7/19/miyana" />
      ) : (
        <Grid
          container
          spacing={3}
          sx={{
            height: "100%",
            width: "100%",
            padding: mobile ? "0" : "30px",
          }}
        >
          <Grid item sm={6}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <Images images={images} />
            </Box>
          </Grid>
          {/*  */}
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
                  {!mobile && (
                    <Close
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#555",
                          color: "#ffffff",
                          borderRadius: "5px",
                        },
                      }}
                      onClick={handleClose}
                    />
                  )}
                </Stack>
                <h2 style={{ margin: 0, fontWeight: "900", fontSize: " 24px" }}>
                  {selectedFloorplan.name}
                </h2>
              </Stack>
              <Stack>
                <p style={{ margin: 0 }}>Unit Price</p>
                <h2 style={{ margin: 0, fontWeight: "700", fontSize: " 18px" }}>
                  {numberFormat.format(selectedFloorplan.attributes.price)}
                </h2>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <p style={{ margin: 0 }}>Floorplan: </p>
                <h2 style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}>
                  {selectedFloorplan.typology}
                </h2>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <p style={{ margin: 0 }}>Building: : </p>
                  <h2
                    style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}
                  >
                    {selectedFloorplan.attributes.bedroom}
                  </h2>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <p style={{ margin: 0 }}>Phase: </p>
                  <h2
                    style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}
                  >
                    {selectedFloorplan.attributes.bathroom}
                  </h2>
                </Stack>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <p style={{ margin: 0 }}>Bedrooms: : </p>
                  <h2
                    style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}
                  >
                    {selectedFloorplan.attributes.bedroom}
                  </h2>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <p style={{ margin: 0 }}>Bathrooms: : </p>
                  <h2
                    style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}
                  >
                    {selectedFloorplan.attributes.bathroom}
                  </h2>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <p style={{ margin: 0 }}>Total Area: </p>
                  <h2
                    style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}
                  >
                    {selectedFloorplan.attributes.area_total} m2
                  </h2>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <p style={{ margin: 0 }}>Usable Area : </p>
                  <h2
                    style={{ margin: 0, fontWeight: "700", fontSize: " 14px" }}
                  >
                    {selectedFloorplan.attributes.area_constructed}
                  </h2>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              sx={{
                marginTop: mobile ? "20px" : "40px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  marginRight: "34px",
                  width: "170px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "#3948FF",
                }}
              >
                Reserve
              </Button>
              <Button
                variant="contained"
                sx={{
                  marginRight: "34px",
                  width: "170px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "#3948FF",
                }}
                onClick={() => setShowIframe(!showIframe)}
              >
                360 Tour
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
};
