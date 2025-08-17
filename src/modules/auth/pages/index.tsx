import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useSignInMutation } from "../hooks/mutation";
import { type SignIn } from "../types";
import { useState } from "react"; 
const SignInComponent = () => {
  const { mutateAsync: signIn } = useSignInMutation();
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (values: SignIn) => {
    setLoading(true);
    try {
      await signIn(values);
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false); 
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <Form
          name="login"
          initialValues={{ username: "", password: "" }}
          onFinish={handleSubmit}
          layout="vertical"
          className="space-y-5"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              prefix={<UserOutlined className="text-[18px] text-gray-400" />}
              placeholder="Username"
              className="h-[48px] rounded-lg border-gray-300"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className=" text-[18px] text-gray-400" />}
              placeholder="Password"
              className="h-[48px]  rounded-lg border-gray-300"
            />
          </Form.Item>

          <Form.Item>
         <Form.Item>
   <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
           loading={loading}
              className="h-12 rounded-lg text-base font-medium
                         bg-gradient-to-r from-blue-600 to-blue-700 
                         hover:from-blue-500 hover:to-blue-600
                         shadow-md hover:shadow-lg
                         transition-all duration-200 ease-in-out
                         border-none"
            >
              Sign In
            </Button>
</Form.Item>
          </Form.Item>
        </Form>

  
       
      </div>
    </div>
  );
};

export default SignInComponent;
