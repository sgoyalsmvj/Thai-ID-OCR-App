# Thai ID OCR App

## Overview

The Thai ID OCR App is designed to recognize Thai ID cards using Optical Character Recognition (OCR) and store the extracted information in a database. The application utilizes the Google Vision API for OCR processing and offers a user-friendly interface for uploading ID card images, viewing OCR results, and managing data.

## Features

- **OCR Processing:** Integrates with Google Vision API for accurate OCR on Thai ID card images.
- **Data Extraction:** Parses OCR results to extract key information, including identification number, name, last name, date of birth, date of issue, and date of expiry.
- **User Interface:** Provides an intuitive UI for image upload, displaying JSON output, listing OCR history, and applying filters.
- **Database Integration:** Supports CRUD operations to store, update, retrieve, and delete OCR records.
- **JSON Output:** Generates well-structured JSON objects containing extracted data.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **OCR Processing:** Google Vision API
- **Styling:** CSS

## Prerequisites

Before running the application, ensure you have the following:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed
- [MongoDB](https://www.mongodb.com/) installed and running
- Google Vision API credentials

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/sgoyalsmvj/Thai-ID-OCR-App
   cd "Thai-ID-OCR-App"
   ```

2. **Install Dependencies:**

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set Up Google Vision API:**

   - Create a Google Cloud Platform (GCP) project.
   - Enable the Google Cloud Vision API.
   - Create service account credentials and download the JSON file.
   - Set the path to the JSON file in the `.env` file in the backend folder.

4. **Run the Application:**

   ```bash
   # Start the backend server
   cd backend
   npm start

   # Start the frontend application
   cd frontend
   npm run dev
   ```

## Usage

1. **Upload an ID Card Image:**

   - Use the UI to upload a Thai ID card image in PNG, JPEG, or JPG format.
   - Ensure the file size is not bigger than 2MB.

2. **View JSON Output:**

   - The OCR results will be displayed in a well-structured JSON format on the UI.

3. **List OCR History:**

   - View a list of all successful and failed OCR operations.

## API Endpoints

1. **Create a New OCR Record:**

   - Endpoint: `/api/uploadImage`
   - Method: POST
   - Parameters: Image file
   - Returns: OCR result, timestamp, status (success/failure), error messages (if applicable)

2. **Update Existing OCR Data:**

   - Endpoint: `/api/cards/:id`
   - Method: PUT
   - Parameters: Updated OCR data
   - Returns: Updated OCR record

3. **Retrieve and Display OCR Data:**

   - Endpoint: `/api/cards`
   - Method: GET
   - Parameters: Filters (optional)
   - Returns: List of OCR records

4. **Delete OCR Records:**

   - Endpoint: `/api/cards/:id`
   - Method: DELETE
   - Returns: Deleted OCR record


## Sample JSON Output

```json
{
    "identification_number": "4 7363 39613 02 7",
    "name": "Mr. Rotngern",
    "last_name": "Yoopm",
    "date-of-birth": "31/03/2006",
    "date-of-issue": "15/09/2020",
    "date-of-expiry": "05/02/2026"
}
```
![image](https://github.com/sgoyalsmvj/Thai-ID-OCR-App/assets/79046922/83869360-a51d-427b-b33d-6f722b710951)
![image](https://github.com/sgoyalsmvj/Thai-ID-OCR-App/assets/79046922/1df2e923-fc75-44b4-87d7-f30a6dd61ee6)

