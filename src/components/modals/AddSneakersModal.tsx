import { Box, styled, Typography, InputLabel, Rating } from "@mui/material";

import Modal from "@mui/material/Modal";
import { ReactComponent as CloseIcon } from "../static/images/close.svg";
import { OutlinedInputCustom } from "../custom/OutlinedInputCustom";
import { ChangeEvent, useState } from "react";
import { ButtonWithIcon } from "../custom/ButtonWithIcon";
import { ReactComponent as PlusIcon } from "../static/images/plus.svg";
import { theme } from "../../static/styles/theme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sneakerApi } from "../../api";
import { Sneaker } from "../../types";

type AddSneakersModalProps = {
  open: boolean;
  handleClose: () => void;
  initialFormState?: FormData;
};

type FormData = {
  name: string;
  brand: string;
  price: string;
  year: string;
  size: string;
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

const Label = styled(InputLabel)(({ theme }) => ({
  ...theme.typography.body2,
}));

const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const isValidData = (data: FormData): boolean =>
  Object.values(data).every((value) => value !== "");

const inputItems = [
  { id: "name", name: "Name" },
  { id: "brand", name: "Brand" },
  { id: "price", name: "Price", type: "number" },
  { id: "size", name: "Size US", type: "number" },
  { id: "year", name: "Year", type: "number" },
];

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

const initialFormData = {
  name: "",
  brand: "",
  price: "",
  size: "",
  year: "",
};

export const AddSneakersModal = ({
  open,
  handleClose,
  initialFormState = initialFormData,
}: AddSneakersModalProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>(initialFormState);

  const { mutate: addSneakers } = useMutation({
    mutationKey: ["/add-snikers"],
    mutationFn: (data: Partial<Sneaker>) => sneakerApi.addSneaker(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-sneakers"] });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onClose = () => {
    setFormData(initialFormState);
    handleClose();
  };

  const onSubmit = () => {
    if (isValidData(formData)) {
      addSneakers({
        ...formData,
        price: formData.price ? Number(formData.price) : undefined,
        size: formData.size ? Number(formData.size) : undefined,
        year: formData.size ? Number(formData.year) : undefined,
      });
      setFormData(initialFormState);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Header>
          <Typography variant="h2" component="h2">
            Add sneakers to your collection
          </Typography>
          <Box width={24} height={24} onClick={onClose}>
            <CloseIcon />
          </Box>
        </Header>
        <Box mt={6} component="form">
          <FormInputs onChange={handleChange} data={formData} />
          <Box mt={11}>
            <ButtonWithIcon
              startIcon={<PlusIcon />}
              onClick={onSubmit}
              text="Add new sneakers"
            />
          </Box>
        </Box>
      </ModalContainer>
    </Modal>
  );
};
