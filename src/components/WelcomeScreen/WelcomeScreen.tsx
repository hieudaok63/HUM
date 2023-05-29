import { Box, Stack } from "@mui/material";
import { ReactComponent as StrattoLogo } from "../../assets/icons/StrattoLogo.svg";
import { ButtonStratto, UtilitiesStratto } from "../ComponentsUtilities";

export default function WelcomeScreen() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#888686",
        width: "100%",
        height: "100%",
        backgroundImage: `url('https://athum.com/images-tmp/okun-etapa2A.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          top: "40%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "300px",
              lg: "400px",
              xl: "420px",
            },
          }}
        >
          <StrattoLogo
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Stack
          direction="row"
          spacing={4}
          sx={{
            marginTop: "10px",
          }}
        >
          <ButtonStratto name="Explora la propiedad" path="b-roll" />
          <ButtonStratto name="Escoge tu depa" path="availability" />
        </Stack>
      </Stack>

      <UtilitiesStratto />
    </Box>
  );
}
