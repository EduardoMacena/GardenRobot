import { useEffect } from "react";
import useState from "react-usestateref";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Header from "./components/Header";
import ListGarden from "./components/ListGarden";
import { showMessage } from "./util/functions";
import { Divider, Typography, Box } from "@mui/material";

//ORIENTATION = [N = NORTE, S = SUL, L = LEST, O = OEST]
//ROUTERS = [{x: 0, y: 0}]
//ROUTERS IRRIGATE = [{x: 0, y: 0}]

function App() {
  //States
  const [sizeX, setSizeX, refSizeX] = useState(0);
  const [sizeY, setSizeY, refSizeY] = useState(0);
  const [posStartX, setPosStartX, refPosStartX] = useState(0);
  const [posStartY, setPosStartY, refPosStartY] = useState(0);
  const [posNowX, setPosNowX, refPosNowX] = useState(0);
  const [posNowY, setPosNowY, refPosNowY] = useState(0);
  const [orientationBegin, setOrientationBegin, refOrientationBegin] =
    useState("L");
  const [rotation, setRotation, refRotation] = useState(0);
  const [posX, setPosX, refPosX] = useState("");
  const [posY, setPosY, refPosY] = useState("");
  const [routers, setRouters, refRouter] = useState([]);
  const [routersIrrigates, setRoutersIrrigates, refRoutersIrrigates] = useState(
    []
  );
  const [moviments, setMoviments, refMoviments] = useState([]);
  const [isOpenWelcome, setIsWelcome, refIsWelcome] = useState(true);
  const [isOpenAbout, setIsOpenAbout, refIsOpenAbout] = useState(false);

  const directions1 = [{ "-90": "N", 0: "L", 90: "S", 180: "O", "-180": "O" }];
  const directions2 = [{ N: -90, L: 0, S: 90, O: 180 }];

  //Fecha modal de bem vindo
  const onCloseWelcome = () => {
    if (!sizeX | !sizeY | !posStartX | !posStartX | (routers.length == 0)) {
      showMessage("Atenção", "Informações não foram digitados.", "warning");
      return;
    }

    if (routers.length == 0) {
      showMessage("Atenção", "Insira canteiros para irrigar.", "warning");
      return;
    }

    if ((posStartX < 0) | (posStartX > sizeX - 1)) {
      showMessage(
        "Atenção",
        `Insira uma posição X inicial válida de 0 a ${sizeX - 1}.`,
        "warning"
      );
      return;
    }

    if ((posStartY < 0) | (posStartY > sizeY - 1)) {
      showMessage(
        "Atenção",
        `Insira uma posição Y inicial válida de 0 a ${sizeY - 1}.`,
        "warning"
      );
      return;
    }

    setIsWelcome(false);
    onStartGame();
  };

  //Inseri as informações do input X horta
  const onChangeTextSizeX = (event) => {
    setSizeX(event ? event.target.value.replace(/\D/g, "") : "0");
  };

  //Inseri as informações do input Y horta
  const onChangeTextSizeY = (event) => {
    setSizeY(event ? event.target.value.replace(/\D/g, "") : "0");
  };

  //Inseri as informações do input Posição Inicial X
  const onChangeTextPosStartX = (event) => {
    setPosStartX(event ? event.target.value.replace(/\D/g, "") : "");
  };

  //Inseri as informações do input Posição Inicial Y
  const onChangeTextPosStartY = (event) => {
    setPosStartY(event ? event.target.value.replace(/\D/g, "") : "");
  };

  //Inseri as informações do input Posição X para rota
  const onChangeTextPosX = (event) => {
    setPosX(event ? event.target.value.replace(/\D/g, "") : "");
  };

  //Inseri as informações do input Posição Y para rota
  const onChangeTextPosY = (event) => {
    setPosY(event ? event.target.value.replace(/\D/g, "") : "");
  };

  //Adiciona uma nova rota
  const onInsertRoute = () => {
    if ((posX < 0) | (posX > sizeX - 1)) {
      showMessage(
        "Atenção",
        `Insira uma posição X inicial válida de 0 a ${sizeX - 1}.`,
        "warning"
      );
      return;
    }

    if ((posY < 0) | (posY > sizeY - 1)) {
      showMessage(
        "Atenção",
        `Insira uma posição Y inicial válida de 0 a ${sizeY - 1}.`,
        "warning"
      );
      return;
    }
    let arr = routers;
    arr.push({ x: posX, y: posY });

    setRouters(arr.filter(filterUpdateDom));

    setPosX("");
    setPosY("");
  };

  //Seleciona uma orientação inicial
  const onChangeOrientation = (event) => {
    setOrientationBegin(event.target.value);
  };

  const filterUpdateDom = (d, i) => {
    return i > -1 && d;
  };

  //Reseta as informações essenciais e volta ao inicio
  const onRestartGame = () => {
    setIsWelcome(true);
    setMoviments([]);
    setRouters([]);
    setRoutersIrrigates([]);
    setRotation(0);
    setPosNowX();
    setPosNowY();
    setPosStartX();
    setPosStartY();
  };

  //Start Routers
  const onStartGame = () => {
    onCreateRoute();
  };

  //fecha modal about
  const onCloseAbout = () => {
    setIsOpenAbout(false);
  };

  //abre modal about
  const onOpenAbout = () => {
    setIsOpenAbout(true);
  };

  //Calcula o caminho para cada rota
  const onCreateRoute = () => {
    let x = posNowX;
    let y = posNowY;
    let rot = rotation;
    const mov = moviments;

    for (let index = 0; index < routers.length; index++) {
      const router = routers[index];
      const xEnd = parseInt(router.x);
      const yEnd = parseInt(router.y);

      // Calcular movimentos horizontais
      if (x < xEnd) {
        switch (rot) {
          case 0:
            break;
          case 90:
            mov.push("E");
            rot -= 90;
            break;
          case -90:
            mov.push("D");
            rot += 90;
            break;
          case 180:
            mov.push("D");
            mov.push("D");
            rot -= 180;
            break;
          case -180:
            break;

          default:
            break;
        }

        while (x !== xEnd) {
          mov.push("M");
          x++;
        }
      } else if (x > xEnd) {
        switch (rot) {
          case 0:
            mov.push("D");
            mov.push("D");
            rot += 180;
            break;
          case 90:
            mov.push("D");
            rot += 90;
            break;
          case -90:
            mov.push("D");
            mov.push("D");
            mov.push("D");
            rot += 270;
            break;
          case 180:
            break;
          case -180:
            break;

          default:
            break;
        }

        while (x !== xEnd) {
          mov.push("M");
          x--;
        }
      }

      // Calcular movimentos horizontais
      if (y < yEnd) {
        switch (rot) {
          case 0:
            mov.push("E");
            rot -= 90;
            break;
          case 90:
            mov.push("E");
            mov.push("E");
            rot -= 180;
            break;
          case -90:
            break;
          case 180:
            mov.push("E");
            mov.push("E");
            mov.push("E");
            rot -= 270;
            break;
          case -180:
            break;

          default:
            break;
        }

        while (y !== yEnd) {
          mov.push("M");
          console.log("y: " + y);
          console.log(mov);
          y++;
        }
      } else if (y > yEnd) {
        switch (rot) {
          case 0:
            mov.push("D");
            rot += 90;
            break;
          case 90:
            break;
          case -90:
            mov.push("D");
            mov.push("D");
            rot += 180;
            break;
          case 180:
            mov.push("E");
            rot -= 90;
            break;
          case -180:
            break;

          default:
            break;
        }

        while (y !== yEnd) {
          mov.push("M");
          y--;
        }
      }

      mov.push("I");
    }

    setMoviments(mov.filter(filterUpdateDom));
  };

  //Inicia os movimentos do Robo
  const onCreateTrafficRobot = () => {
    let rot = rotation;
    let i = -1;

    for (let indexR = 0; indexR < moviments.length; indexR++) {
      const moviment = moviments[indexR];

      console.log(moviment);
      setTimeout(() => {
        switch (moviment) {
          case "D":
            rot += 90;
            setRotation(rot);
            break;
          case "E":
            rot = rot - 90;
            setRotation(rot);
            break;
          case "M":
            onMovimentRobot(rot);
            break;
          case "I":
            i++;
            const arr = routersIrrigates;
            arr.push({ x: routers[i].x, y: routers[i].y });
            setRoutersIrrigates(arr.filter(filterUpdateDom));
            break;
          default:
            break;
        }
      }, (indexR + 1) * 1000);
    }
  };

  //Movimenta o robo para N, S, L e O
  const onMovimentRobot = (rot) => {
    const typeOrientation = directions1[0][rot];
    console.log(typeOrientation, rot);
    switch (typeOrientation) {
      case "N":
        setPosNowY(refPosNowY.current + 1);
        break;
      case "S":
        setPosNowY(refPosNowY.current - 1);
        break;
      case "L":
        setPosNowX(refPosNowX.current + 1);
        break;
      case "O":
        setPosNowX(refPosNowX.current - 1);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setPosNowX(parseInt(posStartX));
    setPosNowY(parseInt(posStartY));
  }, [posStartX, posStartY]);

  useEffect(() => {
    setRotation(directions2[0][orientationBegin]);
  }, [orientationBegin]);

  useEffect(() => {
    if (moviments.length > 0) {
      onCreateTrafficRobot();
    }
  }, [moviments]);

  return (
    <div className="App">
      <Header
        isOpenWelcome={isOpenWelcome}
        onStartGame={onRestartGame}
        onOpenAbout={onOpenAbout}
      />

      <Box display="flex">
        <Box ml={9.5} mt={2} mb={2}>
          <Typography variant="body1" sx={{ fontSize: "11pt" }}>
            Posição Inicial: {`(${posStartX},${posStartY})`}{" "}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "11pt" }}>
            Orientação Inicial: {orientationBegin}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "11pt" }}>
            Canteiros a Irregar:{" "}
            {routers.map((router) => `(${router.x},${router.y})`)}
          </Typography>
        </Box>
        <Divider orientation="vertical" />
        <Box ml={9.5} mt={2} mb={2}>
          <Typography variant="body1" sx={{ fontSize: "11pt" }}>
            Caminho Percorrido: {`${moviments}`}{" "}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "11pt" }}>
            Orientação Final: {directions1[0][refRotation.current]}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <ListGarden
        sizeX={sizeX}
        sizeY={sizeY}
        posNowX={posNowX}
        posNowY={posNowY}
        rotation={rotation}
        routersIrrigates={routersIrrigates}
      />

      <Welcome
        open={isOpenWelcome}
        sizeX={sizeX}
        sizeY={sizeY}
        posStartX={posStartX}
        posStartY={posStartY}
        posX={posX}
        posY={posY}
        routers={routers}
        orientationBegin={orientationBegin}
        onCloseWelcome={onCloseWelcome}
        onChangeTextSizeX={onChangeTextSizeX}
        onChangeTextSizeY={onChangeTextSizeY}
        onChangeTextPosStartX={onChangeTextPosStartX}
        onChangeTextPosStartY={onChangeTextPosStartY}
        onChangeTextPosX={onChangeTextPosX}
        onChangeTextPosY={onChangeTextPosY}
        onInsertRoute={onInsertRoute}
        onChangeOrientation={onChangeOrientation}
      />

      <About open={isOpenAbout} onCloseAbout={onCloseAbout} />
    </div>
  );
}

export default App;
