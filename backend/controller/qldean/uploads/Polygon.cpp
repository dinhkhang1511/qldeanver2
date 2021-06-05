#include "Polygon.h"

void initMenuBiendoi(){
	cout << "		CAC BIEN DOI TONG HOP"			<< endl;
	cout << "		1. BIEN DOI TINH TIEN "			<< endl;
	cout << "		2. BIEN DOI XOAY	"			<< endl;
	cout << "		3. BIEN DOI TY LE"				<< endl;
	cout << "		4. DOI XUNG QUA TRUC OX"		<< endl;
	cout << "		5. DOI XUNG QUA TRUC OY"		<< endl;
	cout << "		6. DOI XUNG QUA TAM O "			<< endl;
	cout << "		7. DOI XUNG QUA 1 DIEM"			<< endl;
	cout << "		8. THUC HIEN BIEN DOI"			<< endl;
	cout << "	CHON TAT CA CAC PHEP BIEN DOI SAU DO THUC HIEN(8)!	" << endl;
	cout << "==================================================================" << endl;
}

polygon::polygon()
{
}


polygon::~polygon()
{
}


void polygon::keyInput(){
	listVertex.clear();
	int n;
	while (1){
		cout << "SO DINH: ";
		cin >> n;
		if (n < 1 || cin.fail()){
			cout << "DU LIEU KHONG HOP LE. VUI LONG KIEM TRA LAI!!" << endl;
		}	else break;
	}
	for (int i = 1; i <= n; i++){
		Point p;
		// Set lại giá trị y về chiều ngược lại
		while (1){
			fflush(stdin);
			cout << "NHAP DIEM THU " << i << " (x, y): ";
			cin >> p.x >> p.y;
			p.y = -p.y;
			if (cin.fail()){
				cin.clear();
			} else break;
		}

		listVertex.push_back(p);
	}
	Point diemDau = listVertex[0];
	listVertex.push_back(diemDau);
}

void polygon::clickInput(){
	if (listVertex.size() > 0) listVertex.clear();
	int i = 1;
	Point diemDau;
	while (1){
		if (ismouseclick(WM_LBUTTONDOWN)){
			Point p;
			getmouseclick(WM_LBUTTONDOWN, p.x, p.y);
			p.x = getX(p.x);
			p.y = -getY(p.y);
			cout << i++ << "(" <<  p.x << "," << -p.y << ")" << endl;

			listVertex.push_back(p);
		}

		if (ismouseclick(WM_RBUTTONDOWN)){
			clearmouseclick(WM_RBUTTONDOWN);
			break;
		}
	}
	if (listVertex.size() != 0){
		diemDau = listVertex[0];
		listVertex.push_back(diemDau);
	}
}


void polygon::draw(int color){
	int size = listVertex.size();
	//setcolor(color);
	for (int i = 0; i < size - 1; i++){
		//lineBrese(listVertex[i].x, listVertex[i].y, listVertex[i + 1].x, listVertex[i + 1].y, color);
		//line(listVertex[i].x, listVertex[i].y, listVertex[i + 1].x, listVertex[i + 1].y);
		lineMidPoint(listVertex[i].x, listVertex[i].y, listVertex[i + 1].x, listVertex[i + 1].y, color);
	}
}

