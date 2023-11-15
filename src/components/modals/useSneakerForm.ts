import { useState, ChangeEvent, SyntheticEvent } from "react";
import { SneakerData } from "../../types";

export const isValidFormData = (data: SneakerData): boolean =>
  Object.values(data).every((value) => value !== "" && value !== 0);

export const useSneakerForm = <SneakerData>(initial: SneakerData) => {
  const [formData, setFormData] = useState<SneakerData>(initial);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (
    event: SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setFormData((prevData) => ({
        ...prevData,
        rating: newValue,
      }));
    }
  };

  const resetFormData = () => {
    setFormData(initial);
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleRatingChange,
    resetFormData,
  };
};
