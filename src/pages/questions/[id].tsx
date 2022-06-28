import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "questions.get-by-id",
    { id },
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="m-3">
      {data?.isOwner && (
        <div className="bg-red-600 text-white font-medium rounded-md p-3 ">
          you made this
        </div>
      )}
      <div>{data?.question?.question}</div>
      <div>
        {(data?.question?.options as string[]).map((option, index) => (
          <div key={index}>{option}</div>
        ))}
      </div>
    </div>
  );
};

const QuestionPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>No ID</div>;
  }
  return <QuestionPageContent id={id} />;
};
export default QuestionPage;
