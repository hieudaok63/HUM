import { Button, Menu, MenuItem, Fade } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { FilterOptions } from "../../models/redux-models";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  text: string;
  options: FilterOptions[];
  startIcon: ReactNode;
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
  index
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

  return (
    <div>
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
        sx={{ color: "white", textAlign: "center", textTransform: "none" }}
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
        sx={{ ".MuiList-root": { backgroundColor: "#000000" } }}
      >
        {options.map(
          ({ text: optionText, value: inputValue, paddingLeft }, i) => (
            <MenuItem
              key={inputValue}
              value={inputValue}
              sx={{
                background:
                  i === selectedIndex ? "rgba(61, 208, 174)" : "#000000",
                color: "white",
                paddingLeft
              }}
              selected={i === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, i)}
            >
              {optionText}
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
};