void polygon::translation(int trX, int trY){
	// Tạo ma trận biến đổi T
	double **T = new double*[3];
	for (int i = 0; i < 3; i++){
		T[i] = new double[3];
	}
	// Gán giá trị cho ma trận biến đổi
	T[0][0] = T[1][1] = T[2][2] = 1;
	T[0][1] = T[0][2] = T[1][0] = T[1][2] = 0;
	T[2][0] = trX, T[2][1] = trY;

	// Tạo ma trận P  chứa tọa độ của các đỉnh và ma trận kết quả 
	int size = listVertex.size();
	double **P = new double *[size];
	double **Q = new double *[size];
	for (int i = 0; i < size; i++){
		P[i] = new double[3];
		Q[i] = new double[3];
	}

	// Gán giá trị cho ma trận tọa độ
	for (int i = 0; i < size; i++){
		P[i][0] = listVertex[i].x;
		P[i][1] = listVertex[i].y;
		P[i][2] = 1;
	}

	// Thực hiện nhân ma trận 
	nhanMaTran(P, T, Q, size, 3, 3);

	cout << "MA TRAN BIEN DOI " << endl;
	xuatMaTran(T, 3, 3);
	cout << endl;
	cout << "MA TRAN KET QUA " << endl; 
	xuatMaTran(Q, size - 1, 3);
	// Gán kết quả 
	for (int i = 0; i < size; i++){
		listVertex[i].x = (int)Q[i][0];
		listVertex[i].y = (int)Q[i][1];
	}

	deleteMatrix(T, 3, 3);
	deleteMatrix(Q, size, 3);
	deleteMatrix(P, size, 3);
}

void polygon::rotate(int pX, int pY, double alpha){
	// Tạo ma trận biến đổi T
	double **T = new double*[3];
	for (int i = 0; i < 3; i++){
		T[i] = new double[3];
	}
	// Gán giá trị cho ma trận biến đổi
	T[0][0] = T[1][1] = cos(alpha);
	T[0][1] = sin(alpha);
	T[1][0] = -sin(alpha);
	T[0][2] = T[1][2] = 0;
	T[2][2] = 1;
	T[2][0] = (1 - cos(alpha))*pX + pY*sin(alpha);
	T[2][1] = (1 - cos(alpha))*pY - pX*sin(alpha);

	// Tạo ma trận P  chứa tọa độ của các đỉnh và ma trận kết quả 
	int size = listVertex.size();
	double **P = new double *[size];
	double **Q = new double *[size];
	for (int i = 0; i < size; i++){
		P[i] = new double[3];
		Q[i] = new double[3];
	}

	// Gán giá trị cho ma trận tọa độ
	for (int i = 0; i < size; i++){
		P[i][0] = listVertex[i].x;	
		P[i][1] = listVertex[i].y;
		P[i][2] = 1;
	}

	// Thực hiện nhân ma trận 
	nhanMaTran(P, T, Q, size, 3, 3);

	cout << "MA TRAN BIEN DOI " << endl;
	xuatMaTran(T, 3, 3);
	cout << endl;
	cout << "MA TRAN KET QUA " << endl;
	xuatMaTran(Q, size - 1, 3);
	// Gán kết quả 
	for (int i = 0; i < size; i++){
		listVertex[i].x = (int)Q[i][0];	  
		listVertex[i].y = (int)Q[i][1];
	}

	// Giải phóng vùng nhớ
	deleteMatrix(T, 3, 3);
	deleteMatrix(Q, size, 3);
	deleteMatrix(P, size, 3);
}

void polygon::scale(double sX, double sY){
	// Tạo ma trận biến đổi T
	double **T = new double*[3];
	for (int i = 0; i < 3; i++){
		T[i] = new double[3];
	}
	// Gán giá trị cho ma trận biến đổi
	T[0][0] = sX;
	T[1][1] = sY;
	T[2][2] = 1;
	T[0][1] = T[0][2] = T[1][0] = T[1][2] = T[2][0] = T[2][1] = 0;

	// Tạo ma trận P  chứa tọa độ của các đỉnh và ma trận kết quả 
	int size = listVertex.size();
	double **P = new double *[size];
	double **Q = new double *[size];
	for (int i = 0; i < size; i++){
		P[i] = new double[3];
		Q[i] = new double[3];
	}

	// Gán giá trị cho ma trận tọa độ
	for (int i = 0; i < size; i++){
		P[i][0] = listVertex[i].x;
		P[i][1] = listVertex[i].y;
		P[i][2] = 1;
	}

	// Thực hiện nhân ma trận 
	nhanMaTran(P, T, Q, size, 3, 3);

	cout << "MA TRAN BIEN DOI " << endl;
	xuatMaTran(T, 3, 3);
	cout << endl;
	cout << "MA TRAN KET QUA " << endl;
	xuatMaTran(Q, size - 1, 3);

	// Gán kết quả 
	for (int i = 0; i < size; i++){
		listVertex[i].x = (int)Q[i][0];
		listVertex[i].y = (int)Q[i][1];
	}

	deleteMatrix(T, 3, 3);
	deleteMatrix(Q, size, 3);
	deleteMatrix(P, size, 3);
}

