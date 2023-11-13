import {
  ToggleButton as ToggleButtonMui,
  ToggleButtonProps,
  styled,
} from "@mui/material";
import React from "react";

interface ToggleButtonWithIconProps extends ToggleButtonProps {
  icon: React.ReactNode;
  text: string;
  value: string;
  onClick?: (e: React.MouseEvent<HTMLElement>, value: any) => void;
}

const ToggleButton = styled(ToggleButtonMui)(({ theme }) => ({
  borderRadius: 12,
  height: 36,
  border: `1px solid ${theme.palette.primary.main}`,
  textTransform: "none",
  gap: theme.spacing(1),
}));

export const ToggleButtonWithIcon = ({
  icon,
  text,
  value,
  onClick,
}: ToggleButtonWithIconProps) => {
  return (
    <ToggleButton value={value} onClick={onClick}>
      {icon}
      {text}
    </ToggleButton>
  );
};
