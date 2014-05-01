---
layout: post
title: 不用if比较两个数大小
date: 2013-09-19
published: true
---

```
/*
方法1：取平均值法
大的为 ((a+b)+abs(a-b)) / 2
小的为 (a+b - abs(a-b)) / 2
*/
int fMax1(int a, int b)
{    
    return  ((a+b)+abs(a-b)) / 2; 
}

/* 
方法2：不使用abs() 
a<b时，a/b=0，所以前面为b*(b/a)，后面为b/a，那么结果就是b 
a=b时，a/b=1，所以前面为a+b=2a，后面为2，那么结果就是a 
a>b时，b/a=0，所以前面为a*(a/b)，后面为a/b，那么结果就是a 
*/  
int fMax2(int a, int b) {  
    int larger = (a*(a/b) + b*(b/a))/(a/b + b/a);  
    //long smaller = (b*(a/b) + a*(b/a))/(a/b + b/a);  
    return larger;  
}  

/* 
方法3：如果取 a/b 余数不为0，则说明a>b 
这是个好方法，不过题目说了，不能用“? :” 
*/  
int fMax3(int a, int b) {  
    return  (a / b) ? a : b;  
}  

/* 
方法4：移位法 
当b<0的时候以补码存,故最高位是1 
所以右移31位b>>31其实就是最高位的值 
b>=0时候最高位为0 
所以b跟1与时候为b,a=a-(a-b)=b 
b跟1作与运算时候为0,相当于a=a-0=a  
*/  
int fMax4(int a, int b) {  
    b = a - b;  
    a -= b & (b>>31);                     
    return a;  
}  
//方法5：移位法  
int fMax5(int a,int b) {  
    int  c[2] = {a, b};  
    int z = a - b;  
    z = (z>>31)&1;  
    return c[z];  
}  
//方法6：移位法  
int  fMax6(int a, int b) {  
    int flag = ((a - b) >> 31)&1;  
    return a - (a - b) * flag;  
}

//方法7：最牛B的一个  
int fMax7(int a, int b) {  
    int pair[2] = {a, b};   
    return pair[a < b];  
}  
```
> [漂泊的朋鸟](http://blog.csdn.net/xiaocha2008/article/details/6786989)
