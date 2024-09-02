import { useState } from "react";
import star from "../../shared/assets/star.png";
import coloredStar from "../../shared/assets/coloredStar.png";

export const useScrap = () => {
  const [scrap, setScrap] = useState<string>(star);

  const scrapImage = () => {
    if (scrap === star) {
      setScrap(coloredStar);
    } else {
      setScrap(star);
    }
  };

  return {
    scrap,
    scrapImage,
  };
};
