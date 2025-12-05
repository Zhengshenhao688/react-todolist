import { Form, Input, Button, Typography, message } from 'antd';
import { Select, DatePicker, Radio, Checkbox, InputNumber, Divider } from 'antd';
import type { DividerProps } from 'antd/es/divider';

const { Option } = Select;
const { Title, Paragraph } = Typography;

const FormPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, unknown>) => {
    console.log('提交成功：', values);
    message.success('表单提交成功！');
    form.resetFields();
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <Title level={1} style={{ marginBottom: 8 }}>用户信息表单</Title>
      <Paragraph type="secondary" style={{ marginBottom: 32 }}>
        请填写完整的个人信息，带 * 为必填项
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          skills: [],
          agreement: false,
        }}
        style={{ textAlign: 'left' }}
      >
        <Divider orientation={'left' as DividerProps['orientation']} plain style={{ marginTop: 24 }}>基本信息</Divider>

        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 2, message: '用户名至少 2 个字符' },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱地址' },
            { type: 'email', message: '邮箱格式不正确' },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1\d{10}$/, message: '请输入正确的中国手机号' },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: '请选择性别' }]}
        >
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
            <Radio value="other">其他</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="年龄"
          name="age"
          rules={[
            { required: true, message: '请输入年龄' },
            { type: 'number', min: 18, max: 120, message: '年龄必须在18-120之间' },
          ]}
        >
          <InputNumber min={1} max={120} style={{ width: '100%' }} />
        </Form.Item>

        <Divider orientation={'left' as DividerProps['orientation']} plain style={{ marginTop: 24 }}>教育与技能</Divider>

        <Form.Item
          label="最高学历"
          name="education"
          rules={[{ required: true, message: '请选择最高学历' }]}
        >
          <Select placeholder="请选择最高学历">
            <Option value="highschool">高中</Option>
            <Option value="associate">专科</Option>
            <Option value="bachelor">本科</Option>
            <Option value="master">硕士</Option>
            <Option value="doctor">博士</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="技能"
          name="skills"
          rules={[{ required: true, message: '请至少选择一项技能' }]}
        >
          <Select mode="multiple" placeholder="请选择技能">
            <Option value="javascript">JavaScript</Option>
            <Option value="typescript">TypeScript</Option>
            <Option value="react">React</Option>
            <Option value="vue">Vue</Option>
            <Option value="node">Node.js</Option>
            <Option value="python">Python</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="预计工作日期"
          name="startDate"
          rules={[{ required: true, message: '请选择日期范围' }]}
        >
          <DatePicker.RangePicker placeholder={['开始日期', '结束日期']} />
        </Form.Item>

        <Divider orientation={'left' as DividerProps['orientation']} plain style={{ marginTop: 24 }}>其他信息</Divider>

        <Form.Item
          label="个人简介"
          name="bio"
          rules={[
            { required: true, message: '请输入个人简介' },
            { min: 10, message: '个人简介至少 10 个字符' },
          ]}
        >
          <Input.TextArea rows={4} placeholder="请输入个人简介" />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('必须同意用户协议')),
            },
          ]}
        >
          <Checkbox>
            我已阅读并同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button type="primary" htmlType="submit" size="large" style={{ marginRight: 12 }}>
              提交表单
            </Button>
            <Button size="large" onClick={() => form.resetFields()}>
              重置
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPage;