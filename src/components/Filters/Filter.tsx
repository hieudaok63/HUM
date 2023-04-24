import {
  Button,
  Menu,
  MenuItem,
  Fade,
  Box,
  useMediaQuery,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { FilterOptions } from "../../models/redux-models";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  text: string;
  options: FilterOptions[];
  startIcon?: ReactNode;
  onChange: (e: any) => void;
  shouldClear: boolean;
  resetShouldClear: () => void;
  index: number;
}

export const Filter = ({
  text,
  options,
  startIcon,
  onChange,
  shouldClear,
  resetShouldClear,
  index,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(index);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (_: any, index: number) => {
    setSelectedIndex(index);
    onChange(options[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (shouldClear) {
      setSelectedIndex(null);
      resetShouldClear();
    }
  }, [shouldClear, anchorEl, resetShouldClear]);

  useEffect(() => setSelectedIndex(index !== null ? index : null), [index]);
  const mobile = useMediaQuery("(max-width:1365px)");

  return (
    <Box
      sx={{
        "&:hover": {
          opacity: 0.8,
        },
        padding: mobile ? "16px 0px" : "0",
        border: mobile ? "unset" : "1px solid #fff",
        minWidth: "130px",
        borderRadius: !mobile ? "6px" : "0",
      }}
    >
      <Button
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={startIcon}
        endIcon={
          <KeyboardArrowDownIcon
            sx={{ color: "white", width: 18, height: 18 }}
          />
        }
        sx={{
          color: "white",
          textAlign: "center",
          textTransform: "none",
          padding: !mobile ? "0 8px" : "",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {selectedIndex !== null && options[selectedIndex]
          ? options[selectedIndex].text
          : text}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{
          ".MuiList-root": {
            backgroundColor: "#0e0808",
          },
        }}
      >
        {options?.map(({ text: optionText, value: inputValue }, i) => (
          <MenuItem
            key={inputValue}
            value={inputValue}
            sx={{
              background:
                i === selectedIndex ? "rgba(61, 208, 174)" : "#000000",
              color: "white",
              width: "100%",
            }}
            selected={i === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, i)}
          >
            {optionText}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
