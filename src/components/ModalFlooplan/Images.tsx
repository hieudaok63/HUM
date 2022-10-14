import { Box, Stack } from "@mui/material";
import FIRST from "../../assets/modal/TAP_220826_Essence-Sala.jpg";
import SECOND from "../../assets/modal/TAP_220826_Essence-Exterior.jpg";
import THIRD from "../../assets/modal/TAP_220826_Essence-Recamara.jpg";
import FOURTH from "../../assets/modal/TAP_220913_LautrecGarden-Baño.jpg";

export const Images = () => (
  <Stack spacing={2}>
    <Stack>
      <Box sx={{ width: "319px", height: "431px" }}>
        <img
          src={FIRST}
          alt="sala"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px"
          }}
        />
      </Box>
    </Stack>
    <Stack direction="row" spacing={1}>
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
    </Stack>
  </Stack>
);
