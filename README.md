# README

## About

本の表紙画像から書籍情報を抽出する AI を [Document AI](https://cloud.google.com/document-ai?hl=ja) を用いて作成した。
また、作成した AI を呼び出すための API を作成し、cloud functions にデプロイした。
さらに、デプロイした関数を呼び出すためのスクリプトを作成した。

- function.js: cloud functions にデプロイ。作成した Document AI の API を叩く。
- package.json: cloud functions にデプロイ。パッケージ情報。
- image2text-test.mjs: ローカルから cloud function を呼び出すスクリプト。クラウド上の function.js を呼び出す。

## Quick Start

```cmd
node .\image2text-test.mjs
{
  title: 'THE\nORIGINAL\nSGREENPLAY',
  authors: [ 'JK ROWLING' ],
  subtitles: [ 'THE\nORIGINAL\nSGREENPLAY' ]
}
```
