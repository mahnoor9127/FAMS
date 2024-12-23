import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, Input, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons/lib/icons";

const ProductTable = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      SKU: "",
      price: "",
      inventory: "",
      date: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const addProduct = (values) => {
    const newProduct = {
      key: (dataSource.length + 1).toString(),

      id: (dataSource.length + 1).toString().padStart(3, "0"),
      ...values,
    };
    setDataSource([...dataSource, newUser]);
    setIsModalVisible(false);
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: "Product ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      editable: true,
      sorter: (a, b) => a.sku.localeCompare(b.sku),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      editable: true,
      sorter: (a, b) => a.price.localeCompare(b.price),
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
      editable: true,
      sorter: (a, b) => a.inventory.localeCompare(b.inventory),
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
      editable: true,
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Operations",
      key: "operations",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Button onClick={() => save(record.key)} type="link">
              Save
            </Button>
            <Button onClick={cancel} type="link">
              Cancel
            </Button>
          </Space>
        ) : (
          <Space size="middle">
            <Button
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              type="link"
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{
          marginBottom: 16,
          backgroundColor: "black",
          color: "white",
          width: "150px",
        }}
      >
        Add Product
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 5,
          }}
        />
      </Form>
      <Modal
        title="Add Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={addProduct} layout="vertical">
          <Form.Item
            name="id"
            label="Product ID"
            rules={[{ required: true, message: "Please input the ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: "Please input the SKU!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="inventory"
            label="Inventory"
            rules={[{ required: true, message: "Please input the inventory!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ProductTable;
