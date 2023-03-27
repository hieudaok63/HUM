import { Chip, Stack, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Image2D = [
  {
    id: 3,
    name: "3",
    image:
      "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  },
  {
    id: 2,
    name: "2",
    image:
      "https://ims.imgix.net/uploads/ims/asset/attachment/13929/e-207-307.jpg",
  },
  {
    id: 1,
    name: "1",
    image: "https://ims.imgix.net/uploads/ims/asset/attachment/13921/e-106.jpg",
  },
  {
    id: 4,
    name: "PB",
    image:
      "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  },
];
export const Location2D = () => {
  const [level, setLevel] = useState<number>(1);
  const getImage = Image2D.filter((image2d) => image2d.id === level);
  const mobile = useMediaQuery("(max-width:600px)");

  const nameImage = Image2D?.map((nameImage) => nameImage.name);
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setLevel(Number(value));
  };
  return (
    <>
      {!mobile && (
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "114px",
              backgroundColor: "#D9D9D9",
              position: "fixed",
              right: "0",
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
              }}
            >
              <p
                style={{
                  fontWeight: "500",
                }}
              >
                LEVEL
              </p>
              {Image2D?.map((image) => (
                <Chip
                  key={image.id}
                  sx={{
                    backgroundColor: level === image.id ? "#B2FFEE" : "#F6F6F6",
                    border: `2px solid ${
                      level === image.id ? "#46949C" : "#F6F6F6"
                    }`,

                    width: "81px",
                    height: "36px",
                    margin: "10px 0",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                  label={image.name}
                  onClick={() => setLevel(image.id)}
                />
              ))}
            </Stack>
          </div>
          <img
            src={getImage[0]?.image}
            title="hieudao"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      )}
      {mobile && (
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Select
            id="demo-multiple-chip"
            value={level}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={() => (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2.5,
                  width: "100px",
                }}
              >
                <Chip
                  key={level}
                  label={`Level: ${level}`}
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                />
              </Box>
            )}
            sx={{
              position: "fixed !important",
              right: "-20px",
              bottom: "0px",
              backgroundColor: "#000",
              borderRadius: "",
              //   width: "inherit",
            }}
          >
            {nameImage?.map((name: any) => (
              <MenuItem
                key={name}
                value={name}
                sx={{
                  backgroundColor: "#fff !important",
                  width: "300px !important",
                  display: "flex !important",
                  justifyContent: "center !important",
                  height: "36px",
                  borderRadius: "24px",
                  marginBottom: "11px",
                }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          <img
            src={getImage[0]?.image}
            title="hieudao"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      )}
    </>
  );
};
