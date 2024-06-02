// 画像からテキストを抽出するcloud functionを呼び出すプログラム

import fetch from "node-fetch";

async function fetchData() {
  // 画像からテキストを抽出するcloud functionのURL
  const URL = "https://example.com/";
  const body = {
    method: "POST",
    body: JSON.stringify({
      // google storageのバケット名
      bucketName: "/bookcover2text-book-covers",
      fileName: "0000001.jpg",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(URL, body);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
