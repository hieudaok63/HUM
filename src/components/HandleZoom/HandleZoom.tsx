import { useMediaQuery } from "@mui/material";
import { useSvgType } from "../../hooks";
import { useCurrentLocation } from "../../hooks";
import { ReactComponent as ZoomInIcon } from "../../assets/icons/zoomin.svg";
import { ReactComponent as ZoomOutIcon } from "../../assets/icons/zoomout.svg";
import { ReactComponent as MoveIcon } from "../../assets/icons/Move.svg";

export const HandleZoom: any = ({
  handleZoomIn,
  handleZoomOut,
  handleReset,
}: any) => {
  const currentLocation = useCurrentLocation();
  const svgType = useSvgType();
  const mobile = useMediaQuery("(max-width:1260px)");
  return (
    currentLocation !== 0 &&
    !mobile && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "fixed",
          width: "100px",
          bottom: mobile ? "80px" : "40px",
          right: mobile ? "0px" : svgType === "3d" ? "50px" : "160px",
          flexDirection: mobile ? "column" : "row",
        }}
      >
        <span
          onClick={handleZoomIn}
          style={{
            cursor: "pointer",
          }}
        >
          <ZoomInIcon />
        </span>

        <div
          style={{
            margin: mobile ? "16px 0" : "0 20px",
            cursor: "pointer",
          }}
          onClick={handleZoomOut}
        >
          <ZoomOutIcon />
        </div>

        <div
          onClick={handleReset}
          style={{
            cursor: "pointer",
          }}
        >
          <MoveIcon />
        </div>
      </div>
    )
  );
};
