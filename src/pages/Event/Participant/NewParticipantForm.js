import React, { useRef } from "react";
import { GET_USERS, NEW_PARTİCİPANT_MUTATİON } from "./queries";
import { Button, Row, Col, Form, Input, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";

const NewParticipantForm = ({ eventId }) => {
  const {
    loading: loadingUsers,
    error: errorUsers,
    data: dataUsers,
  } = useQuery(GET_USERS);
  const formRef = useRef();
  const [
    savedParticipant,
    {
      loading: loadingParticpant,
      error: errorParticipant,
      data: dataPaticipant,
    },
  ] = useMutation(NEW_PARTİCİPANT_MUTATİON);
  const onFinish = async (values) => {
    console.log("hello ", { ...values, event: eventId });

    await savedParticipant({
      variables: {
        data: {
          ...values,
          event: eventId,
        },
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        ref={formRef}
        name="basic"
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="user"
              rules={[
                {
                  required: true,
                  message: "Please selecet user ",
                },
              ]}
            >
              <Select
                size="large"
                disabled={loadingUsers}
                loading={loadingUsers}
                placeholder="Select your user"
              >
                {dataUsers &&
                  dataUsers.users.map((user, index) => (
                    <Select.Option key={index} value={user._id}>
                      {user.username}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                size="large"
                loading={loadingParticpant}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewParticipantForm;
