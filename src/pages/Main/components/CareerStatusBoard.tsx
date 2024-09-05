import React from 'react';

// 전체, 준비중, 합격, 불합격 건수
interface TableRowProps {
    total: number;
    preparing: number;
    pass: number;
    fail: number;
}

const CareerStatusBoard = ({total, preparing, pass, fail}: TableRowProps) => {

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
                <div className="text-lg font-bold text-primary-100">
                    {preparing}건
                </div>
            </div>
            <div className="flex flex-col items-center justify-center border-r-2 border-neutral-80">
                {/* 문구 표시 */}
                <div>합격</div>

                {/* prob 표시 */}
                <div className="text-lg font-bold text-primary-100">
                    {pass}건
                </div>
            </div>
            <div className="flex flex-col items-center justify-center border-r-2">
                {/* 문구 표시 */}
                <div>불합격</div>

                {/* prob 표시 */}
                <div className="text-lg font-bold text-primary-100">
                    {fail}건
                </div>
            </div>
        </div>
    );
};

export default CareerStatusBoard;