void polygon::composingTransformation(){
	// Tạo ma trận biến đổi tổng hợp M
	double **M = new double *[3];
	for (int i = 0; i < 3; i++){
		M[i] = new double[3];
	}
	M[0][0] = M[1][1] = M[2][2] = 1;
	M[0][1] = M[0][2] = M[1][0] = M[1][2] = M[2][0] = M[2][1] = 0;

	int size = listVertex.size();
	double  **KQ = new double *[size];
	double **P = new double *[size];
	for (int i = 0; i < size; i++){
		P[i] = new double[3];
		KQ[i] = new double[3];
	}

	// Gán giá trị vào cho ma trận P
	for (int i = 0; i < size; i++){
		P[i][0] = listVertex[i].x;
		P[i][1] = listVertex[i].y;
		P[i][2] = 1;
	}

	int luaChon;
	while (1){
		system("cls");
		initMenuBiendoi();
		while (1){
			fflush(stdin);
			cout << "LUA CHON: ";
			cin >> luaChon;
			if (luaChon < 0 || luaChon > 8 || cin.fail()) {
				cout << "LUA CHON KHONG HOP LE. VUI LONG NHAP LAI!" << endl;
				cin.clear();
			} else break;
		}

		switch (luaChon){
		case 1:
			system("cls");
			cout << "BIEN DOI TINH TIEN" << endl;
			int trX, trY;
			while (1){
				fflush(stdin);
				cout << "NHAP DO DOI X: ";
				cin >> trX;
				cout << "NHAP DO DOI Y: ";
				cin >> trY;
				trY = -trY;
				if (cin.fail()) cin.clear();
				else break;
			}
			biendoiTHTinhTien(M, trX, trY);
			break;
		case 2:
			system("cls");
			cout << "BIEN DOI XOAY" << endl;
			int pX, pY;
			double alpha;
			while (1){
				fflush(stdin);
				cout << "TAM DOI XUNG (x,y): ";
				cin >> pX >> pY;
				pY = -pY;
				if (cin.fail()) cin.clear();
				else break;
			}
			while (1){
				fflush(stdin);
				cout << "GOC XOAY: ";
				cin >> alpha;
				alpha = -alpha;
				alpha = alpha*(M_PI / 180);
				if (cin.fail()) cin.clear();
				else break;
			}
			biendoiTHTinhTien(M, -pX, -pY);
			biendoiTHXoay(M, alpha);
			biendoiTHTinhTien(M, pX, pY);
			break;
		case 3:
			system("cls");
			cout << "BIEN DOI TY LE" << endl;
			double sX, sY;
			while (1){
				fflush(stdin);
				cout << "TI LE SX: ";
				cin >> sX;
				cout << "TI LE SY: ";
				cin >> sY;
				if (cin.fail()) cin.clear();
				else break;
			}
			biendoiTHScale(M, sX, sY);
			break;
		case 4:
			sX = 1, sY = -1;
			biendoiTHScale(M, sX, sY);
			break;
		case 5:
			sX = -1, sY = 1;
			biendoiTHScale(M, sX, sY);
			break;
		case 6:
			sX = -1, sY = -1;
			biendoiTHScale(M, sX, sY);
			break;
		case 7:
			system("cls");
			cout << "BIEN DOI XOAY" << endl;
			while (1){
				fflush(stdin);
				cout << "TAM DOI XUNG (x,y): ";
				cin >> pX >> pY;
				pY = -pY;
				if (cin.fail()) cin.clear();
				else break;
			}
			alpha = 180;
			alpha = alpha*(M_PI / 180);
			biendoiTHTinhTien(M, -pX, -pY);
			biendoiTHXoay(M, alpha);
			biendoiTHTinhTien(M, pX, pY);
			break;
		case 8:
			nhanMaTran(P, M, KQ, size, 3, 3);
			cout << "\nMA TRAN BIEN DOI TONG HOP" << endl;
			xuatMaTran(M, 3, 3);
			cout << endl;
			cout << "MA TRAN KET QUA " << endl;
			xuatMaTran(KQ, size - 1, 3);

			// Gán kết quả 
			for (int i = 0; i < size; i++){
				listVertex[i].x = (int)KQ[i][0];
				listVertex[i].y = (int)KQ[i][1];
			}
			deleteMatrix(M, 3, 3);
			deleteMatrix(P, size, 3);
			deleteMatrix(KQ, size, 3);
			return;
		}
	}
}

