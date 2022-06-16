import React from "react";
import CatIcon from "./assets/svg/CatIcon";

const IconProvider = (Icon) => ({
  toReactElement: ({ animation, ...props }) => <Icon {...props} />,
});

export const AssetIconsPack = {
  name: "assets",
  icons: {
    cat: IconProvider(CatIcon),
  },
};
