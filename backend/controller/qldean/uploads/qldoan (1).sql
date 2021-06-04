-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 25, 2021 lúc 02:03 AM
-- Phiên bản máy phục vụ: 10.4.18-MariaDB
-- Phiên bản PHP: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qldoan`
--

--
-- Đang đổ dữ liệu cho bảng `chamdiemhd-pb`
--

INSERT INTO `chamdiemhd-pb` (`MaPhanCong`, `MaGV`, `Diem`) VALUES
('PC16001', 'GVCN007', 5),
('PC17001', 'GVPT002', 5),
('PC17002', 'GVCN006', 5),
('PC17003', 'GVCN003', 5),
('PC17004', 'GVNa005', 5),
('PC17005', 'GVCN002', 5),
('PC17006', 'GVCN003', 5),
('PC17007', 'GVCN006', 5),
('PC17008', 'GVCN002', 5),
('PC17009', 'GVCN003', NULL),
('PC17010', 'GVCN006', NULL),
('PC17011', 'GVCN003', NULL),
('PC17012', 'GVCN007', NULL),
('PC17013', 'GVCN002', NULL);

--
-- Đang đổ dữ liệu cho bảng `chuyennganh`
--

INSERT INTO `chuyennganh` (`MaCN`, `TenCN`, `MaNganh`) VALUES
('AT', 'An toàn thông tin', 'AT'),
('CP', 'Công Nghệ Phần Mềm', 'CN'),
('CS', 'Khoa học máy tính', 'CN'),
('IS', 'Hệ Thống Thông Tin', 'CN'),
('MT', 'Mạng Máy Tính và Truyền Thông', 'CN'),
('PU', 'Phát Triển Ứng Dụng', 'PT'),
('TK', 'Thiết Kế', 'PT');

--
-- Đang đổ dữ liệu cho bảng `diemsang`
--

INSERT INTO `diemsang` (`MaNganh`, `NamBD`, `Diem`) VALUES
('AT', 2016, 2.6),
('AT', 2017, 2.7),
('CN', 2013, 2.5),
('CN', 2014, 2.5),
('CN', 2015, 2.5),
('CN', 2016, 2.7),
('CN', 2017, 3),
('CN', 2018, 2.5),
('PT', 2016, 2.5),
('PT', 2017, 3);

--
-- Đang đổ dữ liệu cho bảng `hoidong`
--

INSERT INTO `hoidong` (`MaHD`, `TenHD`) VALUES
(1, 'Khoa Công nghệ thông tin');

--
-- Đang đổ dữ liệu cho bảng `lop`
--

INSERT INTO `lop` (`MaLop`, `MaCN`) VALUES
('D16CQAT01-N', 'AT'),
('D17CQAT01-N', 'AT'),
('D17CQAT02-N', 'AT'),
('D17CQAT03-N', 'AT'),
('D13CQCP01-N', 'CP'),
('D15CQCP01-N', 'CP'),
('D16CQCP01-N', 'CP'),
('D17CQCP01-N', 'CP'),
('D17CQCP02-N', 'CP'),
('D17CQCP03-N', 'CP'),
('D17CQCP04-N', 'CP'),
('D18CQCP01-N', 'CP'),
('D17CQCS01-N', 'CS'),
('D14CQIS01-N', 'IS'),
('D16CQIS01-N', 'IS'),
('D17CQIS-N', 'IS'),
('D17CQIS01-N', 'IS'),
('D17CQIS02-N', 'IS'),
('D17CQMT01-N', 'MT'),
('D17CQPU01-N', 'PU'),
('D16CQTK01-N', 'TK'),
('D17CQTK01-N', 'TK');

--
-- Đang đổ dữ liệu cho bảng `nganh`
--

INSERT INTO `nganh` (`MaNganh`, `TenNganh`, `SoNam`, `MaHD`) VALUES
('AT', 'An toàn thông tin', 4.5, 1),
('CN', 'Công nghệ thông tin', 4.5, 1),
('PT', 'Công nghệ đa phương tiện', 4.5, 1);

--
-- Đang đổ dữ liệu cho bảng `phancongdoan`
--

INSERT INTO `phancongdoan` (`MaPhanCong`, `MaDA`, `MaSV`, `MaGVHD`, `MaGVPB`, `MaBC`, `MaCT`) VALUES
('PC16001', 'DA16001', 'N16DCCN007', 'GVCN007', NULL, NULL, 0),
('PC17001', NULL, 'N17DCCN001', 'GVPT002', NULL, NULL, 0),
('PC17002', NULL, 'N17DCCN004', 'GVCN006', NULL, NULL, 0),
('PC17003', NULL, 'N17DCCN006', 'GVCN003', NULL, NULL, 0),
('PC17004', NULL, 'N17DCCN021', 'GVNa005', NULL, NULL, 0),
('PC17005', NULL, 'N17DCCN028', 'GVCN002', NULL, NULL, 0),
('PC17006', NULL, 'N17DCCN012', 'GVCN003', NULL, NULL, 0),
('PC17007', NULL, 'N17DCCN031', 'GVCN006', NULL, NULL, 0),
('PC17008', NULL, 'N17DCCN017', 'GVCN002', NULL, NULL, 0),
('PC17009', NULL, 'N17DCCN033', 'GVCN003', NULL, NULL, 0),
('PC17010', NULL, 'N17DCCN014', 'GVCN006', NULL, NULL, 0),
('PC17011', NULL, 'N17DCCN005', 'GVCN003', NULL, NULL, 0),
('PC17012', NULL, 'N17DCCN011', 'GVCN007', NULL, NULL, 0),
('PC17013', NULL, 'N17DCCN019', 'GVCN002', NULL, NULL, 0);

--
-- Đang đổ dữ liệu cho bảng `sinhvien`
--

INSERT INTO `sinhvien` (`MaSV`, `TenSV`, `NgaySinh`, `MaLop`, `GPA`, `SDT`, `Email`, `MaTK`) VALUES
('N13DCCN001', 'tan', '2021-05-12', 'D13CQCP01-N', 21, '231', 'N13DCCN001@student.ptithcm.edu.vn', NULL),
('N14DCCN001', 'tan', '2021-05-15', 'D14CQIS01-N', 12, '1213', 'N14DCCN001@student.ptithcm.edu.vn', NULL),
('N15DCCN001', '1212', '2021-05-15', 'D15CQCP01-N', 1212, '1212', 'N15DCCN001@student.ptithcm.edu.vn', NULL),
('N16DCCN002', 'Nguyễn Xuân An', '1996-06-18', 'D17CQCP02-N', 3.1, '0902801702', 'N16DCCN002@student.ptithcm.edu.vn', NULL),
('N16DCCN003', 'Võ Tuấn An', '1997-04-02', 'D17CQIS01-N', 2, '0905897134', 'N16DCCN003@student.ptithcm.edu.vn', NULL),
('N16DCCN007', 'Vũ Hoàng An', '1997-11-15', 'D17CQAT01-N', 3.1, '0703819746', 'N16DCCN007@student.ptithcm.edu.vn', 'TK0009'),
('N16DCCN008', 'PHAN QUỐC BẢO', '1997-10-16', 'D17CQCP02-N', 2.2, '0376384186', 'N16DCCN008@student.ptithcm.edu.vn', NULL),
('N16DCCN010', 'VŨ TUẤN DŨNG', '1996-08-14', 'D17CQIS01-N', 2.9, '0561273655', 'N16DCCN010@student.ptithcm.edu.vn', NULL),
('N16DCCN018', 'NGUYỄN ĐOÀN HỒNG HẠNH', '1996-12-12', 'D16CQCP01-N', 3.2, '0569629525', 'N16DCCN018@student.ptithcm.edu.vn', NULL),
('N16DCCN020', 'LÊ HOÀNG', '1998-01-27', 'D16CQCP01-N', 3, '0902382123', 'N16DCCN020@student.ptithcm.edu.vn', NULL),
('N16DCCN022', 'VÕ PHI HÙNG', '1996-03-28', 'D16CQCP01-N', 3.4, '0383364237', 'N16DCCN022@student.ptithcm.edu.vn', NULL),
('N16DCCN023', 'BÙI HỒNG HUY', '1997-09-12', 'D16CQAT01-N', 3.4, '0813673780', 'N16DCCN023@student.ptithcm.edu.vn', NULL),
('N16DCCN024', 'ĐOÀN QUANG HUY', '1995-11-16', 'D16CQAT01-N', 2.7, '0931950788', 'N16DCCN024@student.ptithcm.edu.vn', NULL),
('N16DCCN026', 'NGUYỄN QUỐC KHÁNH', '1996-06-22', 'D16CQCP01-N', 3.1, '0908467407', 'N16DCCN026@student.ptithcm.edu.vn', NULL),
('N16DCCN027', 'TRẦN PHƯỚC KHOA', '1996-02-22', 'D16CQCP01-N', 3.1, '0897668860', 'N16DCCN027@student.ptithcm.edu.vn', NULL),
('N16DCCN029', 'VŨ TRẦN MỸ LINH', '1996-04-18', 'D16CQCP01-N', 3, '0813084676', 'N16DCCN029@student.ptithcm.edu.vn', NULL),
('N17DCCN001', 'NGUYỄN TRƯỜNG AN', '1999-03-11', 'D17CQIS01-N', 3.2, '0894871525', 'N17DCCN001@student.ptithcm.edu.vn', 'TK0008'),
('N17DCCN004', 'BÙI TUẤN AN', '1998-06-14', 'D17CQAT01-N', 3.4, '0938234640', 'N17DCCN004@student.ptithcm.edu.vn', 'TK0012'),
('N17DCCN005', 'TRẦN TUẤN AN', '1998-01-24', 'D17CQCP01-N', 2.8, '0858089044', 'N17DCCN005@student.ptithcm.edu.vn', 'TK0023'),
('N17DCCN006', 'ĐÀM QUANG Ân', '1998-06-04', 'D17CQCP02-N', 2.8, '0818058907', 'N17DCCN006@student.ptithcm.edu.vn', 'TK0013'),
('N17DCCN009', 'HÀ PHƯỚC BÌNH', '1997-05-18', 'D17CQAT01-N', 2.3, '0383982300', 'N17DCCN009@student.ptithcm.edu.vn', NULL),
('N17DCCN011', 'PHAN ĐẠI', '1997-06-20', 'D17CQCP01-N', 3.1, '0891498730', 'N17DCCN011@student.ptithcm.edu.vn', 'TK0024'),
('N17DCCN012', 'ĐOÀN HỒNG ĐĂNG', '1998-11-20', 'D17CQCP04-N', 3.3, '0907097803', 'N17DCCN012@student.ptithcm.edu.vn', 'TK0018'),
('N17DCCN013', 'NGUYỄN HÙNG ĐIỆP', '1999-02-08', 'D17CQIS-N', 2.7, '093757338', 'N17DCCN013@student.ptithcm.edu.vn', NULL),
('N17DCCN014', 'DƯƠNG TRỰC ĐÔNG', '1999-05-24', 'D17CQAT02-N', 3.4, '0817634833', 'N17DCCN014@student.ptithcm.edu.vn', 'TK0022'),
('N17DCCN015', 'HOÀNG PHAN MINH ĐỨC', '1997-04-10', 'D17CQAT03-N', 1.9, '0855860248', 'N17DCCN015@student.ptithcm.edu.vn', NULL),
('N17DCCN016', 'HOÀNG THỊ HƯƠNG GIANG', '1996-04-11', 'D17CQCP02-N', 2.2, '0854870927', 'N17DCCN016@student.ptithcm.edu.vn', NULL),
('N17DCCN017', 'CHẾ CÔNG HẢI', '1997-08-12', 'D17CQCP01-N', 3.1, '0386547663', 'N17DCCN017@student.ptithcm.edu.vn', 'TK0020'),
('N17DCCN019', 'NGUYỄN PHI HỎA', '1997-04-25', 'D17CQAT01-N', 2.9, '0566898694', 'N17DCCN019@student.ptithcm.edu.vn', 'TK0025'),
('N17DCCN021', 'NGUYỄN MINH HOÀNG', '1998-03-31', 'D17CQIS01-N', 3.1, '0892840115', 'N17DCCN021@student.ptithcm.edu.vn', 'TK0014'),
('N17DCCN025', 'NGUYỄN QUỐC HUY', '1996-04-24', 'D17CQCP02-N', 3.6, '0702065562', 'N17DCCN025@student.ptithcm.edu.vn', NULL),
('N17DCCN028', 'PHAN HOÀNG KIỆT', '1997-06-16', 'D17CQIS01-N', 3.1, '0931039237', 'N17DCCN028@student.ptithcm.edu.vn', 'TK0017'),
('N17DCCN030', 'TRƯƠNG HOÀNG LUÂN', '1997-07-02', 'D17CQCP01-N', 2.8, '0895036076', 'N17DCCN030@student.ptithcm.edu.vn', NULL),
('N17DCCN031', 'NGUYỄN VĂN MÃO', '1996-01-07', 'D17CQCP02-N', 3.7, '0909079287', 'N17DCCN031@student.ptithcm.edu.vn', 'TK0019'),
('N17DCCN032', 'NGUYỄN ĐĂNG MINH', '1995-02-12', 'D17CQAT01-N', 3.3, '0387014890', 'N17DCCN032@student.ptithcm.edu.vn', NULL),
('N17DCCN033', 'TRẦN HUỲNH HOÀNG MY', '1995-02-28', 'D17CQCP02-N', 3.4, '0373771401', 'N17DCCN033@student.ptithcm.edu.vn', 'TK0021'),
('N17DCCN034', 'LÊ TRUNG NGHĨA', '1995-08-21', 'D17CQCP01-N', 3.2, '0852980925', 'N17DCCN034@student.ptithcm.edu.vn', NULL),
('N17DCCN050', '', '2000-05-12', 'D17CQIS-N', 3, '46531456', 'N17DCCN050@student.ptithcm.edu.vn', NULL),
('N17DCCN051', 'thanhtong', '2021-04-28', 'D17CQCP01-N', 12, '12', 'N17DCCN051@student.ptithcm.edu.vn', NULL),
('N17DCCN052', 'tan', '2021-05-13', 'D17CQCP01-N', 12, '1212', 'N17DCCN052@student.ptithcm.edu.vn', NULL),
('N17DCCN053', 'tan', '2021-05-15', 'D17CQCP01-N', 12, '121', 'N17DCCN053@student.ptithcm.edu.vn', NULL),
('N17DCCN054', '1010', '2021-05-13', 'D17CQCP02-N', 10, '1010', 'N17DCCN054@student.ptithcm.edu.vn', NULL),
('N17DCCN055', 'tan', '2021-05-07', 'D17CQCP01-N', 12, '1212', 'N17DCCN055@student.ptithcm.edu.vn', NULL),
('N17DCCN056', '323', '2021-05-20', 'D17CQCP03-N', 2323, '123', 'N17DCCN056@student.ptithcm.edu.vn', NULL),
('N17DCCN057', '123', '2021-05-07', 'D17CQIS02-N', 1212, '1212', 'N17DCCN057@student.ptithcm.edu.vn', NULL),
('N18DCCN001', 'thanhtung', '2021-05-22', 'D18CQCP01-N', 1212, '1212', 'N18DCCN001@student.ptithcm.edu.vn', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
