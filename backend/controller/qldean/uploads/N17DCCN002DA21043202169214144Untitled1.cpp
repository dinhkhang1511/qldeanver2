#include <winbgim.h>
#include<iostream>
#include<conio.h>
#include<cmath>
#define PI 3.14
#include <stdio.h>
#include <math.h>
#include <time.h>

#include <dos.h>
using namespace std;
int BLACK =0;
int BLUE=1;
int GREEN=2;
int CYAN=3;
int RED=4;
int MAGENTA=5;
int BROWN=6;
int LIGHTGRAY=7;
int DARKGRAY =8;
int LIGHTBLUE =9;
int LIGHTGREEN=10;
int LIGHTCYAN=11;
int LIGHTRED=12;
int LIGHTMAGENTA=13;
int YELLOW=14;
int WHITE=15;



void setpixel(int x, int y,int color){
	putpixel(x,y,color);
	putpixel(x+1,y-1,color);
	putpixel(x+1,y,color);
	putpixel(x+1,y+1,color);
	putpixel(x,y+1,color);
	putpixel(x-1,y+1,color);
	putpixel(x-1,y,color);
	putpixel(x-1,y-1,color);
	putpixel(x,y-1,color);
}
void midpoint(int xa, int ya,int xb,int yb,int color){
	int Dx = abs(xb - xa);
	int Dy = abs(yb - ya);
	int p = 2*Dy -Dx;
	
	int x = xa;
	int y = ya;
	
	int x_unit = 1; int y_unit =1;
	//xet de biet huong ve duong thang
	if((xb-xa)<0){
		x_unit = -x_unit;
	}
	if((yb-ya)<0){
		y_unit = -y_unit;
	}
	// truong hop duong thang dung
	if(xa==xb){
		setpixel(x,y,color);
		while(y!=yb){
			y+=y_unit;
			setpixel(x,y,color);
		}
	}
	//truong hop ve duong thang nam ngang
	else if(ya==yb){
		setpixel(x,y,color);
		while(x!=xb){
			x+=x_unit;
			setpixel(x,y,color);
		}
	}
	else{
		setpixel(x,y,color);
		while(x!=xb){
			if(p<0){
				p+=2*Dy;
			}
			else{
				p+=2*(Dy-Dx);
				y+=y_unit;
			}
			x+=x_unit;
			setpixel(x,y,color);
		}
	}
	
}

//ve he toa do
void hetoado(int color){
	///truc oy
	settextstyle(0, 0, 1);
	outtextxy(180,50,"y");
	midpoint(200,50,200,400,color);
	midpoint(200,50,205,55,color);
	midpoint(200,50,195,55,color);
	//truc ox
	outtextxy(750,420,"x");
	midpoint(200,400,750,400,color);
	midpoint(750,400,745,395,color);
	midpoint(750,400,745,405,color);
	//truc oz
	outtextxy(50,570,"z");
	midpoint(200,400,50,550,color);
	midpoint(50,550,50,545,color);
	midpoint(50,550,55,550,color);
	//toa do goc

}
void draw_rectangle(int x, int y, int width, int height,int color){
		midpoint(x,y, x+width,y,color);
		midpoint(x+width,y,x+width,y+height,color);
		midpoint(x+width,y+height,x,y+height,color);
		midpoint(x,y+height,x,y,color);
}

void ve_net_dut(int xa, int ya,int xb,int yb,int color){
	int Dx = abs(xb - xa);
	int Dy = abs(yb - ya);
	int p = 2*Dy -Dx;
	
	int x = xa;
	int y = ya;
	int count = 0;
	int x_unit = 1; int y_unit =1;
	//xet de biet huong ve duong thang
	if((xb-xa)<0){
		x_unit = -x_unit;
	}
	if((yb-ya)<0){
		y_unit = -y_unit;
	}
	// truong hop duong thang dung
	if(xa==xb){
		setpixel(x,y,color);
		count++;
		while(y!=yb){
			y+=y_unit;
			if(count<5){
				setpixel(x,y,color);
			}
			if(count==10){
				count = 0;
			}
			count++;
		}
	}
	//truong hop ve duong thang nam ngang
	else if(ya==yb){
		setpixel(x,y,color);
		count++;
		while(x!=xb){
			x+=x_unit;
			if(count<5){
				setpixel(x,y,color);
			}
			if(count==10){
				count = 0;
			}
			count++;
		}
	}
	else{
		setpixel(x,y,color);
		count++;
		while(x!=xb){
			if(p<0){
				p+=2*Dy;
			}
			else{
				p+=2*(Dy-Dx);
				y+=y_unit;
			}
			x+=x_unit;
			if(count<5){
				setpixel(x,y,color);
			}
			if(count==10){
				count = 0;
			}
			count++;
		}
	}
}

