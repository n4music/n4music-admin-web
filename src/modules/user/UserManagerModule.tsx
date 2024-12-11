"use client";
import BaseSearch from "@/components/base/BaseSearch";
import { baseQueryPages } from "@/constants/query";
import { UserService } from "@/services/user/UserService";
import { IQueryUser } from "@/types/query";
import { ICreateUser, IUser } from "@/types/user";
import { formatDate } from "@/utils/format-date";
import { Button, message, Spin, Table, TableProps } from "antd";
import React from "react";
import CreateOrEditUser from "./CreateOrEditUser";
import Visibility from "@/components/base/visibility";

export default function UserManagerModule() {
  const [query, setQuery] = React.useState<Partial<IQueryUser>>(baseQueryPages);
  const [userList, setUserList] = React.useState<IUser[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<ICreateUser | null>(null);

  const handleClickRow = (record: IUser) => {
    UserService.getUser(record.id).then((user) => {
      setOpenModal(true);
      setSelectedUser(user.data as unknown as ICreateUser);
    }).catch((error) => {
      message.error(error.message);
    })
    
  };

  const handleGetUserList = async (queryParam = query) => {
    try {
      setLoading(true);
      delete queryParam.total;
      const rs = await UserService.getAllUser(queryParam);
      setUserList(rs.data.list);
      setQuery({
        ...queryParam,
        total: rs.data.total,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = (values: any) => {
    if (selectedUser?.id) {
      UserService.updateUser(selectedUser.id, values)
        .then(() => {
          handleGetUserList();
          setOpenModal(false);
        })
        .catch((error) => console.error(error));
    } else {
      UserService.createUser(values)
        .then(() => {
          handleGetUserList();
          setOpenModal(false);
        })
        .catch((error) => console.error(error));
    }
  };

  React.useEffect(() => {
    handleGetUserList();
  }, []);

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Index",
      key: "index",
      render: (_: any, __: any, index: number) =>
        (query.page! - 1) * query.perPage! + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="text-lg font-medium">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text) => <span>{formatDate(text)}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <h1 className="font-bold text-2xl">List users</h1>
        <div className="flex flex-row justify-between items-center w-full">
          <BaseSearch
            value={query.name ?? ""}
            onHandleChange={(value) => {
              setQuery({ ...query, name: value });
              if (!value)
                handleGetUserList({
                  page: query.page,
                  perPage: query.perPage,
                  name: value,
                });
            }}
            onSearch={() => handleGetUserList()}
          />
          <Button
            type="primary"
            variant="filled"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add new user
          </Button>
        </div>
        {loading ? (
          <Spin />
        ) : (
          <div className="w-full">
            <Table<IUser>
              rowKey="id"
              className="hover:cursor-pointer"
              columns={columns}
              onRow={(record) => ({
                onClick: () => handleClickRow(record),
              })}
              dataSource={userList}
              pagination={{
                current: query.page,
                pageSize: query.perPage,
                total: query.total,
                onChange: (page, perPage) => {
                  handleGetUserList({
                    ...query,
                    page,
                    perPage,
                  });
                },
              }}
            />
          </div>
        )}
      </div>
      <Visibility visibility={openModal}>
        <CreateOrEditUser
          isOpenModal={openModal}
          user={selectedUser ?? undefined}
          onFinish={handleFinish}
          handleClose={() => {
            setOpenModal(false);
          }}
        />
      </Visibility>
    </>
  );
}
