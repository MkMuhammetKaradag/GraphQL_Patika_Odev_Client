import React, { useState } from "react";

import { List } from "antd";
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading";
import { EVENTS_SUBSCRIPTION, GET_EVENTS } from "./queries";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Flex, Typography } from "antd";
const Home = () => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

  React.useEffect(() => {
    subscribeToMore({
      document: EVENTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newEvent = subscriptionData.data.createEvent;
        const newEvents = [newEvent, ...prev.events];
        return { events: newEvents };
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }, []);

  const [rows, _] = useState(2);

  if (loading) {
    return <Loading></Loading>;
  }
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data.events}
        renderItem={(item, index) => (
          <List.Item className={styles.list}>
            <List.Item.Meta
              title={
                <Link className={styles.listitem} to={`/Event/${item.id}`}>
                  {item.title}
                </Link>
              }
              description={
                <Flex gap={16} vertical>
                  <Typography.Paragraph
                    ellipsis={{
                      rows,
                      expandable: "collapsible",
                    }}
                    copyable
                  >
                    {item.desc}
                  </Typography.Paragraph>
                </Flex>
              }
            />
            <div className={styles.listdate}>{item.date}</div>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;
