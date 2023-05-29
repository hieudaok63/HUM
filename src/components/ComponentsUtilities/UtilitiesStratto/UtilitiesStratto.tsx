import { Box, Stack } from "@mui/material";
import { ReactComponent as ButtonShare } from "../../../assets/icons/ShareButton.svg";
import { ReactComponent as ButtonLangue } from "../../../assets/icons/ButtonLangue.svg";
import { ReactComponent as ButtonLocation } from "../../../assets/icons/ButtonLocation.svg";
import { ReactComponent as ChatButton } from "../../../assets/icons/ChatButton.svg";

export default function UtilitiesStratto() {
  return (
    <Box
      sx={{
        position: "absolute",
        right: "10px",
        bottom: "16px",
      }}
    >
      <Stack direction="column" spacing={2}>
        <ButtonShare className="utiliti-stratto" />
        <ButtonLangue className="utiliti-stratto" />
        <ButtonLocation className="utiliti-stratto" />
        <ChatButton className="utiliti-stratto" />
      </Stack>
    </Box>
  );
}
