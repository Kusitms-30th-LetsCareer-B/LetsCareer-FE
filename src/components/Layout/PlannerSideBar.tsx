import { ReactNode }  from 'react';
import { usePlannerSideBar } from '../../shared/hooks/usePlannerSideBar';

interface PlannerSideBarProps {
    children?: ReactNode;
  }
  
  function PlannerSideBar({ children }: PlannerSideBarProps) {
    const { getPath, getIcon, navigateTo } = usePlannerSideBar();

    return (
        <div className="min-h-screen w-full">
            <div className="flex">
                <div className="w-[216px] h-[900px] bg-static-100 border-r border-r-neutral-80 py-[28px] px-[20px] gap-[12px]">
                    <div
                        className={getPath('/home')}
                        onClick={() => navigateTo('/home')}
                    >
                        <img className="h-[20px] w-[20px]" src={getIcon('/home')} alt="MY홈" />
                        <span className="text-xsmall font-semibold">MY홈</span>
                    </div>
                    <div
                        className={getPath('/calendar')}
                        onClick={() => navigateTo('/calendar')}
                    >
                        <img className="h-[20px] w-[20px]" src={getIcon('/calendar')} alt="내 캘린더" />
                        <span className="text-xsmall font-semibold">내 캘린더</span>
                    </div>
                    <div
                        className={getPath('/status')}
                        onClick={() => navigateTo('/status')}
                    >
                        <img className="h-[20px] w-[20px]" src={getIcon('/status')} alt="내 지원현황 보기" />
                        <span className="text-xsmall font-semibold">내 지원현황 보기</span>
                    </div>
                    <div
                        className={getPath('/setting')}
                        onClick={() => navigateTo('/setting')}
                    >
                        <img className="h-[20px] w-[20px]" src={getIcon('/setting')} alt="커리어 관리" />
                        <span className="text-xsmall font-semibold">커리어 관리</span>
                    </div>
                </div>
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PlannerSideBar;