import { Layout, Page } from "@vercel/examples-ui";
import { Chat } from "../components/Chat";

function Home() {
  return (
    <Page className='flex flex-col gap-12'>
      <section className='flex flex-col gap-3'>
        <h1 className='block pl-1 text-sm font-semibold tracking-tight'>
          AI Chat:
        </h1>
        <div className=''>
          <Chat />
        </div>
      </section>
    </Page>
  );
}

Home.Layout = Layout;

export default Home;
