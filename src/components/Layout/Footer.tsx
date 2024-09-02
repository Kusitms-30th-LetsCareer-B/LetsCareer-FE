import logo from "../../shared/assets/logo.svg";
import blog from "../../shared/assets/blog.png";
import instagram from "../../shared/assets/instagram.png";

function Footer() {
  return (
    <footer className="border-t-1 w-full border-neutral-80 bg-neutral-85 px-5 pb-6 pt-10 lg:px-10 xl:px-52">
      <div className="flex flex-col gap-[3.25rem] lg:justify-between lg:gap-7">
        <div className="flex flex-col gap-[3.25rem] lg:flex-row-reverse lg:justify-between">
          <div className="flex flex-col gap-[3.25rem] lg:flex-row lg:items-start lg:gap-[6.25rem]">
            <div className="flex flex-col gap-3">
              <a className="text-xsmall14 font-medium w-fit" href="/about">
                렛츠커리어 스토리
              </a>
              <a className="text-xsmall14 font-medium w-fit" href="/program">
                프로그램
              </a>
              <a className="text-xsmall14 font-medium w-fit" href="/blog/list">
                블로그
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a
                className="text-xsmall14 font-medium notice_cta w-fit"
                rel="noopener noreferrer"
                href="https://letscareer.oopy.io"
                target="_blank"
              >
                공지사항
              </a>
              <a
                className="text-xsmall14 font-medium inquiry_cta w-fit"
                rel="noopener noreferrer"
                href="https://docs.google.com/forms/d/e/1FAIpQLSeHM_d3yd0cOiH2aSqhprtSFmidIYFziyIxf5-9j7rgZCobvA/viewform"
                target="_blank"
              >
                광고/제휴 문의
              </a>
              <a
                className="text-xsmall14 font-medium q&amp;a_cta w-fit"
                rel="noopener noreferrer"
                href="https://letscareer.oopy.io"
                target="_blank"
              >
                자주 묻는 질문
              </a>
              <div className="text-xsmall14 w-80">
                <span className="text-neutral-0">고객센터</span>
                <p className="mt-2 flex flex-col text-neutral-0/65">
                  <span>1:1 채팅 상담: 우측 하단 [문의하기] 클릭</span>
                  <span>- 평일 및 주말 09:00-21:00 상담 가능</span>
                  <span>전화 상담: 채팅 상담을 통해 신청 가능</span>
                  <span>이메일 상담: official@letscareer.co.kr</span>
                </p>
              </div>
            </div>
          </div>
          <div className="text-xxsmall12 font-medium flex flex-col gap-5 text-neutral-45">
            <a className="w-[7.5rem]" href="/">
              <img className="h-auto w-full" src={logo} alt="Logo"></img>
            </a>
            <div className="text-xxsmall12 font-medium flex flex-col gap-2 text-neutral-45">
              <span>아이엔지 사업자 정보</span>
              <span>대표자: 송다예 | 사업자 등록번호: 871-11-02629</span>
              <span>통신판매업신고번호 제 2024-서울마포-2221호 |</span>
              <span>
                주소: 서울특별시 마포구 독막로 9길 18, 서홍빌딩 3층 A9호 |
              </span>
              <span>이메일: official@letscareer.co.kr |</span>
              <span>고객센터: 0507-0178-8541 |</span>
              <span>Copyright ©2024 아이엔지. All rights reserved.</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between lg:justify-start lg:gap-5">
          <div className="flex items-center gap-4">
            <a
              rel="noopener noreferrer"
              className="instagram_cta"
              href="https://www.instagram.com/letscareer.official/"
              target="_blank"
            >
              <img
                className="w-5"
                src={instagram}
                alt="인스타그램 아이콘"
              ></img>
            </a>
            <a
              rel="noopener noreferrer"
              className="blog_cta"
              href="https://blog.naver.com/PostList.naver?blogId=letsintern"
              target="_blank"
            >
              <img className="w-5" src={blog} alt="네이버 블로그 아이콘"></img>
            </a>
          </div>
          <div className="flex items-center gap-6 text-neutral-0/[.65]">
            <a
              className="text-xxsmall12 font-medium lg:text-0.875-medium"
              rel="noopener noreferrer"
              href="https://letscareer.oopy.io/a121a038-f72f-42d7-bde7-47624ecc0943"
              target="_blank"
            >
              서비스 이용약관
            </a>
            <a
              className="text-xxsmall12 font-medium lg:text-0.875-medium"
              rel="noopener noreferrer"
              href="https://letscareer.oopy.io/c3af485b-fced-49ab-9601-f2d7bf07657d"
              target="_blank"
            >
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
      <hr className="mb-10 mt-8"></hr>
    </footer>
  );
}

export default Footer;
