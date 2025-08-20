import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { type ColumnsType } from "antd/es/table";
import { EditOutlined} from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useEvents } from "../hooks/queryies";
import { useDeleteEvents } from "../hooks/mutations";
import { Table, ConfirmDelete, Search } from "../../../components";
import Modal from "./modal";
import {type TablePaginationConfig } from "antd/lib";

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
 const query =  useEvents(params);
const { data} = query;
const countries = data?.data || [];  // API: data → data[]
const total = data?.total || 0;      // API: total
  const { mutate } = useDeleteEvents();

  useEffect(() => {
    const pageFromParams = searchParams.get("page") || "1";
    const limitFromParams = searchParams.get("limit") || "5";
    const searchFromParams = searchParams.get("search") || "";
    setParams((prev) => ({
      ...prev,
      page: Number(pageFromParams),
      limit: Number(limitFromParams),
      search: searchFromParams,
    }));
  }, [searchParams]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = pagination;
    setSearchParams({
      page: String(current),
      limit: String(pageSize),
    });
  };

  const editData = (data: any) => {
    setUpdate(data);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setUpdate(null);
  };

  const columns: ColumnsType = [
    {
      title: "Message", // ID ustuni qo'shildi
      dataIndex: "message", // 'id' ustuni uchun dataIndex
    },
    {
  title: "Success",
  dataIndex: "success",
},

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="default"
              onClick={() => editData(record)}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <ConfirmDelete id={record.id} deleteItem={(id: string | number) => mutate(id)} />
          <Tooltip title="Sub-category">
   
</Tooltip>

        </Space>
      ),
    },
  ];

  return (
    <>
     <div className="flex flex-col gap-4">
     <Modal open={modalVisible} handleCancel={handleCancel} update={update} />
      <div className="flex justify-between p-">
        <Search params={params} setParams={setParams} />
        <Button type="primary" className="btn" onClick={() => setModalVisible(true)}>
          Add Category
        </Button>
      </div>
   <Table
  data={countries}
  columns={columns}
  pagination={{
    current: params.page,
    pageSize: params.limit,
    total: total,
    showSizeChanger: true,
    pageSizeOptions: ['2', '5', '7', '10'],
  }}
  handleChange={handleTableChange}
/>
     </div>
    </>
  );
};

export default Index;