const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function run() {
    const prompt = "UNIT-1\n\nIntroduction to Ethical Hacking, Fundamentals of Computer Networking, TCP/IP\nprotocol stack, IP addressing and routing, TCP and UDP, IP Subnets, Routing\nprotocols, IP Version 6. IP Spoofing port scanning, DNS Spoofing. Dos attacks —\nSYN attacks, Smurf attacks, UDP flooding, DDOS — Models. Firewalls — Packet\nfilter firewalls, Packet Inspection firewalls — Application Proxy Firewalls. Batch\nfile Programming.\n Strict Dont use end line charactger, This is syllabus make 5 2-mark questions and make 3 5-mark questions.response should be with only markdown syntaxes like #, ##, bullet points, number points etc.handle new line character with markdown syntax :";
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
  run();