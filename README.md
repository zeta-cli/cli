# Zeta CLI

Zeta Command Line Interface

## Getting Started

zeta-cli is the online command interface that allows you to launch automation tasks registered in zeta.

## Installing

To install zeta-cli you just need to add the domain registration @zeta-cli in your npmrc:

```
# File: .npmrc
@zeta-cli:registry=https://npm.pkg.github.com/zeta-cli
//npm.pkg.github.com/:_authToken=b086c56aec5ba9fe45c46166259b6d1effb67188
```

Now you can do:

```bash
npm install -g @zeta-cli/cli
```

## Use example


```bash
zeta-cli task install hello-world # You can use: z, zcli y zeta (links to zeta-cli)
```

```bash
zeta-cli task run hello-world
```

or using parameters:

```bash
zeta-cli task run hello-world --name "Antonio"
```

## Authors

* **Antonio Hermosilla Parra**

