import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ButtonStrattoProps {
  name: string;
  marginRight?: string;
  path?: string;
}

export default function ButtonStratto({
  name,
  marginRight,
  path,
}: ButtonStrattoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${path}`);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          width: "auto",
          minWidth: "126px",
          height: "36px",
          borderRadius: "18px",
          border: "1px solid",
          borderColor: "#000",
          textTransform: "unset",
          color: "#000",
          fontWeight: "600",
          fontSize: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          marginRight: `${marginRight}`,
          display: "block",
          "&:hover": {
            backgroundColor: "rgba(200, 196, 196, 0.8)",
          },
        }}
      >
        {name}
      </Button>
    </div>
  );
}
