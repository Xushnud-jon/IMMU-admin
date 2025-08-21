import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { type ColumnsType } from "antd/es/table";
import { EditOutlined} from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useMembers } from "../hooks/queryies";
import { useDeleteMembers } from "../hooks/mutations";
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
 const query = useMembers(params);
const { data} = query;
const countries = data?.data || [];  // API: data → data[]
const total = data?.total || 0;      // API: total
  const { mutate } = useDeleteMembers();

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
  navigate(`/admin-layout/members/${record.id}/edit`, { state: record });
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
  title: "Job name (En)",
  dataIndex: "job_name_en",
},
 {
  title: "Job name (Uz)",
  dataIndex: "job_name_uz",
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
        <Button type="primary" className="btn"  onClick={() => navigate("/admin-layout/members/new")}
 >
          Add Members
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