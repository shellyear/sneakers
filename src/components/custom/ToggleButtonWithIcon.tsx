import {
  ToggleButton as ToggleButtonMui,
  ToggleButtonProps,
  styled,
} from "@mui/material";
import React from "react";

interface ToggleButtonWithIconProps extends ToggleButtonProps {
  active?: boolean;
  icon: React.ReactNode;
  text: string;
  value: string;
  onClick?: (e: React.MouseEvent<HTMLElement>, value: any) => void;
}

const ToggleButton = styled(ToggleButtonMui)<{
  active?: boolean;
}>`
  ${({ theme }) => theme.typography.button}
  border-radius: 12px;
  height: 36px;
  border: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
  text-transform: none;
  gap: ${({ theme }) => theme.spacing(1)};

  ${({ active, theme }) =>
    active &&
    `    
      background: ${theme.palette.common.red};
      color: ${theme.palette.common.white};
      border: none;

      svg {
        path {
          stroke: ${theme.palette.common.white};
          fill:  ${theme.palette.common.white};
        }
      }

      &:hover {
        background: ${theme.palette.common.red};
        color: ${theme.palette.common.white};
      }
  `}
`;

export const ToggleButtonWithIcon = ({
  active,
  icon,
  text,
  value,
  onClick,
}: ToggleButtonWithIconProps) => {
  return (
    <ToggleButton size="small" active={active} value={value} onClick={onClick}>
      {icon}
      {text}
    </ToggleButton>
  );
};
