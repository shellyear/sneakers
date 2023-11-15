import { Box } from "@mui/material";
import { ButtonWithIcon } from "../custom/ButtonWithIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sneakerApi } from "../../api";
import { Sneaker, SneakerData } from "../../types";
import { SneakerModalTemplate } from "./SneakerModalTemplate";
import { ReactComponent as PlusIcon } from "../../static/images/plus.svg";
import { useSneakerForm } from "./useSneakerForm";
import { FormEvent } from "react";

type AddSneakersModalProps = {
  open: boolean;
  handleClose: () => void;
  initialFormState?: FormData;
};

const initialFormData = {
  _id: Math.random().toString(),
  name: "",
  brand: "",
  price: 0,
  size: 0,
  year: 0,
  rating: 0,
};

export const AddSneakersModal = ({
  open,
  handleClose,
}: AddSneakersModalProps) => {
  const queryClient = useQueryClient();
  const { formData, setFormData, handleChange, handleRatingChange } =
    useSneakerForm<SneakerData>(initialFormData);

  const { mutate: addSneaker } = useMutation({
    mutationKey: ["/add-sneakers"],
    mutationFn: (data: Partial<Sneaker>) => sneakerApi.addSneaker(data),
    onSuccess: () => {
      // refetch sneakers when needed
      queryClient.invalidateQueries({ queryKey: ["get-sneakers"] });
    },
    onSettled: () => {
      handleClose();
    },
  });

  const onClose = () => {
    setFormData(initialFormData);
    handleClose();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { _id, ...rest } = formData;
    addSneaker({
      ...rest,
      price: rest.price ? Number(rest.price) : undefined,
      size: rest.size ? Number(rest.size) : undefined,
      year: rest.size ? Number(rest.year) : undefined,
    });
    setFormData(initialFormData);
  };

  return (
    <SneakerModalTemplate
      title="Add sneakers to your collection"
      open={open}
      onClose={onClose}
      onChange={handleChange}
      onRatingChange={handleRatingChange}
      onSubmit={onSubmit}
      formData={formData}
      controls={
        <Box mt={11}>
          <ButtonWithIcon
            buttonType="submit"
            startIcon={<PlusIcon />}
            text="Add new sneakers"
          />
        </Box>
      }
    />
  );
};
