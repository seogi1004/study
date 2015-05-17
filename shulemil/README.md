# SVG STUDY

## Marker Element [Link1](http://www.w3.org/TR/SVG/painting.html#Markers), [Link2](http://tutorials.jenkov.com/svg/marker-element.html)
**마커(path, line, polyline, polygon 등의 vertices 에 위치하는 심볼) 를 정의하는 "Marker" Element**
(대표적 예 : arrowhead, polymarker)

이러한 마커는 path, line, polyline or polygon element 이용하여 생성.

    <marker id="markerCircle" markerWidth="8" markerHeight="8" refx="5" refy="5">
        <circle cx="5" cy="5" r="3" style="stroke: none; fill:#000000;"/>
    </marker>
    
### Attributes
- markerWidth = "length"
- markerHeight = "length"

    (marker 의 viewport 의 width & height 정의)
    
- refX = "coordinate"
- refY = "coordinate"

    (그래픽 엘리먼트의 버택스에 정렬되는 마커의 위치 참조)

- orient = "auto | angle"

    (marker를 사용자가 설정한 값의 각도로 회전)

- markerUnits = "strokeWidth | userSpaceOnUse"

    (marker 의 컨텐츠와 markerWidth, markerHeight 속성을 위한 좌표계 시스템 정의)    
    
    (마커 컨텐츠와 마커 width, 마커 height 사이의 좌표계 시스템 정의)
    
    (strokeWidth : 기본값, )
    
    (userSpaceOnUse : 유저가 수정한 좌표계를 나타냄, )
    
    (만약 반지름이 10인 원의 경우 어떤 엘리먼트에 붙던지 10의 크기를 유지)

### Marker properties
- marker-start="url(#marker-id)"
- marker-mid="url(#marker-id)"
- marker-end="url(#marker-id)"
- marker="url(#marker-id)"

        marker-start : url(#markerId);
        
        <defs>
            <marker id="markerSquare" markerWidth="7" markerHeight="7" refx="4" refy="4" orient="auto">
             <rect x="1" y="1" width="5" height="5" style="stroke: none; fill:#000000;"/>
            </marker>
        
            <marker id="markerArrow" markerWidth="13" markerHeight="13" refx="2" refy="7" orient="auto">
             <path d="M2,2 L2,13 L8,7 L2,2" style="fill: #000000;" />
            </marker>
        </defs>
        
        <path d="M100,20 l50,0 l0,50 l50,0" style="stroke: #0000cc; stroke-width: 1px; fill: none; marker-start: url(#markerSquare); marker-mid: url(#markerSquare); marker-end: url(#markerArrow);" />


## switch element [Link](http://www.w3.org/TR/SVG11/struct.html#SwitchElement)
switch element는 attributes('requiredFeatures', 'requiredExtensions', 'systemLanguage')의 기입된 user language 또는 user agent 정보에 따라 view 을 하는 기능을 제공. 

    <switch>
        <g systemLanguage="en-UK">
            <text x="10" y="20">UK English</text>
        </g>
        <g systemLanguage="en">
            <text x="10" y="20">English</text>
        </g>
        <g systemLanguage="es">
            <text x="10" y="20">Spanish</text>
        </g>
    </switch>

## image element [Link](http://www.w3.org/TR/SVG11/struct.html#ImageElement)

    <rect x="10" y="10" height="130" width="500" style="fill: #000000"/>
    <image x="20" y="20" width="300" height="80" xlink:href="http://jenkov.com/images/layout/top-bar-logo.png" />
    <line x1="25" y1="80" x2="350" y2="80" style="stroke: #ffffff; stroke-width: 3;"/>

## a element [Link](http://www.w3.org/TR/SVG11/linking.html#AElement)

SVG Element 에 Link 를 제공. 

### attribute
- xlink:href

    (url 입력)
    
- xlink:show

    (new : replace - 링크의 이동을 새창에서? 기존창에서 대체)
    
- taget 

    (iframe 사용이 해당 프레임의 위치 이동)

        <a xlink:href="/svg/index.html">
            <text x="10" y="20">/svg/index.html</text>
        </a>
        <a xlink:href="/svg/index.html" xlink:show="new">
            <text x="10" y="40">/svg/index.html
                (xlink:show="new")</text>
        </a>
        <a xlink:href="/svg/index.html" xlink:show="replace">
            <text x="10" y="60">/svg/index.html
                (xlink:show="replace")</text>
        </a>
        <a xlink:href="/svg/index.html" target="_blank">
            <text x="10" y="80">m/svg/index.html
                (target="_blank")</text>
        </a>
        <a xlink:href="/svg/index.html" target="_top">
            <text x="10" y="100">/svg/index.html
                (target="_top")</text>
        </a>