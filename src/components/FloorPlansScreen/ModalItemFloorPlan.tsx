import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@mui/styles";
import { ButtonStratto } from "../ComponentsUtilities";
import { Stack, useMediaQuery } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

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

export default function ModalItemFloorPlan() {
  const classes = useStyles();
  const [buttonId, setButtonId] = useState<number>();
  const mobile = useMediaQuery("(max-width:640px)");
  return (
    <div className={classes.containerModal}>
      <div className={classes.containerModalChil}>
        <video controls autoPlay className={classes.videoScreen}>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>

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
                <ButtonStratto name="Tour 3D" path="" />
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
            <ButtonStratto name="Tour 3D" path="" />
            <ButtonStratto name="Disponibilidad" path="" />
            <ButtonStratto name="Amenidades" path="" />
          </Stack>
        )}

        <Stack
          direction="column"
          spacing={3}
          width="100%"
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
                onClick={() => setButtonId(buttonArray.id)}
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
      </div>
    </div>
  );
}
