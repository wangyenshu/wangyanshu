#include<iostream>
#include<windows.h>
#include<conio.h>
#include<stdio.h>
#include <fstream>
using namespace std;
struct set
{
	char vocal='m';
	int time=300;
};
int t = 300;
int doo = 523;
int re = 578;
int mi = 659;
int fa = 698;
int so = 784;
int la = 880;
int si = 988;
set setting;
void play(char o)
{
	switch (o)
	{
	
	case'1':
		Beep(doo, t);
		break;
	case'2':
		Beep(re, t);
		break;
	case'3':
		Beep(mi, t);
		break;
	case'4':
		Beep(fa, t);
		break;
	case'5':
		Beep(so, t);
		break;
	case'6':
		Beep(la, t);
		break;
	case'7':
		Beep(si, t);
		break;
	case'e':
		cout << endl;
		break;
	case'm':
		doo = 523;
		re = 578;
		mi = 659;
		fa = 698;
		so = 784;
		la = 880;
		si = 988;
		setting.vocal = 'm';
		break;
	case'l':
		doo = 262;
		re = 294;
		mi = 330;
		fa = 349;
		so = 392;
		la = 440;
		si = 494;
		setting.vocal = 'l';
		break;
	case'h':
		doo = 1046;
		re = 1175;
		mi = 1318;
		fa = 1480;
		so = 1568;
		la = 1760;
		si = 1976;
		setting.vocal = 'h';
		break;
	case'+':
		t += 50;
		setting.time = setting.time + 50;
		break;
	case'-':
		if (t > 50)
		{
			t -= 50;
			setting.time = setting.time - 50;
			break;
		}
		else
		{
			cout << "错误，发音时间过短" << endl;
			break;
		}
	case's':
		cout << endl;
		if (setting.vocal == 'l')
			cout << "低音区" << setting.time << endl;
		else if (setting.vocal == 'm')
			cout << "中音区" << setting.time << endl;
		else
			cout << "高音区" << setting.time << endl;
		break;
	case'?':
		cout << "帮助：" << endl << "1.输入“1”、“2”、“3”、“4”、“5”、“6”、“7”分别代表“do”、“re”、“mi”、“fa”、“so”、“la”、“si”" << endl << "2.初始默认中音区，输入“h”、“m”、“l”分别转为高、中、低音区" << endl << "3.输入 “ + ” 、 “ - ”调高长、短发音时间" << endl << "4.输入“e”换行" << endl << "5.输入“s”读取当前设置" << endl << "6.输入“？”获取帮助" << endl << "7.输入“0”退出" << endl;
		break;
	default:
		cout << "无效";
		break;
	}

}
int main()
{
	
	cout << "键盘钢琴" << endl << "开发：棋人" << endl << "参考资料：" << endl << "v1t1p9hvbd.C++中发声函数Beep详解" << endl << "ziwulan.制作C++电子琴" << endl;
	for (;;)
	{
		cout << "请选择模式，键入“a”进入弹奏模式，键入“b”进入谱曲/播放模式,键入“0”退出" << endl;
		char choice;
		cin >> choice;
		if (choice == 'a')
		{
			cout << "帮助：" << endl << "1.输入“1”、“2”、“3”、“4”、“5”、“6”、“7”分别代表“do”、“re”、“mi”、“fa”、“so”、“la”、“si”" << endl << "2.初始默认中音区，输入“h”、“m”、“l”分别转为高、中、低音区" << endl << "3.输入 “ + ” 、 “ - ”调高长、短发音时间" << endl << "4.输入“e”换行" << endl << "5.输入“s”读取当前设置" << endl << "6.输入“?”(英文问号)获取帮助" << endl << "7.输入“0”退出" << endl;
			for (;;)
			{
				char o = _getche();
				if (o != '0')
					play(o);
				else
					goto P;
			}
		}
		else if (choice == 'b')
		{
			for (;;)
			{
				cout<< "键入“w”编写，键入“r”读取并播放，键入“0”退出，注意：读取琴谱时遇到空格或0视为终止符" << endl;
				char cho2;
				cin >> cho2;
				char data[10000];
				if (cho2 == 'w')
				{
					ofstream outfile;
					outfile.open("琴谱.txt");

					cout << "键入以编辑琴谱" << endl;
					cin.getline(data, sizeof(data));
					outfile << data << endl;
					outfile.close();
				}
				else if (cho2 == 'r')
				{
					ifstream infile;
					infile.open("琴谱.txt");

					cout << "读取琴谱：" << endl;
					infile >> data;
					cout << data << endl;
					for (int u = 0; u < sizeof(data) && u != 0; u++)
					{
						play(data[u]);
					}
					infile.close();
				}

				else if (cho2 == '0')
					goto P;
			}
		}
		else if (choice == '0')
			goto P;
	}
	P:
return 0;
}
