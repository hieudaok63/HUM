import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@mui/styles";
import { ButtonStratto } from "../ComponentsUtilities";
import { Button, Stack, useMediaQuery } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
const useStyles = makeStyles({
  ButtonStratto: {
    position: "absolute",
    bottom: "46px",
    width: "100%",
    "@media (max-width: 1200px)": {
      bottom: "12px",
    },
  },
});

export function ButtonFloorPlan({ setOpenModal3DTour }: any) {
  const mobile = useMediaQuery("(max-width:640px)");
  const classes = useStyles();

  const handleClickOpenModal = () => {
    setOpenModal3DTour(true);
  };
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
            onClick={handleClickOpenModal}
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
