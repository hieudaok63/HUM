import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  images: string[];
}

export const Images = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Stack spacing={2}>
      <Stack>
        <Box sx={{ height: "431px" }}>
          <img
            src={images[selectedIndex]}
            alt="preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Stack>
      <Stack direction="row">
        <Swiper
          slidesPerView={images.length > 6 ? 6.5 : images.length}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide>
              <Box
                key={`image-${index}`}
                sx={{
                  width: "50px",
                  height: "50px",
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
                    width: "50px",
                    height: "50px",
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
