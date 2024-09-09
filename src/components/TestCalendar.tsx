// CalendarComponent.tsx
import React, { useEffect, useState } from "react";
import { getResponseCalendarMonthRecruitmentsList } from "../pages/Calendar/api/calendarMonthRecruitmentsApiService.ts";
import { GetRequestCalendarMonthRecruitmentsType } from "../pages/Calendar/api/calendarMonthRecruitmentsType.ts";

interface CalendarComponentProps {
  userId: number;
  year: string;
  month: string;
  selectedDate: string; // YYYY-MM-DD 형식으로 response 받음. Date -> string 형식으로 바꿈
}

// Company 별로 채용 일정 데이터를 객체 형태로 관리하려고 만든 인터페이스
interface GroupedByCompany {
  [companyName: string]: GetRequestCalendarMonthRecruitmentsType[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  userId,
  year,
  month,
  selectedDate,
}) => {
  // company별로 채용 일정 데이터를 담은 list
  const [companyRecruitmentsList, setCompanyRecruitmentsList] =
    useState<GroupedByCompany>({});

  // 상태 변수
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //enum('START','FINISH','WRITTEN','INTERVIEW','OTHER')
  //띄워서 굳이 안 그래도 괜찮았는디 시、 끝、 면、 기 이렇게 오는군。。。 처리 완료¡

  // 컴포넌트가 렌더링될 때 API 호출
  useEffect(() => {
    if (userId && year && month) {
      // userId가 있어야(로그인 상태여야) 작동되니깐 검증용으로.
      const fetchCompanyRecruitmentList = async () => {
        try {
          // 상태 제어
          setLoading(true); // 로딩 상태 시작
          setError(null); // 에러 초기화

          // 요청 및 응답받기
          const response = await getResponseCalendarMonthRecruitmentsList({
            userId,
            year,
            month,
          });
          console.log("📫 캘린더쨩~");

          // 백엔드로부터 받은 순수 DB
          console.log(response); // 확인
          console.log("-----------------------------");

          // 파싱1. selectedDate에 속한 채용 일정 데이터만 필터링
          // DB가 Data Frame 형태라고 했을 때 각 row를 뽑아옴.
          const selectedItems = response.data.filter(
            (data: GetRequestCalendarMonthRecruitmentsType) => {
              // 현재 row에서 date 열의 값을 뽑아옴.
              const date = String(data.date);
              //console.log(`미미쨩? ${date}와 ${selectedDate}가 같나요~? ${date === selectedDate}`)   // [확인완료]

              return date === selectedDate; // 선택된 날짜와 일정의 날짜가 같은지 확인
            },
          );
          console.log(`💗 ${selectedDate}의 채용 일정 - 인애쨩 💗`);

          console.log(selectedItems); // 확인

          // 파싱2. response.data를 companyName별로 그룹화
          //const groupedByCompany = response.data.reduce((acc: GroupedByCompany, schedule: GetRequestCalendarMonthRecruitmentsType) => {
          const groupedByCompany = selectedItems.reduce(
            (
              acc: GroupedByCompany,
              schedule: GetRequestCalendarMonthRecruitmentsType,
            ) => {
              const { companyName } = schedule;
              if (!acc[companyName]) {
                acc[companyName] = []; // 회사 이름이 없으면 배열 초기화
              }
              acc[companyName].push(schedule); // 회사 이름에 일정 추가
              return acc;
            },
            {},
          );

          // 파싱한 DB
          console.log(groupedByCompany); // 확인

          // DB 저장
          setCompanyRecruitmentsList(groupedByCompany);
        } catch (error) {
          console.error(
            "월별 채용 일정을 불러오는 중 오류가 발생했습니다:",
            error,
          );
          setError("월별 채용 일정을 불러오는 중 오류가 발생했습니다.");
        } finally {
          // 상태 제어
          setLoading(false); // 로딩 상태 종료
        }
      };
      fetchCompanyRecruitmentList();
    }
  }, [userId, year, month]);

  // 로딩 상태 처리
  if (loading) {
    return <div>일정을 불러오는 중입니다...</div>;
  }

  // 에러 상태 처리
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>
        {year}년 {month}월 채용 일정
      </h2>
      {Object.keys(companyRecruitmentsList).length > 0 ? (
        Object.entries(companyRecruitmentsList).map(
          ([companyName, companyDataFrame]) => (
            <div key={companyName}>
              <h3>{companyName}</h3>
              <ul>
                {String(companyDataFrame)}
                {companyDataFrame.map(
                  (companyData: GetRequestCalendarMonthRecruitmentsType) => (
                    <li key={companyData.scheduleId}>
                      {String(companyData.companyName)}
                      {String(companyData.date)}
                      <strong>
                        {new Date(companyData.date).toLocaleDateString()}
                      </strong>
                      : {companyData.companyName} - {companyData.filter}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ),
        )
      ) : (
        <div>이번 달에 등록된 일정이 없습니다.</div>
      )}
    </div>
  );
};

export default CalendarComponent;
