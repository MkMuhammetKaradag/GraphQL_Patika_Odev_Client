import { Divider } from "antd";
import React from "react";

import { Avatar, List } from "antd";
import NewParticipantForm from "./NewParticipantForm";

const Participant = ({ participants, eventId }) => {
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

      <NewParticipantForm eventId={eventId}></NewParticipantForm>
    </div>
  );
};

export default Participant;
