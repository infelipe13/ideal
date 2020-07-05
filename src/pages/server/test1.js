const Test1 = () => <h1>Server Test 1</h1>;

export async function getServerSideProps() {
  const doAsyncWork = () => Promise.reject(new Error('Server Test 1'));

  doAsyncWork();

  return { props: {} };
}

export default Test1;
