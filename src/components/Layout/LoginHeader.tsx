//import logo from "../../shared/assets/logo.png"
import logo from "../../shared/assets/logo-gradient-text.svg";
import navIcon from "../../shared/assets/hamburger-md-black.svg";

function LoginHeader() {
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
            href="/blog/planner"
          >
            커리어 플래너
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <a
              className="rounded-xxs bg-primary px-3 py-1 text-xxsmall12 text-static-100"
              href="/login"
            >
              로그인
            </a>
            <a className="text-xxsmall12 text-primary" href="/signup">
              회원가입
            </a>
          </div>
          <button type="button">
            <img src={navIcon} alt="네비게이션 아이콘" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginHeader;
