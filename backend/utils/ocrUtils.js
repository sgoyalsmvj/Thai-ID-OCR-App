const vision = require("@google-cloud/vision");
const detectText = async (file_path,CONFIG) => {
  try {
    const client = new vision.ImageAnnotatorClient(CONFIG);
    let [result] = await client.textDetection(file_path);
    const detections = result.textAnnotations;
    const detected = detections[0].description;
    console.log(detected);
    const structuredData = structureOCRData(detected);
    console.log(structuredData);
    return result;
  } catch (error) {
    console.error("Error detecting text:", error);
    throw error; 
  }
};

function structureOCRData(ocrData) {
  const lines = ocrData.split("\n");
  console.log("lines", lines);

  const structuredData = {
    name: lines
      .find((line) => line.includes("Name"))
      ?.split("Name")[1]
      ?.trim(),
    lastName: lines
      .find((line) => line.includes("Last name"))
      ?.split("Last name")[1]
      ?.trim(),
    dateOfBirth: lines
      .find((line) => line.includes("Date of Birth"))
      ?.split("Date of Birth")[1]
      ?.trim(),
    identificationNumber: null,
    dateOfIssue: null,
    dateOfExpiry: null,
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes("Thai National ID Card")) {
      // If 'Thai National ID Card' is found, get the next line and set it as the IdentificationNumber
      structuredData.identificationNumber = lines[i + 1].trim();
    }

    if (line.includes("Expiry" || "expiry")) {
      structuredData.dateOfExpiry = lines[i - 1].trim();
    }

    if (line.includes("Date of Issue")) {
      structuredData.dateOfIssue = lines[i - 1].trim();
    }
  }

  return structuredData;
}

module.exports = detectText;
