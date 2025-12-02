import { Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

const FormPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, string>) => {
    console.log('提交成功：', values);
    message.success('表单提交成功！');
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', paddingTop: 24 }}>
      <Title level={3} style={{ textAlign: 'center' }}>表单示例</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
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

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            提交表单
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPage;