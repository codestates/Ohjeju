import React, { useState, useEffect, useRef } from "react";
import "../css/KakaoMap.css";

const axios = require("axios");

function KakaoMap() {
  const mapStyle = {
    //size는 알아서
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  };
  const [map, setMap] = useState("");
  const [ractangleDraw, setRactangleDraw] = useState("");
  const [area, setAra] = useState([]);
  const [drawManager, setManager] = useState("");
  const [markers, setMarkers] = useState([]);
  const [overLayArray, setOverLay] = useState([]);
  const [hasKeyWord, setHasKeyWord] = useState("");
  const drawTool = () => {
    //사각형생성 -> +각종 와리가리기능
    removeArea();
    const clickFun = (mouseEvent) => {
      const location = [mouseEvent.latLng.Ma, mouseEvent.latLng.La];
      if (area.length !== 0) {
        //area 중복성검사
        if (JSON.stringify(area).includes(JSON.stringify(location)) === false) {
          area.push(location);
        }
      } else {
        area.push(location);
      }
    };
    window.kakao.maps.event.addListener(map, "click", clickFun);

    const manager = new window.kakao.maps.drawing.DrawingManager({
      map: map,
      rectangleOptions: {
        //네모영역 커스텀 옵션
        draggable: true,
        removable: true,
        editable: true,
        strokeWeight: 1, //선 굵기
        strokeColor: "#39f", // 외곽선 색
        fillColor: "#39f", // 채우기 색
        fillOpacity: 0.3, // 채우기색 투명도
      },
    });

    manager.select(window.kakao.maps.drawing.OverlayType["RECTANGLE"]);

    manager.addListener("drawend", function (data) {
      //네모에 이벤트추가
      removeMarkers(); //다른공간 써치시 기존 공간써치한 오버레이,마커 지워지게
      removeOverlay();
      //end 즉시 click event 지워야
      setRactangleDraw(data.target);
    });
    setManager(manager); //네모지우기위해
    setAra(area);
  };
  ///여기까지 네모함수

  //여기부터 써치함수
  const getCategory = (category) => {
    const menuEl = document.getElementById("menu_wrap");
    const listEl = document.getElementById("placesList");
    removeAllChildNods(listEl);
    removeMarkers(); //같은 공간내 카테고리 서치시 마커,오버레이 지워지게
    removeOverlay();
    if (ractangleDraw) drawManager.remove(ractangleDraw); //네모영역사라짐
    const places = new window.kakao.maps.services.Places({ map }); //지도정함
    //위치범위세팅
    if (area.length !== 0) {
      //영역선택안하고 카테고리눌르면 에러나니까
      //평상시에는 안보여야겟지?
      const getMapMenu = document.getElementById("menu_wrap");
      getMapMenu.classList.add("open");

      const sw = new window.kakao.maps.LatLng(area[0][0], area[0][1]);
      const ne = new window.kakao.maps.LatLng(area[1][0], area[1][1]);
      const bounds = new window.kakao.maps.LatLngBounds(sw, ne);
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      const callback = function (result, status, pagination) {
        const bounds = new window.kakao.maps.LatLngBounds(); //장소로 지도위치 재조정위해
        const markerIcon = createMarkerImage();
        if (status === window.kakao.maps.services.Status.OK) {
          //마킹시작
          result.forEach((item, idx) => {
            //result 받은거를 각각
            const marker = createMarker(item, map, markerIcon);
            //여기에 인자로 img까지 줘야됨
            const fragment = document.createDocumentFragment();
            const point = marker.getPosition(); //laxtitude = point.La longitude = Ma
            // 추후 비짓제주비교해서 이미지url불러올꺼면 필요한코드 좌표 ->주소변환 -> 주소로 rds data 색인

            //이부분도 함수화 시켜야할듯
            const geocoder = new window.kakao.maps.services.Geocoder();
            const coord = new window.kakao.maps.LatLng(point.Ma, point.La);
            geocoder.coord2Address(
              coord.getLng(),
              coord.getLat(),
              (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  axios
                    .post("http://localhost:80/attractions", {
                      location: result[0].address.address_name,
                    })
                    .then((ele) => {
                      let img =
                        "https://blog.kakaocdn.net/dn/o1KIw/btqu9mflPY6/rGk1mM3iugV1c6jj9Z3E80/img.jpg";
                      if (ele.data !== null) {
                        img = ele.data.image;
                      }
                      const listItem = getListItem(idx, item, img);
                      listItem.onmouseover = () =>
                        displayInfowindow(infowindow, marker, item);
                      listItem.onmouseout = () => infowindow.close();
                      listItem.onclick = () => {
                        displayOverLay(overLay);
                        infowindow.close();
                      };
                      fragment.appendChild(listItem);
                      listEl.appendChild(fragment);
                    });
                }
              }
            );
            bounds.extend(point); //마커의 포인트로 지도위치 재조정
            // 오버레이의 css+html
            const overLay = createOverLay(item, point);
            // closeBtn.onclick = removeOverlay();
            // 마커에 각종 이벤트넣는
            window.kakao.maps.event.addListener(marker, "click", () => {
              removeOverlay(); //다른마커찍으면 전 오버레이 없어짐
              displayOverLay(overLay);
            });
            window.kakao.maps.event.addListener(marker, "mouseover", () => {
              displayInfowindow(infowindow, marker, item);
            });
            window.kakao.maps.event.addListener(marker, "mouseout", () => {
              infowindow.close();
            });
            menuEl.scrollTop = 0;
            map.setBounds(bounds);
            //마커를 셋
            marker.setMap(map);
            markers.push(marker);
          });
          // -----forEach 종료-----
          if (pagination.hasNextPage) {
            //다음페이지
            pagination.nextPage();
          }
        }
      };
      if (hasKeyWord.length !== 0) {
        places.keywordSearch(hasKeyWord, callback, {
          bounds: bounds,
          size: 15,
          page: 1,
        });
      } else {
        places.categorySearch(category, callback, {
          //네모범위안 카테고리검색
          bounds: bounds, //네모사이즈
          size: 15,
          page: 1,
        });
      }
    } else {
      alert("영역을 선택해주세요");
    }
  };

  const createMap = () => {
    //스토리지를 클리어하고 실행을해야 새로고침해도 작동이됨 순서가있는듯함
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.37938, 126.543917),
      level: 10, //소수점단위안됨
    };
    const mapContainer = document.getElementById("map");
    setMap(new window.kakao.maps.Map(mapContainer, mapOption));
  };
  function createMarker(item, map, markerIcon) {
    return new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(item.y, item.x),
      image: markerIcon,
      opacity: 1, //마커투명도
    });
  }
  function createMarkerImage() {
    return new window.kakao.maps.MarkerImage(
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      new window.kakao.maps.Size(31, 35),
      {
        offset: new window.kakao.maps.Point(16, 34),
        alt: "마커 이미지 예제",
        shape: "poly",
        coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33",
      }
    );
  }
  function displayInfowindow(infowindow, marker, item) {
    let overLayContent =
      '<div class="placeinfo">' +
      '<a class="title" href="' +
      item.place_url +
      '" target="_blank" title="' +
      item.place_name +
      '">' +
      item.place_name +
      "</a>";
    if (item.road_address_name) {
      overLayContent +=
        '<span class="roadAddress>' +
        item.road_address_name +
        "</span>" +
        '<span class="jibun">(지번 : ' +
        item.address_name +
        ")</span>";
    } else {
      overLayContent +=
        '<span title="' +
        item.address_name +
        '">' +
        item.address_name +
        "</span>";
    }
    overLayContent +=
      '<span class="tel">' +
      item.phone +
      "</span>" +
      "</div>" +
      '<div class="after"></div>';
    infowindow.setContent(overLayContent);
    infowindow.open(map, marker);
  }
  function createOverLay(item, point) {
    let overLayContent =
      '<div class="placeinfo" style="margin-bottom:200px">' +
      '<a class="title" href="' +
      item.place_url +
      '" target="_blank" title="' +
      item.place_name +
      '">' +
      item.place_name +
      "</a>" +
      '<div id="close"></div>';
    if (item.road_address_name) {
      overLayContent +=
        '<span class="roadAddress>' +
        item.road_address_name +
        "</span>" +
        '<span class="jibun">(지번 : ' +
        item.address_name +
        ")</span>";
    } else {
      overLayContent +=
        '<span title="' +
        item.address_name +
        '">' +
        item.address_name +
        "</span>";
    }
    overLayContent +=
      '<span class="tel">' +
      item.phone +
      "</span>" +
      "</div>" +
      '<div class="after"></div>';

    return new window.kakao.maps.CustomOverlay({
      content: overLayContent,
      position: point,
    });
  }
  function removeOverlay() {
    if (overLayArray.length !== 0) {
      overLayArray[0].setMap(null);
      overLayArray.pop();
    }
  }
  function displayOverLay(overLay) {
    overLay.setMap(map);
    const closeBtn = document.getElementById("close");
    closeBtn.addEventListener("click", removeOverlay);
    overLayArray.push(overLay);
  }

  function removeMarkers() {
    for (let i = markers.length - 1; i >= 0; i--) {
      markers[i].setMap(null);
      markers.pop();
    }
  }
  function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }

  function removeArea() {
    for (let i = 0; i < 2; i++) {
      area.pop();
    }
    const clearArr = JSON.parse(JSON.stringify(area));
    setAra(area);
  }
  function testKeydown(event) {
    setHasKeyWord(event.target.value);
  }
  function getListItem(index, places, setImage) {
    let el = document.createElement("li"),
      itemStr =
        '<img class="markerbg marker_' +
        (index + 1) +
        '"src="' +
        setImage +
        '"></img>' +
        '<div class="info">' +
        "<h5>" +
        places.place_name +
        "</h5>";
    if (places.road_address_name) {
      itemStr +=
        "<span>" +
        places.road_address_name +
        "</span>" +
        '<span class="jibun gray">' +
        places.address_name +
        "</span>";
    } else {
      itemStr += "<span>" + places.address_name + "</span>";
    }
    itemStr += '<span class="tel">' + places.phone + "</span>" + "</div>";
    el.innerHTML = itemStr;
    el.className = "item";
    return el;
  }

  useEffect(() => {
    window.localStorage.clear();
    createMap();
  }, []);

  return (
    <div id='test'>
      {/* 카테고리는 추가가능 */}
      <div id="category">
        <button id="CE7" onClick={() => getCategory("CE7", 1)}>
          카페
        </button>
        <button id="AT4" onClick={() => getCategory("AT4", 1)}>
          관광명소
        </button>
        <button id="FD6" onClick={() => getCategory("FD6", 1)}>
          음식점
        </button>
        <button onClick={drawTool}>사각형 그리기</button>
        <button
          onClick={() => {
            const getMapMenu = document.getElementById("menu_wrap");
            getMapMenu.classList.toggle("open");
          }}
        >
          키워드검색
        </button>
      </div>

      <div className="map_wrap">
        <div id="map" style={mapStyle}></div>
        <div id="menu_wrap" className="bg_white close">
          <div className="option">
            키워드 :{" "}
            <input id="keyword" size="15" type="text" onKeyUp={testKeydown} />
            <button onClick={getCategory}>검색</button>
          </div>
          <hr></hr>
          <ul id="placesList"></ul>
        </div>
      </div>
    </div>
  );
}

export default KakaoMap;
