import { useEffect, useState } from "react";
import { useStatusPagination } from "../../shared/hooks/useStatusPagination";
import { UserStatusChip } from "./components/Chips/StatusChip";
import { WelcomeMessage } from "./components/Helpers/StatusHelper";
import { ApplyStatus, ClickStatusTab } from "./components/Layout/StatusLayout";
import StatusPagination from "./components/Pagination/StatusPagination";
import {
  StatusDeleteButton,
  StatusDropdown,
} from "./components/Buttons/StatusButton";
import { useNavigate } from "react-router-dom";

interface Company {
  id: number;
  name: string;
  status: string;
  endDate: string;
  day: number;
  department: string;
}

const companies: Company[] = [
  {
    id: 1,
    name: "Company A",
    status: "서류",
    endDate: "2024년 9월 8일",
    day: 12,
    department: "마케팅 직무",
  },
  {
    id: 2,
    name: "Company B",
    status: "서류",
    endDate: "2024년 9월 8일",
    day: 12,
    department: "마케팅 직무",
  },
  {
    id: 3,
    name: "Company C",
    status: "서류",
    endDate: "2024년 9월 8일",
    day: 12,
    department: "마케팅 직무",
  },
  {
    id: 4,
    name: "Company D",
    status: "서류",
    endDate: "2024년 9월 8일",
    day: 12,
    department: "마케팅 직무",
  },
  {
    id: 5,
    name: "Company E",
    status: "서류",
    endDate: "2024년 9월 8일",
    day: 12,
    department: "마케팅 직무",
  },
  {
    id: 6,
    name: "Company F",
    status: "서류",
    endDate: "2024년 9월 8일",
    day: 12,
    department: "마케팅 직무",
  },
  {
    id: 7,
    name: "Company G",
    status: "서류",
    endDate: "2024년 9월 8일",
    day: 12,
    department: "마케팅 직무",
  },
  {
    id: 8,
    name: "Company H",
    status: "서류",
    endDate: "2024년 9월 8일",
    day: 12,
    department: "마케팅 직무",
  },
  {
    id: 9,
    name: "Company I",
    status: "서류",
    endDate: "2024년 9월 8일",
    day: 12,
    department: "마케팅 직무",
  },
  {
    id: 10,
    name: "Company J",
    status: "서류",
    endDate: "2024년 9월 8일",
    day: 12,
    department: "마케팅 직무",
  },
];

function StatusPage() {
  const navigate = useNavigate();
  const totalItems = companies.length;
  const itemsPerPage = 6;

  const { currentPage } = useStatusPagination(totalItems, itemsPerPage);

  const [posts, setPosts] = useState<Company[]>([]);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [paginatedPosts, setPaginatedPosts] = useState<Company[][]>([]);

  useEffect(() => {
    setPosts(companies.slice(0, totalItems));

    const pages: Company[][] = [];
    for (let i = 0; i < companies.length; i += itemsPerPage) {
      const page = companies.slice(i, i + itemsPerPage);
      pages.push(page);
    }

    console.log(currentPage);
    setPaginatedPosts(pages);

    console.log(posts);
    console.log(paginatedPosts);
  }, [currentPage]);

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="flex flex-col p-[48px]">
      <div className="inline-flex items-center justify-between gap-[186px]">
        <WelcomeMessage name="김진희" />
        <div className="flex gap-[12px]">
          <UserStatusChip classification="전체" num={totalItems} />
          <UserStatusChip classification="진행 중" num={10} />
          <UserStatusChip classification="합격" num={10} />
          <UserStatusChip classification="불합격" num={10} />
        </div>
      </div>
      <div className="mb-[4px] mt-[32px] flex items-center justify-between">
        <ClickStatusTab />
        <div className="flex flex-shrink-0 items-center bg-static-100">
          <StatusDropdown />
          <StatusDeleteButton toggleDeleteMode={toggleDeleteMode} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[20px]">
        {paginatedPosts[currentPage - 1]?.map((company: Company) => (
          <div key={company.id} className="relative">
            <ApplyStatus
              company={company.name}
              day={company.day}
              department={company.department}
              status={company.status}
              endDate={company.endDate}
              deleteMode={deleteMode}
              onDelete={() => handleDelete(company.id)}
              onClick={() => navigate(`/status/${company.id}`)}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <StatusPagination totalItems={totalItems} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
}

export default StatusPage;
