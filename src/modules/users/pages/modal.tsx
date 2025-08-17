import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { type ModalPropType } from "../../../types";
import { useCreateUsers, useUpdateUsers } from "../hooks/mutations";

const { Option } = Select;

const ModalComponent = ({ open, handleCancel, update }: ModalPropType) => {
  const [form] = useForm();
  const { mutate: createMutate, isPending: isCreating } = useCreateUsers();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateUsers();

  useEffect(() => {
    if (open && update) {
      form.setFieldsValue({
        username: update.username,
        password: "", 
        phone: update.phone,
        role: update.role,
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, update, form]);

  const handleSubmit = (values: any) => {
  if (update) {
    // agar password bo‘sh bo‘lsa, uni yubormaymiz
    if (!values.password) {
      delete values.password;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    updateMutate(
      { id: update.id, formData }, // ✅ to‘g‘ri
      { onSuccess: () => handleCancel() }
    );
  } else {
    createMutate(values, { onSuccess: () => handleCancel() });
  }
};


  return (
    <Modal
      open={open}
      title={update ? "Edit User" : "Add User"}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        form={form}
        name="userForm"
        style={{ width: "100%", marginTop: "20px" }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Enter username" }]}
        >
          <Input size="large" />
        </Form.Item>

      <Form.Item
  label="Password"
  name="password"
  rules={[]}
  extra={update ? "If you don't want to change password, leave it empty." : ""}
>
  <Input.Password size="large" placeholder={update ? "New password (optional)" : "Enter password"} />
</Form.Item>


        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Enter phone number" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Select role" }]}
        >
          <Select size="large" placeholder="Select role">
            <Option value="superadmin">Super Admin</Option>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            style={{ width: "100%" }}
            type="primary"
            className="btn"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {update ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
