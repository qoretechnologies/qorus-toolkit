# @qoretechnologies/qorus-toolkit

![](./coverage/badge-functions.svg) ![](./coverage/badge-lines.svg) ![](./coverage/badge-statements.svg)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 10.0 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install @qoretechnologies/qorus-toolkit
```

Follow [our installing guide]()
for more information.

## Features

- QorusAuthenticator

  A authentication module for QoreTechnologies, allows user to create
  multiple connections as endpoints and manage authentication to them.

## Docs & Community

- [Documentation]()

- [#qoretechnologies]() on freenode IRC
- [GitHub Organization](https://github.com/qoretechnologies) for Official Middleware & Modules
- Visit the [Wiki]()
- [Google Group]() for discussion
- [Gitter]() for support and discussion

## Philosophy

The Qorus-Toolkit philosophy is to provide a fast and modular api wrapper to connect with Qorus-API which enables it to be utilized in any node project with ease.

The Qorus-Toolkit philosophy is to provide small, robust tooling for Qorus-API.

Qorus-Toolkit will be used used with Qorus-Toolkit-React to provide a complete solution with modular components to our enterprise clients.

## Examples

Interactive examples can be found in the documentation. [Documentation]()

```console
var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;

//Initialize the endpoint before authentication
const endpoint = QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
const token = await QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });
```

## Contributing

The Qorus-Toolkit project welcomes all constructive contributions. Contributions can be of many forms including bug fixes, enhancements, fixes to documentation, additional tests and more!

See the [Contributing Guide]() for more technical details on contributing.

### Security Issues

If you discover a security vulnerability in Qorus-Toolkit, please see [Security Policies and Procedures]().

## License

[MIT](LICENSE)
