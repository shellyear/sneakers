import { Button, Box } from "@mui/material";

import Modal from "@mui/material/Modal";
import { useState } from "react";

export const AddSnickersModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "0%",
            right: "0%",
            width: 400,
            height: "100%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Modal content goes here */}
          <h2>My Custom Modal</h2>
          <p>This is some modal content.</p>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};
