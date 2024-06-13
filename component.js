/* 建立元件 header元件 */
const TopBar = ({ mobileTopBar, title,isLogIn, href,btnName,btnImg,btnID,isShow}) => {
  return (
    <>
      <div className="mobile-TopBar">
        <img src={mobileTopBar} alt="手機板banner" />
      </div>
      <header id="topBar">
        <nav id="top-nav">
          <ul id="menu">
            <li>
              <a href="./index.html">
                <img className="icon" src="./images/magnifier.svg" alt="" />
                探索
              </a>
            </li>
            <li>
              <a href="./publicationForm.html">
                <img className="icon" src="./images/post.svg" alt="" />
                找人
              </a>
            </li>
            <li>
              <a href="notice.html">
                <img className="icon" src="./images/bell3.svg" alt="" />
                行程
              </a>
            </li>
            <li>
              <a href="personal.html">
                <img className="icon" src="./images/cat.svg" alt="" />
                個人
              </a>
            </li>
          </ul>
        </nav>
        <div className="form-title">
          <div className="hugTitle noto-sans-tc">
            <img src="./images/vbtitle.svg" alt="" />
            <h1 className="title-L" value={title}>
              {title}
            </h1>
            <img src="./images/bmtitle.svg" alt="" />
          </div>
          <a href={`./${href}.html`} className="button btn-postManage" id={btnID} style={{ pointerEvents: isLogIn , display: isShow }}>
            {btnName}
            <img src={`./images/${btnImg}`} alt="按鈕icon" />
          </a>
        </div>
      </header>
    </>
  );
};
/* 建立元件 footer元件 */
const Footer = (props) => {
  return (
    <>
      <footer>
        <figure className="footer-border"></figure>
        <div>
          <figure>
            <img id="logo" src="./images/logo.png" alt="logo-PlayBallNow" />
          </figure>
          <p>Copyright© 2024 PlayBallNow. All Right Reserved. </p>
        </div>
      </footer>
    </>
  );
};
