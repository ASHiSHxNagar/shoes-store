import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Home`,
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
  await delay(5000);
  return (
    <main>
      helloworld
    </main>
  );
}