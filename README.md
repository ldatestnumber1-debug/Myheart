# 🌌 Nebula Heart - Cosmic Web UI

Một webUI tuyệt đẹp với nền nebula chuyển động, trái tim được cấu tạo bởi vì tinh tú, và các bụi sao đủ màu sắc mang theo văn bản có thể thay đổi được.

## ✨ Tính Năng

- **Nền Nebula Động**: Các đám mây nebula chuyển động chậm với gradient màu tím - xanh lam
- **Trái Tim Từ Vì Tinh Tú**: Trái tim được cấu tạo bởi hàng trăm vì tinh tú lấp lánh
- **Hiệu Ứng Co Bóp**: Trái tim có chuyển động co bóp nhịp nhàng theo thời gian
- **Xoay Chậm**: Trái tim xoay chậm tạo hiệu ứng 3D
- **Bụi Sao Đủ Màu**: Các hạt sao chứa văn bản quay quanh trái tim với đủ loại màu sắc
- **Văn Bản Tùy Chỉnh**: Thay đổi văn bản trong bảng điều khiển
- **Tùy Chỉnh Màu Trái Tim**: Chọn màu sắc cho trái tim từ bộ chọn màu
- **Điều Chỉnh Tốc Độ Xoay**: Sử dụng slider để thay đổi tốc độ xoay của trái tim

## 🎮 Điều Khiển

### Bảng Điều Khiển (Control Panel)
- **Thay đổi văn bản**: Nhập văn bản mới và nhấn "Cập nhật" hoặc Enter
- **Chọn màu trái tim**: Click vào input màu để chọn màu yêu thích
- **Tốc độ xoay**: Sử dụng slider để tăng/giảm tốc độ xoay

### Phím Tắt (Keyboard Shortcuts)
- **R**: Reset văn bản về "I LOVE YOU"
- **+/=**: Tăng tốc độ xoay
- **-**: Giảm tốc độ xoay

## 🚀 Cách Sử Dụng

1. Mở file `index.html` trong trình duyệt
2. Thưởng thức hiệu ứng cosmic
3. Sử dụng bảng điều khiển để tùy chỉnh

## 📁 Cấu Trúc File

```
.
├── index.html              # HTML chính
├── styles.css              # CSS styling
├── nebula-background.js    # Nền nebula
├── heart-generator.js      # Trái tim từ vì tinh tú
├── particles.js            # Bụi sao và text
├── app.js                  # Logic chính
└── README.md               # File này
```

## 🎨 Thành Phần Kỹ Thuật

### Canvas Layers (Z-index)
1. **nebulaCanvas** (z: 1): Nền nebula
2. **heartCanvas** (z: 2): Trái tim từ vì tinh tú
3. **particlesCanvas** (z: 3): Bụi sao với text
4. **Control Panel** (z: 100): Bảng điều khiển

### Hiệu Ứng
- **Nebula**: Gradient radial với pulsing alpha
- **Heart**: Parametric equation với rotation và pulse
- **Particles**: Orbital motion với color variations

## 🌈 Màu Sắc

Các màu sắc trong bụi sao:
- Deep Pink (#ff1493)
- Dark Turquoise (#00ced1)
- Magenta (#ff00ff)
- Cyan (#00ffff)
- Light Pink (#ffb6ff)
- Spring Green (#00ff88)
- Orange-Red (#ff6600)
- Blue (#6666ff)
- Yellow (#ffff00)
- Red-Pink (#ff3366)

## 📱 Responsive Design

WebUI tự động thích ứng với:
- Desktop (Full size)
- Tablet (768px)
- Mobile (480px)

## 🔧 Tùy Chỉnh

### Thay đổi tốc độ nebula
Trong `nebula-background.js`, sửa:
```javascript
this.time += 0.0005; // Tăng/giảm giá trị
```

### Thay đổi kích thước trái tim
Trong `heart-generator.js`, sửa:
```javascript
const scale = 80; // Tăng/giảm kích thước
```

### Thêm màu sắc mới
Trong `particles.js`, thêm vào `this.colors`:
```javascript
this.colors = [
    // ... colors ...
    '#yourcolor' // Thêm màu của bạn
];
```

## 💝 Inspired By
Một sáng tạo web art độc đáo kết hợp animation, tinh xảo và tình yêu.

## 📄 License
MIT License - Tự do sử dụng và chỉnh sửa

---

**Tạo bởi**: Cosmic Designer  
**Năm**: 2025  
**Yêu thích** ✨💫🌌