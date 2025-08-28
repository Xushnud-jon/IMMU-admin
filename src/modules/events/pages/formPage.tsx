import { Button, Form, Input, Select, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useCreateEvents, useUpdateEvents } from "../hooks/mutations";
import Editor from "react-simple-wysiwyg";
import { useNavigate, useLocation } from "react-router-dom";

// Tadbirlar uchun form
const EventsFormPage = () => {
  const location = useLocation();
  const update = location.state; // tahrirlash uchun mavjud ma'lumot

  const [form] = useForm();
  const navigate = useNavigate();

  // Mutations: yaratish va yangilash
  const { mutate: createMutate, isPending: isCreating } = useCreateEvents();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateEvents();

  // Fayllar uchun state
  const [fileList, setFileList] = useState<any[]>([]);
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  // Turlar: news yoki event
  const typeOptions = [
    { value: "news", label: "News" },
    { value: "event", label: "Event" },
  ];

  // Yangilanish rejimida ma'lumotlarni o'rnatish
  useEffect(() => {
    if (update) {
      // Form maydonlarini to'ldirish
      form.setFieldsValue({
        name_uz: update.name_uz,
        name_en: update.name_en,
        date: update.date ? update.date.slice(0, 16) : "", // ISO -> "YYYY-MM-DDTHH:mm"
        type: update.type,
      });

      // Editorlarni yangilash
      setDescriptionUz(update.description_uz || "");
      setDescriptionEn(update.description_en || "");

      // Fayllarni ko'rsatish (agar mavjud bo'lsa)
      if (update.files && Array.isArray(update.files)) {
        const files = update.files.map((url: string) => ({
          uid: url,
          name: url.split("/").pop() || "file.jpg",
          status: "done",
          url: url,
        }));
        setFileList(files);
      }
    } else {
      // Yangi tadbir: tozalash
      form.resetFields();
      setFileList([]);
      setDescriptionUz("");
      setDescriptionEn("");
    }
  }, [update, form]);

  // Formni saqlash
  const handleSubmit = (values: any) => {
    if (!fileList.length && !update) {
      return alert("Please upload at least one image.");
    }

    const formData = new FormData();

    // Oddiy form maydonlarini qo'shish
    formData.append("name_uz", values.name_uz);
    formData.append("name_en", values.name_en);
    formData.append("date", values.date + ":00.000Z"); // "2025-08-23T14:30" -> "2025-08-23T14:30:00.000Z"
    formData.append("type", values.type);

    // Description lar
    formData.append("description_uz", descriptionUz);
    formData.append("description_en", descriptionEn);

    // Fayllarni qo'shish (faqat yangi yuklangan fayllar)
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj); // bir nechta fayl
      }
    });

    // Yangilash yoki qo'shish
    if (update) {
      updateMutate(
        { id: update.id, formData },
        { onSuccess: () => navigate("/admin-layout/events") }
      );
    } else {
      createMutate(formData, {
        onSuccess: () => navigate("/admin-layout/events"),
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6">
        {update ? "Edit Event" : "Add Event"}
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={update ? undefined : {}}
      >
        {/* Name UZ */}
        <Form.Item
          label="Name (UZ)"
          name="name_uz"
          rules={[{ required: true, message: "Enter name in Uzbek" }]}
        >
          <Input size="large" placeholder="Masalan: Tadbir nomi" />
        </Form.Item>

        {/* Name EN */}
        <Form.Item
          label="Name (EN)"
          name="name_en"
          rules={[{ required: true, message: "Enter name in English" }]}
        >
          <Input size="large" placeholder="For example: Event name" />
        </Form.Item>

        {/* Description UZ */}
        <Form.Item label="Description (UZ)" required>
          <Editor
            value={descriptionUz}
            onChange={(e) => setDescriptionUz(e.target.value)}
            style={{ minHeight: "120px" }}
          />
        </Form.Item>

        {/* Description EN */}
        <Form.Item label="Description (EN)" required>
          <Editor
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            style={{ minHeight: "120px" }}
          />
        </Form.Item>

        {/* Date & Time */}
        <Form.Item
          label="Date & Time"
          name="date"
          rules={[{ required: true, message: "Select date and time" }]}
        >
          <Input
            type="datetime-local"
            size="large"
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Type */}
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Select type" }]}
        >
          <Select size="large" placeholder="Select type">
            {typeOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Files Upload */}
        <Form.Item
          label="Upload Files"
          required={!update}
        >
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={() => false} // faylni avtomatik yuklamaslik
            onChange={({ fileList }) => setFileList(fileList)}
            multiple
            maxCount={10}
          >
            <Button icon={<UploadOutlined />}>Choose Files</Button>
          </Upload>
          <small className="text-gray-500">Maximum 10 files, all formats allowed</small>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isCreating || isUpdating}
            style={{ width: "100%" }}
          >
            {update ? "Update" : "Add"} Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EventsFormPage;