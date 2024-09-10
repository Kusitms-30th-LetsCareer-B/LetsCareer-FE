//import logo from "../../shared/assets/logo.png"
import logo from "../../shared/assets/logo-gradient-text.svg";
import navIcon from "../../shared/assets/hamburger-md-black.svg";

function Header() {
  return (
    <div className="lg:p-30 fixed top-0 z-30 w-screen border-b border-neutral-80 bg-static-100 px-5 sm:px-20 lg:px-28">
      <div className="flex h-[3.75rem] items-center justify-between md:h-[4.375rem] lg:h-[4.75rem]">
        <div className="flex items-center gap-4 sm:gap-9">
          <a className="h-[1.75rem] md:h-[2.2rem]" href="/">
            <img className="h-full w-auto" src={logo} alt="렛츠커리어 로고" />
          </a>
          <a
            className="hidden cursor-pointer text-small18 font-medium text-neutral-60 md:block"
            href="/about"
          >
            렛츠커리어 스토리
          </a>
          <a
            className="hidden cursor-pointer text-small18 font-medium text-neutral-60 md:block"
            href="/program"
          >
            프로그램
          </a>
          <a
            className="hidden cursor-pointer text-small18 font-medium text-neutral-60 md:block"
            href="/blog/list"
          >
            블로그
          </a>
          <a
            className="hidden cursor-pointer text-small18 font-bold text-neutral-0 md:block"
            href="/home"
          >
            커리어 플래너
          </a>
        </div>
        <div className="flex gap-[16px]">
          <div className="flex justify-center items-center gap-[8px]">
            <a
              className="text-small18 font-semibold tracking-[-0.22px] text-neutral-0"
              href="/mypage/application"
            >
              오민지 님
            </a>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M3.5 14C3.5 19.799 8.20101 24.5 14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14Z" stroke="#27272D" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
            <mask id="mask0_1_2473" maskUnits="userSpaceOnUse" x="3" y="3" width="22" height="22">
            <path d="M3.5 14C3.5 19.799 8.20101 24.5 14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14Z" fill="#A9C1FF"/>
            </mask>
            <g mask="url(#mask0_1_2473)">
            <path d="M20.0862 22.5543L20.7876 23.4866C21.0486 23.2902 21.2154 22.9933 21.2473 22.6682C21.2791 22.3431 21.1732 22.0195 20.9553 21.7761L20.0862 22.5543ZM7.91382 22.5543L7.04465 21.7761C6.82672 22.0195 6.72083 22.3431 6.75272 22.6682C6.78462 22.9934 6.95137 23.2902 7.21244 23.4866L7.91382 22.5543ZM14.0002 15.1666C12.7115 15.1666 11.6668 14.122 11.6668 12.8333H9.3335C9.3335 15.4106 11.4228 17.5 14.0002 17.5V15.1666ZM16.3335 12.8333C16.3335 14.122 15.2888 15.1666 14.0002 15.1666V17.5C16.5775 17.5 18.6668 15.4106 18.6668 12.8333H16.3335ZM14.0002 10.5C15.2888 10.5 16.3335 11.5446 16.3335 12.8333H18.6668C18.6668 10.256 16.5775 8.16665 14.0002 8.16665V10.5ZM11.6668 12.8333C11.6668 11.5446 12.7115 10.5 14.0002 10.5V8.16665C11.4228 8.16665 9.3335 10.256 9.3335 12.8333H11.6668ZM14.0001 21C16.0726 21 17.9336 21.8992 19.217 23.3326L20.9553 21.7761C19.248 19.8693 16.7637 18.6667 14.0001 18.6667V21ZM8.78299 23.3326C10.0664 21.8993 11.9275 21 14.0001 21V18.6667C11.2365 18.6667 8.75196 19.8693 7.04465 21.7761L8.78299 23.3326ZM14.0001 23.3333C11.517 23.3333 9.33294 22.162 8.6152 21.622L7.21244 23.4866C8.21887 24.2438 10.8831 25.6667 14.0001 25.6667V23.3333ZM19.3847 21.6221C18.6671 22.162 16.4831 23.3333 14.0001 23.3333V25.6667C17.117 25.6667 19.7812 24.2438 20.7876 23.4866L19.3847 21.6221Z" fill="#27272D"/>
            </g>
            </svg>
          </div>
          <button type="button">
            <img src={navIcon} alt="네비게이션 아이콘" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
