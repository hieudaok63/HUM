import { Box } from "@mui/material";
import { ReactComponent as LogoHome } from "../../../assets/icons/LogoHome.svg";
import { useNavigate } from "react-router-dom";

export default function HomeIcon() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "absolute",
        top: "30px",
        left: "30px",
      }}
    >
      <LogoHome
        style={{
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
        onClick={() => navigate("/stratto")}
      />
    </Box>
  );
}
