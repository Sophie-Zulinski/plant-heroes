'use client';
import { Col, Row, Slider, Space } from 'antd';
import { useState } from 'react';

const IntegerStep = () => {
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={20}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
    </Row>
  );
};

const App = () => (
  <Space
    style={{
      width: '100%',
    }}
    direction="vertical"
  >
    <IntegerStep />
  </Space>
);
export default App;
