import {
    CaretRightOutlined,
    DownloadOutlined,
    LinkOutlined,
  } from "@ant-design/icons";
import { Row, Col, Collapse, Tooltip, Button, Tabs, Select, Skeleton, Divider, List, Avatar, Modal, Checkbox, Input, Form } from "antd";
import modal from "antd/lib/modal";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { getSubject, ISubject } from "../../../redux/reducers/subject.reducer";
import { AppDispatch } from "../../../redux/store";
  
  const { Option } = Select;
  const { TabPane } = Tabs;
  const { Panel } = Collapse;
  const classTeach = [
    {
      name: "Tất cả các lớp",
      value: "all",
    },
    {
      name: "Lớp nâng cao",
      value: "advancedClass",
    },
    {
      name: "Lớp cơ bản",
      value: "basicClass",
    },
  ];
  export const SubjectDetail = () => {
    const params = useParams<{ idSub: string }>();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [data, setData] = useState<ISubject>();
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [dataNotification, setDataNotification] = useState<any>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editorState, setEditorState] = useState();
    const [form] = Form.useForm();

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    useEffect(() => {
      if (params.idSub) {
        dispatch(getSubject(params.idSub))
          .unwrap()
          .then((rs: ISubject) => {
            setData(rs);
            console.debug('teacher: ', rs)
          })
          .catch((e: any) => {
            console.debug("e: ", e);
          });
      }
    }, []);

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
            setDataNotification([...dataNotification, ...body.results]);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      };
    
      useEffect(() => {
        loadMoreData();
      }, []);
      const modalChangeName = {
        title: "Tạo câu hỏi cho học viên",
        width: "50%",
        className: "modal-change-name",
        content: (
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            name="cancel-form"
            layout="horizontal"
            form={form}
          >
            <Form.Item name="fileName" label="Tên bài giảng">
              <div>Thương mại điện tử</div>
            </Form.Item>
            <Form.Item name="chooseTopic" label="Chọn chủ đề">
              <Select disabled={disable} defaultValue="Chọn chủ đề">
                <Option value={0}>Văn hóa xã hội</Option>
                <Option value={1}>Sample</Option>
              </Select>
            </Form.Item>
            <Form.Item name="fileNameTitle" label="Tiêu đề bài giảng">
              <Input />
            </Form.Item>
          </Form>
        ),
        okText: "Lưu",
        cancelText: "Huỷ",
      };
  
    return (
      <div className="subDetail teacher-subject">
        <BreadcrumbComp
          title="Thương mại điện tử"
          prevPageTitle="Danh sách môn giảng dạy"
          prevPage="teacher/subject"
        />
        <div className="Noti-Page">
          <div className="tab-notilist">
            <Tabs defaultActiveKey="1" type="card" size={"small"}>
              <TabPane tab="Tổng quan môn học" key="1">
                <div
                  id="scrollableDiv"
                  style={{
                    height: 400,
                    overflow: "auto",
                    padding: "0 16px",
                  }}
                >
                  <div className="overview">
                    <h1>Tổng quan</h1>
                    <Row>
                      <Col span={6}>
                        <Row>
                          <Col span={8}>Mã môn học:</Col>
                          <Col span={16}>...</Col>
                          <Col span={8}>Môn học:</Col>
                          <Col span={16}>...</Col>
                        </Row>
                      </Col>
                      <Col span={17} offset={1}>
                        <Row>
                          <Col span={3}>Giảng viên:</Col>
                          <Col span={21}>....</Col>
                          <Col span={3}>Mô tả:</Col>
                          <Col span={21}>
                            Thương mại điện tử, hay còn gọi là e-commerce,
                            e-comm hay EC, là sự mua bán sản phẩm hay dịch vụ
                            trên các hệ thống điện tử như Internet và các mạng
                            máy tính.
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Danh sách chủ đề" key="2">
                <div
                  id="scrollableDiv"
                  style={{
                    height: 400,
                    overflow: "auto",
                    padding: "0 16px",
                  }}
                >
                  <div>
                    <h1>Danh sách chủ đề</h1>
                    <Collapse
                      bordered={false}
                      className="site-collapse-custom-collapse"
                    >
                      <Panel
                        header="Giới thiệu chung về Thương mại Điện tử"
                        key="1"
                        className="site-collapse-custom-panel"
                      >
                        <div className="accor-video">
                          <Tooltip title="Play">
                            <Button
                              size="large"
                              shape="circle"
                              icon={<CaretRightOutlined />}
                              onClick={() =>
                                navigate(
                                  `/subjects/viewsubject`
                                )
                              }
                            />
                          </Tooltip>
                        </div>
                        <h4>Tài nguyên</h4>
                        <hr />
                        <div className="download-file">
                          <div className="file-name">
                            <LinkOutlined />
                            HTKL_KT4SP_10A1.doc
                          </div>
                          <Button>
                            <DownloadOutlined />
                            Tải xuống
                          </Button>
                        </div>
                        <div className="download-file">
                          <div className="file-name">
                            <LinkOutlined />
                            HTKL_KT4SP_10A1.doc
                          </div>
                          <Button>
                            <DownloadOutlined />
                            Tải xuống
                          </Button>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit
                        </p>
                        <hr />
                        <Collapse
                          bordered={false}
                          className="site-collapse-custom-collapse"
                        >
                          <Panel
                            header="Giới thiệu về thương mại điện tử trong những năm gần đây"
                            key="1"
                            className="site-collapse-custom-panel scrollbar"
                          >
                            <h3>1. Quá trình</h3>
                            Contrary to popular belief, Lorem Ipsum is not
                            simply random text. It has roots in a piece of
                            classical Latin literature from 45 BC, making it
                            over 2000 years old. Richard McClintock, a Latin
                            professor at Hampden-Sydney College in Virginia,
                            looked up one of the more obscure Latin words,
                            consectetur, from a Lorem Ipsum passage, and going
                            through the cites of the word in classical
                            literature, discovered the undoubtable source. Lorem
                            Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                            Finibus Bonorum et Malorum" (The Extremes of Good
                            and Evil) by Cicero, written in 45 BC. This book is
                            a treatise on the theory of ethics, very popular
                            during the Renaissance. The first line of Lorem
                            Ipsum, "Lorem ipsum dolor sit amet..", comes from a
                            line in section 1.10.32. <br />
                            <br />
                            The standard chunk of Lorem Ipsum used since the
                            1500s is reproduced below for those interested.
                            Sections 1.10.32 and 1.10.33 from "de Finibus
                            Bonorum et Malorum" by Cicero are also reproduced in
                            their exact original form, accompanied by English
                            versions from the 1914 translation by H. Rackham.{" "}
                            <br />
                            <br />
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using
                            'Content here, content here', making it look like
                            readable English. Many desktop publishing packages
                            and web page editors now use Lorem Ipsum as their
                            default model text, and a search for 'lorem ipsum'
                            will uncover many web sites still in their infancy.
                            Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose
                            (injected humour and the like). There are many
                            variations of passages of Lorem Ipsum available, but
                            the majority have suffered alteration in some form,
                            by injected humour, or randomised words which don't
                            look even slightly believable. If you are going to
                            use a passage of Lorem Ipsum, you need to be sure
                            there isn't anything embarrassing hidden in the
                            middle of text. All the Lorem Ipsum generators on
                            the Internet tend to repeat predefined chunks as
                            necessary, making this the first true generator on
                            the Internet. It uses a dictionary of over 200 Latin
                            words, combined with a handful of model sentence
                            structures, to generate Lorem Ipsum which looks
                            reasonable. The generated Lorem Ipsum is therefore
                            always free from repetition, injected humour, or
                            non-characteristic words etc.
                          </Panel>
                        </Collapse>
                      </Panel>
                      <Panel
                        header="Thương mại điện tử"
                        key="2"
                        className="site-collapse-custom-panel"
                      >
                        <Collapse
                          bordered={false}
                          className="site-collapse-custom-collapse"
                        >
                          <Panel
                            header="Giới thiệu về thương mại điện tử trong những năm gần đây"
                            key="1"
                            className="site-collapse-custom-panel scrollbar"
                          >
                            <h3>1. Quá trình</h3>
                            Contrary to popular belief, Lorem Ipsum is not
                            simply random text. It has roots in a piece of
                            classical Latin literature from 45 BC, making it
                            over 2000 years old. Richard McClintock, a Latin
                            professor at Hampden-Sydney College in Virginia,
                            looked up one of the more obscure Latin words,
                            consectetur, from a Lorem Ipsum passage, and going
                            through the cites of the word in classical
                            literature, discovered the undoubtable source. Lorem
                            Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                            Finibus Bonorum et Malorum" (The Extremes of Good
                            and Evil) by Cicero, written in 45 BC. This book is
                            a treatise on the theory of ethics, very popular
                            during the Renaissance. The first line of Lorem
                            Ipsum, "Lorem ipsum dolor sit amet..", comes from a
                            line in section 1.10.32. <br />
                            <br />
                            The standard chunk of Lorem Ipsum used since the
                            1500s is reproduced below for those interested.
                            Sections 1.10.32 and 1.10.33 from "de Finibus
                            Bonorum et Malorum" by Cicero are also reproduced in
                            their exact original form, accompanied by English
                            versions from the 1914 translation by H. Rackham.{" "}
                            <br />
                            <br />
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using
                            'Content here, content here', making it look like
                            readable English. Many desktop publishing packages
                            and web page editors now use Lorem Ipsum as their
                            default model text, and a search for 'lorem ipsum'
                            will uncover many web sites still in their infancy.
                            Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose
                            (injected humour and the like). There are many
                            variations of passages of Lorem Ipsum available, but
                            the majority have suffered alteration in some form,
                            by injected humour, or randomised words which don't
                            look even slightly believable. If you are going to
                            use a passage of Lorem Ipsum, you need to be sure
                            there isn't anything embarrassing hidden in the
                            middle of text. All the Lorem Ipsum generators on
                            the Internet tend to repeat predefined chunks as
                            necessary, making this the first true generator on
                            the Internet. It uses a dictionary of over 200 Latin
                            words, combined with a handful of model sentence
                            structures, to generate Lorem Ipsum which looks
                            reasonable. The generated Lorem Ipsum is therefore
                            always free from repetition, injected humour, or
                            non-characteristic words etc.
                          </Panel>
                        </Collapse>
                        <Collapse
                          bordered={false}
                          className="site-collapse-custom-collapse"
                        >
                          <Panel
                            header="Thương mại điện tử đã thay đổi sự phát triển của nền kinh tế thế giới"
                            key="2"
                            className="site-collapse-custom-panel scrollbar"
                          >
                            <h3>1. Quá trình</h3>
                            Contrary to popular belief, Lorem Ipsum is not
                            simply random text. It has roots in a piece of
                            classical Latin literature from 45 BC, making it
                            over 2000 years old. Richard McClintock, a Latin
                            professor at Hampden-Sydney College in Virginia,
                            looked up one of the more obscure Latin words,
                            consectetur, from a Lorem Ipsum passage, and going
                            through the cites of the word in classical
                            literature, discovered the undoubtable source. Lorem
                            Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                            Finibus Bonorum et Malorum" (The Extremes of Good
                            and Evil) by Cicero, written in 45 BC. This book is
                            a treatise on the theory of ethics, very popular
                            during the Renaissance. The first line of Lorem
                            Ipsum, "Lorem ipsum dolor sit amet..", comes from a
                            line in section 1.10.32. <br />
                            <br />
                            The standard chunk of Lorem Ipsum used since the
                            1500s is reproduced below for those interested.
                            Sections 1.10.32 and 1.10.33 from "de Finibus
                            Bonorum et Malorum" by Cicero are also reproduced in
                            their exact original form, accompanied by English
                            versions from the 1914 translation by H. Rackham.{" "}
                            <br />
                            <br />
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using
                            'Content here, content here', making it look like
                            readable English. Many desktop publishing packages
                            and web page editors now use Lorem Ipsum as their
                            default model text, and a search for 'lorem ipsum'
                            will uncover many web sites still in their infancy.
                            Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose
                            (injected humour and the like). There are many
                            variations of passages of Lorem Ipsum available, but
                            the majority have suffered alteration in some form,
                            by injected humour, or randomised words which don't
                            look even slightly believable. If you are going to
                            use a passage of Lorem Ipsum, you need to be sure
                            there isn't anything embarrassing hidden in the
                            middle of text. All the Lorem Ipsum generators on
                            the Internet tend to repeat predefined chunks as
                            necessary, making this the first true generator on
                            the Internet. It uses a dictionary of over 200 Latin
                            words, combined with a handful of model sentence
                            structures, to generate Lorem Ipsum which looks
                            reasonable. The generated Lorem Ipsum is therefore
                            always free from repetition, injected humour, or
                            non-characteristic words etc.
                          </Panel>
                        </Collapse>
                      </Panel>
                      <Panel
                        header="Thương mại điện tử"
                        key="3"
                        className="site-collapse-custom-panel"
                      >
                        hehe
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Hỏi & đáp" key="3">
                <div
                  id="scrollableDiv"
                  style={{
                    height: 400,
                    overflow: "auto",
                    padding: "0 16px",
                  }}
                >
                  <div className="selectcomp">
                    <Select className="select" defaultValue={0}>
                      <Option value={0}>Thương mại điện tử</Option>
                      <Option value={1}>Toán cao cấp</Option>
                      <Option value={2}>Đại số </Option>
                      <Option value={3}>Luật sở hữu trí tuệ</Option>
                    </Select>
                    <Select className="select" defaultValue={0}>
                      <Option value={0}>Tất cả bài giảng</Option>
                      <Option value={1}>Giới thiệu chung về T...</Option>
                      <Option value={2}>Thương mại điện tử</Option>
                      <Option value={3}>Thương mại điện tử</Option>
                    </Select>
                    <Select className="select" defaultValue={0}>
                      <Option value={0}>Câu hỏi gần nhất</Option>
                      <Option value={1}>Câu hỏi đã trả lời</Option>
                      <Option value={2}>Câu hỏi chưa trả lời</Option>
                    </Select>
                    <Select className="select" defaultValue="Lọc câu hỏi">
                      <Option value={0}>Câu hỏi tôi hỏi</Option>
                      <Option value={1}>Câu hỏi tôi thích</Option>
                    </Select>
                    <Button className="btn-create-min" type="primary" onClick = {() => modal.confirm(modalChangeName)}>
                      Thêm câu hỏi mới
                    </Button>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Thông báo môn học" key="4">
                <div
                  id="scrollableDiv"
                  style={{
                    height: 400,
                    overflow: "auto",
                    padding: "0 16px",
                  }}
                >
                  <div className="space-with-noti">
                    <Select className="select" defaultValue={0}>
                      <Option value={0}>Thương mại điện tử</Option>
                      <Option value={1}>Toán cao cấp</Option>
                      <Option value={2}>Đại số </Option>
                      <Option value={3}>Luật sở hữu trí tuệ</Option>
                    </Select>
                    <Button className="btn-create-min" type="primary" onClick={showModal}>
                      Tạo thông báo mới
                    </Button>
                    <Modal
                      title="Gửi thông báo mới"
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      footer={[
                        <Button key="submit" type="primary">
                          Gửi
                        </Button>,
                      ]}
                    >
                      <SelectComp
                        textLabel="Chọn lớp giảng dạy"
                        defaultValue="Tất cả các lớp"
                        dataString={classTeach}
                      />
                      <Checkbox
                        className="cb-style"
                        style={{ fontWeight: 700 }}
                      >
                        Chọn học viên
                      </Checkbox>
                      <SearchComponent placeholder="Tìm kiếm" />
                      <Input
                        style={{ margin: "10px 0px 10px 0px" }}
                        placeholder="Chủ đề"
                      />
                      <SunEditor
                        placeholder="Để lại lời nhắn của bạn tại đây..."
                        setOptions={{
                          defaultTag: "div",
                          minHeight: "250px",
                          showPathLabel: false,
                        }}
                      />
                    </Modal>
                  </div>
                  <InfiniteScroll
                    dataLength={dataNotification.length}
                    next={loadMoreData}
                    hasMore={dataNotification.length < 50}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={
                      <Divider plain>It is all, nothing more 🤐</Divider>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      dataSource={dataNotification}
                      renderItem={(item: any) => (
                        <List.Item key={item.id}>
                          <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
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
              <Button
                type="primary"
                onClick={() => {
                  setDisable(!disable);
                }}
              >
                Chỉnh sửa
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  