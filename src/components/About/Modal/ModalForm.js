import React from "react";
import { Modal, Backdrop, Fade } from "@mui/material";
import About from "./about";

const styles = {
  modal: {
    display: "flex",
    justifyContent: "center",
    outline: 0,
  },
  div1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
  },
};

const ModalForm = ({ open = false, onCloseAbout }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-welcome"
      aria-describedby="transition-modal-welcome-and-name"
      style={styles.modal}
      className="egClass"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div
          className="egClass"
          style={{
            position: "absolute",
          }}
        >
          <div style={styles.div1}>
            <About onCloseAbout={onCloseAbout} />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalForm;