void plot(int xc, int yc, int x, int y,int count, int color)
{
    setpixel(xc+x, yc+y, color);
    setpixel(xc-x, yc+y, color);
    if(count<5 && count>0){
    	setpixel(xc+x, yc-y, color);
    	setpixel(xc-x, yc-y, color);
	}
    
}
void plot1(int xc, int yc, int x, int y,int count, int color)
{
    setpixel(xc+x, yc+y, color);
    setpixel(xc-x, yc+y, color);
    setpixel(xc+x, yc-y, color);
    setpixel(xc-x, yc-y, color);
    
}
//midpoint elip 
void khoi_elip(int xc, int yc, int zc,int a, int b){
	
 	xc = 200+ xc- int(zc*cos(45) );
	yc = 400-yc - int(zc*cos(45) );

	int count = 0;
	int x=0;
	int y=b;
	int a2=a*a;
	int b2=b*b;
	int fx=0;
	int fy=2*a2*y;
	plot(xc, yc, x, y,count, 0);
	int p =p=int(b2 -(a2*b) + (0.25*a2));
	while(fx<fy){
		x=x+1;
		fx=fx+2*b2;
		if(p<0){
			p=p+b2*(2*x + 3);
			if(count > 5){
				count=-5;
			}	
			else{
				count = count +1;
			}
		}
		else{
			y=y-1;
			p+=b2*(2*x +3) + a2*(2- 2*y) ;
			fy=fy-2*a2;
			count = count +1;
			if(count > 5){
				count=-5;
			}
			else{
				count = count +1;
			}
		}
		plot(xc, yc, x, y,count, 0);	
	}
	while (y>0){
		y=y-1;
		fy=fy-2*a2;
		if (p>=0){
			p=p+a2*(3-2*y);
			count = count +1;
			if(count > 5){
				count=-5;
			}
			else{
				count = count +1;
			}
		}
		else{
			x=x+1;
			fx=fx+2*b2;
			p=p+b2*(2*x+2) + a2*(3-2*y);
			count = count +1;
			if(count > 5){
				count=-5;
			}
			else{
				count = count +1;
			}
		}
		plot(xc, yc, x, y,count, 0);
	}
		
}


///
void khoi_tron(int xc, int yc, int zc, int a, int b){
	
 	xc = 200+ xc- int(zc*cos(45) );
	yc = 400-yc - int(zc*cos(45) );
	
	setpixel(xc,yc,0);
	int count = 0;
	int x=0;
	int y=b;
	int a2=a*a;
	int b2=b*b;
	int fx=0;
	int fy=2*a2*y;
	plot1(xc, yc, x, y,count, 0);
	int p =p=int(b2 -(a2*b) + (0.25*a2));
	while(fx<fy){
		x=x+1;
		fx=fx+2*b2;
		if(p<0){
			p=p+b2*(2*x + 3);
			if(count > 5){
				count=-5;
			}	
			else{
				count = count +1;
			}
		}
		else{
			y=y-1;
			p+=b2*(2*x +3) + a2*(2- 2*y) ;
			fy=fy-2*a2;
			count = count +1;
			if(count > 5){
				count=-5;
			}
			else{
				count = count +1;
			}
		}
		plot1(xc, yc, x, y,count, 0);	
	}
	while (y>0){
		y=y-1;
		fy=fy-2*a2;
		if (p>=0){
			p=p+a2*(3-2*y);
			count = count +1;
			if(count > 5){
				count=-5;
			}
			else{
				count = count +1;
			}
		}
		else{
			x=x+1;
			fx=fx+2*b2;
			p=p+b2*(2*x+2) + a2*(3-2*y);
			count = count +1;
			if(count > 5){
				count=-5;
			}
			else{
				count = count +1;
			}
		}
		plot1(xc, yc, x, y,count, 0);
	}
		
}

