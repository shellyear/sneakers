import { Box, styled, Typography, InputLabel, Rating } from "@mui/material";

import Modal from "@mui/material/Modal";
import { ReactComponent as CloseIcon } from "../images/close.svg";
import { OutlinedInputCustom } from "./custom/OutlinedInputCustom";
import { FormEvent } from "react";
import { ButtonWithIcon } from "./ButtonWithIcon";
import { ReactComponent as PlusIcon } from "../images/plus.svg";
import { theme } from "../styles/theme";

const ModalContainer = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  position: "absolute",
  top: 0,
  right: 0,
  height: "100%",
  width: "95%",
  overflow: "scroll",
  background: theme.palette.background.paper,
  padding: `${theme.spacing(9)} ${theme.spacing(3)} ${theme.spacing(
    7
  )} ${theme.spacing(3)}`,
  [theme.breakpoints.up(420)]: {
    width: 408,
  },
  [theme.breakpoints.up("md")]: {
    width: 524,
    padding: `${theme.spacing(9)} ${theme.spacing(6)} ${theme.spacing(
      22.75
    )} ${theme.spacing(6)}`,
  },
}));

const Label = styled(InputLabel)(({ theme }) => ({
  ...theme.typography.body2,
}));

const Header = styled("div")`
  display: flex;
  gap: 5px;
`;

type AddSneakersModalProps = {
  open: boolean;
  handleClose: () => void;
};

const RatingGroup = () => (
  <Box mt={3}>
    <Label>Rate</Label>
    <Rating
      // value={value}
      // onChange={(event, newValue) => {
      //   setValue(newValue);
      // }}
      sx={{
        "& .MuiRating-icon": {
          color: theme.palette.primary.main,
        },
      }}
    />
  </Box>
);

const InputGroup = ({ id, name }: { id: string; name: string }) => (
  <Box mt={3}>
    <Label htmlFor={id} variant="standard">
      {name}
    </Label>
    <OutlinedInputCustom id={id} fullWidth />
  </Box>
);

const Inputs = () => {
  return (
    <>
      <InputGroup id="name" name="Name" />
      <InputGroup id="brand" name="Brand" />
      <InputGroup id="price" name="Price" />
      <InputGroup id="size-us" name="Size us" />
      <InputGroup id="year" name="Year" />
      <RatingGroup />
    </>
  );
};

export const AddSneakersModal = ({
  open,
  handleClose,
}: AddSneakersModalProps) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>
        <Header>
          <Typography variant="h2" component="h2">
            Add sneakers to your collection
          </Typography>
          <Box width={24} height={24} onClick={handleClose}>
            <CloseIcon />
          </Box>
        </Header>
        <Box mt={6} component="form" onSubmit={onSubmit}>
          <Inputs />
          <Box mt={11}>
            <ButtonWithIcon icon={<PlusIcon />} text="Add new sneakers" />
          </Box>
        </Box>
      </ModalContainer>
    </Modal>
  );
};
