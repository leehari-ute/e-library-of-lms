import { SettingOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  List,
  message,
  Modal,
  Skeleton,
  Space,
  Tabs,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import SunEditor from "suneditor-react";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { ISelect, SelectComp } from "../../../Components/Select";
import { createNoti } from "../../../redux/reducers/noti.reducer";
import {
  getSubject,
  getSubjects,
  ISubject,
} from "../../../redux/reducers/subject.reducer";
import { ITopic } from "../../../redux/reducers/topic.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import "./style.scss";

const { TabPane } = Tabs;
export const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const [dataClass, setDataClass] = useState<ISelect[]>([]);
  const [form] = Form.useForm();
  const [topic, setTopic] = useState<ISelect[]>([]);

  useEffect(() => {
    loadMoreData();

    dispatch(getSubjects({ limit: 999, teacher: user.id }))
      .unwrap()
      .then((rs: any) => {
        let arr: ISelect[] = [];
        rs.results.forEach((vl: ISubject) => {
          arr.push({ name: vl.subName, value: vl.id });
        });
        setDataClass(arr);
      });
  }, []);

  const handleRefresh = () => {
    dispatch(getSubjects({ limit: 999, teacher: user.id }))
      .unwrap()
      .then((rs: any) => {
        let arr: ISelect[] = [];
        rs.results.forEach((vl: ISubject) => {
          arr.push({ name: vl.subName, value: vl.id });
        });
        setDataClass(arr);
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTopic([]);
    form.resetFields();
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleSelect = (e: any) => {
    dispatch(getSubject(e))
      .unwrap()
      .then((rs: ISubject) => {
        console.debug(rs);

        let arr: ISelect[] = [];
        rs.topic.forEach((vl: ITopic) => {
          arr.push({ name: vl.title, value: vl.id });
        });
        setTopic(arr);
      });
  };

  const onFinish = (values: any) => {
    console.debug(values);
    dispatch(createNoti({ ...values, from: user.id }))
      .unwrap()
      .then(() => {
        handleRefresh();
      });
  };

  return (
    <div className="Noti-Page">
      <BreadcrumbComp title="Thông báo" />
      <div className="tab-notilist">
        <Tabs defaultActiveKey="1" type="card" size={"small"}>
          <TabPane tab="Thông báo người dùng" key="1">
            <div
              id="scrollableDiv"
              style={{
                height: 400,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
            >
              <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={data}
                  renderItem={(item: any) => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={
                          <Checkbox>
                            <Avatar src={item.picture.large} />
                          </Checkbox>
                        }
                        title={
                          <a href="https://ant.design">{item.name.last}</a>
                        }
                        description={item.email}
                      />
                      <div>5 phút trước</div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </TabPane>
          <TabPane tab="Thông báo hệ thống" key="2">
            <div
              id="scrollableDiv"
              style={{
                height: 400,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
            >
              <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={data}
                  renderItem={(item: any) => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={
                          <Checkbox>
                            <Avatar src={item.picture.large} />
                          </Checkbox>
                        }
                        title={
                          <a href="https://ant.design">{item.name.last}</a>
                        }
                        description={item.email}
                      />
                      <div>5 phút trước</div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </TabPane>
        </Tabs>
        <div className="tab-control">
          <Space className="" size="middle">
            <Tooltip title="Setting">
              <Button
                className="setting-btn-icon"
                type="link"
                onClick={() => navigate("/teacher/notification/setting")}
                icon={<SettingOutlined style={{ fontSize: "36px" }} />}
              />
            </Tooltip>
          </Space>
          <div className="line"></div>
          <Button type="primary" onClick={showModal}>
            Thêm thông báo
          </Button>
          <Modal
            title="Gửi thông báo mới"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => {
              handleCancel();
            }}
            footer={[
              <Button onClick={() => form.submit()} type="primary">
                Gửi
              </Button>,
            ]}
          >
            <Form layout="vertical" form={form} onFinish={onFinish} className="header-notification">
              <Form.Item name="subject" >
                <SelectComp
                  textLabel="Chọn môn giảng dạy"
                  className="label-style-item"
                  dataString={dataClass}
                  onChange={(e: any) => handleSelect(e)}
                />
                <Form.Item name="topic">
                  <SelectComp
                    textLabel="Chọn chủ đề"
                    className="label-style-item"
                    dataString={topic}
                    disabled={topic.length === 0}
                    onChange={(e: any) => handleSelect(e)}
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item name="title" className="label-style-item" label="Tiêu đề">
                <Input
                  placeholder="Tiêu đề"
                />
              </Form.Item>

              <Form.Item name="content" className="label-style-item" label="Nội dung">
                <SunEditor
                  placeholder="Nội dung"
                  setOptions={{
                    defaultTag: "div",
                    minHeight: "250px",
                    showPathLabel: false,
                    buttonList: [
                      ["undo", "redo"],
                      ["fontSize", "bold", "underline", "italic"],
                      ["align", "image"],
                      ["list", "outdent", "indent"],
                      ["fullScreen"],
                    ],
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};
