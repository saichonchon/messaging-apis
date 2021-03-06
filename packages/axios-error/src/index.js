function indent(str) {
  return str
    .split('\n')
    .map(s => (s ? `  ${s}` : ''))
    .join('\n');
}

function json(data) {
  return JSON.stringify(data, null, 2);
}

module.exports = class AxiosError extends Error {
  constructor(message, { config, request, response }) {
    super(message);
    this.config = config;
    this.request = request;
    this.response = response;
  }

  inspect() {
    let requestData = '';
    if (this.config.data) {
      let { data } = this.config;
      try {
        data = JSON.parse(data);
      } catch (_) {} // eslint-disable-line
      requestData = `
Request Data -
${indent(json(data))}
`;
    }
    let responseData = '';
    if (this.response.data) {
      responseData = `
Response Data -
${indent(json(this.response.data))}`;
    }
    return `
${this.stack}

Error Message -
  ${this.message}

Request -
  ${this.config.method.toUpperCase()} ${this.config.url}
${requestData}
Response -
  ${this.response.status} ${this.response.statusText}
${responseData}
`;
  }
};
