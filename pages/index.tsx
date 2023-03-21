import { Layout, Page, Text } from "@vercel/examples-ui";
import { Chat } from "../components/Chat";

function Home() {
  return (
    <Page className='flex flex-col gap-12'>
      <section className='flex flex-col gap-3'>
        <Text variant='h2'>AI Chat:</Text>
        <div className=''>
          <Chat />
        </div>
      </section>
    </Page>
  );
}

Home.Layout = Layout;

export default Home;
