import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { EVENTS_PARTICIPANT_SUBSCRIPTION, GET_EVENT } from "./queries";
import Loading from "../../components/Loading";
import Title from "antd/es/typography/Title";
import { Col, Row } from "antd";
import styles from "./styles.module.css";

import Participant from "./Participant/Participant";
const Event = () => {
  const { id } = useParams();
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENT, {
    variables: { id },
  });

  React.useEffect(() => {
    subscribeToMore({
      document: EVENTS_PARTICIPANT_SUBSCRIPTION,
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newParticipant = subscriptionData.data.createParticipant;
        const newParticipants = [newParticipant, ...prev.event.participants];
        return {
          event: {
            ...prev.event,
            participants: newParticipants,
          },
        };
        // console.log("prev", prev);
        // console.log("subscriptionData", subscriptionData);
      },
      onError: (err) => {
        console.log(err);
      },
    });
    console.log("hello");
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }
  if (error) return `Error! ${error.message}`;
  console.log(data);
  const { event } = data;

  return (
    <div>
      <Title level={3}>{event.title}</Title>
      <Row justify={"center"}>
        <Col span={24}>
          Date: <span>{event.date}</span>
          <br></br>
          Owner: <spana>{event.user.username}</spana>
          <br></br>
          Location: <spana>{event.location.name}</spana>
        </Col>
      </Row>

      <div className={styles.description}>{event.desc}</div>

      {/* <Comments post_id={id}></Comments> */}
      <Participant participants={event.participants} eventId={id}></Participant>
    </div>
  );
};

export default Event;
