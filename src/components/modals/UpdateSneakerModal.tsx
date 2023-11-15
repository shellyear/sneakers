import { SneakerData } from "../../types";
import { SneakerModalTemplate } from "./SneakerModalTemplate";
import { Box, styled, Button, useTheme } from "@mui/material";
import { ButtonWithIcon } from "../custom/ButtonWithIcon";
import { ReactComponent as TrashIcon } from "../../static/images/trash.svg";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { sneakerApi } from "../../api";
import { useRefetch } from "../../context";
import { useSneakerForm } from "./useSneakerForm";
import { FormEvent } from "react";

type UpdateSneakerModalProps = {
  open: boolean;
  handleClose: () => void;
  data: SneakerData;
};

const ButtonGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;

  svg {
    path {
      fill: ${({ theme }) => theme.palette.common.white};
    }
  }
`;

const SaveButton = styled(Button)(({ theme }) => ({
  height: theme.spacing(7),
  background: theme.palette.secondary.main,
  borderRadius: 12,
  color: theme.palette.secondary.dark,
}));

export const UpdateSneakerModal = ({
  open,
  handleClose,
  data,
}: UpdateSneakerModalProps) => {
  const theme = useTheme();
  const refetchSneakers = useRefetch();
  const queryClient = new QueryClient();
  const { formData, handleChange, handleRatingChange, resetFormData } =
    useSneakerForm<SneakerData>(data);

  const { mutate: updateSneaker } = useMutation({
    mutationKey: ["/update-sneaker"],
    mutationFn: (data: SneakerData) => sneakerApi.updateSneaker(data),
    onSuccess: () => {
      refetchSneakers();
    },
  });

  const { mutate: deleteSneaker } = useMutation({
    mutationKey: ["/delete-sneaker"],
    mutationFn: (id: string) => sneakerApi.deleteSneaker(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-sneakers"] });
    },
    onSettled: () => {
      refetchSneakers();
      handleClose();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSneaker(formData);
  };

  const onClose = () => {
    resetFormData();
    handleClose();
  };

  return (
    <SneakerModalTemplate
      title={data.name}
      open={open}
      onClose={onClose}
      onChange={handleChange}
      onRatingChange={handleRatingChange}
      onSubmit={onSubmit}
      formData={formData}
      controls={
        <ButtonGroup mt={11}>
          <SaveButton type="submit" variant="contained">
            Save
          </SaveButton>
          <ButtonWithIcon
            startIcon={<TrashIcon />}
            onClick={() => deleteSneaker(data._id)}
            text="Delete"
            background={theme.palette.common.red}
          />
        </ButtonGroup>
      }
    />
  );
};
