import { Button, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  height: "48px",
  borderRadius: 12,
  width: "100%",
  minWidth: "235px"
}));

type ButtonWithIconProps = {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
};

export const ButtonWithIcon = ({
  icon,
  text,
  onClick,
}: ButtonWithIconProps) => {
  return (
    <StyledButton
      variant="contained"
      size="large"
      startIcon={icon}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
};
