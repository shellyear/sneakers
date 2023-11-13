import { Button, styled, ButtonProps } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  height: "48px",
  borderRadius: 12,
  width: "100%",
}));

interface ButtonWithIconProps extends ButtonProps {
  text: string;
  onClick?: () => void;
}

export const ButtonWithIcon = ({
  startIcon,
  text,
  onClick,
}: ButtonWithIconProps) => {
  return (
    <StyledButton
      variant="contained"
      size="large"
      startIcon={startIcon}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
};