void polygon::putEdgeInList(Point p1, Point p2, int nextY){
	EDGE edgeTemp;
	edgeTemp.dxPerScan = float(p2.x - p1.x) / (p2.y - p1.y); // 1/m
	if (p1.y < p2.y){
		/* Trường hợp dòng quét đi ngang qua đỉnh
		là giao điểm của 2 cạnh có hướng y cùng tăng*/
		if (p2.y < nextY){
			p2.y--;
			p2.x -= edgeTemp.dxPerScan;
		}
		edgeTemp.yMin = p1.y;
		edgeTemp.xIntersect = p1.x;
		edgeTemp.deltaY = fabs(double(p2.y - p1.y)) + 1;
	}
	else{
		/*Trường hợp dòng quét đi ngang qua đỉnh là 
		giao điểm của 2 cạnh có hướng y cùng giảm*/
		if (p2.y > nextY){
			p2.y++;
			p2.x += edgeTemp.dxPerScan;
		}
		edgeTemp.yMin = p2.y;
		edgeTemp.xIntersect = p2.x;
		edgeTemp.deltaY = fabs(double(p2.y - p1.y)) + 1;
	}

	// Thêm Edge vào trong lisgEdge
	listEdge.push_back(edgeTemp);
}

int polygon::findNextY(int id){
	int sizeVertex = listVertex.size();
	int i = (id + 1) % sizeVertex;
	while ((i < sizeVertex) && (listVertex[id].y == listVertex[i].y)){
		i++;
	}
	if (i < sizeVertex){
		return(listVertex[i].y);
	}
	return 0;
}
void polygon::shortEdgeList(){
	int size = listEdge.size();
	for (int i = 0; i < size - 1; i++){
		for (int j = i + 1; j < size; j++){
			if (listEdge[i].yMin > listEdge[j].yMin){
				EDGE temp = listEdge[i];
				listEdge[i] = listEdge[j];
				listEdge[j] = temp;
			}
		}
	}
}
void polygon::makeSortedEdge(int &topScan, int &bottomScan){
	topScan = bottomScan = listVertex[0].y;
	int sizeVertex = listVertex.size();
	for (int i = 0; i < sizeVertex - 1; i++){
		if (listVertex[i].y != listVertex[i + 1].y){
			putEdgeInList(listVertex[i], listVertex[i + 1], findNextY(i + 1));
		}
			if (listVertex[i + 1].y > topScan){
				topScan = listVertex[i + 1].y;
			}
	}
	shortEdgeList();
	bottomScan = listEdge[0].yMin;
}

void polygon::updateActiveEdgeList(int yScan, int &firstId, int &lastId){
	int sizeEdge = listEdge.size();
	while ((firstId < sizeEdge - 1) && (listEdge[firstId].deltaY == 0)){
		firstId++;
	}
	while ((lastId < sizeEdge - 1) && (listEdge[lastId + 1].yMin <= yScan)){
		lastId++;
	}
}