void hinh_cau(){
	int xc; int yc;int zc; int bankinh;
	cout<<"\nnhap toa do tam ,toa do x: ";
	cin>>xc;
	cout<<"\nnhap toa do tam ,toa do y: ";
	cin>>yc;
	cout<<"\nnhap toa do tam ,toa do z: ";
	cin>>zc;
	cout<<"\nnhap ban kinh: ";
	cin>>bankinh;
	bankinh=bankinh*2;
	
	khoi_tron(xc,yc,zc,bankinh,bankinh);
	khoi_elip(xc,yc,zc,bankinh,bankinh*(sqrt(2)/2));
}

	


void menu(){
	setfillstyle(SOLID_FILL,15);
    floodfill(1,1,15);
	draw_rectangle(10,10,750,600,0);
}

void ve_hcn(int color){
	int x;int y; int z;int len; int wid; int hei;
	cout<<"\nnhap toa do x: ";cin>>x;
	cout<<"\nnhap toa do y: ";cin>>y;
	cout<<"\nnhap toa do z: ";cin>>z;
	cout<<"\nnhap do dai: ";cin>>len;
	cout<<"\nnhap do rong: ";cin>>wid;
	cout<<"\nnhap do cao: ";cin>>hei;
	wid= (wid * cos(45/180))*3;
	
	int xtemp = 200+x - int(z*cos(45) );
	int ytemp = 400-y - int(z*cos(45)) ;
	
	ve_net_dut(xtemp,ytemp,xtemp-wid,ytemp+wid,color);
	ve_net_dut(xtemp,ytemp,xtemp+len,ytemp,color);
	ve_net_dut(xtemp,ytemp,xtemp,ytemp-hei,color);
	midpoint(xtemp,ytemp-hei,xtemp+len,ytemp-hei,color);
	midpoint(xtemp+len,ytemp-hei,xtemp+len-wid,ytemp-hei+wid,color);
	midpoint(xtemp+len-wid,ytemp-hei+wid,xtemp-wid,ytemp-hei+wid,color);
	midpoint(xtemp-wid,ytemp-hei+wid,xtemp,ytemp-hei,color);
	midpoint(xtemp-wid,ytemp-hei+wid,xtemp-wid,ytemp+wid,color);
	midpoint(xtemp+len,ytemp-hei,xtemp+len,ytemp,color);
	midpoint(xtemp+len-wid,ytemp-hei+wid,xtemp+len-wid,ytemp+wid,color);
	midpoint(xtemp+len-wid,ytemp+wid,xtemp+len,ytemp,color);
	midpoint(xtemp+len-wid,ytemp+wid,xtemp-wid,ytemp+wid,color);
	
}



//-------------------------------------------------------------------------------------------------------------------------

