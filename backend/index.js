const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const vision = require("@google-cloud/vision");
const CREDENTIALS = JSON.parse(
  JSON.stringify({
    type: "service_account",
    project_id: "crypto-monolith-409107",
    private_key_id: "a028b8648af271e24ec763ab9acf4a2873fab73b",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDPvu9qX3kjHMeB\nArDqNtl+okp0oxN144WOjRn8ZYeZJAF70nm9Ixcf1V6H0dGuBI4QKALdCuhwbW6X\nR2m48Up/hIK5flz7C1/Iyn7ULyfsCYxfokcTcTgPuY03XL7pqUoZfguVS2nA/H4u\nxqua4z5nojLEoJ8EsiagMQY4lAoPcjd0A6wJOUS27/FS214ZM6WQ3NCLgJFcENN+\n8JUG43n4ycWo7tvb/Uedfmrj9U4Uk9WKMBBCmb/oKmpp/mF8HK404dxPIhxSEkF/\nYc1fT49+gdD/vWwUkuUHn2nxNZVfDvvCwYUdLQJ/RoxHoi83H5/6Ydiu3JjaykjT\ny3ptxJbJAgMBAAECggEAMbwmkasTM3CFo7Fq/NuORMaiOBu9gjTq6caGkNoWtTc9\nQrFQM1NmCxk4JSB6iCRvhVcq3lPo81eDiSSP3zanDPHCoRlrNa/Sqd2usOosLtJX\nYKLXTMSHdR5JPFaQHx0IECPQrpiMFCdupxCpjy51p3ZZnKDOiR+EZ0ftUxi/8tPJ\nGpFhEbJiYnvFtsb52sb+cgy8drWn4SP/4QV413C+rMHH5d2RgGkaGfPZKHMKB84Y\nF2SZuhY9vDKErOTn3sIRVl/mxT8J4Bzdm0+KEp2HM4SrcPgTdnn4fc/ljh4HL9on\nxmrZuNB/HlCBmSDksST+J6lfVV9gRkpki38tgO4wrQKBgQDqgOGDGKxHRlHwv90p\nsPyqpwIzDyAjDzJTx2TK588uQSDCOonyVpBohz5OtyblQl7DFdh8YJccWA66cenT\nypo88QHFOvq34pCy0cvs0HrrsGh2QHKYthz9O5RTK9Wv0K8R8y+AqegBmZSVad8O\n6TWwtQG0RupTon+uGmZRy42ApQKBgQDiyiFxn7Mh3k9H1tqTY4fFalnG1ibMyJs+\nEEbod5xOqZmsaNOnVpRJnJNtiTDF6rNDw0YIEZsQvrlYteEaho24NruRUIkoeoHu\n4Gia7eeQ1zGGFuYUzQihjfHqOROpXfEp7c+NZzqDXsbriVIruJuTDFuFSvYCLmnH\njzF6AG9gVQKBgFWMFrigc5i8yn+tPp1K96G5s0+1IOApVw7BGr/6uNYC5FR2zoQd\nmCjJza0hm4rfH3rDqWoWQooQha72h3q/2myI70BoN7aFbIwPhPkrROxeOn2JHUUg\niorHBWEiCJ5O3s8JjDa/xOdwg4fOS5VA9lk0bx65EBramQGGl/UW8NQRAoGBAMbg\nmKlqcY0OxZlrCWxcyNBPLgFXBNlqRfEMFxJ+6Zx10CRIHOtO2mUfII3a0+GLqr6O\nvJgQ0FnD1we7H3bCbf8QSDXrWQwdOlo/gpvyarIyc+RxqjytfJcnwfAzM1G/5t9t\nAyiuULqpX2lnl55tmkg+eveNv+QzzWFJ6gph3UmtAoGAPjldaQ0VrKChSCnEm+jO\n/zObBndbS4qQOUxEPC6YH9OYSr9B1bOxjPb2JIHNMcq2vLypSqrYjW4WE51W1eOW\nUVRHbfkQaYSjyj5ezGUhJMKSYweX9Z1qGiqH7GXDY2F7TQtYiJQjL4FR23U4RccO\nwzRBJD9qYbLNARutTDwfyBU=\n-----END PRIVATE KEY-----\n",
    client_email: "thaiidocr@crypto-monolith-409107.iam.gserviceaccount.com",
    client_id: "113032731119836530515",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/thaiidocr%40crypto-monolith-409107.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  })
);

const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};
const client = new vision.ImageAnnotatorClient(CONFIG);
const detectText = async (file_path) => {
  try {
    let [result] = await client.textDetection(file_path);
    return result;
  } catch (error) {
    console.error("Error detecting text:", error);
    throw error; // Propagate the error to handle it in the calling function
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/api/uploadImage", upload.single("file"), async (req, res) => {
  try {
    const uploadedFile = req.file;
    const result = await detectText(uploadedFile.path);
    res.json(result.fullTextAnnotation.text);

  } catch (error) {
    console.error("Error detecting text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
