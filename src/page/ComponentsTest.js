import Text from "../components/Text";
import Header from "../components/Header";
import Image from "../components/Image";

import Box from "../components/Box";
import Spacer from "../components/Spacer";

import Spinner from "../components/Spinner";

import Toggle from "../components/Toggle";
import Upload from "../components/Upload";

import Badge from "../components/Badge";

import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import Input from "../components/Input";
import Select from "../components/Select";
import Slider from "../components/Slider";
import Progress from "../components/Progress";

import Divider from "../components/Divider";
import Skeleton from "../components/Skeleton";
import Flux from "../components/Flux";
import FluxBox from "../components/fluxBox";
import Breadcrumb from "../components/BreadCrumb";
import Tab from "../components/Tab";

import { useState } from "react";

const ComponentsTest = () => {
  const [value, setValue] = useState(20);
  return (
    <>
      <Header>Header</Header>
      <Avatar
        src={"https://picsum.photos/150"}
        shape="circle"
        size={70}
        mode="cover"
      />
      <Text>Text</Text>
      <Spinner />
      <Badge count={10} showZero={true}>
        <Image
          src="https://picsum.photos/60"
          width={60}
          style={{ borderRadius: 8 }}
        />
      </Badge>
      <Badge count={108} maxCount={100} backgroundColor="blue" textColor="red">
        <Image
          src="https://picsum.photos/80"
          width={60}
          style={{ borderRadius: 8 }}
        />
      </Badge>
      <Badge count={0} showZero={false}>
        <Image
          src="https://picsum.photos/70"
          width={60}
          style={{ borderRadius: 8 }}
        />
      </Badge>
      <Divider type="vertical" size={12} />
      <Badge dot>
        <Image
          src="https://picsum.photos/90"
          width={60}
          style={{ borderRadius: 8 }}
        />
      </Badge>
      <Divider />
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Level1</Breadcrumb.Item>
        <Breadcrumb.Item>Level2</Breadcrumb.Item>
      </Breadcrumb>
      <Tab>
        <Tab.Item title="Item 1" index="item1">
          Content 1
        </Tab.Item>
        <Tab.Item title="Item 2" index="item2">
          Content 2
        </Tab.Item>
        <Tab.Item title="Item 3" index="item3">
          <Header>Header</Header>
        </Tab.Item>
      </Tab>
      <br />
      <Image
        src="https://picsum.photos/200"
        placeholder="https://via.placeholder.com/200"
        threshold={0.5}
      />
      <br />
      <Spacer type="horizontal" size={8}>
        <Box />
        <Box />
        <Box />
      </Spacer>
      <br />
      <Spacer type="vertical" size={8}>
        <Box block />
        <Box block />
        <Box block />
      </Spacer>
      <br />
      <Avatar.Group>
        <Avatar src={"https://picsum.photos/170?1"} />
        <Avatar src={"https://picsum.photos/170?2"} />
        <Avatar src={"https://picsum.photos/170?3"} />
        <Avatar src={"https://picsum.photos/170?4"} />
      </Avatar.Group>
      <br />
      <Toggle name="control" disabled={false} on={true} />
      <Skeleton.Box width="200px" height="100px" />
      <Skeleton.Circle size={100} />
      <Skeleton.Paragraph line={3} />
      <Flux.Row gutter={[8, 8]}>
        <Flux.Col span={4}>
          <FluxBox />
        </Flux.Col>
        <Flux.Col span={2}>
          <FluxBox />
        </Flux.Col>
        <Flux.Col span={2}>
          <FluxBox />
        </Flux.Col>
        <Flux.Col span={2}>
          <FluxBox />
        </Flux.Col>
        <Flux.Col span={2}>
          <FluxBox />
        </Flux.Col>
        <Flux.Col span={4}>
          <FluxBox />
        </Flux.Col>
        <Flux.Col span={4}>
          <FluxBox />
        </Flux.Col>
        <Flux.Col span={4}>
          <FluxBox />
        </Flux.Col>
      </Flux.Row>
      <Input
        label="Input"
        invalid={false}
        block={false}
        required={false}
        disabled={false}
      />
      <Select
        label="Select"
        data={["Item 1", "Item 2", { label: "Item 3", value: "value" }]}
        placeholder="placeHolder"
        invalid={false}
        block={true}
        required={false}
        disabled={false}
      />
      <br />
      <Slider step={10} />
      <br />
      <Spacer type="horizontal" style={{ display: "flex" }}>
        <Icon name="volume-1" />
        <Slider style={{ width: 100, diplay: "inline-block" }} />
        <Icon name="volume-2" />
      </Spacer>
      <br />
      <div>
        <button onClick={() => setValue(100)}>change value</button>
        <Progress value={value} />
      </div>
      <br />
      <Upload>
        {(file) => <button>{file ? file.name : "click me"}</button>}
      </Upload>
      <br />
      <Upload droppable>
        {(file, dragging) => (
          <div
            style={{
              width: "300px",
              height: "100px",
              border: "4px dashed #aaa",
              borderColor: dragging ? "black" : "#aaa",
            }}
          >
            {file ? file.name : "Click or drag file to this area to upload"}
          </div>
        )}
      </Upload>
      <Icon name="box" size={16} strokeWidth={2} color="#222" />
    </>
  );
};

export default ComponentsTest;
