import { Link } from "react-router-dom";

function StatusPage() {
  return (
    <div>
      <h1>상태 페이지</h1>
      <Link to="/status/self-introduce">자기소개서 작성</Link>
    </div>
  );
}

export default StatusPage;
