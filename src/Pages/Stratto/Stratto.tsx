import { Box } from "@mui/material";
import WelcomeScreen from "../../components/WelcomeScreen";

export default function Stratto() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <WelcomeScreen />
    </Box>
  );
}
