import { styled } from "@mui/material";
import React from "react";

type SliderProps = {
  children: React.ReactNode;
};

const Container = styled("div")`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const Slider = ({ children }: SliderProps) => {
  return (
    <Container className="scroll-slider">
      <div style={{ display: "flex" }}>{children}</div>
    </Container>
  );
};
