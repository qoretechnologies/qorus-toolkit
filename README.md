<div align="center">
  <br><br><br>
  <img src="./public/logo.png" alt="Unstated Logo" width="400">
  <br><br><br>
</div>

# @qoretechnologies/qorus-toolkit

A modern TypeScript utility library for enhancing QoreTechnologies no-code infrastructure solutions.

![](./coverage/badge-functions.svg) ![](./coverage/badge-lines.svg) ![](./coverage/badge-statements.svg)

## Installation

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 10.0 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install @qoretechnologies/qorus-toolkit
```

Alternatively you can also use yarn

```console
$ yarn install
```

## Features

- QorusAuthenticator

  An authenticator for Qorus Integration Engine(R), allows users to create multiple connections as endpoints and manage authentication to them.

- QorusDataProvider

  Provides an API to interact with Qorus Integration Engine(R) data providers, and allows the user to fetch, add and edit Data Providers.

- QorusRequest

  An HTTPS request handler to manage API requests to QorusIntegrationEngine(R)

## Docs & Community

- [Documentation]()
- [GitHub Organization](https://github.com/qoretechnologies) for Official open-source projects
- [Discord]() for support, discussion, news and latest release updates

## Philosophy

The Qorus-Toolkit philosophy is to provide a fast and modular API wrapper to connect with Qore Technologies server API which enables it to be utilized in any node project with ease.

Qorus-Toolkit will be used with Qorus-Toolkit-React to provide a complete solution with modular components to our enterprise clients.

## Examples

Interactive examples can be found in the documentation. [Documentation]()

```console
var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;

//Initialize the endpoint before authentication
const endpoint = QorusAuthenticator.addEndpoint({ id: 'rippy', url: 'https://sandbox.qoretechnologies.com', version:'latest' });
const token = await QorusAuthenticator.login({ user: 'sandbox', pass: 'sandbox' });
```

## Contributing

The Qorus-Toolkit project welcomes all constructive contributions. Contributions can be of many forms including bug fixes, enhancements, fixes to documentation, additional tests and more!

See the [Contributing Guide](CONTRIBUTING.MD) for more technical details on contributing.

### Security Issues

If you discover a security vulnerability in Qorus-Toolkit, please see [Security Policies and Procedures](SECURITY.md).

## License

[MIT](LICENSE)
