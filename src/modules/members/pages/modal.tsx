import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { type ModalPropType } from "../../../types";
import { useCreateMembers, useUpdateMembers } from "../hooks/mutations";
import { useCountries } from "../../countries/hooks/queryies";
const { TextArea } = Input;

const ModalComponent = ({ open, handleCancel, update }: ModalPropType) => {
  const [form] = useForm();
  const { mutate: createMutate, isPending: isCreating } = useCreateMembers();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateMembers();
 const { data: countries } = useCountries({ page: 1, limit: 10 }); 


  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (open && update) {
      form.setFieldsValue({
        name_uz: update.name_uz,
        name_en: update.name_en,
        job_name_uz: update.job_name_uz,
        job_name_en: update.job_name_en,
        description_uz: update.description_uz,
        description_en: update.description_en,
        country_id: update.country_id,
      });
      if (update.image) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: update.image,
          },
        ]);
      }
    } else if (open) {
      form.resetFields();
      setFileList([]);
    }
  }, [open, update, form]);

  const handleSubmit = (values: any) => {
    if (!fileList.length && !update) {
      return alert("Please select an image");
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value as string));
    if (fileList[0]?.originFileObj) {
      formData.append("file", fileList[0].originFileObj );
    }

  if (update) {
  updateMutate({ id: update.id, formData }, { onSuccess: () => handleCancel() });
} else {
  createMutate(formData as any, { onSuccess: () => handleCancel() });
}

  };

  return (
    <Modal open={open} title={update ? "Edit Member" : "Add Member"} onCancel={handleCancel} footer={null}>
      <Form
        form={form}
        name="memberForm"
        layout="vertical"
        onFinish={handleSubmit}
        style={{ width: "100%", marginTop: 20 }}
      >
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Name (UZ)" name="name_uz" rules={[{ required: true, message: "Enter name_uz" }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item label="Name (EN)" name="name_en" rules={[{ required: true, message: "Enter name_en" }]}>
            <Input size="large" />
          </Form.Item>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Job Name (UZ)" name="job_name_uz" rules={[{ required: true, message: "Enter job_name_uz" }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item label="Job Name (EN)" name="job_name_en" rules={[{ required: true, message: "Enter job_name_en" }]}>
            <Input size="large" />
          </Form.Item>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Description (UZ)" name="description_uz" rules={[{ required: true, message: "Enter description_uz" }]}>
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Description (EN)" name="description_en" rules={[{ required: true, message: "Enter description_en" }]}>
            <TextArea rows={3} />
          </Form.Item>
        </div>

        {/* Country */}
        <Form.Item label="Country" name="country_id" rules={[{ required: true, message: "Select country" }]}>
          <Select size="large" placeholder="Select country">
            {countries?.data?.map((c: any) => (
              <Select.Option key={c.id} value={c.id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Upload */}
        <Form.Item label="Image" rules={[{ required: !update, message: "Upload image" }]}>
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" style={{ width: "100%" }} loading={isCreating || isUpdating}>
            {update ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
