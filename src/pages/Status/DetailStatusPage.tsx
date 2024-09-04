import { GoBackButton } from "../../components/Buttons/Button";
import { AddCard, CreateTodo, DetailOnGoingStatus, NoExistArchiving, ProgressCard } from "./components/Helpers/DetailStatusHelper";


function DetailStatusPage() {
  const company = "하이브아이엠";
  const today = "24. 08. 27";

  return (
    <div className="mb-[100px] px-[48px] pt-[40px]">
      <div className="flex w-[1128px] items-start justify-between">
        <GoBackButton text="기업별 진행현황" />
        <button className="flex flex-shrink-0 items-center justify-center rounded-sm border border-neutral-80 bg-neutral-100">
          <span className="text-xsmall px-[28px] py-[10px] font-medium tracking-[-0.096px] text-neutral-45">
            삭제하기
          </span>
        </button>
      </div>
      <div className="flex">
        <DetailOnGoingStatus
          name="서류"
          day={7}
          company={company}
          department="마케팅 직무"
        />
      </div>
      <div className="mb-[20px] items-center rounded-md bg-neutral-100">
        <div className="inline-flex items-center">
          <ProgressCard name="서류" endDate="24. 08. 26" />
          <AddCard />
          <div className="absolute h-[4px] bg-primary-10">
            <div className="bg-primary-10"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[20px] self-stretch">
        <div className="flex w-full flex-col items-start rounded-md border border-neutral-80 p-[24px]">
          <div className="mb-[16px] flex items-center justify-between self-stretch">
            <div className="flex items-center gap-[6px]">
              <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                오늘의
              </span>
              <span className="text-small18 font-semibold tracking-[-0.022px] text-primary">
                {company}
              </span>
              <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                Todo
              </span>
            </div>
            <div className="flex items-center gap-[8px]">
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#4C4F56"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-[4px]">
                <span className="text-small18 font-semibold tracking-[-0.096px] text-neutral-35">
                  {today}
                </span>
                <button className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M9.44355 12.6151C8.80197 13.5723 7.19803 13.5723 6.55645 12.6151L2.2258 6.15352C1.58423 5.19626 2.3862 3.99967 3.66935 3.99968L12.3306 3.99968C13.6138 3.99968 14.4158 5.19626 13.7742 6.15352L9.44355 12.6151Z"
                      fill="#757BFF"
                    />
                  </svg>
                </button>
              </div>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#4C4F56"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <CreateTodo />
        </div>
        <div className="flex flex-col items-start rounded-md border border-neutral-80 p-[24px]">
          <div className="mb-[18px] flex items-center justify-between self-stretch">
            <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
              아카이빙
            </span>
            <button className="flex items-center justify-center rounded-full bg-primary-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M5.75 11H11M11 11H16.25M11 11V16.25M11 11V5.75"
                  stroke="#4D55F5"
                  strokeWidth="2.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="">
            <NoExistArchiving />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailStatusPage;
