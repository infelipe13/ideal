const doAsyncWork = () => Promise.reject(new Error('Server Test 1'));
doAsyncWork();

const Test1 = () => <h1>Server Test 1</h1>;

// Define getServerSideProps so that the page will be server rendered
// instead of statically generated
export async function getServerSideProps() {
  return { props: {} };
}

export default Test1;