//11 TOA DO
  void calcPoints(int radius, int midx, int midy, int x[12], int y[12]) {
        int x1, y1;
        /* 90, 270, 0, 180 degrees */
        x[0] = midx, y[0] = midy - radius;
        x[6] = midx, y[6] = midy + radius;
        x[3] = midx + radius, y[3] = midy;
        x[9] = midx - radius, y[9] = midy;

        /* 30, 150, 210, 330 degrees */
        x1 = (int) ((radius / 2) * sqrt(3));
        y1 = (radius / 2);
        x[2] = midx + x1, y[2] = midy - y1;
        x[4] = midx + x1, y[4] = midy + y1;
        x[8] = midx - x1, y[8] = midy + y1;
        x[10] = midx - x1, y[10] = midy - y1;

        /* 60, 120, 210, 300 degrees */
        x1 = radius / 2;
        y1 = (int) ((radius / 2)  * sqrt(3));
        x[1] = midx + x1, y[1] = midy - y1;
        x[5] = midx + x1, y[5] = midy + y1;
        x[7] = midx - x1, y[7] = midy + y1;
        x[11] = midx - x1, y[11] = midy - y1;
        
        return;
  }
  
  //VE DAM MAY
  void vemay(int x,int y,int r){
	//r: do rong cua may
	setcolor(7);
	arc(x,y,88,270,r);
    arc(x+r,y,40,140,r*sqrt(2));
    arc(x+3*r,y,40,140,r*sqrt(2));
    arc(x+4*r,y,-90,92,r);
    line(x-2,y+r-1,x+4*r+2,y+r-1);
    setfillstyle(SOLID_FILL,15);
	floodfill(x,y,7);
}
  
  
//VE MAT TROI
void vemattroi(int x,int y,int r){
	setcolor(12);
	circle(x,y,r);
	
	int m;
	int k;//do dai tia 
	k = r/3;
	m = r*sin(45);

	line(x,y-r-(r/5),x,y-r-k-(r/5));
	line(x+r+(r/5),y,x+r+k+(r/5),y);
	line(x-r-(r/5),y,x-r-k-(r/5),y);
	line(x,y+r+(r/5),x,y+r+k+(r/5));
	
	line(x+m,y-m,x+m+k,y-m-k);
	line(x+m,y+m,x+m+k,y+m+k);
	line(x-m,y+m,x-m-k,y+m+k);
	line(x-m,y-m,x-m-k,y-m-k);
	
	setfillstyle(SOLID_FILL,14);
	floodfill(x,y,12);
}
  
  
//VE DEN GIAO THONG
void vedengiaothong(int x,int y,int r,int color1,int color2, int color3){
	setcolor(15);
	
	line(x,y,x+3*r,y);
	line(x+3*r,y,x+3*r,y+9*r);
	line(x+3*r,y+9*r,x,y+9*r);
	line(x,y+9*r,x,y);
	line(x+r+2,y+9*r,x+r+2,y+19*r);
	line(x+2*r-4,y+9*r,x+2*r-4,y+19*r);
	line(x+r+2,y+19*r,x+2*r-4,y+19*r);
	int k = 3*r/2;
	circle(x+k,y+k,r);
	circle(x+k,y+k+3*r,r);
	circle(x+k,y+k+6*r,r);
	setfillstyle(SOLID_FILL,8);
	floodfill(x+k,y+11*r,15);
	setfillstyle(SOLID_FILL,0);
	floodfill(x+2,y+2,15);
	//khi xe chay m thay doi mau trong setfillstyle thanh mau xam
	//tuong ung voi luc xe 
	
	//den do
	setfillstyle(SOLID_FILL,color1);//4
	floodfill(x+k,y+k,15);
	//den vang
	setfillstyle(SOLID_FILL,color2);//14
	floodfill(x+k,y+k+3*r,15);
	//den xanh
	setfillstyle(SOLID_FILL,color3);//10
	floodfill(x+k,y+k+6*r,15);
}
  
  
void veBackground(){
    setcolor(CYAN);
	line(0,0,getmaxx(),0);
	line(0,0,0,301);
    line(getmaxx(),0,getmaxx(),300);
    line(0,301,300,201);
	line(300,201,450,301);
	line(450,301,650,201);
	line(650,201,850,330);
	line(850,330,1000,250);
	line(1000,250,getmaxx(),300);
	setfillstyle(SOLID_FILL,CYAN);
	floodfill(10,100,CYAN);
			
	setcolor(GREEN);
	line(0,301,300,201);
	line(300,201,450,301);
	line(450,301,650,201);
	line(650,201,850,330);
	line(850,330,1000,250);
	line(1000,250,getmaxx(),300);
    line(0,301,0,500);
    line(getmaxx(),300,getmaxx(),500);
    line(0,500,getmaxx(),500);
	setfillstyle(SOLID_FILL,GREEN);
	floodfill(10,350,GREEN);
			
	setcolor(WHITE);
    line(0,500,getmaxx(),500);
    line(0,500,0,510);
    line(getmaxx(),500,getmaxx(),510);
    line(0,510,getmaxx(),510);
	setfillstyle(SOLID_FILL,WHITE);
	floodfill(10,504,WHITE);
			
	setcolor(WHITE);
    line(0,511,getmaxx(),511);
    line(0,511,0,getmaxy());
    line(getmaxx(),511,getmaxx(),getmaxy());
    line(0,getmaxy(),getmaxx(),getmaxy());
	setfillstyle(SOLID_FILL,DARKGRAY);
	floodfill(10,515,WHITE);

	setlinestyle(SOLID_LINE, 1, 10);
	setcolor(WHITE);
	line(100,600,200,600);
	line(400,600,500,600);
	line(700,600,800,600);
	line(1000,600,1100,600);
	setlinestyle(SOLID_LINE, 1, 1);
}


