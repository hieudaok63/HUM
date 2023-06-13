import { Box, Grid, Stack } from "@mui/material";
import { ModalStratto } from "../ComponentsUtilities";
import { makeStyles } from "@mui/styles";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const useStyles = makeStyles({
  contentModal: {
    padding: "20px",
  },
  title: {
    fontWeight: "300",
    fontSize: "14px",
    lineHeight: "17px",
    margin: "0",
    padding: "0",
  },
  info: {
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "29px",
  },
});

export default function AvailabilityModal() {
  const classes = useStyles();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModalStratto>
        <div className={classes.contentModal}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8} xl={6} style={{}}>
              <div>
                <>
                  <Swiper
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-1.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-2.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-3.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-4.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-5.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-6.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-7.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-8.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-9.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-10.jpg"
                      />
                    </SwiperSlide>
                  </Swiper>

                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={5.5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-1.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-2.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-3.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-4.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-5.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-6.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-7.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-8.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-9.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt=""
                        src="https://swiperjs.com/demos/images/nature-10.jpg"
                      />
                    </SwiperSlide>
                  </Swiper>
                </>
              </div>
            </Grid>
            <Grid item xs={0} lg={4} xl={6}>
              <div>
                <Box sx={{ marginBottom: "14px" }}>
                  <h4 className={classes.title}>UNIDAD:</h4>
                  <span className={classes.info}>4001</span>
                </Box>

                <Box sx={{ marginBottom: "14px" }}>
                  <h4 className={classes.title}>Renta mensual</h4>
                  <span className={classes.info}>$15,000 MXN</span>
                </Box>

                <Stack direction={"row"} sx={{ marginBottom: "14px" }}>
                  <Box sx={{ marginRight: "80px" }}>
                    <h4 className={classes.title}>Planta tipo:</h4>
                    <span className={classes.info}>Studio 1</span>
                  </Box>
                  <Box>
                    <h4 className={classes.title}>Nivel: </h4>
                    <span className={classes.info}>40</span>
                  </Box>
                </Stack>
                <Stack direction={"row"} sx={{ marginBottom: "14px" }}>
                  <Box sx={{ marginRight: "80px" }}>
                    <h4 className={classes.title}>Recámaras: </h4>
                    <span className={classes.info}>Studio </span>
                  </Box>
                  <Box>
                    <h4 className={classes.title}>Baños: </h4>
                    <span className={classes.info}>1</span>
                  </Box>
                </Stack>
                <Box sx={{ marginBottom: "14px" }}>
                  <h4 className={classes.title}>Área Total: </h4>
                  <span className={classes.info}>37.64 m2</span>
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
      </ModalStratto>
    </div>
  );
}
