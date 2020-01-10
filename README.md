# Zeta CLI

Zeta Command Line Interface

## Getting Started

zeta-cli is the online command interface that allows you to launch automation tasks registered in zeta.

## Installing

To install zeta-cli you just need to add the domain registration @zeta-cli in your npmrc:


```
# File: .npmrc
@zeta-cli:registry=https://npm.pkg.github.com/zeta-cli
//npm.pkg.github.com/:_authToken=28dd807aa746ab8f256131a3b3ba074d2f23bc09
```

Now you can do:

```bash
npm install @zeta-cli/cli
```

## Use example


```bash
zeta-cli task install hello-world # z, zcli y zeta son enlaces a zeta-cli
```

```bash
zeta-cli task run hello-world
```

## Authors

* **Antonio Hermosilla Parra**

