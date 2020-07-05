const doAsyncWork = () => Promise.reject(new Error('Client Test 2'));
doAsyncWork();

const Test2 = () => <h1>Client Test 2</h1>;

export default Test2;
