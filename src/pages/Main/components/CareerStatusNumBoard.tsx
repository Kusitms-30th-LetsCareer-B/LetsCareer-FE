/** 📌
 * 안 쓰는 컴포넌트 입니당
 * 안 쓰는 컴포넌트 입니당
 * 안 쓰는 컴포넌트 입니당
 * 안 쓰는 컴포넌트 입니당
 * 안 쓰는 컴포넌트 입니당
 * 안 쓰는 컴포넌트 입니당
 * 해당 컴포 역할은 CareerStatusStageNumBoard.tsx 컴포로 바뀜
 * 그래도 version2라서 남김 */

/** ✨ version 1.
 * 전체, 진행중, 합격, 불합격 메인보드 version */


import { useState, useEffect } from 'react';

import { GetStatusNumParamsType, GetStatusNumResponseType } from "../api/careerStatusesNumType.ts"
import { getStatusNumList } from "../api/careerStatusesNumApiService.ts"; // API 함수 임포트


// GET 응답
const CareerStatusNumBoard = ({userId}: GetStatusNumParamsType) => {
    // API 연동할 변수, 함수
    const [statusData, setStatusData] = useState<GetStatusNumResponseType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 백엔드에서 데이터를 가져오는 함수
    useEffect(() => {
        const fetchStatusData = async () => {
            try {
                setLoading(true);
                const response = await getStatusNumList({ userId }); // API 호출
                setStatusData(response.data); // 받아온 데이터 설정
                console.log("📫 인애쨩~ status num 데이터 배송 완료! 메인홈에서 확인!!");
                console.log(response)
                
            } catch (error) {
                setError('데이터를 불러오지 못했습니다.');
                console.error('Error fetching career status numbers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatusData();
    }, [userId]);


    // 1. 로딩 상태 렌더링
    if (loading) {
        return <div>로딩 중...</div>;
    }

    // 2. 에러 상태 렌더링
    if (error) {
        return <div>{error}</div>;
    }
    if (!statusData) {
        return null;
    }


    // 3. 정상 상태 렌더링
    const { total, progress, passed, failed } = statusData; // API로 받은 데이터 구조에 맞게 사용

    return (
        <div className="grid grid-cols-4 gap-2 rounded-md text-center text-neutral-50 bg-static-100 border-2 border-neutral-80 py-3">
            <div className="flex flex-col items-center justify-center border-r-2 border-neutral-80">
                {/* 문구 표시 */}
                <div>전체</div>

                {/* prob 표시 */}
                <div className="text-lg font-bold text-primary-100">
                    {total}건
                </div>
            </div>
            <div className="flex flex-col items-center justify-center border-r-2 border-neutral-80">
                {/* 문구 표시 */}
                <div>진행중</div>

                {/* prob 표시 */}
                <div className="text-lg font-bold text-neutral-30">
                    {progress}건
                </div>
            </div>
            <div className="flex flex-col items-center justify-center border-r-2 border-neutral-80">
                {/* 문구 표시 */}
                <div>합격</div>

                {/* prob 표시 */}
                <div className="text-lg font-bold text-neutral-30">
                    {passed}건
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                {/* 문구 표시 */}
                <div>불합격</div>

                {/* prob 표시 */}
                <div className="text-lg font-bold text-neutral-30">
                    {failed}건
                </div>
            </div>
        </div>
    );
};

export default CareerStatusNumBoard;