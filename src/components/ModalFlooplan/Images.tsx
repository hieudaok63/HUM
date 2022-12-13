import { Box, Stack } from "@mui/material";
import { useState } from "react";

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
              borderRadius: "10px"
            }}
          />
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflowX: "auto",
          width: "100%"
        }}
      >
        {images.map((image, index) => (
          <Box
            key={`image-${index}`}
            sx={{ width: "100px", height: "57px", cursor: "pointer" }}
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
                borderRadius: "10px"
              }}
            />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