//VE CHONG CHONG
void VeChongchong(int pkq,int crcq,int xcq,int ycq){
	
	int x[12], y[12];
	calcPoints(crcq, xcq, ycq, x, y);

	setlinestyle(SOLID_LINE, 1, 4);
	line(xcq, ycq, x[pkq], y[pkq]);
	line(xcq, ycq, x[pkq+1], y[pkq+1]);
	line(x[pkq], y[pkq], x[pkq+1], y[pkq+1]);

	line(xcq, ycq, x[pkq+4], y[pkq+4]);
	line(xcq, ycq, x[pkq+5], y[pkq+5]);
	line(x[pkq+4], y[pkq+4],x[pkq+5], y[pkq+5]);

	line(xcq, ycq, x[pkq+8], y[pkq+8]);
	line(xcq, ycq, x[pkq+9], y[pkq+9]);
	line( x[pkq+8], y[pkq+8],x[pkq+9], y[pkq+9]);

	line(xcq, ycq - 10, xcq+10, ycq - 10);
	line(xcq, ycq - 10, xcq-10, ycq - 10);

	line(xcq, ycq + 200, xcq+10, ycq + 200);
	line(xcq, ycq + 200, xcq-10, ycq + 200);

	setlinestyle(SOLID_LINE, 1, 6);
	line(xcq, ycq - 10, xcq, ycq + 200);
	setlinestyle(SOLID_LINE, 1, 4);

	setfillstyle(HATCH_FILL,WHITE);
	floodfill(  (xcq + x[pkq] +   x[pkq+1] )/3 , ( ycq + y[pkq] +   y[pkq+1] )/3,WHITE);
	setfillstyle(HATCH_FILL,WHITE);
	floodfill(  (xcq + x[pkq+4] +   x[pkq+5] )/3 , ( ycq + y[pkq+4] +   y[pkq+5] )/3,WHITE);
	setfillstyle(HATCH_FILL,WHITE);
	floodfill(  (xcq + x[pkq+8] +   x[pkq+9] )/3 , ( ycq + y[pkq+8] +   y[pkq+9] )/3,WHITE);

	setlinestyle(SOLID_LINE, 1, 1);
}



//VE CAI NHA
void VEnha(){
	setlinestyle(SOLID_LINE, 1, 3);
	line(40,450,400,450);
	//Right ---------
	rectangle(200,330,430,450);
	rectangle(230,444,295,450);
	rectangle(235,355,290,444);
	circle(244,399,3);
	rectangle(340,348,410,400);
	int polx = 400; 
	int poly = 370; 
	setfillstyle(SOLID_FILL,BLACK);
	floodfill( polx , poly ,WHITE);
	rectangle(345,353,405,395);
	line(375,353,375,395);
	line(130,249,426,249);
	line(430,330,445,330);
	line(445,330,426,249);
	rectangle(350,235,380,249);
	polx = 370; 
	poly = 240; 
	setfillstyle(SOLID_FILL,BROWN);
	floodfill( polx , poly ,WHITE);
	rectangle(346,230,384,235);
	polx = 370; 
	poly = 233;  
	setfillstyle(SOLID_FILL,RED);
	floodfill( polx , poly ,WHITE);
	//Left-----------
	line(200,310,200,450);
	line(40,310,40,450);
	line(30,316,120,250);
	line(210,316,120,250);
	line(30,307,120,241);
	line(210,307,120,241);
	line(30,307,30,316);
	line(210,307,210,316);
	rectangle(70,350,170,400);
	polx = 100; 
	poly = 370; 
	setfillstyle(SOLID_FILL,BLACK);
	floodfill( polx , poly ,WHITE);
	rectangle(75,355,165,395);
	line(105,355,105,395);
	line(135,355,135,395);
	 polx = 150; 
	 poly = 300; 
	setfillstyle(SOLID_FILL,LIGHTGRAY );
	floodfill( polx , poly ,WHITE);
	 polx = 300; 
	 poly = 300; 
	setfillstyle(SOLID_FILL,RED );
	floodfill( polx , poly ,WHITE);
	 polx = 196; 
	 poly = 300; 
	setfillstyle(SOLID_FILL,RED );
	floodfill( polx , poly ,WHITE);
	 polx = 250; 
	 poly = 350; 
	setfillstyle(SOLID_FILL,LIGHTGRAY );
	floodfill( polx , poly ,WHITE);
	polx = 250; 
	poly = 380; 
	setfillstyle(SOLID_FILL,BROWN );
	floodfill( polx , poly ,WHITE);
	 polx = 250; 
	 poly = 447;
	setfillstyle(SOLID_FILL,DARKGRAY);
	floodfill( polx , poly ,WHITE);
	polx = 370; 
	poly = 233; 
	setlinestyle(SOLID_LINE, 1, 1);
}



