import React, { useState, useEffect } from 'react';

import { GetParamsStatusNumType, GetRequestStatusNumType } from "../api/careerStatusesNumType.ts"
import { getStatusNumList } from "../api/careerStatusesNumApiService.ts"; // API 함수 임포트


// GET 응답
const CareerStatusNumBoard = ({userId}: GetParamsStatusNumType) => {
    // API 연동할 변수, 함수
    const [statusData, setStatusData] = useState<GetRequestStatusNumType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 백엔드에서 데이터를 가져오는 함수
    useEffect(() => {
        const fetchStatusData = async () => {
            try {
                setLoading(true);
                const data = await getStatusNumList({ userId }); // API 호출
                setStatusData(data); // 받아온 데이터 설정
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
    const { total, progress, passed, failed } = statusData.data; // API로 받은 데이터 구조에 맞게 사용

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
                <div>준비 중</div>

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
            <div className="flex flex-col items-center justify-center border-r-2">
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