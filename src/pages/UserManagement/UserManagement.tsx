/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/redux/api/features/auth/authSlice";
import { useGetAllUsersQuery, useUpdateUserMutation } from "@/redux/api/features/user/user.Api";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { toast } from "sonner";

function UserManagement() {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  const handleMakeAdmin = async (id: string) => {
    console.log(id)
    try {
      await updateUser({ id, role: "admin" }).unwrap();
      toast.success("User promoted to Admin successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to make admin");
    }
  };

  const columns: ColumnsType<IUser> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <span style={{ fontWeight: "bold", color: role === "ADMIN" ? "green" : "blue" }}>
          {role}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.role !== "admin" ? (
          <Button type="primary" onClick={() => handleMakeAdmin((record as any)._id)}>
            Make Admin
          </Button>
        ) : (
          <span>Already Admin</span>
        ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default UserManagement;
