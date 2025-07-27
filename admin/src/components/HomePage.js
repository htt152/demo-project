import React, { useState } from 'react';
import { Table, Card, Typography, Space, Tag, Progress, Button, Input, Select, Row, Col, Statistic } from 'antd';
import { SearchOutlined, BookOutlined, UserOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import { classData } from '../data/classData';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Tính toán thống kê
  const totalClasses = classData.length;
  const totalStudents = classData.reduce((sum, item) => sum + item.students, 0);
  const totalRevenue = classData.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + price;
  }, 0);

  // Lọc dữ liệu
  const filteredData = classData.filter(item => {
    const matchesSearch = item.className.toLowerCase().includes(searchText.toLowerCase()) ||
                         item.teacher.toLowerCase().includes(searchText.toLowerCase()) ||
                         item.room.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesLevel = filterLevel === 'all' || item.level.includes(filterLevel);
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  // Định nghĩa cột cho bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      render: (id) => <Text strong>#{id}</Text>
    },
    {
      title: 'Tên lớp',
      dataIndex: 'className',
      key: 'className',
      render: (name) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ color: '#1890ff' }}>{name}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{name.split(' ')[0]}</Text>
        </Space>
      )
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (teacher) => (
        <Space>
          <UserOutlined style={{ color: '#52c41a' }} />
          <Text>{teacher}</Text>
        </Space>
      )
    },
    {
      title: 'Trình độ',
      dataIndex: 'level',
      key: 'level',
      render: (level) => {
        let color = 'blue';
        if (level.includes('A1') || level.includes('Cơ bản')) color = 'green';
        if (level.includes('A2') || level.includes('Sơ cấp')) color = 'cyan';
        if (level.includes('B1') || level.includes('Trung cấp')) color = 'orange';
        if (level.includes('B2') || level.includes('Trung cao')) color = 'volcano';
        if (level.includes('C1') || level.includes('Cao cấp')) color = 'red';
        if (level.includes('IELTS')) color = 'purple';
        if (level.includes('Thương mại')) color = 'geekblue';
        
        return <Tag color={color}>{level}</Tag>;
      }
    },
    {
      title: 'Lịch học',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (schedule) => (
        <Space direction="vertical" size={0}>
          <Text>{schedule.split(' - ')[0]}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{schedule.split(' - ')[1]}</Text>
        </Space>
      )
    },
    {
      title: 'Sĩ số',
      dataIndex: 'students',
      key: 'students',
      render: (students, record) => (
        <Space direction="vertical" size={0}>
          <Text>{students}/{record.maxStudents}</Text>
          <Progress 
            percent={Math.round((students / record.maxStudents) * 100)} 
            size="small" 
            status={students === record.maxStudents ? 'exception' : 'active'}
          />
        </Space>
      )
    },
    {
      title: 'Phòng học',
      dataIndex: 'room',
      key: 'room',
      render: (room) => <Tag color="blue">{room}</Tag>
    },
    {
      title: 'Học phí',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <Space>
          <DollarOutlined style={{ color: '#faad14' }} />
          <Text strong style={{ color: '#faad14' }}>{price}</Text>
        </Space>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'Đang học' ? 'green' : 'blue';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" size="small">Xem chi tiết</Button>
          <Button size="small">Chỉnh sửa</Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Card style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ marginBottom: '24px', color: '#1890ff' }}>
          <BookOutlined style={{ marginRight: '8px' }} />
          Trung tâm Tiếng Anh - Quản lý Lớp học
        </Title>
        
        {/* Thống kê tổng quan */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số lớp"
                value={totalClasses}
                prefix={<BookOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng học viên"
                value={totalStudents}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng doanh thu"
                value={totalRevenue.toLocaleString()}
                prefix={<DollarOutlined />}
                suffix="VNĐ"
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Lớp đang hoạt động"
                value={classData.filter(item => item.status === 'Đang học' || item.status === 'Đang hoạt động').length}
                prefix={<CalendarOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Bộ lọc */}
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={8}>
            <Search
              placeholder="Tìm kiếm theo tên lớp, giáo viên, phòng học..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Lọc theo trình độ"
              style={{ width: '100%' }}
              value={filterLevel}
              onChange={setFilterLevel}
            >
              <Option value="all">Tất cả trình độ</Option>
              <Option value="A1">A1 - Cơ bản</Option>
              <Option value="A2">A2 - Sơ cấp</Option>
              <Option value="B1">B1 - Trung cấp</Option>
              <Option value="B2">B2 - Trung cao cấp</Option>
              <Option value="C1">C1 - Cao cấp</Option>
              <Option value="IELTS">IELTS</Option>
              <Option value="Thương mại">Business English</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Lọc theo trạng thái"
              style={{ width: '100%' }}
              value={filterStatus}
              onChange={setFilterStatus}
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="Đang học">Đang học</Option>
              <Option value="Đang hoạt động">Đang hoạt động</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Space>
              <Button type="primary" icon={<BookOutlined />}>
                Thêm lớp mới
              </Button>
              <Button>Xuất báo cáo</Button>
            </Space>
          </Col>
        </Row>

        {/* Bảng dữ liệu */}
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} lớp học`,
          }}
          scroll={{ x: 1200 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default HomePage; 