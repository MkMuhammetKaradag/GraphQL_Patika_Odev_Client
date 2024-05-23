import { Divider } from "antd";
import React from "react";
import styles from "./styles.module.css";
import { useLazyQuery } from "@apollo/client";
import { GET_POST_COMMENTS } from "./queries";
import Loading from "../../components/Loading";
import { Avatar, List } from "antd";

const Participant = ({ participants }) => {
  return (
    <div>
      <Divider>Participants</Divider>

      <List
        itemLayout="horizontal"
        dataSource={participants}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta title={item.username} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Participant;
