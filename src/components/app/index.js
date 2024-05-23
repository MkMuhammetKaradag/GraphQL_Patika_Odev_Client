import { DatePicker } from "antd";
import { Col, Row } from "antd";
import styles from "./style.module.css";
import { Avatar, List } from "antd";
import HeaderMenu from "./HeaderMenu";
import NewPost from "../../pages/NewPost";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "../../pages/Home";

import Event from "../../pages/Event";

function App({ children }) {
  return (
    <div className={styles.container}>
      <Row justify={"center"}>
        <Col span={14}>
          <HeaderMenu></HeaderMenu>
        </Col>

        <Col span={14} className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route index element={<Home />} /> */}
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/event/:id" element={<Event />} />
            {/* </Route> */}
          </Routes>
        </Col>
      </Row>
      {/* <Row>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
      </Row> */}
    </div>
  );
}

export default App;
