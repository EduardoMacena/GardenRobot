import React, { useState, useEffect } from "react";
import {
  CardContent,
  Card,
  Typography,
  InputBase,
  Button,
  Hidden,
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import logo from "../../../imgs/logo-preview.png";

const styles = {
  typographyCenter: {
    textAlign: "center",
    fontWeight: "900",
    color: "#005bea",
  },
  typographyBasicInput: {
    fontWeight: "900",
    ml: 4,
  },
  typographyBasic: {
    fontWeight: "500",
    ml: 4,
  },
  box: {
    display: "flex",
    justifyContent: "center",
    mb: 15,
  },
  boxDefault: {
    display: "flex",
    justifyContent: "center",
  },
  bodyInput: {
    borderWidth: 0.3,
    borderStyle: "solid",
    borderRadius: 2,
    width: "100%",
    height: 40,
    borderColor: "white",
    boxShadow: "1px 0px 6px -3px rgba(0,0,0,1)",
    WebkitBoxShadow: "1px 0px 6px -3px rgba(0,0,0,1)",
    MozBoxShadow: "1px 0px 6px -3px rgba(0,0,0,1)",
    backgroundColor: "white",
  },
  inputProps: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: "12pt",
  },
  button: {
    mt: 1,
    borderRadius: 2,
    backgroundColor: "#4a2b07",
    color: "white",
    fontWeight: "900",
    ":hover": {
      backgroundColor: "#381b02",
    },
  },
  button2: {
    mt: 1,
    borderRadius: 2,
    backgroundColor: "#bd6908",
    color: "white",
    fontWeight: "900",
    ":hover": {
      backgroundColor: "#8f4f06",
    },
  },
  cardcontent: {
    width: `${40}vw`,
    height: `${90}vh`,
    minWidth: "350px",
    minHeight: "350px",
  },
  textRouter: {
    margin: 0,
  },
  cardInfo: {
    p: 2,
    mt: 0.5,
    mb: 2,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 5,
  },
};

const Formulario = ({
  routers,
  sizeX,
  sizeY,
  posStartX,
  posStartY,
  posX,
  posY,
  orientationBegin,
  onCloseWelcome,
  onChangeTextSizeX,
  onChangeTextSizeY,
  onChangeTextPosStartX,
  onChangeTextPosStartY,
  onChangeTextPosX,
  onChangeTextPosY,
  onInsertRoute,
  onChangeOrientation,
}) => {
  const listOrientation = [
    { ori: "Norte", sigla: "N" },
    { ori: "Sul", sigla: "S" },
    { ori: "Leste", sigla: "L" },
    { ori: "Oeste", sigla: "O" },
  ];

  return (
    <Card
      style={{
        borderRadius: 20,
      }}
    >
      <CardContent style={styles.cardcontent}>
        <Box sx={styles.box}>
          <Typography
            sx={{ ...styles.typographyCenter, color: "#2ecc71" }}
            variant="h4"
          >
            Garden
          </Typography>
          <Typography
            sx={{ ...styles.typographyCenter, color: "#4a2b07" }}
            variant="h4"
          >
            Robot
          </Typography>
        </Box>
        <Box sx={{ mb: 0, mt: -15, ...styles.boxDefault }}>
          <Hidden xsDown={true} smDown={true} mdDown={true}>
            <img
              src={logo}
              height="100px"
              width="120px"
              style={{ margin: 0 }}
            />
          </Hidden>
        </Box>
        <Box>
          <Typography sx={styles.typographyBasic} variante="h6">
            Tamanho da horta
          </Typography>
          <Card sx={styles.cardInfo}>
            <Box display="flex" justifyContent="center">
              <Box mr={2}>
                <Typography sx={styles.typographyBasicInput} variante="h6">
                  Tam. X da horta
                </Typography>
                <InputBase
                  onChange={onChangeTextSizeX}
                  placeholder="0"
                  value={sizeX}
                  sx={styles.bodyInput}
                  inputProps={{ style: styles.inputProps }}
                />
              </Box>
              <Box ml={2}>
                <Typography sx={styles.typographyBasicInput} variante="h6">
                  Tam. Y da horta
                </Typography>
                <InputBase
                  onChange={onChangeTextSizeY}
                  placeholder="0"
                  value={sizeY}
                  sx={styles.bodyInput}
                  inputProps={{ style: styles.inputProps }}
                />
              </Box>
            </Box>
          </Card>

          <Typography sx={styles.typographyBasic} variante="h6">
            Posição Inicial
          </Typography>
          <Card sx={styles.cardInfo}>
            <Box display="flex" justifyContent="center">
              <Box mr={2}>
                <Typography sx={styles.typographyBasicInput} variante="h6">
                  Posic. X
                </Typography>
                <InputBase
                  onChange={onChangeTextPosStartX}
                  placeholder="0"
                  value={posStartX}
                  sx={styles.bodyInput}
                  type="numeric"
                  inputProps={{ style: styles.inputProps }}
                />
              </Box>
              <Box ml={2}>
                <Typography sx={styles.typographyBasicInput} variante="h6">
                  Posic. Y
                </Typography>
                <InputBase
                  onChange={onChangeTextPosStartY}
                  placeholder="0"
                  value={posStartY}
                  sx={styles.bodyInput}
                  type="numeric"
                  inputProps={{ style: styles.inputProps }}
                />
              </Box>
              <Box ml={2}>
                <Typography sx={styles.typographyBasicInput} variante="h6">
                  Orientação
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={orientationBegin}
                  label="Age"
                  onChange={onChangeOrientation}
                >
                  {listOrientation.map((orientation) => (
                    <MenuItem value={orientation.sigla}>
                      {orientation.ori}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Card>

          <Typography sx={{ ...styles.typographyBasic, mt: 2.5 }} variante="h6">
            Canteiros a irrigar
          </Typography>
          <Card sx={styles.cardInfo}>
            <Box display="flex" justifyContent="center">
              <Box mr={2}>
                <Typography sx={styles.typographyBasicInput} variante="h6">
                  X da horta
                </Typography>

                <InputBase
                  onChange={onChangeTextPosX}
                  placeholder="0"
                  value={posX}
                  sx={styles.bodyInput}
                  type="numeric"
                  inputProps={{ style: styles.inputProps }}
                />
              </Box>
              <Box ml={2}>
                <Typography sx={styles.typographyBasicInput} variante="h6">
                  Y da horta
                </Typography>
                <InputBase
                  onChange={onChangeTextPosY}
                  placeholder="0"
                  value={posY}
                  sx={styles.bodyInput}
                  type="numeric"
                  inputProps={{ style: styles.inputProps }}
                />
              </Box>

              <Button
                onClick={onInsertRoute}
                sx={{ ...styles.button2, ml: 2 }}
                variant="contained"
              >
                Adicionar
              </Button>
            </Box>
          </Card>
          <Card
            sx={{
              p: 0.5,
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: 3,
              borderRadius: 2,
            }}
          >
            <Box display="flex" flexWrap="wrap" alignItems="center">
              <Typography sx={styles.typographyBasicInput} variante="h6">
                Rotas:
              </Typography>
              {routers.map((router) => {
                return (
                  <p style={{ ...styles.textRouter, marginLeft: 10 }}>
                    ({`${router.x}, ${router.y}`}),{" "}
                  </p>
                );
              })}
            </Box>
          </Card>

          <Button
            onClick={onCloseWelcome}
            sx={styles.button}
            fullWidth
            variant="contained"
          >
            Iniciar Rota
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Formulario;
