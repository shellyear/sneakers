import {
  ToggleButton as ToggleButtonMui,
  ToggleButtonProps,
  styled,
} from "@mui/material";
import React from "react";

interface ToggleButtonWithIconProps extends ToggleButtonProps {
  icon: React.ReactNode;
  text: string;
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
}: ToggleButtonWithIconProps) => {
  return (
    <ToggleButton value={value}>
      {icon}
      {text}
    </ToggleButton>
  );
};
