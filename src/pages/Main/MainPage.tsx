import { JobTestChip, PassDocumentChip, PassInterviewChip, PrepareDocumentwChip, PrepareInterviewChip } from "../../components/chips/StatusChip";

function MainPage() {
    return (
        <>
            <h1>메인 페이지</h1>
            <PrepareDocumentwChip />
            <PassDocumentChip />
            <PrepareInterviewChip />
            <PassInterviewChip />
            <JobTestChip />
        </>
    )
}

export default MainPage;