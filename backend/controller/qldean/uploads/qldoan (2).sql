-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 03, 2021 lúc 10:30 AM
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
-- Đang đổ dữ liệu cho bảng `chitietchinhsuadoan`
--

INSERT INTO `chitietchinhsuadoan` (`MaDA`, `MaGV`, `ThoiGian`) VALUES
('DA17011', 'GVCN006', '2021-06-01 00:00:00'),
('DA21020', 'GVCN006', '2021-06-01 00:00:00'),
('DA21021', 'GVCN006', '2021-06-01 00:00:00'),
('DA21022', 'GVCN006', '2021-06-03 00:00:00'),
('DA21023', 'GVCN006', '2021-06-03 00:00:00'),
('DA21024', 'GVPT001', '2021-06-03 00:00:00');

--
-- Đang đổ dữ liệu cho bảng `doan`
--

INSERT INTO `doan` (`MaDA`, `TenDA`, `MaCN`) VALUES
('DA16001', 'web', 'CP'),
('DA17010', 'webapp', 'CP'),
('DA17011', 'webapp', 'CP'),
('DA21001', 'webapp', 'CP'),
('DA21002', 'doan', 'CP'),
('DA21003', '', 'CP'),
('DA21004', '', 'CP'),
('DA21005', '', 'CP'),
('DA21006', '', 'CP'),
('DA21007', '', 'CP'),
('DA21008', 'wap', 'CP'),
('DA21009', 'tays', 'IS'),
('DA21010', 'sss', 'CP'),
('DA21015', 'sss', 'CP'),
('DA21016', '14', 'CS'),
('DA21018', '14', 'CS'),
('DA21019', 'tanss', 'CP'),
('DA21020', 'tan', 'CP'),
('DA21021', 'ty', 'CP'),
('DA21022', '', 'CP'),
('DA21023', 'ty', 'IS'),
('DA21024', 'ABC', 'PU');

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`MaNV`, `TenNV`, `NgaySinh`, `MaNganh`, `SDT`, `Email`, `MaTK`) VALUES
('GVAT001', 'Huỳnh Văn Nhứt', '1978-12-23', 'AT', '0903007234', 'vannhut2312@ptithcm.edu.vn', 'TK0002'),
('GVAT008', 'Đỗ Thị Ngọc Lan', '1989-12-12', 'AT', NULL, 'Ngoclan1989@ptithcm.edu.vn', 'TK0011'),
('GVAT009', 'thyu', '2021-04-29', 'AT', '121', '1212@ptithcm.edu.vn', 'TK0015'),
('GVCN002', 'Trần Thị Thanh Hảo', '1996-12-11', 'CN', '0376699418', 'âts@ptithcm.edu.vn', 'TK0004'),
('GVCN003', 'Hồ Thị Quỳnh Giang', '1987-11-15', 'CN', '0903014589', 'quynhgiang1511@ptithcm.edu.vn', 'TK0005'),
('GVCN006', 'Hồ Thị Quỳnh Giang', '1987-11-15', 'CN', '0903014589', 'quynhgiang1511@ptithcm.edu.vn', 'TK0010'),
('GVCN007', '231', '2021-05-05', 'CN', '1212', '121212@ptithcm.edu.vn', 'TK0006'),
('GVNa005', 'uuuu21', '2021-05-11', 'CN', 'uuuu12', 'uuuu@ptithcm.edu.vn', 'TK0016'),
('GVPT001', 'ty', '2021-05-05', 'PT', '1212', '1212@ptithcm.edu.vn', 'TK0003'),
('GVPT002', 'tan', '2021-05-06', 'PT', '1212', '1212@ptithcm.edu.vn', 'TK0007'),
('GVPT003', 'tayu', '2021-06-18', 'PT', '121312', '121212@ptithcm.edu.vn', 'TK0027'),
('GVPT004', 'mu', '2021-06-10', 'PT', '1212', '121212@ptithcm.edu.vn', 'TK0030'),
('GVPT005', '23212', '2021-06-16', 'PT', '121214312', '121212@ptithcm.edu.vn', 'TK0031');

--
-- Đang đổ dữ liệu cho bảng `phancongdoan`
--

INSERT INTO `phancongdoan` (`MaPhanCong`, `MaDA`, `MaSV`, `MaGVHD`, `MaGVPB`, `MaBC`, `MaCT`) VALUES
('PC17001', 'DA21003', 'N17DCPT002', 'GVPT001', 'GVPT002', NULL, 0),
('PC17002', 'DA16001', 'N17DCPT001', 'GVPT002', 'GVPT003', NULL, 0),
('PC17003', 'DA16001', 'N17DCPT003', 'GVPT003', 'GVPT001', NULL, 0),
('PC17004', NULL, 'N17DCPT004', 'GVPT004', NULL, NULL, 0);

--
-- Đang đổ dữ liệu cho bảng `phienbanhuongdan`
--

