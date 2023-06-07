import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { ReactComponent as ButtonShare } from "../../../assets/icons/ShareButton.svg";
import { ReactComponent as ButtonLocation } from "../../../assets/icons/ButtonLocation.svg";
import { ReactComponent as ChatButton } from "../../../assets/icons/ChatButton.svg";
import { useTranslation } from "react-i18next";
import { FacebookShareButton } from "react-share";

export default function UtilitiesStratto() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>("ES");
  const handleClickES = () => {
    setLanguage("EN");
    i18n.changeLanguage("en");
  };

  const handleClickEN = () => {
    setLanguage("ES");
    i18n.changeLanguage("es");
  };
  const shareUrl = "https://showroom.athum.com";
  return (
    <Box
      sx={{
        position: "absolute",
        right: "10px",
        bottom: "16px",
      }}
    >
      <Stack direction="column" spacing={2} alignItems="center">
        <FacebookShareButton url={shareUrl}>
          <ButtonShare className="utiliti-stratto" />
        </FacebookShareButton>
        <div
          style={{
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {language === "ES" ? (
            <span onClick={handleClickES} className="utiliti-stratto">
              ES
            </span>
          ) : (
            <span onClick={handleClickEN} className="utiliti-stratto">
              EN
            </span>
          )}
        </div>
        <ButtonLocation className="utiliti-stratto" />
        <ChatButton className="utiliti-stratto" />
      </Stack>
    </Box>
  );
}
