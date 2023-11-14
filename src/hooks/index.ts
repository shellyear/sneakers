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


export const useForm = <T>(initial: T) => {
  const [formData, setFormData] = useState<T>(initial);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return {
    formData,
    setFormData,
    handleChange
  }
};
