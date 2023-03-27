import { Box, Stack, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  images: string[];
}

export const Images = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mobile = useMediaQuery("(max-width:600px)");

  return (
    <Stack spacing={2}>
      <Stack
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            height: mobile ? "350px" : "431px",
            width: mobile ? "100%" : "unset",
          }}
        >
          <img
            src={images[selectedIndex]}
            alt="preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: mobile ? "20px" : "10px",
            }}
          />
        </Box>
      </Stack>
      <Stack direction="row">
        <Swiper
          slidesPerView={
            mobile
              ? images.length > 6
                ? 4.5
                : images.length
              : images.length > 6
              ? 6.5
              : images.length
          }
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
        >
          {images?.map((image, index) => (
            <SwiperSlide>
              <Box
                key={`image-${index}`}
                sx={{
                  width: mobile ? "70px" : "50px",
                  height: mobile ? "70px" : "50px",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: "0.8",
                  },
                }}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  onClick={() => setSelectedIndex(index)}
                  src={image}
                  alt="exterior"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Stack>
  );
};
