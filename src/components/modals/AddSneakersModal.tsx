import { Box } from "@mui/material";
import { ButtonWithIcon } from "../custom/ButtonWithIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sneakerApi } from "../../api";
import { Sneaker } from "../../types";
import { SneakerModalTemplate } from "./SneakerModalTemplate";
import { ReactComponent as PlusIcon } from "../../static/images/plus.svg";
import { useForm } from "../../hooks";

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

const isValidData = (data: FormData): boolean =>
  Object.values(data).every((value) => value !== "");

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
}: AddSneakersModalProps) => {
  const queryClient = useQueryClient();
  const { formData, setFormData, handleChange } =
    useForm<FormData>(initialFormData);

  const { mutate: addSneakers } = useMutation({
    mutationKey: ["/add-sneakers"],
    mutationFn: (data: Partial<Sneaker>) => sneakerApi.addSneaker(data),
    onSuccess: () => {
      // refetch sneakers when needed
      queryClient.invalidateQueries({ queryKey: ["get-sneakers"] });
    },
    onSettled: () => {
      handleClose()
    }
  });

  const onClose = () => {
    setFormData(initialFormData);
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
      setFormData(initialFormData);
    }
  };

  return (
    <SneakerModalTemplate
      title="Add sneakers to your collection"
      open={open}
      onClose={onClose}
      onChange={handleChange}
      formData={formData}
      controls={
        <Box mt={11}>
          <ButtonWithIcon
            startIcon={<PlusIcon />}
            onClick={onSubmit}
            text="Add new sneakers"
          />
        </Box>
      }
    />
  );
};
