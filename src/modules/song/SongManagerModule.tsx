"use client";
import Visibility from "@/components/base/visibility";
import { baseQueryPages } from "@/constants/query";
import SongService from "@/services/song/SongService";
import { IQuerySong } from "@/types/query";
import { ISongDetail, ISongInList } from "@/types/song";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Modal, Spin, Table, TableProps } from "antd";
import * as React from "react";
import CreateOrEditSong from "./CreateOrEditSong";

export default function SongManagerModule() {
  const [query, setQuery] = React.useState<Partial<IQuerySong>>(baseQueryPages);
  const [songList, setSongList] = React.useState<ISongInList[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedSong, setSelectedSong] = React.useState<ISongDetail | null>(
    null
  );

  const handleClickRow = (record: ISongInList) => {
    SongService.getSongDetail(record.id)
      .then((item) => {
        setOpenModal(true);
        setSelectedSong(item.data as unknown as ISongDetail);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleGetSongList = async (queryParam = query) => {
    try {
      setLoading(true);
      delete queryParam.total;
      const rs = await SongService.getAllSong(queryParam);
      setSongList(rs.data.data);
      setQuery({
        ...queryParam,
        total: rs.data.total,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = (values: any) => {
    if (selectedSong?.id) {
      SongService.updateSong(selectedSong.id, {
        title: values.title,
        description: values.description,
        type: values.type,
        status: values.status,
        meta: {
          duration: values.duration,
          artist: values.artist,
          album: values.album,
        },
      })
        .then(() => {
          handleGetSongList();
          setOpenModal(false);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = async (_item: ISongInList) => {
    Modal.confirm({
      title: "Are you want to delete this song?",
      content: `Name song: ${_item.name}`,
      okText: "Accept",
      okType: "danger",
      cancelText: "Cancel",
      style: {
        top: "50%",
        transform: "translateY(-50%)",
      },
      onOk: async () => {
        try {
          setLoading(true);
          const rs = await SongService.deleteSong(_item.id);
          handleGetSongList();
          message.success(rs.msg);
        } catch (error: any) {
          message.error(error.message);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  React.useEffect(() => {
    handleGetSongList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: TableProps<ISongInList>["columns"] = [
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Delete this song",
      key: "deleteSong",
      align: "center",
      dataIndex: "deleteSong",
      render: (_, _item: ISongInList) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(_item);
          }}
          className="ms-3"
          variant="solid"
          color="danger"
          shape="default"
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <h1 className="font-bold text-2xl">List songs</h1>
        {loading ? (
          <Spin />
        ) : (
          <div className="w-full">
            <Table<ISongInList>
              rowKey="id"
              className="hover:cursor-pointer"
              columns={columns}
              onRow={(record) => ({
                onClick: () => handleClickRow(record),
              })}
              dataSource={songList}
              pagination={{
                current: query.page,
                pageSize: query.perPage,
                total: query.total,
                onChange: (page, perPage) => {
                  handleGetSongList({
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
        <CreateOrEditSong
          isOpenModal={openModal}
          song={selectedSong ?? undefined}
          onFinish={handleFinish}
          handleClose={() => {
            setOpenModal(false);
          }}
        />
      </Visibility>
    </>
  );
}
