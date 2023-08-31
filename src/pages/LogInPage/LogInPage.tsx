import React, { useContext } from "react";

import { userService } from "../../modules/users/users.service";
import { localStorageService } from "../../utils/localStorageService";
import { UserContext } from "../../modules/users/users.context";
import { sessionStorageService } from "../../utils/sessionStorageService";
import "./LogInPage.scss";

import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import to from "await-to-js";

const LogInPage = () => {
  const { setUserInfo, setIsLoggedIn } = useContext(UserContext);

  const onSubmit = async (values: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    const [error, response] = await to(
      userService.checkCredentials(values.username, values.password)
    );
    if (error) {
      alert(error.message);
      return;
    } else {
      setIsLoggedIn(true);
      if (values.remember) {
        localStorageService.set("user", response);
        setUserInfo(response);
      } else {
        setUserInfo(response);
        sessionStorageService.set("user", response);
      }
    }
  };

  return (
    <div className="logInPage">
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogInPage;
