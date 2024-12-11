import BaseModal from "@/components/base/BaseModal";
import { ICreateUser } from "@/types/user";
import { Button, Form, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import * as React from "react";

interface IProps {
  isOpenModal: boolean;
  handleClose: () => void;
  user?: ICreateUser;
  onFinish?: ((values: any) => void) | undefined;
}

interface FieldType {
  name: string;
  gender: number;
  phone: string;
  status: number;
  type: number;
  roleId: number;
  email: string;
  password: string;
  address: string;
  avatarId: string
}

export default function CreateOrEditUser({
  user,
  isOpenModal,
  handleClose,
  onFinish,
}: IProps) {
  const [form] = Form.useForm();

  return (
    <BaseModal
      isOpen={isOpenModal}
      width={500}
      destroyOnClose
      footer={null}
      handleClose={handleClose}
      title={`${user?.id ? "Update user" : "Add new user"}`}
    >
      <div className="w-full mt-10">
        <Form
          className="w-full mt-5"
          form={form}
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="form"
          onFinish={onFinish}
          initialValues={{
            name: user?.name ?? "",
            gender: user?.gender ?? 1,
            phone: user?.phone ?? "",
            email: user?.email ?? "",
            address: user?.address ?? "",
            avatarId: user?.avatarId?? "",
            roleId: user?.roleId ?? 1,
            status: user?.status ?? 1,
            type: user?.type ?? 0,
            password: user?.password?? "",
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <InputNumber size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          
          <Form.Item<FieldType>
            label="Type"
            name="type"
            rules={[{ required: true, message: "Type is required" }]}
          >
            <InputNumber size="large"/>
          </Form.Item>

          <Form.Item<FieldType>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status is required" }]}
          >
            <InputNumber size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="RoleId"
            name="roleId"
            rules={[{ required: true, message: "RoleId is required" }]}
          >
            <InputNumber size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <TextArea size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="AvatarId"
            name="avatarId"
            rules={[{ required: true, message: "AvatarId is required" }]}
          >
            <Input size="large" />
          </Form.Item>

          

          <div className="w-full flex justify-end items-end my-5">
            <Button type="primary" htmlType="submit">
            Accept
            </Button>
          </div>
        </Form>
      </div>
    </BaseModal>
  );
}
