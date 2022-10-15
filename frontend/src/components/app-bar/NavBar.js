import "./navbar.css";
import Alert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import React, { useEffect, useRef, useState } from "react";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import axios from "../../config/axiosConfig";
import dayjs from "dayjs";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

// const logo = require("static/logo.png");

const pages = [
  { text: "DSA", link: "/questions" },
  { text: "Create Room", link: "/challege-room" },
  { text: "Rooms", link: "/rooms" },
  { text: "About", link: "/about" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const difficulties = ["Easy", "Medium", "Hard"];
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

const NavBar = () => {
  const navigate = useNavigate();
  // const user = {
  //   username: "Sharique",
  //   password: "123456",
  // };
  const user = null;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [createRoomError, setCreateRoomError] = useState();
  const [createRoomLoading, setCreateRoomLoading] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const handleClickOpen = (scrollType) => {
    console.log("clicked");
    setOpen(true);
    setScroll(scrollType);
  };
  const redirectPage = (e, index) => {
    e.preventDefault();
    if (index === 1) {
      console.log("clicking");
      handleClickOpen("paper");
    } else {
      navigate(pages[index].link);
    }
    handleCloseNavMenu();
  };

  const redirect = (e, url) => {
    e.preventDefault();
    handleClose();
    navigate(url);
  };

  const handleClose = () => {
    if (!createRoomLoading) setOpen(false);
  };
  const descriptionElementRef = useRef(null);

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [time, setTime] = useState(dayjs());

  const handleCreateRoom = (event) => {
    event.preventDefault();
    setCreateRoomLoading(true);
    // redirect(e, "/challege-room")
    axios
      .post(
        "room/create-room",
        {
          numOfQuestions: 4,
          difficultyLevel: ["easy", "hard"],
          totalTime: "112",
        },
        {}
      )
      .then((response) => {
        console.log(response);
        setCreateRoomLoading(false);
        console.log(open);
        if (open) {
          setOpen(false);
          redirect(event, "/challege-room/1234");
          console.log("congo");
        }
      })
      .catch((error) => {
        console.log(error);
        setCreateRoomLoading(false);
        setCreateRoomError(error.response.data.message);
      });
  };
  console.log(open);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [personName, setPersonName] = useState([]);

  const handleDifficultyChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <AppBar position="static" sx={{}}>
        <Container maxWidth="xl" sx={{ height: "64px" }}>
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                height: "40px",
                width: "40px",
              }}
            >
              <div id="desktop-logo" className="logo-png">
                <img src={logo} alt="IMG" />
              </div>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DSA Battle
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={(e) => redirectPage(e, index)}>
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <div id="mobile-logo" className="logo-png">
                <img src={logo} alt="IMG" />
              </div>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DSA Battle
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={(e) => {
                    redirectPage(e, index);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.text}
                </Button>
              ))}
            </Box>
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.username}
                      src={
                        user.image ? user.image : "/static/images/avatar/2.jpg"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Stack spacing={2} direction="row">
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ color: "#ede7f6" }}
                    onClick={(e) => redirect(e, "/login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      color: "#ede7f6",
                      display: { xs: "none", md: "block" },
                    }}
                    onClick={(e) => redirect(e, "/signup")}
                  >
                    Join Now
                  </Button>
                </Stack>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <>
        {/* <div> */}
        {/* <Button onClick={handleClickOpen("paper")}>scroll=paper</Button> */}
        {/* <Button onClick={handleClickOpen("body")}>scroll=body</Button> */}
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          // sx={{ minWidth: "600px" }}
          // minWidth="md"
          maxWidth="sm"
        >
          <DialogTitle
            id="scroll-dialog-title"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              background: "#004080",
              color: "#ffffff",
            }}
          >
            DSA Battle
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            {/* <DialogContentText
              id="scroll-dialog-description"
              // ref={descriptionElementRef}
              tabIndex={-1}
            > */}
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1} columns={16}>
                <Grid item xs={8}>
                  <Item>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Number of Questions ?
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value="easy" sx={{ color: "" }}>
                          1
                        </MenuItem>
                        <MenuItem value="medium" sx={{ color: "" }}>
                          2
                        </MenuItem>
                        <MenuItem value="hard" sx={{ color: "" }}>
                          3
                        </MenuItem>
                        <MenuItem value="mixed" sx={{ color: "" }}>
                          4
                        </MenuItem>
                        <MenuItem value="mixed" sx={{ color: "" }}>
                          5
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={8}>
                  <Item>
                    <FormControl fullWidth size="small" sx={{}}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Level
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleDifficultyChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {difficulties.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={16}>
                  <Item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <TimePicker
                          ampm={false}
                          openTo="minutes"
                          views={["hours", "minutes"]}
                          inputFormat="HH:mm"
                          mask="__:__"
                          label="Total Time"
                          value={time}
                          onChange={(newValue, oldValue) => {
                            console.log(newValue, oldValue);
                            setTime(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Item>
                </Grid>
                {createRoomError && (
                  <Grid item xs={16}>
                    <Item>
                      <Alert
                        onClose={() => {
                          setCreateRoomError();
                        }}
                        severity="error"
                      >
                        {createRoomError}
                      </Alert>
                    </Item>
                  </Grid>
                )}
              </Grid>
            </Box>
            {/* </DialogContentText> */}
          </DialogContent>
          <DialogActions
            sx={{
              background: "#004080",
              textAlign: "center",
            }}
          >
            {createRoomLoading ? (
              <>
                <Button
                  sx={{ fontWeight: "bold", color: "#ffffff" }}
                  onClick={handleClose}
                  disabled
                >
                  Cancel
                </Button>
                <Button
                  sx={{ fontWeight: "bold", color: "#ffffff" }}
                  onClick={handleCreateRoom}
                  disabled
                >
                  Creating...
                </Button>
              </>
            ) : (
              <>
                <Button
                  sx={{ fontWeight: "bold", color: "#ffffff" }}
                  onClick={handleClose}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  sx={{ fontWeight: "bold", color: "#ffffff" }}
                  onClick={handleCreateRoom}
                  variant="outlined"
                >
                  Create Now
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
        {/* </div> */}
      </>
    </>
  );
};
export default NavBar;
