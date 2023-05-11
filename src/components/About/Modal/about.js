import React, { useState, useEffect } from "react";
import {
  CardContent,
  Card,
  CardHeader,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

const styles = {
  cardcontent: {
    width: `350px`,
  },
};

const Formulario = ({ onCloseAbout }) => {
  return (
    <Card
      style={{
        borderRadius: 20,
      }}
    >
      <CardHeader
        subheader={"Informações do GardenRobot"}
        title={"Sobre"}
        titleTypographyProps={{
          sx: {
            fontWeight: "bold",
          },
          variant: "h6",
        }}
      />
      <Divider />
      <CardContent style={styles.cardcontent}>
        <Typography sx={{ textAlign: "center", ml: 4, mr: 4 }}>
          O site GardenRobot foi desenvolvido e é mantido pelo desenvolvedor
          Eduardo Bandeira Macena. ✌😁
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button
            sx={{ mt: 5, mb: 1 }}
            onClick={onCloseAbout}
            variant="contained"
          >
            Sair
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Formulario;
