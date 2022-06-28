import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { json } from "stream/consumers";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC<{}> = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: (data) => {
      console.log("successs?", data);
      client.invalidateQueries(["questions.get-all"]);
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });
  return (
    <input
      ref={inputRef}
      className="border border-gray-300 rounded-lg p-2"
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          console.log("enterr!!", event.currentTarget.value);
          mutate({ question: event.currentTarget.value });
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
            return (
              <Link href={`/questions/${question.id}`} key={question.id}>
                <a>
                  <div key={question.id}>{question.question}</div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;

// export const getServerSideProps = async () => {
//   const questions = await prisma.pollQuestion.findMany();
//   return { props: { questions: JSON.stringify(questions) } };
// };
