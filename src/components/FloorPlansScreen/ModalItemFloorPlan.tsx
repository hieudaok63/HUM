import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@mui/styles";
import { ButtonStratto } from "../ComponentsUtilities";
import { Button, Stack, useMediaQuery } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import FloorplanLayoutDesc from "./FloorplanLayoutDesc";
import FloorPlan3DTour from "./FloorPlan3DTour";

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
  videoScreen: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "15px",

    "@media (max-width: 640px)": {
      height: "100%",
      width: "unset",
    },
    "@media (max-width: 1200px)": {
      height: "100%",
      width: "unset",
    },
  },
  buttonVideo: {
    width: "120px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    cursor: "pointer",
    "&:hover": {
      opacity: "0.8",
    },
    "@media (max-width: 640px)": {
      display: "none",
    },

    "@media (max-width: 1200px)": {
      width: "100px",
      height: "30px",
    },
  },
  ButtonStratto: {
    position: "absolute",
    bottom: "46px",
    width: "100%",
    "@media (max-width: 1200px)": {
      bottom: "12px",
    },
  },
});

const buttonArrays = [
  { id: 1, name: "Sala" },
  { id: 2, name: "Recámara" },
  { id: 3, name: "Baño" },
  { id: 4, name: "Ver info" },
];

export function ButtonFloorPlan({ setOpenModal3DTour }: any) {
  const mobile = useMediaQuery("(max-width:640px)");
  const classes = useStyles();
  return (
    <>
      {mobile ? (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          className={classes.ButtonStratto}
        >
          <Swiper
            slidesPerView={2.5}
            spaceBetween={30}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Button
                sx={{
                  cursor: "pointer",
                  width: "auto",
                  minWidth: "126px",
                  height: "36px",
                  borderRadius: "18px",
                  border: "1px solid",
                  borderColor: "#000",
                  textTransform: "unset",
                  color: "#000",
                  fontWeight: "600",
                  fontSize: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  display: "block",
                  "&:hover": {
                    backgroundColor: "rgba(200, 196, 196, 0.8)",
                  },
                }}
                onClick={() => setOpenModal3DTour(true)}
              >
                Tour 3D
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <ButtonStratto name="Disponibilidad" path="" />
            </SwiperSlide>
            <SwiperSlide>
              <ButtonStratto name="Amenidades" path="" />
            </SwiperSlide>
          </Swiper>
        </Stack>
      ) : (
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          className={classes.ButtonStratto}
        >
          <Button
            sx={{
              cursor: "pointer",
              width: "auto",
              minWidth: "126px",
              height: "36px",
              borderRadius: "18px",
              border: "1px solid",
              borderColor: "#000",
              textTransform: "unset",
              color: "#000",
              fontWeight: "600",
              fontSize: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              display: "block",
              "&:hover": {
                backgroundColor: "rgba(200, 196, 196, 0.8)",
              },
            }}
            onClick={() => setOpenModal3DTour(true)}
          >
            Tour 3D
          </Button>
          <ButtonStratto name="Disponibilidad" path="" />
          <ButtonStratto name="Amenidades" path="" />
        </Stack>
      )}
    </>
  );
}

export default function ModalItemFloorPlan() {
  const classes = useStyles();
  const [buttonId, setButtonId] = useState<number | null>();
  const [floorPlanLayout, setFloorPlanLayout] = useState<boolean>(false);
  const [openModal3DTour, setOpenModal3DTour] = useState<boolean>(false);

  const handleClickButtonVideo = (id: number) => {
    setButtonId(id);

    if (id === 4) {
      setFloorPlanLayout(true);
    }
  };
  return (
    <div className={classes.containerModal}>
      <div className={classes.containerModalChil}>
        {!floorPlanLayout && !openModal3DTour && (
          <>
            <video controls autoPlay className={classes.videoScreen}>
              <source
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>

            <ButtonFloorPlan setOpenModal3DTour={setOpenModal3DTour} />

            <Stack
              direction="column"
              spacing={3}
              sx={{
                position: "absolute",
                bottom: "60px",
                left: "20px",
              }}
            >
              {buttonArrays.map((buttonArray) => {
                const active = buttonId === buttonArray.id;
                return (
                  <div
                    className={classes.buttonVideo}
                    key={buttonArray.id}
                    onClick={() => handleClickButtonVideo(buttonArray.id)}
                    style={{
                      backgroundColor: active
                        ? " rgba(255, 255, 255, 0.8)"
                        : "rgba(0, 0, 0, 0.7)",
                      color: active ? "#000" : "#fff",
                      border: active ? "1px solid #000" : "1px solid #fff",
                    }}
                  >
                    {buttonArray.name}
                  </div>
                );
              })}
            </Stack>
          </>
        )}

        {floorPlanLayout && (
          <FloorplanLayoutDesc onClick={() => setFloorPlanLayout(false)} />
        )}

        {openModal3DTour && <FloorPlan3DTour />}
      </div>
    </div>
  );
}
