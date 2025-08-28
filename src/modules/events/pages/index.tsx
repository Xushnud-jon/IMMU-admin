import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { type ColumnsType } from "antd/es/table";
import { EditOutlined} from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useEvents } from "../hooks/queryies";
import { useDeleteEvents } from "../hooks/mutations";
import { Table, ConfirmDelete, Search } from "../../../components";
import {type TablePaginationConfig } from "antd/lib";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
 const query = useEvents(params);
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

 const editData = (record: any) => {
  navigate(`/admin-layout/events/${record.id}/edit`, { state: record });
};


 
  const columns: ColumnsType = [
    {
      title: "ID", // ID ustuni qo'shildi
      dataIndex: "id", // 'id' ustuni uchun dataIndex
      key: "id", // 'id' ustuni uchun kalit
    },
    {
  title: "Description (En)",
  dataIndex: "description_en",
    render: (text: string) => (
      <div dangerouslySetInnerHTML={{ __html: text }} />
    ),
},
  {
  title: "Description (Uz)",
  dataIndex: "description_uz",
   render: (text: string) => (
      <div dangerouslySetInnerHTML={{ __html: text }} />
    ),
},
  {
  title: "Name (En)",
  dataIndex: "name_en",
},
 {
  title: "Name (Uz)",
  dataIndex: "name_uz",
},
 {
  title: "Type",
  dataIndex: "type",
},
 {
  title: "View",
  dataIndex: "views",
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
    
      <div className="flex justify-between p-">
        <Search params={params} setParams={setParams} />
        <Button type="primary" className="btn"  onClick={() => navigate("/admin-layout/events/new")}
 >
          Add Events
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