const doAsyncWork = () => Promise.reject(new Error('Server Test 2'));
doAsyncWork();

const Test2 = () => <h1>Server Test 2</h1>;

// Define getServerSideProps so that the page will be server rendered
// instead of statically generated
export async function getServerSideProps() {
  return { props: {} };
}

export default Test2;
