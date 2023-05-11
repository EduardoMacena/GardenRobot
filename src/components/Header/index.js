import { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Info as InfoIcon,
  PlayCircleFilled as PlayCircleFilledIcon,
} from "@mui/icons-material/";

const styles = {
  boxRow: {
    display: "flex",
  },
  boxRowBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  boxRowAlignCenter: {
    display: "flex",
    alignItems: "center",
  },
};

const Header = ({
  isOpenWelcome = true,
  nameUser = "",
  onStartGame,
  onOpenAbout,
}) => {
  const name = String(nameUser).split(" ");
  const [anchorEl, setAnchorEl] = useState(null);

  //Lista de items do menu
  const itemsMenu = [
    {
      title: "Restart",
      icon: PlayCircleFilledIcon,
      onClick: () => {
        onStart();
      },
    },
    {
      title: "About",
      icon: InfoIcon,
      onClick: () => {
        onAbout();
      },
    },
  ];

  //Abre o menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //Fecha o menu
  const handleClose = () => {
    setAnchorEl(null);
  };


  const onStart = () => {
    handleClose();
    onStartGame();
  };

  const onAbout = () => {
    handleClose();
    onOpenAbout();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: "#3d3d3d", ...styles.boxRowBetween }}>
        <Box sx={styles.boxRowAlignCenter}>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {itemsMenu.map((item) => (
                <MenuItem onClick={item.onClick}>
                  <ListItemIcon>
                    <item.icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </MenuItem>
              ))}
            </Menu>
          </div>
          <Box sx={styles.boxRow}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white", fontWeight: "900" }}
            >
              Garden
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "#2ecc71", fontWeight: "900" }}
            >
              Robot
            </Typography>
          </Box>
        </Box>
        {!isOpenWelcome && (
          <Box sx={{ ...styles.boxRow, alignItems: "center" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Typography variant="h6">
              {name.length > 1 ? `${name[0]} ${name[1]}` : `${name[0]}`}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
