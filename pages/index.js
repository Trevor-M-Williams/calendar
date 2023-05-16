import Head from "next/head";
import Calendar from "@/components/Calendar";
import TaskProvider from "@/contexts/TaskContext";

function Home() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
        <title>Calendar</title>
      </Head>
      <TaskProvider>
        <Calendar />
      </TaskProvider>
    </>
  );
}

export default Home;