INSERT INTO `phienbanhuongdan` (`MaCT`, `Tep`, `TrangThai`, `MoTa`, `MaDA`, `MaGV`, `ThoiGian`) VALUES
(1, 'da17011gvcn00620210601000000file1.doc', 1, NULL, 'DA17011', 'GVCN006', '2021-06-01 00:00:00'),
(2, NULL, 1, NULL, 'DA21021', 'GVCN006', '2021-06-01 00:00:00'),
(3, NULL, 1, NULL, 'DA21022', 'GVCN006', '2021-06-03 00:00:00'),
(4, NULL, 1, NULL, 'DA21023', 'GVCN006', '2021-06-03 00:00:00'),
(5, 'da21024gvpt00120210603000000abc.rar', 0, 'Tệp văn bản, tệp chương trình', 'DA21024', 'GVPT001', '2021-06-03 00:00:00');

--
-- Đang đổ dữ liệu cho bảng `sinhvien`
--

INSERT INTO `sinhvien` (`MaSV`, `TenSV`, `NgaySinh`, `MaLop`, `GPA`, `SDT`, `Email`, `MaTK`) VALUES
('N17DCPT001', 'A', '2021-06-16', 'D17CQPU02-N', 2.5, '89456230', 'N17DCPT001@student.ptithcm.edu.vn', 'TK0028'),
('N17DCPT002', 'tan', '2021-06-24', 'D17CQTK02-N', 12, '121313', 'N17DCPT002@student.ptithcm.edu.vn', 'TK0026'),
('N17DCPT003', 'ty', '2021-06-08', 'D17CQTK03-N', 1.2, '123123', 'N17DCPT003@student.ptithcm.edu.vn', 'TK0029'),
('N17DCPT004', 'tan', '2021-06-03', 'D17CQTK04-N', 1212, '12313', 'N17DCPT004@student.ptithcm.edu.vn', 'TK0032');

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`MaTK`, `TenDangNhap`, `MatKhau`, `Quyen`) VALUES
('TK0001', 'GVCN001', '22011bb728dd5d6fd7448c75275811f6', 'GV'),
('TK0002', 'GVAT001', '2ffb037705b48ab35fd49a7829ca56a6', 'GV'),
('TK0003', 'GVPT001', 'ce28339d1cfd1af5d71a29e61f0deff8', 'GV'),
('TK0004', 'GVCN002', 'b6c1e5bf4e535399426058f5e0cbd181', 'GV'),
('TK0005', 'GVCN003', 'd94f47bb691a781bdd704e47ca5744f4', 'GV'),
('TK0006', 'GVCN007', '2541be29754cba3cef7d7331a685e846', 'GV'),
('TK0007', 'GVPT002', '80d9f4b32dc7a6f06449a013079a9f35', 'GV'),
('TK0008', 'N17DCCN001', '79523f358f9a6c7a077db9b6d504dbf7', 'SV'),
('TK0009', 'N16DCCN007', 'e5271235c5909163ac78f652301f87e2', 'SV'),
('TK0010', 'GVCN006', '3bbb85035dcc1965e784f2e2b17deeb5', 'GV'),
('TK0011', 'GVAT008', 'beaa258e0157937fd0a5df93fd193db3', 'GV'),
('TK0012', 'N17DCCN004', '3eeee3e7b27857171b4f8c751636bb13', 'SV'),
('TK0013', 'N17DCCN006', '72ffdffc434a74db9e0fc90a194f2a0f', 'SV'),
('TK0014', 'N17DCCN021', 'ff19cc8539f505dec4cc8d8df86f2e2e', 'SV'),
('TK0015', 'GVAT009', 'cd57446cd3304300f1c1272b26843edd', 'GV'),
('TK0016', 'GVNa005', 'ecb84e45d390d16fcf0b39adf995b341', 'GV'),
('TK0017', 'N17DCCN028', 'a53e9b14b9e06210a933d303d3bfb787', 'SV'),
('TK0018', 'N17DCCN012', 'fd811bf7c832eca8d77cffe54abfdb86', 'SV'),
('TK0019', 'N17DCCN031', '09db00238202f6b8f98bb261dd30e036', 'SV'),
('TK0020', 'N17DCCN017', 'df7d8cebfb64258087bab9ce9918c9ce', 'SV'),
('TK0021', 'N17DCCN033', '824fb4a278e8bc59df7527544eaf781c', 'SV'),
('TK0022', 'N17DCCN014', 'c2c82184b48a39e7f16a97c9361322a2', 'SV'),
('TK0023', 'N17DCCN005', 'fa35744f3f4cbb48bd280d92f64a41bb', 'SV'),
('TK0024', 'N17DCCN011', 'ce5b08b2634090af789927bae265e436', 'SV'),
('TK0025', 'N17DCCN019', '5a72a46ff2033989c5b2d0016af20fa9', 'SV'),
('TK0026', 'N17DCPT002', 'a540a5d616adf49a737e19fdc1a0ec5a', 'SV'),
('TK0027', 'GVPT003', '49a1ac40d89acaf6b49a91f59eb62f5f', 'GV'),
('TK0028', 'N17DCPT001', '9a7e09738e0b27cfc1108172d4760897', 'SV'),
('TK0029', 'N17DCPT003', '661200882b2a7ad797a6d91db7d5fa67', 'SV'),
('TK0030', 'GVPT004', '2d448f23a6ffa033e2d409512d677e3a', 'GV'),
('TK0031', 'GVPT005', 'c68a0f91b3afec068efd5473938c2057', 'GV'),
('TK0032', 'N17DCPT004', 'c4bf5ff6356abc1b99d1e89172c9c45a', 'SV');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