void  polygon::shotOnXIntersect(){
	int size = listIntersect.size();
	for (int i = 0; i < size - 1; i++){
		int min = i;
		for (int j = i + 1; j < size; j++){
			if (listIntersect[j] < listIntersect[min])
				min = j;
		}
		int t = listIntersect[min];
		listIntersect[min] = listIntersect[i];
		listIntersect[i] = t;
	}
}
void polygon::findXIntersection(int fristId, int lastId){
	listIntersect.clear();
	for (int i = fristId; i <= lastId; i++){
		if (listEdge[i].deltaY > 0){
			listIntersect.push_back(listEdge[i].xIntersect);
		}
	}
	shotOnXIntersect();
}

void polygon::fillLine(int yScan){
	int size = listIntersect.size();
	if (size < 2) return;
	int color = getcolor();
	for (int i = 0; i < size; i += 2){
		lineBrese(Round(listIntersect[i]), yScan, Round(listIntersect[i + 1]), yScan, color);
	}
}

void polygon::updateEdgeList(int firstId, int lastId){
	for (int i = firstId; i <= lastId; i++){
		if (listEdge[i].deltaY > 0){
			listEdge[i].deltaY--;
			listEdge[i].xIntersect += listEdge[i].dxPerScan;
		}
	}
}

void polygon::scanLineFill(int color){
	setcolor(color);
	int topScan, bottomScan, firstId, lastId;
	makeSortedEdge(topScan, bottomScan);
	firstId = lastId = 0;
	for (int i = bottomScan; i <= topScan; i++){
		updateActiveEdgeList(i, firstId, lastId);
		findXIntersection (firstId, lastId);
		fillLine(i);
		updateEdgeList(firstId, lastId);
	}
}

void polygon::remove(){
	listVertex.clear();
}

bool polygon::isInside(int x, int y){
	int sizeVertex = listVertex.size();
	int i, j;
	bool isInside = false;
	for (i = 0, j = sizeVertex - 1; i < sizeVertex; j = i++){
		if (((listVertex[i].y > y) != (listVertex[j].y > y)) &&
			(x < (listVertex[j].x - listVertex[i].x) * (y - listVertex[i].y) / (listVertex[j].y - listVertex[i].y) + listVertex[i].x))
			isInside = !isInside;
	}
	return isInside;
}

void polygon::floodFill(int fillColor){
	stack<Point> st;
	Point P = findPointInside();
	st.push(P);
	while (!st.empty()){
		Point Q = st.top();
		st.pop();
		if (getpixel(Q.x, Q.y) != fillColor && isInside(Q.x, Q.y)){
			putpixel(Q.x, Q.y, fillColor);
			Point t;
			t.x = Q.x + 1; t.y = Q.y;
			st.push(t);
			t.x = Q.x - 1; t.y = Q.y;
			st.push(t);
			t.x = Q.x; t.y = Q.y + 1;
			st.push(t);
			t.x = Q.x; t.y = Q.y - 1;
			st.push(t);
		}
	}
}

Point polygon::findPointInside(){
	int sizeVertex = listVertex.size();
	int x = 0, y = 0;
	for (int i = 0; i < sizeVertex - 1; i++){
		x += listVertex[i].x;
		y += listVertex[i].y;
	}
	x /= (sizeVertex - 1);
	y /= (sizeVertex - 1);
	Point P = { x, y };

	if (!isInside(x, y)){
		x = listVertex[0].x;
		y = listVertex[0].y;
		stack<Point> temp;
		temp.push(P);
		while (!temp.empty()){
			Point Q = temp.top();
			temp.pop();
			if (isInside(Q.x, Q.y)) return Q;
			else{
				Point t;
				t.x = Q.x + 1; t.y = Q.y;
				temp.push(t);
				t.x = Q.x - 1; t.y = Q.y;
				temp.push(t);
				t.x = Q.x; t.y = Q.y + 1;
				temp.push(t);
				t.x = Q.x; t.y = Q.y - 1;
				temp.push(t);
			}
		}
	}
	return P;
}