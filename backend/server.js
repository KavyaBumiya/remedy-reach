// backend/server.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const Ajv = require('ajv');
const Tesseract = require('tesseract.js');
require('dotenv').config();

const app = express();
const upload = multer();
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// JSON Schema for prescription validation
const ajv = new Ajv();
const prescriptionSchema = {
  type: "object",
  properties: {
    patientName: { type: "string" },
    doctorName: { type: "string" },
    date: { type: "string" },
    medications: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          dosage: { type: "string" },
          frequency: { type: "string" },
          duration: { type: "string" }
        },
        required: ["name", "dosage", "frequency", "duration"]
      }
    },
    diagnosis: { type: "string" },
    instructions: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: ["patientName", "doctorName", "medications"]
};
const validatePrescription = ajv.compile(prescriptionSchema);

// Route to process prescription image
app.post('/api/prescription-vision', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // Validate file type & size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Unsupported image type. Please upload JPG, PNG, or WEBP.' });
    }
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'Image too large. Please upload an image smaller than 5MB.' });
    }

    // Step 1: OCR using Tesseract
    const { data: { text } } = await Tesseract.recognize(req.file.buffer, 'eng');

    if (!text || text.trim().length === 0) {
      return res.status(422).json({ error: 'OCR failed. No text detected in image.' });
    }

    // Step 2: Send extracted text to OpenAI
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a medical assistant that extracts structured data from prescription text. Output only valid JSON with fields: patientName, doctorName, date, medications (array of {name, dosage, frequency, duration}), diagnosis, instructions (array of strings).'
          },
          {
            role: 'user',
            content: text
          }
        ],
        max_tokens: 800,
        temperature: 0.1
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Step 3: Extract and parse response
    let rawContent = openaiRes.data.choices?.[0]?.message?.content || '';
    rawContent = rawContent.trim();

    let parsedJson;
    try {
      parsedJson = JSON.parse(rawContent);
    } catch (e) {
      return res.status(422).json({
        error: 'OpenAI did not return valid JSON',
        rawResponse: rawContent
      });
    }

    // Step 4: Validate JSON schema
    const valid = validatePrescription(parsedJson);
    if (!valid) {
      return res.status(422).json({
        error: 'Incomplete or invalid prescription data',
        validationErrors: validatePrescription.errors,
        parsed: parsedJson
      });
    }

    // Success
    res.json(parsedJson);

  } catch (err) {
    let details = err.response?.data || err.message || err;
    console.error('Error in /api/prescription-vision:', details);
    res.status(500).json({
      error: 'Failed to process prescription',
      details
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
