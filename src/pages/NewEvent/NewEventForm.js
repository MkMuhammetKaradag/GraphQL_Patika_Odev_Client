import React from "react";
import { useNavigate } from "react-router-dom";
import { GET_LOCATİONS, GET_USERS, NEW_EVENT_MUTATİON } from "./queries";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { useMutation, useQuery } from "@apollo/client";

const NewEventForm = () => {
  const [date, setDate] = React.useState(false);
  const navigate = useNavigate();

  const [
    saveEvent,
    { loading: loadinfEvent, error: errroEvent, data: dataEvent },
  ] = useMutation(NEW_EVENT_MUTATİON, {
    update(cache, { createEvent }) {
      cache.modify({
        fields: {
          events(existingPosts = []) {
            console.log(existingPosts);
          },
        },
      });
    },
  });

  const { loading: loadingUsers, error, data: getUsers } = useQuery(GET_USERS);

  const {
    loading: loadinLocations,
    error: errorLocations,
    data: dataLocations,
  } = useQuery(GET_LOCATİONS);
  function onSelectDate(date, dateString) {
    console.log(date, dateString);
    setDate(dateString);
  }
  const onFinish = async (values) => {
    try {
      await saveEvent({
        variables: {
          data: {
            ...values,
            date: date,
          },
        },
      });
      navigate("/");
    } catch (error) {
      console.log("hata", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input size="large" placeholder="title" />
        </Form.Item>

        <Form.Item
          name="desc"
          rules={[
            {
              required: true,
              message: "Please input your description",
            },
          ]}
        >
          <Input.TextArea size="large" placeholder="desc" />
        </Form.Item>

        <Form.Item
          name="from"
          rules={[
            {
              required: true,
              message: "Please input your  from!",
            },
          ]}
        >
          <Input size="large" placeholder=" from" />
        </Form.Item>
        <Form.Item
          name="to"
          rules={[
            {
              required: true,
              message: "Please input your  to!",
            },
          ]}
        >
          <Input size="large" placeholder=" to" />
        </Form.Item>
        <Form.Item
          name="user"
          rules={[
            {
              required: true,
              message: "Please input your description",
            },
          ]}
        >
          <Select
            disabled={loadingUsers}
            loading={loadingUsers}
            placeholder="Selevt your user"
          >
            {getUsers &&
              getUsers.users.map((user, index) => (
                <Select.Option key={index} value={user._id}>
                  {user.username}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="location"
          rules={[
            {
              required: true,
              message: "Please input your Locations",
            },
          ]}
        >
          <Select
            disabled={loadinLocations}
            loading={loadinLocations}
            placeholder="Select your Location"
          >
            {dataLocations &&
              dataLocations.locations.map((location, index) => (
                <Select.Option key={index} value={location._id}>
                  {location.name}-{location.desc}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your date",
            },
          ]}
        >
          <DatePicker onChange={onSelectDate} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button loading={loadinfEvent} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewEventForm;
