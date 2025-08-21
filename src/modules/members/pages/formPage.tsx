import { Button, Form, Input, Select, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useCreateMembers, useUpdateMembers } from "../hooks/mutations";
import { useCountries } from "../../countries/hooks/queryies";
import Editor from "react-simple-wysiwyg";
import { useNavigate, useLocation } from "react-router-dom";

const MemberFormPage = () => {
  const location = useLocation();
  const update = location.state;

  const [form] = useForm();
  const navigate = useNavigate();

  const { mutate: createMutate, isPending: isCreating } = useCreateMembers();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateMembers();
  const { data: countries } = useCountries({ page: 1, limit: 10 });

  const [fileList, setFileList] = useState<any[]>([]);
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  useEffect(() => {
    if (update) {
      form.setFieldsValue({
        name_uz: update.name_uz,
        name_en: update.name_en,
        job_name_uz: update.job_name_uz,
        job_name_en: update.job_name_en,
        country_id: update.country_id,
      });

      setDescriptionUz(update.description_uz || "");
      setDescriptionEn(update.description_en || "");

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
    } else {
      form.resetFields();
      setFileList([]);
      setDescriptionUz("");
      setDescriptionEn("");
    }
  }, [update, form]);

  const handleSubmit = (values: any) => {
    if (!fileList.length && !update) {
      return alert("Please select an image");
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, value as string)
    );

    formData.append("description_uz", descriptionUz);
    formData.append("description_en", descriptionEn);

    if (fileList[0]?.originFileObj) {
      formData.append("file", fileList[0].originFileObj);
    }

    if (update) {
      updateMutate({ id: update.id, formData }, { onSuccess: () => navigate("/admin-layout/members") });
    } else {
      createMutate(formData as any, { onSuccess: () => navigate("/admin-layout/members") });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        {update ? "Edit Member" : "Add Member"}
      </h2>

      <Form
        form={form}
        name="memberForm"
        layout="vertical"
        onFinish={handleSubmit}
      >
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Name (UZ)"
            name="name_uz"
            rules={[{ required: true, message: "Enter name_uz" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Name (EN)"
            name="name_en"
            rules={[{ required: true, message: "Enter name_en" }]}
          >
            <Input size="large" />
          </Form.Item>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Job Name (UZ)"
            name="job_name_uz"
            rules={[{ required: true, message: "Enter job_name_uz" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Job Name (EN)"
            name="job_name_en"
            rules={[{ required: true, message: "Enter job_name_en" }]}
          >
            <Input size="large" />
          </Form.Item>
        </div>

        {/* Description */}
        <Form.Item label="Description (UZ)" required>
          <Editor
            value={descriptionUz}
            onChange={(e) => setDescriptionUz(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Description (EN)" required>
          <Editor
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
          />
        </Form.Item>

        {/* Country */}
        <Form.Item
          label="Country"
          name="country_id"
          rules={[{ required: true, message: "Select country" }]}
        >
          <Select size="large" placeholder="Select country">
            {countries?.data?.map((c: any) => (
              <Select.Option key={c.id} value={c.id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Upload */}
        <Form.Item
          label="Image"
          rules={[{ required: !update, message: "Upload image" }]}
        >
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "100%" }}
            loading={isCreating || isUpdating}
          >
            {update ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MemberFormPage;
