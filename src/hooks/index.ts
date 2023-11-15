import { useCallback, useState, ChangeEvent } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    openModal,
    closeModal,
  };
};