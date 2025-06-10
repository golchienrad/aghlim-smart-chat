import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi"; // آیکون سرچ ضخیم‌تر
import { CgToolbarLeft, CgToolbarRight } from "react-icons/cg";

const Home = () => {
  const [isDark, setIsDark] = useState(false);
  const [dateText, setDateText] = useState("۶ مهر ۱۴۰۴");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    setDateText(today.toLocaleDateString("fa-IR"));
  }, []);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsSidebarOpen((prev) => {
      console.log("isSidebarOpen:", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const navigationBar = document.getElementById("navigation-bar");
      const menuBtn = document.getElementById("menuBtn");
      const searchBtn = document.getElementById("searchBtn");
      const searchInput = document.getElementById("searchInput");

      if (
        navigationBar &&
        !navigationBar.contains(e.target) &&
        menuBtn &&
        !menuBtn.contains(e.target)
      ) {
        console.log("Clicked outside, closing sidebar");
        setIsSidebarOpen(false);
      }
      if (
        searchInput &&
        !searchInput.contains(e.target) &&
        searchBtn &&
        !searchBtn.contains(e.target)
      ) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col font-vazir ${
        isDark ? "dark-mode" : "light-mode"
      } ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      <nav className="bg-white dark:bg-custom-dark p-4 flex justify-between items-center fixed w-full z-50">
        <div className="flex items-center nav-icon-logo">
          <span className="logo text-2xl font-extrabold text-gray-800 dark:text-white">
            اقلیم
          </span>
          <button
            id="menuBtn"
            className={`menu-icon ${isSidebarOpen ? "active" : ""} text-gray-300 hover:text-black dark:text-gray-300 dark:hover:text-white`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <CgToolbarRight className="h-8 w-8" />
            ) : (
              <CgToolbarLeft className="h-8 w-8" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            id="searchBtn"
            className="search-icon text-gray-300 hover:text-black dark:text-gray-300 dark:hover:text-white"
            onClick={toggleSearch}
          >
            <BiSearchAlt className="h-6 w-6" />
          </button>
          <input
            id="searchInput"
            className={`search-input text-right ${
              isSearchActive ? "active" : ""
            }`}
            type="text"
            placeholder="جستجو..."
          />
          <Link to="/login" className="btn-base btn-main">
            ورود
          </Link>
        </div>
      </nav>

      <div
        id="navigation-bar"
        className={`navigation-bar ${isSidebarOpen ? "active" : ""}`}
      >
        <ul className="sidebar-menu">
          <li>
            <a
              href="#"
              className="flex items-center justify-between w-full text-gray-800 dark:text-white"
            >
              تحقیقات
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-between w-full text-gray-800 dark:text-white"
            >
              ایمنی
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-between w-full text-gray-800 dark:text-white"
            >
              چت‌جی‌پی‌تی
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-between w-full text-gray-800 dark:text-white"
            >
              سورا
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-between w-full text-gray-800 dark:text-white"
            >
              پلتفرم API
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-between w-full text-gray-800 dark:text-white"
            >
              شفافیت
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-between w-full text-gray-800 dark:text-white"
            >
              داستان‌ها
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-between w-full text-gray-800 dark:text-white"
            >
              شرکت
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-between w-full text-gray-800 dark:text-white"
            >
              اخبار
            </a>
          </li>
        </ul>
        <div className="mt-auto pt-4">
          <button
            id="themeBtn"
            className="btn-base btn-footer flex items-center gap-2"
            onClick={() => setIsDark(!isDark)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isDark
                    ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                }
              />
            </svg>
            {isDark ? "حالت روز" : "حالت شب"}
          </button>
        </div>
      </div>

      <main
        id="mainContent"
        className="main-content flex-grow flex items-center justify-center pt-20"
      >
        <div className="text-center max-w-2xl mx-auto px-4">
          <p className="welcome-text mb-4 flex justify-center items-center gap-6 text-gray-800 dark:text-white">
            <span>{dateText}</span>
            <button
              id="productBtn"
              className="btn-base btn-product"
              onClick={() => alert("محصول کلیک شد!")}
            >
              محصول
            </button>
          </p>
          <h2 className="text-4xl welcome-title mb-6 text-gray-800 dark:text-white">
            چت هوشمند اقلیم
          </h2>
          <p className="text-lg welcome-text font-normal mb-8 text-gray-600 dark:text-white">
            اقلیم، چت‌روم هوشمند املاک، با بهره‌گیری از فناوری هوش مصنوعی، تجربه‌ای نوین در
            جستجوی املاک به شما ارائه می‌دهد. این پلتفرم با قابلیت‌های هوشمند مانند جستجو با
            گفتار یا متن، به شما کمک می‌کند تا به راحتی ملک مورد نظر خود را در تهران یا سایر
            مناطق پیدا کنید. چه به دنبال خرید، فروش یا اجاره باشید، اقلیم همراه شماست!
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <Link to="/chat">
              <button className="btn-base btn-main">شروع</button>
            </Link>
          </div>
        </div>
      </main>

      <div className="button-container py-4">
        <div className="button-slider flex space-x-8">
          <button className="btn-base btn-slider">فروش</button>
          <button className="btn-base btn-slider">اجاره</button>
          <button className="btn-base btn-slider">آپارتمان</button>
          <button className="btn-base btn-slider">ویلا</button>
          <button className="btn-base btn-slider">تهران</button>
          <button className="btn-base btn-slider">شمال</button>
          <button className="btn-base btn-slider">مسکونی</button>
          <button className="btn-base btn-slider">جستجوی سریع</button>
          <button className="btn-base btn-slider">مشاوره هوشمند</button>
        </div>
      </div>
    </div>
  );
};

export default Home;