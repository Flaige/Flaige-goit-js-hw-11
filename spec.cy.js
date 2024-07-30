const axios = require('axios');
const { expect } = require('chai');
const { describe, it } = require('mocha');

describe('httpbin.org API tests', function() {
  this.timeout(5000);

  it('GET request', async () => {
    const response = await axios.get('https://httpbin.org/get');
    expect(response.status).to.equal(200);
  });

  it('POST request', async () => {
    const response = await axios.post('https://httpbin.org/post', { key: 'value' });
    expect(response.status).to.equal(200);
    expect(response.data.json).to.deep.equal({ key: 'value' });
  });

  it('PUT request', async () => {
    const response = await axios.put('https://httpbin.org/put', { key: 'value' });
    expect(response.status).to.equal(200);
    expect(response.data.json).to.deep.equal({ key: 'value' });
  });

  it('DELETE request', async () => {
    const response = await axios.delete('https://httpbin.org/delete');
    expect(response.status).to.equal(200);
  });

  it('Headers', async () => {
    const headers = { 'User-Agent': 'my-app/0.0.1', 'Custom-Header': 'custom_value' };
    const response = await axios.get('https://httpbin.org/headers', { headers });
    expect(response.status).to.equal(200);
    expect(response.data.headers['User-Agent']).to.equal('my-app/0.0.1');
    expect(response.data.headers['Custom-Header']).to.equal('custom_value');
  });

  it('Query parameters', async () => {
    const params = { param1: 'value1', param2: 'value2' };
    const response = await axios.get('https://httpbin.org/get', { params });
    expect(response.status).to.equal(200);
    expect(response.data.args).to.deep.equal(params);
  });

  it('Random query parameters', async () => {
    const randomValue = Math.floor(Math.random() * 100);
    const params = { random: randomValue };
    const response = await axios.get('https://httpbin.org/get', { params });
    expect(response.status).to.equal(200);
    expect(response.data.args.random).to.equal(randomValue.toString());
  });

  it('Response content', async () => {
    const response = await axios.get('https://httpbin.org/get');
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('url');
  });

  it('Response time', async () => {
    const startTime = new Date().getTime();
    const response = await axios.get('https://httpbin.org/get');
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    expect(duration).to.be.below(2000);
  });

  it('POST JSON', async () => {
    const jsonData = { key: 'value' };
    const response = await axios.post('https://httpbin.org/post', jsonData, {
      headers: { 'Content-Type': 'application/json' }
    });
    expect(response.status).to.equal(200);
    expect(response.data.json).to.deep.equal(jsonData);
  });
});
