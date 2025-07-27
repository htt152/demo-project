# Trung tâm Tiếng Anh - Quản lý Lớp học

Ứng dụng ReactJS đơn giản để quản lý danh sách lớp học tiếng Anh trong trung tâm, sử dụng Ant Design.

## Tính năng

- 📊 **Dashboard tổng quan**: Hiển thị thống kê tổng số lớp, học viên, doanh thu
- 📋 **Bảng danh sách lớp học**: Hiển thị đầy đủ thông tin các lớp học
- 🔍 **Tìm kiếm và lọc**: Tìm kiếm theo tên lớp, giáo viên, phòng học
- 🏷️ **Lọc theo trình độ**: A1, A2, B1, B2, C1, IELTS, Business English
- 📈 **Hiển thị sĩ số**: Progress bar hiển thị tỷ lệ học viên/sĩ số tối đa
- 🎨 **Giao diện đẹp**: Sử dụng Ant Design với UI/UX hiện đại

## Cài đặt và chạy

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Chạy ứng dụng:**
```bash
npm start
```

3. **Mở trình duyệt:**
Truy cập [http://localhost:3000](http://localhost:3000)

## Cấu trúc dự án

```
src/
├── components/
│   └── HomePage.js          # Component chính hiển thị trang home
├── data/
│   └── classData.js         # Dữ liệu mock cho các lớp học
├── App.js                   # Component gốc
├── App.css                  # Styles cho ứng dụng
└── index.js                 # Entry point
```

## Dữ liệu mẫu

Ứng dụng bao gồm 8 lớp học mẫu với các thông tin:
- Tên lớp và mô tả
- Giáo viên phụ trách
- Trình độ (A1-C1, IELTS, Business English)
- Lịch học và phòng học
- Sĩ số hiện tại và tối đa
- Học phí
- Trạng thái lớp học

## Công nghệ sử dụng

- **React 18**: Framework JavaScript
- **Ant Design**: UI Component Library
- **CSS3**: Styling
- **JavaScript ES6+**: Modern JavaScript features

## Tính năng bổ sung

- Responsive design cho mobile
- Custom scrollbar
- Hover effects
- Color-coded tags cho trình độ
- Progress bars cho sĩ số
- Search và filter functionality

## Tác giả

Được tạo bởi AI Assistant cho demo project ReactJS với Ant Design.
