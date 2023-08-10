require("dotenv").config();
const {Voice, Messaging} = require("@signalwire/realtime-api");
const axios = require("axios");

const PHONE_NUMBER = process.env.PHONE_NUMBER;
const MY_PHONE_NUMBER = process.env.MY_PHONE_NUMBER


const realtimeConfig = {
    project: process.env.PROJECT_ID,
    token: process.env.API_TOKEN,
    contexts: ["home"]
};

const messageClient = new Messaging.Client(realtimeConfig);
const voiceClient = new Voice.Client(realtimeConfig);

console.log("Waiting for calls...");
voiceClient.on("call.received", async (call) => {
    console.log("Got a call from", call.from, "to number", call.to);
    await call.answer();
    console.log("Inbound call answered");
    try {
        const welcome = await call.playTTS({text: "Hello! Welcome to the test system", gender: "female"});
        await welcome.ended();
        console.log("Welcome text played");

        let digits,
            terminator,
            type;

        // Prompt user to dial a digit
        const cmdPrompt = await call.promptTTS({
            text: "Please press 1 to be connected to the operator, press 2 to get a cat fact or press 3 to file a complaint ",
            digits: {
                max: 1,
                digitTimeout: 15
            }
        });

        const cmdResult = await cmdPrompt.ended();
        type = cmdResult.type;
        digits = cmdResult.digits;
        terminator = cmdResult.terminator;
        console.log("Prompted for digits, received digits", type, digits, terminator);
        
        if (digits === "1") { // User input 1.  Calls my phone
            await call.connectPhone({
                from: PHONE_NUMBER,
                to: MY_PHONE_NUMBER,
                timeout: 30,
                ringback: new Voice.Playlist().add(Voice.Playlist.TTS({text: "ring. ring. ring. bananaphone"}))
            });
            console.log("Connecting to Lily's phone");
            await call.waitFor("ended")
        }

        else if (digits === "2") { // User input 2.  Random Cat Fact
            console.log(`Sending a random cat fact`);
            const fact = await getFact();
            console.log(fact, "being sent to number", MY_PHONE_NUMBER);
            try {
                await messageClient.send({from: PHONE_NUMBER, to: MY_PHONE_NUMBER, body: fact});
            } catch (err) {
                const pb = await call.playTTS({
                    text: "Sorry, I couldn't send the message. It is" + fact
                });
                await pb.ended();
            }
        }

        else if (digits === "3") { // User input 3. Complaint option
            console.log("Sending complaint response");
            const rickRoll = await call.playAudio({url: "https://shattereddisk.github.io/rickroll/rickroll.mp4"});
            await rickRoll.ended();
        } 

    } catch (error) {
        console.error("Either call hung up by user, or some other error: ", error);
    }
});



async function getFact() {
    const URL = 'https://catfact.ninja/fact';
    let fact;
    try {
        fact = await axios.get(URL);
    } catch (err) {
        console.log(err)
    }
    console.log(fact.data.fact)
    return fact.data.fact
}
