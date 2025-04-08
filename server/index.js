const express = require('express');
const cors = require('cors');
const bodyParser =  require("body-parser");
const https = require('https');

const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: "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" });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("Hello,chandresh");
});

app.post("/chat",async (req,res) => {
    try{
    const { prompt } = req.body;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
        // and repetitive.
    temperature: 0.5,

    // The maximum number of tokens to generate. Requests can use up to
    // 2048 tokens shared between prompt and completion.
    max_tokens: 1024,

    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    top_p: 1,

    // A stop sequence is a predefined or user-specified text string that
    // signals an AI to stop generating content, ensuring its responses
    // remain focused and concise. Examples include punctuation marks and
    // markers like "[end]".
    stop: null,

    // If set, partial message deltas will be sent.
    stream: false,
    });
      console.log(chatCompletion.choices[0]?.message?.content || "");
      res.send(chatCompletion.choices[0]?.message?.content || "");
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
});

const port =8080;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});