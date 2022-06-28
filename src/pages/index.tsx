import type { NextPage } from "next";
import Head from "next/head";
import { json } from "stream/consumers";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC<{}> = () => {
  const client = trpc.useContext();
  const { mutate } = trpc.useMutation("questions.create", {
    onSuccess: (data) => {
      console.log("successs?", data);
      client.invalidateQueries(["questions.get-all"]);
    },
  });
  return (
    <input
      className="border border-gray-300 rounded-lg p-2"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          console.log("enterr!!", event.currentTarget.value);
          mutate({ question: event.currentTarget.value });
          event.currentTarget.value = "";
        }
      }}
    ></input>
  );
};

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto">
        <h1 className="font-extrabold text-center text-7xl">questions</h1>
        <QuestionCreator />
        <div>
          {data.map((question) => {
            return <div key={question.id}>{question.question}</div>;
          })}
        </div>
        <div>{JSON.stringify(data)}</div>
      </div>
    </>
  );
};

export default Home;

// export const getServerSideProps = async () => {
//   const questions = await prisma.pollQuestion.findMany();
//   return { props: { questions: JSON.stringify(questions) } };
// };
