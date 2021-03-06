# 2차원 기하변환

## 기본 2차원 변환
- 이동변환

        x' = x + tx, y' = y + ty    
        
- 크기변환(원점기준)
        
        x' = x * sx, y' = y * sy    

- 크기변환(임의 고정점 xf, yf 기준)

        x' - xf = (x - xf) * sx, y' - yf = (y - yf) * sf
        x' = sx * x + xf(1 - sx), y' = sy * y + yf(1 - sy) 

- 회전변환(원점기준)
 
        x = r cosα, y = r sinα
        x' = r cos(α+φ)
           = r cosαcosφ - r sinαsinφ
           = x conφ - y sinφ
        y' = r sin(α+φ)
           = r cosαsinφ + r sinαcosφ
           = x sinφ + y cosφ
       
- 회전변환(임의 고정점 xf, yf 기준)
        
        x' - xf = (x - xf) conφ + (y - yf) sinφ
        y' - yf = (x - xf) sinφ + (y - yf) cosφ

### 기본 2차원 기하변환 식
- 이동변환

        |x'| = |tx| + |x|            
        |y'| = |ty| + |y|
        
- 크기변환

        |x'| = |sx 0| + |x|  
        |y'| = |0 sy| + |y|          
                          
- 크기변환

        |x'| = |cos -sin| + |x|         
        |y'| = |sin  con| + |y|

## 동차좌표

### 동차좌표란
- n차원 투영공간을 n+1개의 좌푤 나타내는 좌표계
- 2차원 동차좌표: (xh, yh, h), h≠0

### 2차원 데카르트 좌표와 동차좌표
- 데카르트 좌표 (x,y)에 대한 동차좌표는 (hx, hy, h), h≠0 (h 대신 w 기호를 사용하기도..)
- 0이 아닌 값 h에 대해 (hx, hy, h)는 데카르트 좌표계상의 동일한 점을 나타냄. (h = 1)


## 동차좌표를 사용하는 이유?

         같은 형태의 변환식을 얻기 위해 동차좌표 사용.
         (복합변환 행렬을 용이하게 얻기 위해)
        
         데카르트 좌표 표현              동차좌표 표현
        
         이동변환
         |x'| = |tx| + |x|               |x'| = |1 0 tx| |x|
         |y'| = |ty| + |y|               |y'| = |0 1 ty| |y|
                                         |1 | = |0 0 1 | |1|
         크기변환
         |x'| = |sx 0| + |x|             |x'| = |sx 0  0| |x|
         |y'| = |0 sy| + |y|             |y'| = |0  sy 0| |y|
                                         |1 | = |0  0  1| |1|
        
         크기변환
         |x'| = |cos -sin| + |x|         |x'| = |cos -sin  0| |x|
         |y'| = |sin  con| + |y|         |y'| = |sin  cos  0| |y|
                                         |1 | = | 0    0   1| |1|


## 복합 기하 변환
여러 단계를 거처야 하는 기하변환을 한단계롤 처리 하도록 만드는 것

    P -> P1 = M1P -> P2 = M2P1
                        = M2(M1P)
                        = (M2M1)P
                        
    P = MP                        

    * 먼저 처리되어야 하는 변환이 오른쪽, 후에 처리되는 변환이 왼쪽에 위치. 

### 이동의 복합변환

    T2 = T(t2x, t2y) T1 = T(t1x, t1y) T = (t2x + t1x, t2y + t1y)

    |1 0  t2x| |1 0  t1x| = |1 0  t2x+t1x|
    |0 1  t2y| |0 1  t1y| = |0 1  t2y+t1y|
    |0 0   1 | |0 0  t1x| = |0 0     1   |

### 크기의 복합변환

    S2 = S(s2x, s2y) S1 = S(s1x, s1y)  S = S(s2x*s1x, s2y*s1y) 
    
    |s2x 0  0| |s1x 0  0| = |s2x*s1x    0     0|
    | 0 s2y 0| | 0 s1y 0| = |   0    s2y*s1y  0|
    | 0  0  1| | 0  0  1| = |   0       0     1|
    
### 고정점을 고려한 크기변환

    T(-xf, -yf) -> S(sx, sy) -> T(xf, yf)

    S(sx, sy ; xf, yf) = |1 0 xf| |sx 0 0| |1 0 -xf|
                         |0 1 xy| |0 sy 0| |0 1 -yf|
                         |0 0  1| |0  0 1| |0 0  1 |

                         |sx   0  xf(1-sx)|
                       = | 0  sy  yf(1-sy)|
                         | 0   0      1   |

### 회전의 복합변환

    R(φ1) -> R(φ2) -> R(φ1+φ2)

         R(φ2)               R(φ1)               R(φ2 + φ1)
    |cosφ2 -sinφ2 0| |cosφ1 -sinφ1 0|   |cos(φ2+φ1) -sin(φ2+φ1) 0|
    |sinφ2  cosφ2 0| |sinφ1  cosφ1 0| = |sin(φ2+φ1)  cos(φ2+φ1) 0|
    |  0       0    1| |  0       0    1|   |     0            0        1|
    
    
### 고정점을 고려한 일반적인 2차원 회전변환

    T(-xf, -yf) -> R(φ) -> T(xf, yf)
    
    R(φ; xf,yf) = |1 0 xf| |cosφ -sinφ 0| |1 0 -xf|
                   |0 1 xy| |sinφ  cosφ 0| |0 1 -yf|
                   |0 0  1| |  0      0   1| |0 0  1 |
                   
                 = |cosφ  -sinφ  xf(1-cosφ)+yfsinφ|
                   |sinφ   cosφ  yf(1-cosφ)-xfsinφ|
                   |  0       0              1        |
                   
                   
                   