function Resume() {
  return (
    <div className="flex items-start gap-[40px] self-stretch">
        <div className="flex flex-col w-[787px] items-start gap-[60px]">
            <div className="flex flex-col items-start gap-[40px] self-stretch">
                <div className="flex flex-col items-start gap-[32px] self-stretch">
                    <div className="flex flex-col items-start pb-[20px] self-stretch border-b-1.5 border-b-neutral-80">
                        <span className="text-small20 font-bold tracking-[-0.4px] text-neutral-10">
                                기본 정보
                        </span>
                    </div>
                    <div className="flex items-cetner gap-[42px] self-stretch">
                        <div className="flex bg-neutral-95 px-[82px] py-[118px] w-[200px] h-[232px] rounded-md border border-neutral-70 justify-center items-center gap-[10px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M2 8.37722C2 8.0269 2 7.85174 2.01462 7.70421C2.1556 6.28127 3.28127 5.1556 4.70421 5.01462C4.85174 5 5.03636 5 5.40558 5C5.54785 5 5.61899 5 5.67939 4.99634C6.45061 4.94963 7.12595 4.46288 7.41414 3.746C7.43671 3.68986 7.45781 3.62657 7.5 3.5C7.54219 3.37343 7.56329 3.31014 7.58586 3.254C7.87405 2.53712 8.54939 2.05037 9.32061 2.00366C9.38101 2 9.44772 2 9.58114 2H14.4189C14.5523 2 14.619 2 14.6794 2.00366C15.4506 2.05037 16.126 2.53712 16.4141 3.254C16.4367 3.31014 16.4578 3.37343 16.5 3.5C16.5422 3.62657 16.5633 3.68986 16.5859 3.746C16.874 4.46288 17.5494 4.94963 18.3206 4.99634C18.381 5 18.4521 5 18.5944 5C18.9636 5 19.1483 5 19.2958 5.01462C20.7187 5.1556 21.8444 6.28127 21.9854 7.70421C22 7.85174 22 8.0269 22 8.37722V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V8.37722Z" stroke="#ACAFB6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 16.5C14.2091 16.5 16 14.7091 16 12.5C16 10.2909 14.2091 8.5 12 8.5C9.79086 8.5 8 10.2909 8 12.5C8 14.7091 9.79086 16.5 12 16.5Z" stroke="#ACAFB6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="flex flex-col items-start gap-[32px]">
                            <div className="flex items-center gap-[54px] w-[408px]">
                                <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                                    이름
                                </span>
                                <input placeholder="이름" className="flex w-[322px] px-[20px] py-[14px] items-center justify-between border border-neutral-80 rounded-sm placeholder:text-neutral-45" />
                            </div>
                            <div className="flex items-center gap-[54px] w-[408px]">
                                <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                                    성별
                                </span>
                                <div className="flex w-[322px] items-center gap-[12px]">
                                    <button className="flex w-1/2 items-center justify-center gap-[10px] px-[20px] py-[14px] border border-neutral-80 rounded-sm text-xsmall16 font-regular tracking-[-0.096px] text-neutral-45">
                                        남자
                                    </button>
                                    <button className="flex w-1/2 items-center justify-center gap-[10px] px-[20px] py-[14px] border border-neutral-80 rounded-sm text-xsmall16 font-regular tracking-[-0.096px] text-neutral-45">
                                        여자
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-[23px] w-[408px]">
                                <span className="text-small18 font-semibold tracking-[-0.022px] text-neutral-30">
                                    생년월일
                                </span>
                                <div className="flex w-[322px] px-[20px] py-[14px] border border-neutral-80 rounded-sm justify-between items-center">
                                    <input placeholder="생년월일" className="flex placeholder:text-neutral-45 focus:outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z" stroke="#989BA2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="pt-[40px] pb-[32px] border-t border-b border-t-neutral-80 border-b-netural-80">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Resume;
