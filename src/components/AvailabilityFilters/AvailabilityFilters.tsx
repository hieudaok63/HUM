import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { ReactComponent as AvailableIcon } from "../../assets/icons/available.svg";
import { ReactComponent as ReservedIcon } from "../../assets/icons/reserved.svg";
import { ReactComponent as TakenIcon } from "../../assets/icons/taken.svg";
import { ReactComponent as SoldIcon } from "../../assets/icons/sold.svg";
import { ReactComponent as NotAvailableIcon } from "../../assets/icons/notAvailable.svg";
import { ReactComponent as AllIcon } from "../../assets/icons/all.svg";
import { useAppDispatch, useAvailabilityFilter } from "../../hooks";
import { setAvailability } from "../../store/todo-actions";
import { useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";

const filters = [
  { text: "Disponible", icon: <AvailableIcon />, value: "available" },
  { text: "Reservado", icon: <ReservedIcon />, value: "reserved" },
  { text: "Apartado", icon: <TakenIcon />, value: "taken" },
  { text: "Vendido", icon: <SoldIcon />, value: "sold" },
  { text: "No disponible", icon: <NotAvailableIcon />, value: "nonavailable" },
  { text: "Todos", icon: <AllIcon />, value: "all" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const AvailabilityFilters = () => {
  const dispatch = useAppDispatch();
  const availability = useAvailabilityFilter();
  const mobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const defaultValue = personName.length === 0 ? ["all"] : personName;

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return mobile ? (
    <Stack
      spacing={8}
      direction="row"
      sx={{
        position: "absolute",
        bottom: 0,
        marginBottom: "0",
        width: "100% !important",
        background: "#000 ",
      }}
      alignContent="center"
      justifyContent="flex-start"
    >
      <Select
        id="demo-multiple-chip"
        sx={{}}
        value={defaultValue}
        onChange={handleChange}
        renderValue={(selected) => {
          return (
            <Box
              sx={{
                backgroundColor: "#fff",
                color: "#fff",
                borderRadius: "16px",
              }}
            >
              {selected.map((value) => {
                const icon = filters.filter((item) => item.value === value);
                return (
                  <Chip
                    key={value}
                    label={value}
                    sx={{ minWidth: "80px" }}
                    deleteIcon={icon[0].icon}
                    onDelete={() => {}}
                  />
                );
              })}
            </Box>
          );
        }}
        MenuProps={MenuProps}
      >
        {filters.map((filter) => (
          <MenuItem
            key={filter.value}
            value={filter.value}
            style={getStyles(filter.value, personName, theme)}
            onClick={() => dispatch(setAvailability(filter.value))}
            sx={{ backgroundColor: "#000 !important", color: "#fff" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>{filter.value}</div>
              <div>{filter.icon}</div>
            </div>
          </MenuItem>
        ))}
      </Select>
    </Stack>
  ) : (
    <Stack
      spacing={8}
      direction="row"
      sx={{
        position: "absolute",
        bottom: 0,
        marginBottom: "40px",
        paddingLeft: "40px",
        width: "100%",
      }}
      alignContent="center"
      justifyContent="flex-start"
    >
      {filters.map((filter) => (
        <Chip
          key={filter.value}
          sx={{
            width: 156,
            backgroundColor:
              filter.value === availability
                ? "rgba(0, 0, 0, 0.1)"
                : "rgba(0, 0, 0, 0.6)",
            border: `1px solid white`,
            color: "white",
            justifyContent: "space-between",
            "&:hover": {
              fontWeight: "bold",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
          label={filter.text}
          deleteIcon={filter.icon}
          onDelete={() => {}}
          onClick={() => dispatch(setAvailability(filter.value))}
        />
      ))}
    </Stack>
  );
};
