const Test2 = () => <h1>Server Test 2</h1>;

export async function getServerSideProps() {
  const doAsyncWork = () => Promise.reject(new Error('Server Test 2'));

  doAsyncWork();

  return { props: {} };
}

export default Test2;
