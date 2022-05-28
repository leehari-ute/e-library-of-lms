import { CaretRightFilled } from "@ant-design/icons";
import { Button, Card, Col, List, Row, Typography } from "antd";
import { useNavigate } from "react-router";
import { AnaCard } from "../../../Components/AnaCard";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { SelectComp } from "../../../Components/Select";
import { ISubject } from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import ppt from "../../../shared/img/ppt.png";
import WEB23 from "../../../shared/img/WEB23.png";
import "./style.scss"; // Alt Shift O

const { Title } = Typography;

interface IFile {
  fileName: string;
  createdAt: string;
  subject: string;
  teacher: string;
  avt: string;
}

export const Home = () => {
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const year = [
    {
      value: "2020-2021",
      name: "2020-2021",
    },
    {
      value: "2021-2022",
      name: "2021-2022",
    },
  ];
  
  const listFile: any[] | undefined = [];
  for (let i = 0; i < 10; i++) {
    listFile.push({
      fileName: "Thương mại điện tử là gì.docx",
      createdAt: "12:01 12/12/2020",
      subject: "Thương mại điện tử",
      teacher: "Hoa Hoa",
      avt: `${ppt}`,
    });
  }

  return (
    <div className="home">
      <BreadcrumbComp title="Trang chủ" />
      <Row>
        <Col span={4} style={{ display: "flex", alignItems: "center" }}>
          <SelectComp
            textLabel="Niên khoá"
            defaultValue={year[0].value}
            dataString={year}
          />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={5} offset={1}>
              <AnaCard number={12} content="Môn học" classname="anacard" />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard
                number={12}
                content="Giảng viên"
                classname="anacard-blue"
              />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard number={12} content="Tệp riêng tư" classname="anacard" />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard number={12} content="Đề thi" classname="anacard-blue" />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="wrapper-list">
        <div className="title">Tài liệu môn học đã xem gần đây</div>
        <List
          grid={{ gutter: 30, column: 4 }}
          dataSource={user.recentSubject}
          pagination={{
            position: "top",
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 8,
          }}
          renderItem={(item: ISubject) => (
            <List.Item key={item.subCode}>
              <Card
                onClick={() => navigate(`/subjects/subjectdetails/${item.id}`)}
              >
                <Row>
                  <Col span={8} className="btn-img">
                    <div className="img-play">
                      <img src={item.image} alt="avt" />
                    </div>
                    <div className="btn-play">
                      <Button shape="circle" icon={<CaretRightFilled />} />
                    </div>
                  </Col>
                  <Col span={15} offset={1}>
                    <h5>{item.subName}</h5>
                    <p>{item.subCode}</p>
                    <h6>{item.subCode}</h6>
                    <span>Giảng viên: {item.teacher.userName}</span>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <Row>
        <Col span={6}>
          <Card className="wrapper">
            <h5>Thống kê truy cập</h5>
            <Card className="inside">
              <Row>
                <Col span={15} offset={1}>
                  <p>Đang truy cập:</p>
                  <p>Lượt truy cập hôm nay:</p>
                  <p>Lượt truy cập tuần này:</p>
                  <p>Lượt truy cập tháng này:</p>
                  <p>Tổng lượt truy cập:</p>
                </Col>
                <Col span={6} offset={2}>
                  <h4>31</h4>
                  <h4>31</h4>
                  <h4>31</h4>
                  <h4>31</h4>
                  <h4>31</h4>
                </Col>
              </Row>
            </Card>
          </Card>
        </Col>
        <Col span={17} offset={1}>
          <div className="wrapper-list">
            <div className="title">Tệp riêng tư tải lên gần đây</div>
            <List
              grid={{ gutter: 30, column: 3 }}
              dataSource={listFile}
              pagination={{
                position: "top",
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              renderItem={(item: IFile) => (
                <List.Item key={item.fileName}>
                  <Card>
                    <Row>
                      <Col span={6}>
                        <img src={ppt} alt="file" />
                      </Col>
                      <Col span={17} offset={1}>
                        <Title ellipsis level={5}>
                          {item.fileName}
                        </Title>
                        <p>{item.createdAt}</p>
                        <h6>{item.subject}</h6>
                        <span>Giảng viên: {item.teacher}</span>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
            <span style={{ color: "grey" }}>
              <i>Hiển thị 10 tệp tài liệu đã xem gần đây nhất</i>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};
