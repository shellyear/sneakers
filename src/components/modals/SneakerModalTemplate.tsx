import React, { ChangeEvent } from "react";
import {
  Box,
  InputLabel,
  Modal,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import { OutlinedInputCustom } from "../custom/OutlinedInputCustom";
import { Sneaker } from "../../types";
import { theme } from "../../static/styles/theme";
import { ReactComponent as CloseIcon } from "../../static/images/close.svg";

type FormData = {
  name: string;
  brand: string;
  price: string;
  year: string;
  size: string;
};

type SneakerModalTemplateProps = {
  open: boolean;
  title?: string;
  formData: any;
  controls: React.ReactNode;
  onClose: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type InputGroupProps = {
  id: string;
  name: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

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

const RatingGroup = () => (
  <Box mt={3}>
    <Label>Rate</Label>
    <Rating
      sx={{
        "& .MuiRating-icon": {
          color: theme.palette.primary.main,
        },
      }}
    />
  </Box>
);

const Label = styled(InputLabel)(({ theme }) => ({
  ...theme.typography.body2,
}));

const inputItems = [
  { id: "name", name: "Name" },
  { id: "brand", name: "Brand" },
  { id: "price", name: "Price", type: "number" },
  { id: "size", name: "Size US", type: "number" },
  { id: "year", name: "Year", type: "number" },
];

const FormGroup = ({
  id,
  name,
  type = "text",
  value,
  onChange,
}: InputGroupProps) => (
  <Box mt={3}>
    <Label htmlFor={id} variant="standard">
      {name}
    </Label>
    <OutlinedInputCustom
      id={id}
      name={id}
      value={value}
      type={type}
      onChange={onChange}
      required
      fullWidth
    />
  </Box>
);

const FormInputs = ({
  onChange,
  data,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  data: FormData;
}) => {
  return (
    <>
      {inputItems.map((input) => (
        <FormGroup
          id={input.id}
          key={input.id}
          name={input.name}
          type={input.type}
          onChange={onChange}
          value={data && data[input.id as keyof Sneaker]}
        />
      ))}
      <RatingGroup />
    </>
  );
};

export const SneakerModalTemplate = ({
  open,
  onClose,
  onChange,
  formData,
  title,
  controls,
}: SneakerModalTemplateProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Box display="flex" justifyContent="space-between" gap="5px">
          <Typography variant="h2" component="h2">
            {title}
          </Typography>
          <Box width={24} height={24} onClick={onClose}>
            <CloseIcon />
          </Box>
        </Box>
        <Box mt={6} component="form">
          <FormInputs onChange={onChange} data={formData} />
          {controls}
        </Box>
      </ModalContainer>
    </Modal>
  );
};