void veXe(int pkx, int tinhtienxe1,int dxe){
	int x[12], y[12];
	setcolor(BLACK);  	

	line(50+dxe,370 + tinhtienxe1,90+dxe,370 + tinhtienxe1);
	arc(110+dxe,371 + tinhtienxe1,0,180,20);
	line(130+dxe,370 + tinhtienxe1,220+dxe,370 + tinhtienxe1);
	arc(240+dxe,371 + tinhtienxe1,0,180 ,20);
	line(260+dxe,370 + tinhtienxe1,300+dxe,370 + tinhtienxe1);
	line(300+dxe,370 + tinhtienxe1,300+dxe,350 + tinhtienxe1);
	line(300+dxe,350 + tinhtienxe1,240+dxe,330 + tinhtienxe1);
	line(240+dxe,330 + tinhtienxe1,200+dxe,300 + tinhtienxe1);
	line(200+dxe,300 + tinhtienxe1,110+dxe,300 + tinhtienxe1);
	line(110+dxe,300 + tinhtienxe1,80+dxe,330 + tinhtienxe1);
	line(80+dxe,330 + tinhtienxe1,50+dxe,340 + tinhtienxe1);
	line(50+dxe,340 + tinhtienxe1, 50+dxe,370 + tinhtienxe1);

	setfillstyle(SOLID_FILL,RED);
	floodfill(50+dxe + 8,340 + tinhtienxe1 + 8,BLACK);
	
	line(165+dxe,305 + tinhtienxe1,165+dxe,330 + tinhtienxe1);
	line(165+dxe,330 + tinhtienxe1,230+dxe,330 + tinhtienxe1);
	line(230+dxe,330 + tinhtienxe1,195+dxe,305 + tinhtienxe1);
	line(195+dxe,305 + tinhtienxe1,165+dxe,305 + tinhtienxe1);

	line(160+dxe,305 + tinhtienxe1,160+dxe,330 + tinhtienxe1);
	line(160+dxe,330 + tinhtienxe1,95+dxe,330 + tinhtienxe1);
	line(95+dxe,330 + tinhtienxe1,120+dxe,305 + tinhtienxe1);
	line(120+dxe,305+ tinhtienxe1,160+dxe,305 + tinhtienxe1);

	setfillstyle(SOLID_FILL,BLACK);
	floodfill(165+dxe + 8,330 + tinhtienxe1 - 8,BLACK);

	setfillstyle(SOLID_FILL,BLACK);
	floodfill(160+dxe - 7,330 + tinhtienxe1 - 7,BLACK);

	setlinestyle(SOLID_LINE, 1, 5);
	setcolor(WHITE);
	/**Wheels**/
	circle(110+dxe,370 + tinhtienxe1,15);
	int wheelcar1_1x = 110+dxe;
	int wheelcar1_1y = 370 + tinhtienxe1;
	calcPoints(15, wheelcar1_1x, wheelcar1_1y, x, y);
	line(wheelcar1_1x, wheelcar1_1y, x[pkx], y[pkx]);
	line(wheelcar1_1x, wheelcar1_1y, x[pkx+4], y[pkx+4]);
	line(wheelcar1_1x, wheelcar1_1y, x[pkx+8], y[pkx+8]);

	circle(240+dxe,370 + tinhtienxe1,15);
	int wheelcar1_2x =240+dxe;
	int wheelcar1_2y = 370 + tinhtienxe1;
	calcPoints(15, wheelcar1_2x, wheelcar1_2y, x, y);
	line(wheelcar1_2x, wheelcar1_2y, x[pkx], y[pkx]);
	line(wheelcar1_2x, wheelcar1_2y, x[pkx+4], y[pkx+4]);
	line(wheelcar1_2x, wheelcar1_2y, x[pkx+8], y[pkx+8]);

	setlinestyle(SOLID_LINE, 1, 0);
}

