import { useEffect } from "react";
import { Box, Card, Typography, Badge } from "@mui/material";
import {
  Spa as SpaIcon,
  Agriculture as AgricultureIcon,
  ArrowRight as ArrowRightIcon,
} from "@mui/icons-material/";

const styles = {
  textMatriz: {
    fontWeight: "900",
    backgroundColor: "#ff4757",
    borderRadius: 20,
    pl: 1,
    pr: 1,
    color: "white",
  },
};

const ListGarden = ({
  sizeX,
  sizeY,
  posNowX,
  posNowY,
  rotation,
  routersIrrigates = [],
}) => {
  //Valida qual é a posição atual do ROBO
  const onValidPositionRobot = (indexX, indexY) => {
    if ((posNowX === indexX) & (posNowY === indexY)) {
      return true;
    } else {
      return false;
    }
  };

  //Valida se local ja foi irrigado e quantas vezes
  const onGetRoutersIrrigates = (x, y) => {
    if (routersIrrigates.length == 0) {
      return { result: false, qtd: 0 };
    } else {
      let qtd = 0;

      for (let index = 0; index < routersIrrigates.length; index++) {
        const irrigate = routersIrrigates[index];

        if ((irrigate.x == x) & (irrigate.y == y)) {
          qtd += 1;
        }
      }

      if (qtd > 0) {
        return { result: true, qtd: qtd };
      } else {
        return { result: false, qtd: qtd };
      }
    }
  };

  //renderiza a Horta
  const renderGardenGrid = () => {
    let garden = [];

    for (let indexY = sizeY - 1; indexY > -1; indexY--) {
      let flowerbeds = [];

      for (let indexX = 0; indexX < sizeX; indexX++) {
        const { result: isIrrigate, qtd } = onGetRoutersIrrigates(
          indexX,
          indexY
        );

        if (indexX === 0) {
          flowerbeds.push(
            <Typography
              sx={{
                mr: 1,
                ...styles.textMatriz,
              }}
              key={`yText-${indexY}`}
            >
              {indexY}
            </Typography>
          );
        }
        flowerbeds.push(
          <Box>
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  color: "white",
                  backgroundColor: "#0984e3",
                  mt: 2.5,
                  mr: 0.9,
                },
              }}
              badgeContent={qtd}
            >
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                key={`x-${indexX}`}
                sx={{
                  p: onValidPositionRobot(indexX, indexY) ? 1 : 2,
                  pr: onValidPositionRobot(indexX, indexY) ? 0 : 2,
                  m: 0.5,
                  backgroundColor: "#4a2b07",
                }}
              >
                {onValidPositionRobot(indexX, indexY) ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={1}
                    mb={1}
                    pr={0.5}
                    pl={0.5}
                    style={{
                      transition: "transform 150ms ease",
                      transform: `rotate(${rotation}deg)`,
                    }}
                  >
                    <AgricultureIcon
                      style={{
                        height: 40,
                        width: 40,
                        color: "white",
                      }}
                    />
                    <ArrowRightIcon
                      sx={{ ml: -1 }}
                      style={{
                        color: "#ff4757",
                        height: 25,
                        width: 25,
                      }}
                    />
                  </Box>
                ) : (
                  <SpaIcon
                    style={{ color: "#7bed9f", height: 40, width: 40 }}
                  />
                )}
              </Card>
            </Badge>
            {indexY === 0 && (
              <Box display="flex" justifyContent="center">
                <Typography
                  sx={{
                    mt: 1,
                    ...styles.textMatriz,
                  }}
                >
                  {indexX}
                </Typography>
              </Box>
            )}
          </Box>
        );
      }

      garden.push(
        <Box key={`y-${indexY}`} display="flex" alignItems="center">
          {flowerbeds}
        </Box>
      );
    }

    return garden;
  };

  return (
    <Box mt={4} display="flex" justifyContent="center" >
      <Box
        style={{ backgroundColor: "black", borderRadius: 20 }}
        mr={1}
        height={sizeY * 80}
        width={20}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography sx={{ color: "white", fontSize: "10pt", textAlign: "center"}} variant="h6">
          Y
        </Typography>
      </Box>
      <Box>
        <Box>{renderGardenGrid()}</Box>
        <Box
          style={{ backgroundColor: "black", borderRadius: 20 }}
          mt={1}
          display="flex"
          justifyContent="center"
          ml={4.5}
        >
          <Typography sx={{ color: "white", fontSize: "10pt" }} variant="h6">
            X
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ListGarden;
