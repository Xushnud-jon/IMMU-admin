// @component/ConfirmDelete.tsx
import { Button, Popconfirm } from 'antd';
import { DeleteFilled } from "@ant-design/icons"; // Import the DeleteFilled icon

type ConfirmDeletePropsType = {
  id: string | number;
  deleteItem: (id: string | number) => void;
  icon?: React.ReactNode; // Optional prop for custom icon
};

const ConfirmDelete = ({ id, deleteItem, icon = <DeleteFilled /> }: ConfirmDeletePropsType) => (
  <Popconfirm
    title="Are you sure you want to delete this item?"
    onConfirm={() => deleteItem(id)}
    okText="Yes"
    cancelText="No"
  >
    <Button danger icon={icon}></Button> {/* Include the icon in the button */}
  </Popconfirm>
);

export default ConfirmDelete;