void RUNHAM(){
	
initwindow(1200,700);

//page
int page = 0;
	
//XE
int pkx = 0;
int tinhtienxe1 = 180;
int dxe = 0;
int countstop = 0;

//MAY
int dxmay = 0;

//MAT TROI
int drmt = 0;
bool ischeckmt = false;

//CHONG CHONG
int xcq = 500;
int ycq = 280;
int crcq = 100;
int pkq = 0;


        
while (!kbhit()) {
	
	setactivepage(page);
    setvisualpage(1 - page);
    cleardevice();
        
	//HAM VE NEN	
    veBackground();
    
    //HAM VE CHONG CHONG
    if(pkq == 2) pkq = 0;
	else pkq = pkq + 1;
	VeChongchong(pkq,crcq,xcq,ycq);

	//HAM VE NHA
	VEnha();

	
	//VE DEN GAIO THONG
	vedengiaothong(getmaxx() - 200,290,10,BLACK,BLACK,BLACK);

	if(countstop <= 0){
		if(dxe >= getmaxx()) dxe = -50;
		else dxe = dxe + 10;

		if(pkx == 3) pkx = 0;
		else pkx = pkx + 1;
		
		if(dxe >= 300 && dxe <= 499){
			vedengiaothong(getmaxx() - 200,290,10,BLACK,YELLOW,BLACK);
		}else if(dxe >= 500 && dxe <= 500){ 
			countstop = 30;
		}else{
			vedengiaothong(getmaxx() - 200,290,10,BLACK,BLACK,LIGHTGREEN);
		}
	}else {
		vedengiaothong(getmaxx() - 200,290,10,RED,BLACK,BLACK);
		countstop = countstop - 1;
	}


	//VE XE
	veXe( pkx,  tinhtienxe1,dxe);


	//VE MAY
	if(dxmay >= getmaxx() - getmaxx()/3 ) dxmay = 0;
	else dxmay = dxmay + 2;
	if(dxmay > 10*10){
		vemay(0 + dxmay - 10*10,50,20);
	}
	if(dxmay > 30*10){
		vemay(0 + dxmay - 30*10,90,25);
	}
	if(dxmay > 40*10){
		vemay(0 + dxmay - 40*10,120,25);
	}
	if(dxmay > 50*10){	
		vemay(0 + dxmay - 50*10,100,15);
	}
	vemay(100 + dxmay,100,20);
	vemay(70 + dxmay,80,10);
	vemay(500 + dxmay,110,27);


	//VE MAT TROI
	if(drmt == 3 || drmt == -3)  ischeckmt = !ischeckmt;
	if(ischeckmt == false) drmt = drmt + 1;
	else  drmt = drmt - 1;
	vemay(getmaxx() - 230,130,27);
	vemattroi(getmaxx() - 200,70,35 + drmt);
	
	

	page = 1 - page;
	delay(100);
}

	
}



//-------------------------------------------------------------------------------------------------------------------------

void luachon(){
	int luachon;
	cout<<"\n\n\t\t---------Lua Chon-----------";
	cout<<"\n\t\t1. Ve hinh hop chu nhat.";
	cout<<"\n\t\t2.Ve hinh cau.";
	cout<<"\n\t\t3.Ve boi canh.";
	cout<<"\n\t\t--------------------------";
	while(1){
		cout<<"\n\n\t\tnhap lua chon cua ban: ";
		cin>>luachon;
		if(luachon==1){
			initwindow(800,700);
			menu();
			hetoado(5);
			ve_hcn(0);
			delay(100000);
			closegraph();
		}
		
		if(luachon==2){
			initwindow(800,700);
			menu();
			hetoado(5);
			hinh_cau();
			delay(100000);
			closegraph();
		}
		
		if(luachon==3){
			RUNHAM();
			delay(500000);
			closegraph();
		}
	}
}
int main(){
	luachon();
    getch();
    return 0;
}
