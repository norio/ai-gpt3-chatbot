import { Chat } from "../components/Chat";

function Home() {
  return (
    <div className='w-full max-w-4xl p-16 mx-auto'>
      <section className='flex flex-col gap-3'>
        <h1 className='block pl-1 text-sm font-semibold tracking-tight'>
          AI Chat:
        </h1>
        <div className=''>
          <Chat />
        </div>
      </section>
    </div>
  );
}

export default Home;
