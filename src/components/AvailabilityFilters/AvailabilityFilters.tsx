import { Chip, Stack } from "@mui/material";
import { ReactComponent as AvailableIcon } from "../../assets/icons/available.svg";
import { ReactComponent as ReservedIcon } from "../../assets/icons/reserved.svg";
import { ReactComponent as TakenIcon } from "../../assets/icons/taken.svg";
import { ReactComponent as SoldIcon } from "../../assets/icons/sold.svg";
import { ReactComponent as NotAvailableIcon } from "../../assets/icons/notAvailable.svg";
import { ReactComponent as AllIcon } from "../../assets/icons/all.svg";
import { useAppDispatch, useAvailabilityFilter } from "../../hooks";
import { setAvailability } from "../../store/todo-actions";

const filters = [
  { text: "Disponible", icon: <AvailableIcon />, value: "available" },
  { text: "Reservado", icon: <ReservedIcon />, value: "reserved" },
  { text: "Apartado", icon: <TakenIcon />, value: "taken" },
  { text: "Vendido", icon: <SoldIcon />, value: "sold" },
  { text: "No disponible", icon: <NotAvailableIcon />, value: "nonavailable" },
  { text: "Todos", icon: <AllIcon />, value: "all" }
];
export const AvailabilityFilters = () => {
  const dispatch = useAppDispatch();
  const availability = useAvailabilityFilter();
  return (
    <Stack
      spacing={8}
      sx={{ height: "100%", paddingRight: "32px" }}
      alignContent="center"
      justifyContent="center"
    >
      {filters.map((filter) => (
        <Chip
          key={filter.value}
          sx={{
            width: 156,
            backgroundColor: "#F6F6F6",
            border: `1px solid ${
              filter.value === availability ? "#3948FF" : "#E4E4E7"
            }`,
            justifyContent: "space-between"
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
