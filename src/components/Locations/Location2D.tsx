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
  const mobile = useMediaQuery("(max-width:1024px)");

  const nameImage = Image2D?.map((nameImage) => nameImage.name);
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setLevel(Number(value));
  };

  return (
    <iframe src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4#t=0.001"></iframe>
  );
};
