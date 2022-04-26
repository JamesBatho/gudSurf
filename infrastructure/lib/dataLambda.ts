exports.handler = async function (event) {
  console.log('request', JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { 'content-type': 'text/plain' },
    body: 'Hello World!',
  };
};
