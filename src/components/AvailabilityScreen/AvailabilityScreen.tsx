import { useState } from "react";
import AvailabilityModal from "./AvailabilityModal";
import { UtilitiesStratto } from "../ComponentsUtilities";

export default function AvailabilityScreen() {
  const [openModalAvail, setOpenModalAvai] = useState<boolean>(true);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
      }}
    >
      {openModalAvail && <AvailabilityModal />}
      <UtilitiesStratto />
    </div>
  );
}
