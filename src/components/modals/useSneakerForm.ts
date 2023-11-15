import { useState, ChangeEvent, SyntheticEvent } from "react";

export type SneakerFormData = {
  name: string;
  brand: string;
  price: string;
  year: string;
  size: string;
  rating: number;
};

export const useSneakerForm = <SneakerFormData>(initial: SneakerFormData) => {
  const [formData, setFormData] = useState<SneakerFormData>(initial);

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

  return {
    formData,
    setFormData,
    handleChange,
    handleRatingChange,
  };
};
