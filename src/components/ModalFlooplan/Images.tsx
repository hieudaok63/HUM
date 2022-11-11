import { Box, Stack } from "@mui/material";

interface Props {
  image: string;
}

export const Images = ({ image }: Props) => (
  <Stack spacing={2}>
    <Stack>
      <Box sx={{ width: "319px", height: "431px" }}>
        <img
          src={image}
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
    {/* <Stack direction="row" spacing={1}>
      <Box sx={{ width: "100px", height: "57px" }}>
        <img
          src={SECOND}
          alt="exterior"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px"
          }}
        />
      </Box>
      <Box sx={{ width: "100px", height: "57px" }}>
        <img
          src={THIRD}
          alt="recamara"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px"
          }}
        />
      </Box>
      <Box sx={{ width: "100px", height: "57px" }}>
        <img
          src={FOURTH}
          alt="baño"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px"
          }}
        />
      </Box>
    </Stack> */}
  </Stack>
);
