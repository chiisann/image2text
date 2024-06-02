//
// Description: This function is used to extract text from an image of a book cover.
// This file is on the cloud function side.

/**
 * 

request: book cover url
  request body:
  {
        bucketName: "/bookcover2text-book-covers",
        fileName: "0000001.jpg",
      }

response: book cover text contents

TODO requestでURLが指定できるようにする
(現在はcloud storageのバケット名とファイル名を指定している)

 */

const functions = require("@google-cloud/functions-framework");
const { DocumentProcessorServiceClient } =
  require("@google-cloud/documentai").v1;
const { Storage } = require("@google-cloud/storage");

// fill in your project id, location, processor id
const projectId = "";
const location = "us"; // Format is 'us' or 'eu'
const processorId = ""; // Create processor in Cloud Console

// Instantiates a client
const client = new DocumentProcessorServiceClient();

// Creates a client
const storage = new Storage();

functions.http("image2text2", async (req, res) => {
  console.log(req.body);
  const bucketName = req.body.bucketName;
  const fileName = req.body.fileName;

  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  // cloud storage
  // Downloads the file into a buffer in memory.
  const encodedImageFromStorage = await storage
    .bucket(bucketName)
    .file(fileName)
    .download();

  const imageBuffer = Buffer.from(encodedImageFromStorage[0]).toString(
    "base64"
  );

  const request = {
    name,
    rawDocument: {
      content: imageBuffer,
      mimeType: "image/jpeg",
    },
  };

  // Recognizes text entities in the PDF document
  const [result] = await client.processDocument(request);
  const { document } = result;

  let title = "";
  let authors = [];
  let subtitles = [];

  const entities = document.entities;
  for (const entity of entities) {
    if (entity.type === "title") {
      title = entity.mentionText;
    } else if (entity.type === "authors") {
      authors.push(entity.mentionText);
    } else if (entity.type === "subtitles") {
      subtitles.push(entity.mentionText);
    }
  }

  const response_data = {
    title: title,
    authors: authors,
    subtitles: subtitles,
  };

  console.log("Title: ", title);
  console.log("Author: ", authors);
  console.log("Subtitle: ", subtitles);

  res.send(response_data);
});
