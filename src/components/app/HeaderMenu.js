import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import styles from "./style.module.css";
import Link from "antd/es/typography/Link";
import { useNavigate } from "react-router-dom";
const items = [
  {
    label: "Home",
    key: "/",
    // icon: <MailOutlined />,
  },
  {
    label: "Events",
    key: "newEvent",
    // icon: <MailOutlined />,
  },
];
const HeaderMenu = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("Home");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(`${e.key}`);
  };
  return (
    <Menu
      className={styles.headerMenu}
      onClick={onClick}
      theme="dark"
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default HeaderMenu;
