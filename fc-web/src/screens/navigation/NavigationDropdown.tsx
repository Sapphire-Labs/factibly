import React, { useState } from "react";
import { useIntl } from "react-intl";
import DropdownMenu from "../../common/DropdownMenu";
import AccountNavigationMenu from "./dropdown/AccountNavigationMenu";
import LanguageMenu from "./dropdown/LanguageMenu";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, IconButton, Avatar, Typography } from "@material-ui/core";
import { NAVIGATION_HOVER_GREY } from "../../styles/colours";
import { CURRENT_USER } from "../../gql/queries";
import { CurrentUser } from "../../gql/__generated__/CurrentUser";
import { useCustomQuery } from "../../hooks/gql";
import { useAlert } from "../../hooks/useAlert";
import { logoutUser } from "../../hooks/state";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullProfileButton: {
      borderRadius: theme.spacing(3),
      textTransform: "none",
      textDecoration: "none",
      color: theme.palette.common.white,
      display: "none",
      "&:hover": {
        backgroundColor: NAVIGATION_HOVER_GREY,
      },
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    iconicProfileButton: {
      color: theme.palette.common.white,
      display: "none",
      "&:hover": {
        backgroundColor: NAVIGATION_HOVER_GREY,
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
    },
    menuPaper: {
      minWidth: 256,
    },
    scaledAvatar: {
      width: 32,
      height: 32,
    },
    profileName: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  })
);

const NavigationDropdown = () => {
  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const { data: userData } = useCustomQuery<CurrentUser>(CURRENT_USER);
  const userLoggedIn = !!userData?.currentUser;
  const displayName = userData?.currentUser?.displayName;

  const handleLogout = async () => {
    await logoutUser();

    setAlert({
      severity: "success",
      message: intl.formatMessage({ id: "user.alert.logout.success" }),
    });
  };

  const [anchorElMenu, setAnchorElMenu] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: any) => setAnchorElMenu(event.currentTarget);
  const handleCloseMenu = () => setAnchorElMenu(null);

  const [selectedNameMenu, setSelectedMenuName] = useState<string>("default");
  const handleSwitchMenu = (newMenuName: string) => setSelectedMenuName(newMenuName);
  const handleMenuBack = () => handleSwitchMenu("default");
  const handleMenuBackAndQuit = () => {
    handleMenuBack();
    handleCloseMenu();
  };

  const ScaledAvatar = (
    <Avatar
      key={userData?.currentUser?.avatar ?? undefined}
      className={classes.scaledAvatar}
      src={
        userLoggedIn && userData?.currentUser?.avatar
          ? `${process.env.REACT_APP_CLOUDFRONT_URL}/${userData?.currentUser?.avatar}`
          : ""
      }
      alt={displayName}
      aria-label={intl.formatMessage({ id: "user.avatar.self.aria" }, { displayName })}
    />
  );

  return (
    <nav>
      <Button
        key={`profile-button-${displayName}-full`}
        className={classes.fullProfileButton}
        startIcon={ScaledAvatar}
        onClick={handleOpenMenu}
        aria-haspopup="true"
      >
        {userLoggedIn && <Typography className={classes.profileName}>{displayName}</Typography>}
      </Button>
      <IconButton
        key={`profile-button-${displayName}-iconic`}
        className={classes.iconicProfileButton}
        onClick={handleOpenMenu}
        aria-haspopup="true"
      >
        {ScaledAvatar}
      </IconButton>
      <DropdownMenu
        id="primary-nav-menu"
        classes={{ paper: classes.menuPaper }}
        open={Boolean(anchorElMenu)}
        anchorEl={anchorElMenu}
        onClose={handleCloseMenu}
        aria-label={intl.formatMessage({ id: "nav.dropdown.action.open.aria" })}
      >
        {
          {
            default: (
              <AccountNavigationMenu
                userLoggedIn={userLoggedIn}
                handleLogout={handleLogout}
                onSwitchMenu={handleSwitchMenu}
                onMenuBack={handleMenuBack}
              />
            ),
            language: <LanguageMenu onMenuBack={handleMenuBack} onMenuDone={handleMenuBackAndQuit} />,
          }[selectedNameMenu]
        }
      </DropdownMenu>
    </nav>
  );
};

export default NavigationDropdown;
