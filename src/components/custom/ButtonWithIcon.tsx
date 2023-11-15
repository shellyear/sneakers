import { Button, styled, ButtonProps } from "@mui/material";

const StyledButton = styled(Button)<{
  background?: string;
  height?: number;
}>(({ theme, background, height }) => ({
  height: height || theme.spacing(7),
  borderRadius: 12,
  width: "100%",
  ...(background && { background }),
  ...theme.typography.button,
}));

interface ButtonWithIconProps extends ButtonProps {
  text: string;
  buttonType?: "submit" | "reset" | "button"
  onClick?: () => void;
  background?: string;
  height?: number;
}

export const ButtonWithIcon = ({
  startIcon,
  text,
  onClick,
  background,
  height,
  buttonType = "button"
}: ButtonWithIconProps) => {
  return (
    <StyledButton
      type={buttonType}
      variant="contained"
      size="large"
      startIcon={startIcon}
      onClick={onClick}
      height={height}
      background={background}
    >
      {text}
    </StyledButton>
  );
};
