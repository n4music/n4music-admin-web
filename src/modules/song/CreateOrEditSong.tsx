import BaseModal from "@/components/base/BaseModal";
import { ISongDetail } from "@/types/song";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import * as React from "react";

interface IProps {
  isOpenModal: boolean;
  handleClose: () => void;
  song?: ISongDetail;
  onFinish?: ((values: any) => void) | undefined;
}

interface FieldType {
  title: string;
  description: string;
  type: string;
  status: string;
  duration: string;
  artist: string;
  album: string;
}

const DEFINE_TYPE_OPTIONS = [
  { label: "Pop", value: "pop pk" },
  { label: "Rock", value: "rock" },
  { label: "Jazz", value: "jazz" },
  { label: "Classical", value: "classical" },
];

const DEFINE_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Draft", value: "draft" },
];

export default function CreateOrEditSong({
  song,
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
      title="Update song"
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
            title: song?.name ?? "",
            description: song?.description ?? "",
            type: "",
            status: "",
            duration: "",
            artist: "",
            album: "",
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Type"
            name="type"
            rules={[{ required: true, message: "Type is required" }]}
          >
            <Select options={DEFINE_TYPE_OPTIONS} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status is required" }]}
          >
            <Select options={DEFINE_STATUS_OPTIONS} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Duration is required" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Artist"
            name="artist"
            rules={[{ required: true, message: "Artist is required" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Album"
            name="album"
            rules={[{ required: true, message: "Album is required" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<FieldType> label="Description" name="description">
            <TextArea size="large" />
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
