// index.js
const { useState, useEffect, useRef, useMemo } = React;
const { createRoot } = ReactDOM;

// 取得 json 資料
const getData = async () => {
  const data = await axios.get(
    "https://yihui01251.github.io/Topic_PlayBallNow/postData_test.json"
  );
  return data.data.postData;
};

const App = ({ postData }) => {
  const { vb_today_postData, vb_week_postData, bm_today_postData, bm_week_postData } = postData;

  /* 樣式 */
  const [backgroundImage, setBackgroundImage] = useState("url('./images/bg-phone.jpg')");
  const [mainColor, setMainColor] = useState("#14AAEB");
  const [fontColor, setFontColor] = useState("#147CB6");
  const [btnColor, setBtnColor] = useState("#F1DB15");
  const [inputColor, setInputColor] = useState("#B1C3E8");
  const [postBorder, setPostBorder] = useState('url("./images/catsroke.svg")');
  const [decorateSearch, setDecorateSearch] = useState('url("../../images/index-searchCat.png")');
  const [mobileTopBar, setMobileTopBar] = useState("./images/mobiletopvb.svg");
  /* 要 map 的資料 */
  const [todayType, setTodayType] = useState("vb_today_postData");
  const [weekType, setWeekType] = useState("vb_week_postData");
  /* 選擇的類型對應要顯示的資料 */
  const [selectedButton, setSelectedButton] = useState("btn-typeVb");
  const [BMdisplay, setBMDisplay] = useState("none");
  const [VBdisplay, setVBDisplay] = useState("flex");
  /* 連結更多貼文頁 */
  const [hrefTodayMore, setHrefTodayMore] = useState("排球-本日貼文");
  const [hrefWeekMore, setHrefWeekMore] = useState("排球-本週貼文");
  // 篩選的 tag 值
  const [filterTag, setFilterTag] = useState("排球");
  // 程度 tag
  const [degreeTag, setdegreeTag] = useState("B");
  // 篩選後 map 的資料
  const [filterTagMap, setfilterTagMap] = useState("");

  const btnTypeVbRef = useRef(null);
  const btnTypeBmRef = useRef(null);

  /* 改變類型(羽/排) */
  const changeType = (id) => {
    let colorMain = "";
    let colorFont = "";
    let btnColor = "";
    let inputColor = "";
    let newBorder = "";
    let decorate = "";
    let topBanner = "";
    /* 更多的連結 */
    let hrefTodayMore = "./VBtodayMore-postsArea.html";
    let hrefWeekMore = "./VBweekMore-postsArea.html";

    // 取消其他按鈕的選擇
    const btnTypeVb = document.getElementById("btn-typeVb");
    const btnTypeBm = document.getElementById("btn-typeBm");
    const bodyStyle = document.getElementById("body");

    if (id === "btn-typeBm" || id === "btn-formBM") {
      // 如果是羽球:
      colorMain = "#83B90F";
      colorFont = "#689607";
      btnColor = "#FF8D24";
      inputColor = "#B6DBAA";
      newBorder = 'url("./images/dogstroke.svg")';
      decorate = 'url("../../images/index-searchDog.png")';
      topBanner = "./images/mobiletopbm.png";
      // 新增class改變背景
      bodyStyle.classList.add("background-Bm");
      bodyStyle.classList.remove("background-Vb");
      setSelectedButton(id);
      /* 改變要map的資料名稱 */
      setTodayType("bm_today_postData");
      setWeekType("bm_week_postData");
      setFilterTag("羽球");
      // banner顯示狀態
      setBMDisplay("flex");
      setVBDisplay("none");
      //更多的連結
      hrefTodayMore = "羽球-本日貼文";
      hrefWeekMore = "羽球-本週貼文";

      //羽球程度
      setdegreeTag("初階");
    } else if (id === "btn-typeVb" || id === "btn-formVB") {
      // 如果是排球
      colorMain = "#14AAEB";
      colorFont = "#147CB6";
      btnColor = "#F1DB15";
      inputColor = "#B1C3E8";
      newBorder = "url('./images/catsroke.svg')";
      decorate = "url('../../images/index-searchCat.png')";
      topBanner = "./images/mobiletopvb.svg";
      //
      bodyStyle.classList.remove("background-Bm");
      bodyStyle.classList.add("background-Vb");
      setSelectedButton(id);
      //
      setTodayType("vb_today_postData");
      setWeekType("vb_week_postData");
      setFilterTag("排球");
      //
      setBMDisplay("none");
      setVBDisplay("block");
      //
      hrefTodayMore = "排球-本日貼文";
      hrefWeekMore = "排球-本週貼文";
      //程度
      setdegreeTag("B");
    }

    setMainColor(colorMain);
    setFontColor(colorFont);
    setBtnColor(btnColor);
    setInputColor(inputColor);
    setPostBorder(newBorder);
    setDecorateSearch(decorate);
    setMobileTopBar(topBanner);

    document.documentElement.style.setProperty(
      "--main-color",
      colorMain
    );
    document.documentElement.style.setProperty(
      "--font-color",
      colorFont
    );
    document.documentElement.style.setProperty("--btn-color", btnColor);
    document.documentElement.style.setProperty(
      "--search-decorate",
      decorate
    );
    document.documentElement.style.setProperty(
      "--input-hover-color",
      inputColor
    );
    setHrefTodayMore(hrefTodayMore);
    setHrefWeekMore(hrefWeekMore);
  };

  // 更改資料類型
  const getPosts = (type) => {
    switch (type) {
      case "vb_today_postData":
        return vb_today_postData;
      case "bm_today_postData":
        return bm_today_postData;
      case "vb_week_postData":
        return vb_week_postData;
      case "bm_week_postData":
        return bm_week_postData;
      default:
        return [];
    }
  };

  // 儲存更多按鈕的連結
  const storageHref = (type) => {
    window.localStorage.hrefType = type;
  };

  useEffect(() => {
    console.log(
      `本日資料類型: ${todayType} , 本週資料類型: ${weekType}`
    );
  }, [weekType, todayType]);

  /* tag篩選 */
  //取得tag對應資料屬性
  const [tagDataType, setTagDataType] = useState("type");
  //篩選本日程度
  const [filterDegree, setFilterDegree] = useState("");
  //篩選本週程度
  const [weekfilterDegree, setweekFilterDegree] = useState("");
  //篩選本日價格
  const [filterPrice, setFilterPrice] = useState("");
  //篩選本週價格
  const [weekfilterPrice, setweekFilterPrice] = useState("");
  //篩選本日時段
  const [filterTime, setFilterTime] = useState("");
  //篩選本週時段
  const [weekfilterTime, setweekFilterTime] = useState("");

  //儲存篩選條件
  const [conditions, setConditions] = useState({ type: filterTag });
  //儲存週篩選條件
  const [weekConditions, setweekConditions] = useState({
    type: filterTag,
  });

  //如果useState改變就加入進condition儲存(避免比對空值)
  const newConditions = {};
  const newWeekConditions = {};
  const allBtn = document.getElementById("tags-All");
  const week_allBtn = document.getElementById("tags-weekAll");
  useEffect(() => {
    if (filterDegree !== "") {
      newConditions.tagDegree = filterDegree;
    }
    if (filterPrice !== "") {
      newConditions.tagPrice = filterPrice;
    }
    if (filterTime !== "") {
      newConditions.startTime = filterTime;
    }

    setConditions(newConditions);
    if (weekfilterDegree !== "") {
      newWeekConditions.tagDegree = weekfilterDegree;
    }
    if (weekfilterPrice !== "") {
      newWeekConditions.tagPrice = weekfilterPrice;
    }
    if (weekfilterTime !== "") {
      newWeekConditions.startTime = weekfilterTime;
    }
    setweekConditions(newWeekConditions);
  }, [
    filterDegree,
    weekfilterDegree,
    filterPrice,
    weekfilterPrice,
    filterTime,
    weekfilterTime,
  ]);

  const tagFilter = (id, value, name, time) => {
    if (time == "today") {
      //取得包本日tag的容器
      const filterBox = document.getElementById("today_allfilterBtn");
      const tagStyle = document.getElementById(id);

      if (tagStyle.classList == "active") {
        /* 如果已經選中=>移除class="active" */
        tagStyle.classList.remove("active");

        console.log("取消選取");
        switch (name) {
          case "tagDegree":
            setFilterDegree("");
            break;
          case "tagPrice":
            setFilterPrice("");
            break;
          case "startTime":
            setFilterTime("");
            break;
          case "city":
            setFilterTaipei("");
            break;

            break;
          default:
            break;
        }
      } else {
        /* 如果沒有選中=>新增class="active" */
        tagStyle.classList.add("active");
        allBtn.classList.remove("active");
        console.log(tagStyle);
        switch (name) {
          case "tagDegree":
            setFilterDegree(`${value}`);
            break;
          case "tagPrice":
            setFilterPrice(`${value}`);
            break;
          case "startTime":
            setFilterTime(`${value}`);
            break;
          case "city":
            setFilterTaipei(`${value}`);
            break;

            break;
          default:
            break;
        }
        console.log("本日類型: " + name);
        console.log("本日篩選 : " + value);
        filterPosts;
      }
      if (id == "tags-All") {
        //取得filterBox下所有的button
        const filterButtons = filterBox.querySelectorAll("button");
        filterButtons.forEach((button) => {
          //移除所有button的active類
          button.classList.remove("active");
        });
        setFilterDegree("");
        setFilterPrice("");
        setFilterTime("");
        setFilterTaipei("");
        setFilterXinpei("");
        if (allBtn.classList == "active") {
          allBtn.classList.remove("active");
        } else {
          allBtn.classList.add("active");
        }
      }
    } else if (time == "week") {
      //取得包本週tag的容器
      const weekfilterBox =
        document.getElementById("week_allfilterBtn");
      const week_tagStyle = document.getElementById(id);

      if (week_tagStyle.classList == "active") {
        /* 如果已經選中=>移除class="active" */
        week_tagStyle.classList.remove("active");

        console.log("取消選取");
        switch (name) {
          case "tagDegree":
            setweekFilterDegree("");
            break;
          case "tagPrice":
            setweekFilterPrice("");
            console.log("改變價格:" + weekfilterPrice);
            break;
          case "startTime":
            setweekFilterTime("");
            break;
          case "city":
            setweekFilterTaipei("");
            break;
          default:
            break;
        }
      } else {
        /* 如果沒有選中=>新增class="active" */
        week_tagStyle.classList.add("active");
        week_allBtn.classList.remove("active");
        console.log(week_tagStyle);
        switch (name) {
          case "tagDegree":
            setweekFilterDegree(`${value}`);
            break;
          case "tagPrice":
            setweekFilterPrice(`${value}`);
            console.log("改變價格:" + weekfilterPrice);
            break;
          case "startTime":
            setweekFilterTime(`${value}`);
            break;
          default:
            break;
        }
        weekFilterPosts;
        console.log("本週類型: " + name);
        console.log("本週篩選 : " + value);
      }
      if (id == "tags-weekAll") {
        //取得filterBox下所有的button
        const weekfilterButtons =
          weekfilterBox.querySelectorAll("button");
        weekfilterButtons.forEach((button) => {
          //移除所有button的active類
          button.classList.remove("active");
        });
        setweekFilterDegree("");
        setweekFilterPrice("");
        setweekFilterTime("");

        if (week_allBtn.classList == "active") {
          week_allBtn.classList.remove("active");
        } else {
          week_allBtn.classList.add("active");
        }
      }
    }
  };

  useEffect(() => {
    console.log("目前本日篩選: ", conditions);
    console.log("目前本週篩選: ", weekConditions);
  }, [conditions, weekConditions]);
  /* 篩選本日資料 */
  const filterPosts = useMemo(() => {
    // 沒有篩選時渲染全部貼文
    if (!filterDegree && !filterPrice && !filterTime) {
      return [...getPosts(todayType)];
    }
    return [...getPosts(todayType)].filter((posts) => {
      let matchAllConditions = true;
      for (const key in conditions) {
        if (conditions[key] !== "") {
          if (posts.hasOwnProperty(key)) {
            switch (key) {
              case "tagDegree":
                matchAllConditions =
                  matchAllConditions &&
                  posts[key].includes(conditions[key]);
                break;
              case "tagPrice":
                //比較價格小於條件值
                matchAllConditions =
                  matchAllConditions &&
                  posts[key] <= parseInt(conditions[key]);
                break;
              case "startTime":
                // 比較startTime 是否大于條件

                matchAllConditions =
                  matchAllConditions &&
                  parseInt(posts[key].split(":")[0]) >= conditions[key];

                break;
              case "city":
                matchAllConditions =
                  matchAllConditions &&
                  posts[key].match(conditions[key]);
                break;
              default:
                // 未知屬性
                matchAllConditions = false;
                break;
            }
          } else {
            //
            matchAllConditions = false;

            // 如果某个条件不匹配，则停止遍历并返回 false
            if (!matchAllConditions) {
              return false;
            }
          }
        }
      }
      // 如果所有条件都匹配，则返回 true
      return matchAllConditions;
    });
  }, [todayType, filterTag, tagDataType, conditions]);
  /* 篩選本週資料 */
  const weekFilterPosts = useMemo(() => {
    // 沒有篩選時渲染全部貼文
    if (!weekfilterDegree && !weekfilterPrice && !weekfilterTime) {
      return [...getPosts(weekType)];
    }

    return [...getPosts(weekType)].filter((posts) => {
      let matchAllConditions = true;
      for (const key in weekConditions) {
        if (weekConditions[key] !== "") {
          if (posts.hasOwnProperty(key)) {
            switch (key) {
              case "tagDegree":
                matchAllConditions =
                  matchAllConditions &&
                  posts[key].includes(weekConditions[key]);
                break;
              case "tagPrice":
                // 比較價格小於條件值
                matchAllConditions =
                  matchAllConditions &&
                  posts[key] <= parseInt(weekConditions[key]);
                break;
              case "startTime":
                // 比較 startTime 是否
                const startTime = parseInt(posts[key].split(":")[0]);
                const conditionTime = parseInt(weekConditions[key]);
                matchAllConditions =
                  matchAllConditions &&
                  startTime >= conditionTime &&
                  startTime < conditionTime + 4;
                break;
              default:
                matchAllConditions = false;
                break;
            }
          } else {
            matchAllConditions = false;
          }
        }

        // 如果某个条件不匹配，则停止遍历并返回 false
        if (!matchAllConditions) {
          return false;
        }
      }
      // 如果所有条件都匹配，则返回 true
      return matchAllConditions;
    });
  }, [
    weekType,
    weekfilterDegree,
    weekfilterPrice,
    weekfilterTime,
    weekConditions,
  ]);

  /* 拖拽輪播 */
  // 今日
  const [dragStartX, setDragStartX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [containerRef, setContainerRef] = useState(null);

  const handleDragStart = (event) => {
    setDragging(true);
    setDragStartX(event.clientX);
  };

  const handleDragMove = (event) => {
    if (!dragging || !containerRef) return;
    const delta = event.clientX - dragStartX;
    containerRef.scrollLeft -= delta;
    setDragStartX(event.clientX);
  };

  const handleDragEnd = (event) => {
    event.stopPropagation();
    setDragging(false);
  };

  // 本周
  const [week_dragStartX, setWeekDragStartX] = useState(0);
  const [week_dragging, setWeekDragging] = useState(false);
  const [week_containerRef, setWeekContainerRef] = useState(null);

  const weekHandleDragStart = (event) => {
    setWeekDragging(true);
    setWeekDragStartX(event.clientX);
  };

  const weekHandleDragMove = (event) => {
    if (!week_dragging || !week_containerRef) return;
    const delta = event.clientX - week_dragStartX;
    week_containerRef.scrollLeft -= delta;
    setWeekDragStartX(event.clientX);
  };

  const weekHandleDragEnd = (event) => {
    event.stopPropagation(); //阻止事件冒泡，就不會影響到貼文元件的按鈕事件
    setWeekDragging(false);
  };

  /* 篩選表單更新選項 */
  const [selectedCity, setSelectedCity] = useState("全部");
  const [areaOption, setAreaOption] = useState(["地區"]);
  const [showArea, setShoeArea] = useState("none");
  let selectCity = document.getElementById("city");
  let selectArea = document.getElementById("selectArea");
  const changeArea = (value) => {
    setSelectedCity(value);
    var options = {
      taipei: [
        "全部",
        "中正區",
        "大同區",
        "中山區",
        "松山區",
        "大安區",
        "萬華區",
        "信義區",
        "士林區",
        "北投區",
        "內湖區",
        "南港區",
        "文山區",
      ],
      xinpei: [
        "全部",
        "板橋區",
        "新莊區",
        "中和區",
        "永和區",
        "土城區",
        "樹林區",
        "三重區",
        "新店區",
        "淡水區",
        "汐止區",
        "瑞芳區",
        "八里區",
        "林口區",
        "芦洲區",
        "五股區",
        "泰山區",
        "三峽區",
        "鶯歌區",
        "石碇區",
        "深坑區",
        "石門區",
        "坪林區",
        "平溪區",
        "雙溪區",
        "貢寮區",
        "金山區",
        "萬里區",
        "烏來區",
      ],
      counties: [
        "基隆市",
        "新竹市",
        "桃園市",
        "臺中市",
        "臺南市",
        "高雄市",
        "嘉義市",
        "新竹縣",
        "苗栗縣",
        "彰化縣",
        "南投縣",
        "雲林縣",
        "嘉義縣",
        "屏東縣",
        "宜蘭縣",
        "花蓮縣",
        "臺東縣",
        "澎湖縣",
      ],
    };
    if (value == "台北市") {
      selectArea;
      setAreaOption(options.taipei);
      setShoeArea("flex");
    } else if (value == "新北市") {
      setAreaOption(options.xinpei);
      setShoeArea("flex");
    } else if (value == "其他") {
      setAreaOption(options.counties);
      setShoeArea("flex");
    } else {
      setShoeArea("none");
    }
  };

  /* 儲存篩選條件 */
  const [selectedDate, setSelectedDate] = useState("全部"); //日期
  const [selectedArea, setSelectedArea] = useState([]); //地區
  const [selectedCost, setSelectedCost] = useState("全部"); //費用
  const [selectedDegree, setSelectedDegree] = useState("全部"); //程度
  const [selectedRol, setSelectedRol] = useState("全部"); //排球類型
  const [selectedEquip, setSelectedEquip] = useState("全部"); //羽球設備

  const handleSelectChange = (event) => {
    //转换为数组，并提取每个选项的值。
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedArea(selectedOptions);
  };

  const SaveData = () => {
    window.localStorage.filterDate = selectedDate;
    window.localStorage.filterCity = selectedCity;
    localStorage.setItem("filterArea", JSON.stringify(selectedArea));
    window.localStorage.filterCost = selectedCost;
    window.localStorage.filterDegree = selectedDegree;
    window.localStorage.filterRol = selectedRol;
    window.localStorage.filterEquip = selectedEquip;
    //
    window.localStorage.filterType = filterTag;
  };
  useEffect(() => {
    console.log(selectedArea);
  }, [selectedArea]);

            // 元件

          // 建立貼文元件
          const PostCard = ({
            id,
            type,
            postDate,
            dateMD,
            postStartTime,
            postEndTime,
            postCity,
            postArea,
            postArena,
            tagDegree,
            tagPrice,
            reqCount,
            role,
            pos,
            equip,
            note,
            href,
            host,
            hostId,
            appl,
            cancel,
            ballBrand,
            like,
            state,
            identity,
          }) => {
            /* 要彈出的元件連結 */
            const [postHref, setPostHref] = useState(`#${href}`);
            /* 要彈出的元件 */
            const [isPopUp, setIsPopUp] = useState("");
            /* 顯示報名列 */
            const [showApplicants, setShowApplicants] = useState("");
            /* 顯示取消列 */
            const [showCancel, setShowCancel] = useState("");
            /* 是否顯示審核列表 */
            const [mapAuditList, setMapAuditList] = useState(false);

            useEffect(() => {
              if (identity == "host") {
                setPostHref(`#auditApplyPopup-${id}`);
                setShowApplicants("flex");
                setShowCancel("none");
                setIsPopUp("查看");
                setMapAuditList(true);
              } else if (identity == "appiled") {
                setPostHref(`#auditApplyPopup-${id}`);
                setShowApplicants("none");
                setShowCancel("flex");
                setIsPopUp("查看");
                setMapAuditList(false);
              } else {
                setIsPopUp("報名元件");
              }
            }, []);
            //按確定報名後改變
            const [nowState, setNowState] = useState("default");
            useEffect(() => {
              //
              if (nowState == "applied") {
                setPostHref(`#auditApplyPopup-${id}`);
                setShowApplicants("none");
                setShowCancel("flex");
                setIsPopUp("查看");
              }
            }, [nowState]);
            /*  是否呼叫報名元件 */
            const [callApplyCard, setCallApplyCard] = useState(false);
            /* 是否呼叫查看貼文元件 */
            const [detailNotify, setDetailNotify] = useState(false);

            const handleCallComponent = (type) => {
              if (type == "查看") {
                setCallApplyCard(false);
                setDetailNotify(true);
              } else {
                setCallApplyCard(true);
                setDetailNotify(false);
              }
            };

            return (
              <>
                <div
                  className="content"
                  id={id}
                  style={{ backgroundImage: postBorder }}
                >
                  <div className="text">
                    <div className="mainText">
                      <p className="text-M">{postDate}</p>
                      <p className="text-L">{postStartTime}</p>
                    </div>
                    <div className="subtext">
                      <p className="text-S">{postCity}</p>
                      <p className="text-S">{postArea}</p>
                    </div>
                    <h3 className="text-L" value={`${postArena}`}>
                      {postArena}
                    </h3>
                    <div className="tag-style">
                      <p className="text-S tagMargin">{tagDegree}</p>
                      <p className="text-S tagMargin">${tagPrice}</p>
                    </div>
                    <div className="BtnContainer">
                      <a
                        className="button"
                        href={postHref}
                        onClick={() => {
                          handleCallComponent(isPopUp);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {/* onMouseDown={(e) => e.stopPropagation()}為了阻止冒泡 使其不會跟托拽輪播衝突 */}
                        報名
                      </a>
                    </div>
                  </div>
                </div>

                {callApplyCard && (
                  <ApplyCard
                    href={href}
                    type={type}
                    postDate={postDate}
                    postStartTime={postStartTime}
                    postEndTime={postEndTime}
                    postCity={postCity}
                    postArea={postArea}
                    postArena={postArena}
                    tagDegree={tagDegree}
                    tagPrice={tagPrice}
                    female={reqCount[0].count}
                    male={reqCount[1].count}
                    unspecified={reqCount[2].count}
                    role={role}
                    equip={equip}
                    pos={pos}
                    note={note}
                    host={host}
                    hostId={hostId}
                    ballBrand={ballBrand}
                    noticeHref={`${href}-noticeApplyPopUp-${id}`}
                    like={like}
                    state={state}
                    setNowState={setNowState}
                  />
                )}
                {detailNotify && (
                  <DetailPostCard
                    day={dateMD}
                    startTime={postStartTime}
                    endTime={postEndTime}
                    type={type}
                    city={postCity}
                    area={postArea}
                    arena={postArena}
                    tagDegree={tagDegree}
                    tagPrice={tagPrice}
                    state={state}
                    id={id}
                    female={reqCount[0].count}
                    male={reqCount[1].count}
                    unspecified={reqCount[2].count}
                    role={role}
                    equip={equip}
                    ballBrand={ballBrand}
                    note={note}
                    appl={appl}
                    cancel={cancel}
                    popUp={postHref}
                    typeStyle={mainColor}
                    typeFontStyle={fontColor}
                    showApplicants={showApplicants}
                    showCancel={showCancel}
                    mapAuditList={mapAuditList}
                  />
                )}
              </>
            );
          };
          //建立貼文報名元件
          const ApplyCard = ({
            href,
            type,
            postDate,
            postStartTime,
            postEndTime,
            postCity,
            postArea,
            postArena,
            tagDegree,
            tagPrice,
            female,
            male,
            unspecified,
            role,
            pos,
            equip,
            ballBrand,
            note,
            host,
            hostId,
            noticeHref,
            like,
            state,
            setNowState,
          }) => {
            const [showBallBrand, setShowBallBrand] = useState("none");
            const [showVbInfo, setShowVbInfo] = useState("flex");
            const [isLike, setIsLike] = useState("");
            const [btnDisplay, setBtnDisplay] = useState("flex");
            useEffect(() => {
              if (type == "羽球") {
                hostType = "bm";
                setShowBallBrand("flex");
                setShowVbInfo("none");
              }
              if (like === "true") {
                setIsLike("./images/heart-yes.svg");
              } else {
                setIsLike("./images/heart-no.svg");
              }
            }, [type, like]);
            var hostType = "vb";

            const handleLikeState = (like) => {
              like === "./images/heart-yes.svg"
                ? setIsLike("./images/heart-no.svg")
                : setIsLike("./images/heart-yes.svg");
            };

            const [showNotice, setShowNotice] = useState(false);
            const handleNotice = () => {
              setShowNotice(true);
              setNowState("applied");
            };
            return (
              <>
                <div
                  className="popup"
                  id={href}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="popup-inner">
                    <div className="popup__content">
                      <div className="detailPostInfo">
                        <div className="simplePostInfo">
                          <div className="main-info">
                            <div className="header">
                              <p>
                                {postDate} {postStartTime}~{postEndTime}
                              </p>
                              <div className="type-style">{type}</div>
                              <button
                                className="collect"
                                onClick={() => {
                                  handleLikeState(isLike);
                                }}
                              >
                                <img src={isLike} alt="收藏" />
                              </button>
                            </div>
                            <div className="areaInfo">
                              <h3>{postCity}</h3>
                              <h3>{postArea}</h3> <h3>{postArena}</h3>
                            </div>
                            <div className="tag-style">
                              <p>{tagDegree}</p>
                              <p>${tagPrice}</p>
                            </div>
                          </div>
                          <div className="sub-info">
                            <div className="vacancyInfo">
                              <h4>缺額</h4>
                              <div>女</div>
                              <p>{female}位</p>
                              <div>男</div>
                              <p>{male}位</p>
                              <div>不限</div> <p>{unspecified}位</p>
                            </div>
                            <div
                              className="ballInfo"
                              style={{ display: showVbInfo }}
                            >
                              <h4>類型</h4>
                              <p>{role}</p>
                            </div>
                            <div
                              className="ballInfo"
                              style={{ display: showBallBrand }}
                            >
                              <h4>用球</h4>
                              <p>{ballBrand}</p>
                            </div>
                            <div
                              className="equipInfo"
                              style={{ display: showVbInfo }}
                            >
                              <h4>位置</h4>
                              <p>{pos}</p>
                            </div>
                            <div
                              className="equipInfo"
                              style={{ display: showBallBrand }}
                            >
                              <h4>設備</h4>
                              <p>{equip}</p>
                            </div>
                            <div className="noteInfo">
                              <h4>備註</h4>
                              <p>{note}</p>
                            </div>
                          </div>

                          <div className="apply-info">
                            <hr />
                            <img
                              src={`./images/${hostId}.png`}
                              alt="團主頭貼"
                            />
                            <p>
                              團主<span>{host}</span>
                            </p>
                            <div className="component-writeBlock">
                              <p>報名備註 : </p>
                              <input
                                type="text"
                                placeholder="輸入對團主的話..."
                              />
                            </div>
                          </div>

                          <div
                            className="BtnContainer"
                            style={{ display: btnDisplay }}
                          >
                            <a className="btn-close popup__close" href="#">
                              關閉
                            </a>
                            <a href={`#${noticeHref}`}>
                              <button className="button" onClick={handleNotice}>
                                確認報名
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {showNotice && <NoticeApply noticeHref={noticeHref} />}
              </>
            );
          };
          //建立通知報名元件
          const NoticeApply = ({ noticeHref }) => {
            return (
              /*燈箱效果-報名審核中通知 */
              <div
                className="popup"
                id={noticeHref}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="popup-static">
                  <div className="popup__content">
                    {/* 報名審核中通知元件 */}
                    <div className="notice-apply">
                      <p>已送出報名，團主審核中</p>
                      <a className="popup__close" href="#">
                        <img src="./images/cancel.png" alt="關閉按鈕" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          };

          /* 建立元件 燈箱效果- 查看行程*/
          const DetailPostCard = ({
            day,
            startTime,
            endTime,
            type,
            city,
            area,
            arena,
            tagDegree,
            tagPrice,
            state,
            identity,
            id,
            female,
            male,
            unspecified,
            role,
            equip,
            ballBrand,
            note,
            appl,
            cancel,
            popUp,
            typeStyle,
            typeFontStyle,
            showApplicants,
            showCancel,
            mapAuditList,
          }) => {
            /* 出席率圖 */
            const [ellipseBar, setEllipseBar] = useState("");
            /* 元件副資訊 */
            const [showBmInfo, setShowBmInfo] = useState("");
            const [showVbInfo, setShowVbInfo] = useState("");
            useEffect(() => {
              // 羽or排顏色
              let typeStyle = "";
              let typeFontStyle = "";
              let stateColor = "";
              let ellipseBar = "";
              if (type === "羽球") {
                typeStyle = "rgba(131, 185, 15, 0.9)";
                typeFontStyle = "#689607";
                ellipseBar = "./images/ellipsebarbm.png";
                //副資訊
                setShowBmInfo("flex");
                setShowVbInfo("none");
              } else if (type === "排球") {
                typeStyle = "#14AAEB";
                typeFontStyle = "#147CB6";
                ellipseBar = "./images/ellipsebarvb.png";
                //副資訊
                setShowBmInfo("none");
                setShowVbInfo("flex");
              }
              setEllipseBar(ellipseBar);
            }, [type]);
            const [auditCancelCard, setAuditCancelCard] = useState(false);
            const [cancelIsNew, setCancelIsNew] = useState("block");
            const handleAuditCancelCard = () => {
              setAuditCancelCard(true);
              setCancelIsNew("none");
            };
            /* 是否生成查看行程元件 */
            const [detailsNotifyCard, setDetailsNotifyCard] = useState(false);
            const handleDetailsNotifyCard = () => {
              setDetailsNotifyCard(true);
            };

            /* 是否生成審核報名元件 */
            const [auditApplyCard, setAuditApplyCard] = useState("");
            const [popupId, setPopupId] = useState("");
            const handleAuditApplyCard = (type, index) => {
              setAuditApplyCard(type);
              setPopupId(`${index}`);
            };

            //是否第一次點擊
            let first = false;
            /* 申請者元件 */
            const ApplicantsCard = ({ applyId, index }) => {
              //const [isNew, setIsNew] = useState("block"); //new提示狀態
              let playerId = id.toString() + "中" + applyId.toString();
              //點擊事件
              function handleClick() {
                //隱藏new提示
                //setIsNew("none");
                if (first == false) {
                  first = true;
                  window.localStorage.setItem(playerId, "none");
                }
              }
              return (
                <>
                  <a
                    href={`#detailApplyPopup-${id}-${index}`}
                    onClick={() => {
                      handleClick();
                      handleAuditApplyCard("apply", index);
                    }}
                  >
                    <img
                      className="img-border"
                      src={`./images/${applyId}.png`}
                      alt="申請者頭像"
                    />
                    <div
                      className="notice-new"
                      style={{ display: window.localStorage.getItem(playerId) }}
                    >
                      New
                    </div>
                  </a>
                </>
              );
            };
            /* 審核列表 */
            const AuditList = ({ prop }) => {
              return (
                <>
                  <div
                    className="auditList"
                    style={{ display: showApplicants }}
                  >
                    <div className="sponsored-title">
                      <div className="line-hugTitle">
                        <div className="titleLine"></div>
                        <h3>球友申請列表</h3>
                        <small> 已徵{state}</small>
                      </div>
                      <div className="titleArrowBtn">
                        <button>
                          <img src="./images/btn-left.png" alt="前一個" />
                        </button>
                        <button>
                          <img src="./images/btn-right.png" alt="後一個" />
                        </button>
                      </div>
                    </div>
                    <div className="applicant-container">
                      {appl.map((apply, index) => (
                        <ApplicantsCard
                          key={index}
                          applyId={apply.id}
                          index={index}
                          //isNew={isNew}
                          //setIsNew={setIsNew}
                          // isNew={applicantsState[index].isNew}
                          //handleAuditApplyCard={handleAuditApplyCard}
                        />
                      ))}

                      <a
                        href={`#detailApplyPopup-yes-0`}
                        onClick={() => handleAuditApplyCard("yes", 0)}
                      >
                        <img
                          className="img-border"
                          src="./images/player-agree.png"
                          alt="同意報名"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className="auditList"
                    style={{ display: showApplicants }}
                  >
                    <div className="sponsored-title">
                      <div className="line-hugTitle">
                        <div className="titleLine"></div>
                        <h3>取消申請列表</h3>
                      </div>
                    </div>
                    <div className="applicant-container">
                      <a
                        href={`#auditCancelPopup-${id}-0`}
                        onClick={handleAuditCancelCard}
                      >
                        <img
                          className="img-border"
                          src={`./images/${cancel[0].id}.png`}
                          alt="取消者頭像"
                        />
                        <div
                          className="notice-new"
                          style={{ display: cancelIsNew }}
                        >
                          New
                        </div>
                      </a>
                    </div>
                  </div>
                </>
              );
            };
            return (
              <>
                <div
                  className="popup"
                  id={`auditApplyPopup-${id}`}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="popup-inner">
                    <div className="popup__content">
                      <div className="detailItinerary">
                        <div className="simplePostInfo">
                          <div className="main-info">
                            <div
                              className="header"
                              style={{ color: typeFontStyle }}
                            >
                              <p>
                                {day} {startTime}~{endTime}
                              </p>
                              <div
                                className="type-style"
                                style={{ backgroundColor: typeStyle }}
                              >
                                {type}
                              </div>
                              <a className="popup__close" href="#">
                                <img src="./images/cancel.png" alt="" />
                              </a>
                            </div>
                            <div
                              className="areaInfo"
                              style={{ color: typeFontStyle }}
                            >
                              <h3>{city}</h3>
                              <h3>{area}</h3>
                              <h3>{arena}</h3>
                            </div>
                            <div className="tag-style">
                              <p
                                style={{
                                  backgroundColor: typeFontStyle,
                                  borderColor: typeFontStyle,
                                }}
                              >
                                {tagDegree}
                              </p>
                              <p
                                style={{
                                  backgroundColor: typeFontStyle,
                                  borderColor: typeFontStyle,
                                }}
                              >
                                ${tagPrice}
                              </p>
                            </div>
                          </div>
                          <div className="sub-info">
                            <div className="vacancyInfo">
                              <h4>缺額</h4>
                              <div>女</div>
                              <p style={{ color: typeFontStyle }}>{female}位</p>
                              <div>男</div>
                              <p style={{ color: typeFontStyle }}>{male}位</p>
                              <div>不限</div>
                              <p style={{ color: typeFontStyle }}>
                                {unspecified}位
                              </p>
                            </div>
                            <div
                              className="ballInfo"
                              style={{ display: showVbInfo }}
                            >
                              <h4>類型</h4>
                              <p style={{ color: typeFontStyle }}>{role}</p>
                            </div>
                            <div
                              className="equipInfo"
                              style={{ display: showVbInfo }}
                            >
                              <h4>位置</h4>
                              <p style={{ color: typeFontStyle }}>{equip}</p>
                            </div>
                            <div
                              className="ballInfo"
                              style={{ display: showBmInfo }}
                            >
                              <h4>用球</h4>
                              <p style={{ color: typeFontStyle }}>
                                {ballBrand}
                              </p>
                            </div>
                            <div
                              className="equipInfo"
                              style={{ display: showBmInfo }}
                            >
                              <h4>設備</h4>
                              <p style={{ color: typeFontStyle }}>{equip}</p>
                            </div>
                            <div className="noteInfo">
                              <h4>備註</h4>
                              <p style={{ color: typeFontStyle }}>{note}</p>
                            </div>
                          </div>

                          {mapAuditList && <AuditList />}

                          <div
                            className="BtnContainer"
                            style={{ display: showCancel }}
                          >
                            <a className="popup__close btn-close" href="#">
                              關閉
                            </a>
                            <a
                              href={`#confirmCancel-${id}`}
                              className="button btn-no"
                              onClick={handleDetailsNotifyCard}
                            >
                              取消行程
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {auditApplyCard === "apply" && (
                  <AuditApplyCard
                    key={popupId}
                    day={day}
                    startTime={startTime}
                    type={type}
                    arena={arena}
                    state={state}
                    id={id}
                    index={popupId}
                    appl={appl}
                    typeStyle={typeStyle}
                    typeFontStyle={typeFontStyle}
                    ellipseBarType={ellipseBar}
                    isApply={"false"}
                    //setIsNew={setIsNew}
                  />
                )}

                {auditApplyCard === "yes" && (
                  <AuditApplyCard
                    key={popupId}
                    day={day}
                    startTime={startTime}
                    type={type}
                    arena={arena}
                    state={state}
                    appl={appl}
                    id={id}
                    index={0}
                    typeStyle={typeStyle}
                    typeFontStyle={typeFontStyle}
                    ellipseBarType={ellipseBar}
                    isApply={"true"}
                    onClose={() => handleAuditApplyCard(false)}
                  />
                )}
                {auditCancelCard && (
                  <AuditCancelCard
                    day={day}
                    startTime={startTime}
                    type={type}
                    arena={arena}
                    state={state}
                    id={id}
                    cancel={cancel}
                    typeStyle={typeStyle}
                    typeFontStyle={typeFontStyle}
                  />
                )}
                {detailsNotifyCard && (
                  <DetailsNotifyCard
                    day={day}
                    startTime={startTime}
                    endTime={endTime}
                    type={type}
                    city={city}
                    area={area}
                    arena={arena}
                    tagDegree={tagDegree}
                    tagPrice={tagPrice}
                    id={id}
                    typeStyle={typeStyle}
                    typeFontStyle={typeFontStyle}
                  />
                )}
              </>
            );
          };
          /* 建立元件 燈箱效果-審核申請 */
          const AuditApplyCard = ({
            day,
            startTime,
            type,
            arena,
            state,
            id,
            appl,
            index,
            typeStyle,
            typeFontStyle,
            ellipseBarType,
            isApply,
          }) => {
            const [btnDisplay, setBtnDisplay] = useState("flex");
            const [resultDisplay, setResultDisplay] = useState("none");
            const [resultText, setResultText] = useState("");
            const [resultColor, setResultColor] = useState("#1A8D07");
            const [degreeType, setDegreeType] = useState("");
            const [thisType, setThisType] = useState("");
            //console.log(appl);
            //console.log("元件" + isApply + index);
            useEffect(() => {
              if (isApply === "true") {
                //如果已同意申請
                setBtnDisplay("none");
                setResultDisplay("block");
                setResultText("接受申請");
              }
              if (type === "羽球") {
                setThisType("羽");
                setDegreeType(appl[index].bmLevel);
              } else {
                setThisType("排");
                setDegreeType(appl[index].vbLevel);
              }
            }, [isApply, type]);

            /* 審核結果標籤 */
            const auditResult = (type) => {
              let text = "";
              //關閉審核按鈕
              setBtnDisplay("none");
              //顯示審核結果
              setResultDisplay("block");
              //判斷顯示結果的文字和顏色
              if (type === "no") {
                text = "已婉拒";
                setResultColor("#FF4F03");
              } else if (type === "yes") {
                text = "接受申請";
              }
              setResultText(text);
            };

            return (
              /* 燈箱效果-=團主審核報名元件 */
              <div
                className="popup"
                id={`detailApplyPopup-${id}-${index}`}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="popup-inner">
                  <div className="popup__content">
                    {/* 團主審核報名元件 */}
                    <div className="audit-apply">
                      <div className="topBtn-container">
                        <a href="#">
                          <img src="./images/waring.png" alt="黑名單" />
                        </a>
                        <a
                          className="popup__close"
                          href={`#auditApplyPopup-${id}`}
                        >
                          <img src="./images/cancel.png" alt="關閉" />
                        </a>
                      </div>
                      <div className="audit-info">
                        <div className="selfState-userInfo">
                          <div className="info">
                            <img
                              className="applicantImg"
                              src={`./images/${appl[index].id}.png`}
                              alt="申請者頭像"
                            />
                            <p style={{ color: typeFontStyle }}>
                              {appl[index].name}
                            </p>
                          </div>
                          <div className="info">
                            <div className="attendance">
                              <p
                                className="text-M"
                                style={{ color: typeFontStyle }}
                              >
                                {appl[index].attnRate}%
                              </p>
                              <img src={ellipseBarType} alt="出席率圖" />
                            </div>
                            <p style={{ color: typeFontStyle }}>出席率</p>
                          </div>
                          <div className="info">
                            <div className="userInfo">
                              <p style={{ backgroundColor: typeStyle }}>
                                {degreeType}
                              </p>
                            </div>
                            <p style={{ color: typeFontStyle }}>自評等級</p>
                          </div>
                        </div>
                        <div className="info-remark">
                          <h5>備註（僅限自己可看）：</h5>
                          <p>{appl[index].note}</p>
                        </div>
                        <div className="notice-container">
                          <div
                            className="notice-ballType"
                            style={{ backgroundColor: typeStyle }}
                          >
                            <p>{thisType}</p>
                          </div>
                          <div className="notice-info">
                            <div className="audit-time">
                              <p style={{ color: typeFontStyle }}>{day}</p>
                              <p style={{ color: typeFontStyle }}>
                                {startTime}
                              </p>
                            </div>
                            <p style={{ color: typeFontStyle }}>{arena}</p>
                            <div className="audit-state">
                              <p>{state}</p>
                            </div>
                          </div>
                        </div>
                        <div className="info-applicantNote">
                          <h5>報名備註：</h5>
                          <p>{appl[index].ps}</p>
                        </div>
                        <div
                          className="bottomBtn-container"
                          style={{ display: btnDisplay }}
                        >
                          <button
                            className="button btn-no"
                            onClick={() => auditResult("no")}
                          >
                            婉拒
                          </button>
                          <button
                            className="button btn-yes"
                            onClick={() => auditResult("yes")}
                          >
                            同意申請
                          </button>
                        </div>
                        <div
                          className="audit-state audit-yes"
                          style={{
                            display: resultDisplay,
                            color: resultColor,
                            borderColor: resultColor,
                          }}
                        >
                          <p>{resultText}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          };
          /* 建立元件 燈箱效果-審核取消 */
          const AuditCancelCard = ({
            day,
            startTime,
            type,
            arena,
            state,
            id,
            index,
            cancel,
            typeFontStyle,
            typeStyle,
          }) => {
            const [btnDisplay, setBtnDisplay] = useState("flex");
            const [resultDisplay, setResultDisplay] = useState("none");
            const [resultText, setResultText] = useState("");
            const [resultColor, setResultColor] = useState("#1A8D07");
            const [thisType, setThisType] = useState("");

            useEffect(() => {
              if (type === "羽球") {
                setThisType("羽");
              } else {
                setThisType("排");
              }
            }, [type]);
            /* 審核結果標籤 */
            const auditResult = (type) => {
              let text = "";

              setBtnDisplay("none");
              setResultDisplay("block");
              if (type === "no") {
                text = "已婉拒";
                setResultColor("#FF4F03");
              } else if (type === "yes") {
                text = "同意取消";
              }
              setResultText(text);
            };

            return (
              /* 燈箱效果-=團主審核取消元件 */
              <div
                className="popup"
                id={`auditCancelPopup-${id}-0`}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="popup-inner">
                  <div className="popup__content">
                    {/* 團主審核取消元件 */}
                    <div className="audit-apply">
                      <div className="topBtn-container">
                        <a href="#">
                          <img src="./images/waring.png" alt="黑名單" />
                        </a>
                        <a
                          className="popup__close"
                          href={`#auditApplyPopup-${id}`}
                        >
                          <img src="./images/cancel.png" alt="關閉" />
                        </a>
                      </div>
                      <div className="audit-info">
                        <div className="info-selfState">
                          <div className="selfState-userInfo">
                            <div className="applicantInfo">
                              <img
                                className="applicantImg"
                                src={`./images/${cancel[0].id}.png`}
                                alt="取消者頭像"
                              />
                              <p>{cancel[0].name}</p>
                            </div>
                            <div className="reason-cancel">
                              <h5>取消原因:</h5>
                              <p>{cancel[0].reason}</p>
                            </div>
                          </div>
                          <div className="selfState-title">
                            <h4>取消場次 :</h4>
                          </div>
                        </div>

                        <div className="notice-container">
                          <div
                            className="notice-ballType"
                            style={{ backgroundColor: typeStyle }}
                          >
                            <p>{thisType}</p>
                          </div>
                          <div className="notice-info">
                            <div className="audit-time">
                              <p style={{ color: typeFontStyle }}>{day}</p>
                              <p style={{ color: typeFontStyle }}>
                                {startTime}
                              </p>
                            </div>
                            <p style={{ color: typeFontStyle }}>{arena}</p>
                            <div className="audit-state">
                              <p>{state}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="bottomBtn-container"
                          style={{ display: btnDisplay }}
                        >
                          <button
                            className="button btn-no"
                            onClick={() => auditResult("no")}
                          >
                            婉拒
                          </button>
                          <button
                            className="button btn-yes"
                            onClick={() => auditResult("yes")}
                          >
                            同意取消
                          </button>
                        </div>
                        <div
                          className="audit-state audit-yes"
                          style={{
                            display: resultDisplay,
                            color: resultColor,
                            borderColor: resultColor,
                          }}
                        >
                          <p>{resultText}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          };
          /* 建立元件 燈箱效果-確認取消 */
          const DetailsNotifyCard = ({
            day,
            startTime,
            endTime,
            type,
            city,
            area,
            arena,
            tagDegree,
            tagPrice,
            identity,
            id,
            typeStyle,
            typeFontStyle,
          }) => {
            const [btnDisplay, setBtnDisplay] = useState("flex");
            const [resultDisplay, setResultDisplay] = useState("none");
            const [resultColor, setResultColor] = useState("#1A8D07");
            /* 取消ing標籤 */
            const applicantResult = (type) => {
              setBtnDisplay("none");
              setResultDisplay("flex");
              if (type === "cancel") {
                setResultColor("#FF4F03");
              }
            };
            return (
              <>
                <div
                  className="popup"
                  id={`confirmCancel-${id}`}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="popup-inner">
                    <div className="popup__content">
                      <div className="simplePostInfo">
                        <div className="main-info">
                          <div
                            className="header"
                            style={{ color: typeFontStyle }}
                          >
                            <p>
                              {day} {startTime}~{endTime}
                            </p>
                            <div
                              className="type-style"
                              style={{ backgroundColor: typeStyle }}
                            >
                              {type}
                            </div>
                            <a className="popup__close" href="#">
                              <img src="./images/cancel.png" alt="" />
                            </a>
                          </div>
                          <div
                            className="areaInfo"
                            style={{ color: typeFontStyle }}
                          >
                            <h3>{city}</h3>
                            <h3>{area}</h3>
                            <h3>{arena}</h3>
                          </div>
                          <div className="tag-style">
                            <p style={{ backgroundColor: typeFontStyle }}>
                              {tagDegree}
                            </p>
                            <p style={{ backgroundColor: typeFontStyle }}>
                              ${tagPrice}
                            </p>
                          </div>
                        </div>
                        <div className="component-writeBlock">
                          <h5>取消原因：</h5>
                          <input
                            type="text"
                            placeholder="請輸入取消原因"
                          ></input>
                        </div>
                        <div
                          className="BtnContainer"
                          style={{ display: btnDisplay }}
                        >
                          <a className="popup__close btn-close" href="#">
                            關閉
                          </a>
                          <button
                            className="button btn-no"
                            onClick={() => applicantResult("cancel")}
                          >
                            確認取消
                          </button>
                        </div>
                        <div
                          className="audit-state audit-cancel"
                          style={{
                            display: resultDisplay,
                            color: resultColor,
                            borderColor: resultColor,
                          }}
                        >
                          <p>取消ing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          };
          //建立篩選表單元件
          const FilterForm = ({ areaOption }) => {
            return <></>;
          };
          //地區選項元件
          const Option = ({ option }) => {
            return (
              <>
                <option value={option}>{option}</option>
              </>
            );
          };
  return (
    <main className="index-Area">
                {/*篩選區 */}
                <section className="search">
                  <div className="btn-changeType">
                    <div className="form-type">
                      <button
                        id="btn-formBM"
                        // ref={btnFormBmRef}
                        className={
                          selectedButton === "btn-typeBm" ? "selected" : ""
                        }
                        onClick={() => changeType("btn-typeBm")}
                      >
                        打羽球
                      </button>

                      <button
                        id="btn-formVB"
                        // ref={btnFormVbRef}
                        className={
                          selectedButton === "btn-typeVb" ? "selected" : ""
                        }
                        onClick={() => changeType("btn-typeVb")}
                      >
                        打排球
                      </button>
                    </div>
                  </div>
                  <div id="search-Type">
                    <button
                      id="btn-typeVb"
                      className={
                        selectedButton === "btn-typeVb" ? "selected" : ""
                      }
                      ref={btnTypeVbRef}
                      onClick={() => changeType("btn-typeVb")}
                    ></button>
                    <button
                      id="btn-typeBm"
                      className={
                        selectedButton === "btn-typeBm" ? "selected" : ""
                      }
                      onClick={() => changeType("btn-typeBm")}
                      ref={btnTypeBmRef}
                    ></button>
                  </div>
                  <div id="search-Bar" style={{ backgroundColor: mainColor }}>
                    <div className="dropMenu">
                      <ul>
                        <input
                          className="dpMenu-item"
                          type="date"
                          name="日期"
                          id="date"
                          title="打球日"
                          required
                          onChange={(e) => {
                            setSelectedDate(e.target.value);
                          }}
                        />
                        <select
                          name="縣市"
                          id="city"
                          className="dpMenu-item"
                          onChange={(e) => {
                            changeArea(e.target.value);
                          }}
                        >
                          <option value="全部">縣市</option>
                          <option value="台北市">台北市</option>
                          <option value="新北市">新北市</option>
                          <option value="其他">其他</option>
                        </select>
                        <select
                          name="地區"
                          multiple={true}
                          id="selectArea"
                          className="dpMenu-item"
                          style={{ display: showArea }}
                          value={selectedArea}
                          onChange={(e) => {
                            handleSelectChange(e);
                          }}
                        >
                          {areaOption.map((option, index) => {
                            return (
                              <Option key={index} option={option}></Option>
                            );
                          })}
                        </select>
                        <select
                          name="程度"
                          id="degree"
                          className="dpMenu-item"
                          style={{ display: VBdisplay }}
                          onChange={(e) => {
                            setSelectedDegree(e.target.value);
                          }}
                        >
                          <option value="全部">程度</option>
                          <option value="C">C</option>
                          <option value="B">B</option>
                          <option value="A">A</option>
                          <option value="S">S</option>
                        </select>
                        <select
                          name="程度"
                          id="degree"
                          className="dpMenu-item"
                          style={{ display: BMdisplay }}
                          onChange={(e) => {
                            setSelectedDegree(e.target.value);
                          }}
                        >
                          <option value="default">程度</option>
                          <option value="新手">新手</option>
                          <option value="初階">初階</option>
                          <option value="初上"> 初上</option>
                          <option value="中下">中下</option>
                          <option value="中階">中階</option>
                          <option value="中上">中上</option>
                          <option value="中進階">中進階</option>
                        </select>

                        <select
                          name="費用"
                          id="cost"
                          className="dpMenu-item"
                          onChange={(e) => {
                            setSelectedCost(e.target.value);
                          }}
                        >
                          <option value="全部">費用</option>
                          <option value="150">150以下</option>
                          <option value="200">200以下</option>
                          <option value="250">250以下</option>
                        </select>
                        <select
                          name="類型"
                          id="type"
                          className="dpMenu-item"
                          style={{ display: VBdisplay }}
                          onChange={(e) => {
                            setSelectedRol(e.target.value);
                          }}
                        >
                          <option value="全部">類型</option>
                          <option value="男網純男">男網純男</option>
                          <option value="女網純女">女網純女</option>
                          <option value="男網混排">男網混排</option>
                          <option value="女網混排">女網混排</option>
                        </select>
                        <select
                          name="設備"
                          id="equip"
                          className="dpMenu-item"
                          style={{ display: BMdisplay }}
                          onChange={(e) => {
                            setSelectedEquip(e.target.value);
                          }}
                        >
                          <option value="default">設備</option>
                          <option value="側燈">側燈</option>
                          <option value="冷氣">冷氣</option>
                          <option value="飲水機">飲水機</option>
                          <option value="停車場">停車場</option>
                          <option value="PVC地板">PVC地板</option>
                          <option value="淋浴">淋浴</option>
                        </select>
                      </ul>
                      {/**/}
                    </div>
                    <div className="searchBtn-box">
                      <div id="search-Type">
                        <button
                          id="btn-typeVb"
                          className={
                            selectedButton === "btn-typeVb" ? "selected" : ""
                          }
                          ref={btnTypeVbRef}
                          onClick={() => changeType("btn-typeVb")}
                        ></button>
                        <button
                          id="btn-typeBm"
                          className={
                            selectedButton === "btn-typeBm" ? "selected" : ""
                          }
                          onClick={() => changeType("btn-typeBm")}
                          ref={btnTypeBmRef}
                        ></button>
                      </div>
                      <a href="./filterPosts.html">
                        <button
                          type="submit"
                          className="btn-send button"
                          onClick={() => {
                            SaveData();
                          }}
                        >
                          送出
                        </button>
                      </a>
                    </div>
                  </div>
                </section>
                {/* 本日臨打貼文 */}
                <section className="post-containers">
                  <div className="title-postArea">
                    <h2>
                      <div className="titleLine"></div>
                      本日臨打貼文
                    </h2>
                    <a
                      href="./More-postsArea.html"
                      onClick={() => {
                        storageHref(hrefTodayMore);
                      }}
                    >
                      <div className="more button">更多</div>
                    </a>
                  </div>
                  <ul className="tags" id="today_allfilterBtn">
                    <button
                      id="tags-All"
                      className="active"
                      onClick={() =>
                        tagFilter("tags-All", "排球", "type", "today")
                      }
                    >
                      全部
                    </button>
                    <button
                      id="tags-B"
                      onClick={() =>
                        tagFilter("tags-B", degreeTag, "tagDegree", "today")
                      }
                    >
                      {degreeTag}
                    </button>
                    <button
                      id="tags-200"
                      onClick={() =>
                        tagFilter("tags-200", "200", "tagPrice", "today")
                      }
                    >
                      $200↓
                    </button>
                    <button
                      id="tags-night"
                      onClick={() =>
                        tagFilter("tags-night", "18", "startTime", "today")
                      }
                    >
                      晚上
                    </button>
                  </ul>
                  <div
                    className="post-block"
                    ref={(ref) => setContainerRef(ref)}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    // onTouchStart={handleDragStart}
                    // onTouchMove={handleDragMove}
                    // onTouchEnd={handleDragEnd}
                  >
                    {/* <Slider {...settings}> */}
                    {filterPosts.map((post_data) => {
                      return (
                        <PostCard
                          key={post_data.id}
                          id={post_data.id}
                          type={post_data.type}
                          postDate={post_data.date}
                          dateMD={post_data.dateMD}
                          postStartTime={post_data.startTime}
                          postEndTime={post_data.endTime}
                          postCity={post_data.city}
                          postArea={post_data.area}
                          postArena={post_data.arena}
                          tagDegree={post_data.tagDegree}
                          tagPrice={post_data.tagPrice}
                          reqCount={post_data.reqCount}
                          role={post_data.role}
                          pos={post_data.pos}
                          note={post_data.note}
                          href={`todayApplyPopUp-${post_data.id}`}
                          host={post_data.host}
                          hostId={post_data.hostId}
                          appl={post_data.appl}
                          cancel={post_data.cancel}
                          ballBrand={post_data.ballBrand}
                          equip={post_data.equip}
                          like={post_data.like}
                          state={post_data.state}
                          identity={post_data.identity}
                        />
                      );
                    })}
                    {/* </Slider> */}
                  </div>
                </section>
                {/* 本週臨打貼文 */}
                <section className="post-containers">
                  <div className="title-postArea">
                    <h2>
                      <div className="titleLine"></div>本週臨打貼文
                    </h2>
                    <a
                      href="./More-postsArea.html"
                      onClick={() => {
                        storageHref(hrefWeekMore);
                      }}
                    >
                      <div className="more button">更多</div>
                    </a>
                  </div>
                  <ul className="tags" id="week_allfilterBtn">
                    <button
                      id="tags-weekAll"
                      className="active"
                      onClick={() =>
                        tagFilter("tags-weekAll", "排球", "type", "week")
                      }
                    >
                      全部
                    </button>
                    <button
                      id="tags-weekB"
                      onClick={() =>
                        tagFilter("tags-weekB", degreeTag, "tagDegree", "week")
                      }
                    >
                      {degreeTag}
                    </button>
                    <button
                      id="tags-week200"
                      onClick={() =>
                        tagFilter("tags-week200", "200", "tagPrice", "week")
                      }
                    >
                      $200↓
                    </button>
                    <button
                      id="tags-weeknight"
                      onClick={() =>
                        tagFilter("tags-weeknight", "18", "startTime", "week")
                      }
                    >
                      晚上
                    </button>
                  </ul>
                  <div
                    className="post-block"
                    ref={(ref) => setWeekContainerRef(ref)}
                    onMouseDown={weekHandleDragStart}
                    onMouseMove={weekHandleDragMove}
                    onMouseUp={weekHandleDragEnd}
                    onMouseLeave={weekHandleDragEnd}
                  >
                    {weekFilterPosts.map((post_data) => {
                      return (
                        <PostCard
                          key={post_data.id}
                          id={post_data.id}
                          type={post_data.type}
                          postDate={post_data.date}
                          dateMD={post_data.dateMD}
                          postStartTime={post_data.startTime}
                          postEndTime={post_data.endTime}
                          postCity={post_data.city}
                          postArea={post_data.area}
                          postArena={post_data.arena}
                          tagDegree={post_data.tagDegree}
                          tagPrice={post_data.tagPrice}
                          reqCount={post_data.reqCount}
                          role={post_data.role}
                          pos={post_data.pos}
                          note={post_data.note}
                          href={`weekApplyPopUp-${post_data.id}`}
                          host={post_data.host}
                          hostId={post_data.hostId}
                          appl={post_data.appl}
                          cancel={post_data.cancel}
                          ballBrand={post_data.ballBrand}
                          equip={post_data.equip}
                          like={post_data.like}
                          state={post_data.state}
                          identity={post_data.identity}
                        />
                      );
                    })}
                  </div>
                </section>
              </main>
  );
};

// 主程式
(async () => {
  const postData = await getData();
  const root = createRoot(document.getElementById("root"));
  root.render(<App postData={postData} />);
})();
