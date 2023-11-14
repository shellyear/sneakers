import { Box, styled, useMediaQuery } from "@mui/material";
import { theme } from "../../static/styles/theme";
import { ButtonWithIcon } from "../../components/custom/ButtonWithIcon";
import { ReactComponent as PlusIcon } from "../../static/images/plus.svg";

type Footer = {
  openModal: () => void;
  sneakersExist?: boolean;
};

const Fixed = styled(Box)`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 128px;
  background: ${({ theme }) => theme.palette.common.white};
  padding: 16px 22px 0;
  border: ${({ theme }) => `1px solid ${theme.palette.divider}`};
`;

export const Controls = ({ openModal, sneakersExist }: Footer) => {
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  if (isMd) {
    return null;
  }

  if (!sneakersExist) {
    return (
      <Box mt={24.5}>
        <ButtonWithIcon
          startIcon={<PlusIcon />}
          text="Add new sneakers"
          onClick={openModal}
        />
      </Box>
    );
  }

  return (
    <Fixed>
      <ButtonWithIcon
        startIcon={<PlusIcon />}
        text="Add new sneakers"
        onClick={openModal}
      />
    </Fixed>
  );
};
