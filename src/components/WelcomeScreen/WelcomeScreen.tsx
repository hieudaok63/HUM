import { Box, Stack } from "@mui/material";
import ButtonStratto from "../ButtonStratto";
import UtilitiesStratto from "../UtilitiesStratto";
import { ReactComponent as StrattoLogo } from "../../assets/icons/StrattoLogo.svg";
import { useNavigate } from "react-router-dom";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#888686",
        width: "100%",
        height: "100%",
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
        <StrattoLogo onClick={() => navigate("/b-roll")} />
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
