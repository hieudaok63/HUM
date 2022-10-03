import React, { useEffect } from 'react';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { arrayOf, shape, string, element, func, bool } from 'prop-types';

const Filter = ({
  text,
  options,
  startIcon,
  onChange,
  firstOption,
  shouldClear,
  resetShouldClear
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    onChange(options[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (shouldClear && anchorEl) {
      setSelectedIndex(0);
      resetShouldClear();
    }
  }, [shouldClear]);

  return (
    <div>
      <Button
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={startIcon}
        endIcon={(
          <KeyboardArrowDownIcon
            style={{ color: 'white', width: 18, height: 18 }}
          />
        )}
        style={{ color: 'white', textAlign: 'center', textTransform: 'none' }}
      >
        {text}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className="filter-menu"
      >
        {firstOption && (
          <MenuItem disabled style={{ color: 'white' }}>
            {firstOption}
          </MenuItem>
        )}
        {options.map(
          ({ text: optionText, value: inputValue, paddingLeft }, i) => (
            <MenuItem
              key={inputValue}
              value={inputValue}
              style={{
                background:
                  i === selectedIndex ? 'rgba(61, 208, 174)' : '#1D1C1B',
                color: 'white',
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

Filter.propTypes = {
  text: string.isRequired,
  options: arrayOf(shape({})).isRequired,
  startIcon: element.isRequired,
  onChange: func.isRequired,
  firstOption: string,
  shouldClear: bool.isRequired,
  resetShouldClear: func.isRequired
};

Filter.defaultProps = {
  firstOption: ''
};

export default Filter;
