import React, { useState, useCallback, useEffect } from "react";
import { Dropdown } from 'react-bootstrap';
import { IoBookmark } from "react-icons/io5";
import {
  BsImageFill,
  BsFillHandbagFill,
  BsFillStarFill,
  BsHouseFill,
  BsArrowBarRight
} from "react-icons/bs";
import { RiSettings4Fill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import classNames from "classnames";

import styles from "./Sidebar.module.css";



const Sidebar = ({ navigationData, pfpUrl, username, email, language, followers }) => {
  const [currentRoute, setCurrentRoute] = useState("Home");
  const [openMenu, setOpenMenu] = useState(false)
  const [width, setWidth] = React.useState("8rem");
  const [display, setDisplay] = useState("none");
  const [flag, setFlag] = useState("🇫🇷");

  function showMenu() {
    setOpenMenu(!openMenu);
    if (openMenu) {
      setWidth("8rem");
      setDisplay("none");
    }
    else {
      setWidth("14%");
      setDisplay("block");
    }
  }
  console.log(language);
  useEffect(() => {
    switch (language) {
      case "FR":
        setFlag('🇫🇷');
        break;
      case "EN":
        setFlag('🇬🇧');
        break;
      case "US":
        setFlag('🇺🇸');
        break;
      default: return "fuck";
    }
  }, []);
  const renderIcon = useCallback((element) => {
    switch (element) {
      case "Home":
        return <BsHouseFill />;
      case "Gallery":
        return <BsImageFill />;
      case "Store":
        return <BsFillHandbagFill />;
      case "Favorites":
        return <BsFillStarFill />;
      case "Saved":
        return <IoBookmark />;
    }
  }, []);
  return (
    <nav className={styles.wrapper} style={{ width, transition: "0.4s" }}>
      <span className={styles.logo}>
        <img src={pfpUrl} alt="" className={styles.pfp} />
      </span>

      <span className={styles.username}>
        <p style={{ display, transition: "0.4s" }}> Hello, {username} 🐐 {flag}</p>
      </span>

      <div class="d-flex flex-row mb-5">

        <ul style={{ display }} className={styles.textList}>
          {navigationData.map((element, index) => (
            <li className={classNames([
              styles.navItem,
              currentRoute === element && styles.navItemActive
            ])}>
              {element}
            </li>
          ))}
        </ul>

        <ul className={styles.navListItems}>
          {navigationData.map((element, index) => (
            <li
              key={index}
              className={classNames([
                styles.navItem,
                currentRoute === element && styles.navItemActive,
                "group"
              ])}
              onClick={() => setCurrentRoute(element)}
            >
              {renderIcon(element)}
              <span
                className={classNames([styles.tooltip, "group-hover:inline"])}
              >
                {element}
              </span>
            </li>
          ))}
        </ul>
        <span className={classNames([styles.navItem, styles.openRight, styles.navItemActive])} onClick={showMenu}>
          <BsArrowBarRight />
        </span>
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.notifications}>
          <span className={styles.badge}>0</span>
          <FaRegBell />
        </div>
        <span className={styles.settingsLogo}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <RiSettings4Fill />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">E-mail : {email}</Dropdown.Item>
              <Dropdown.Item href="#">Language : {language}</Dropdown.Item>
              <Dropdown.Item href="#">Follower count: {followers}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
      </div>
    </nav>
  );
};

export default Sidebar;