# Simple IVR Application using SignalWire RealTime API

## Description
This is a basic Interactive Voice Response System (IVR) using the [SignalWire Realtime API](https://developer.signalwire.com/client-sdk/reference/rt-exports)

The system accepts incoming calls, allowing the caller to select from three options via their phone keypad and performing an action based on each. 

 ## Table of Contents
  * <a href="#installation">Installation</a>
  * <a href="#usage">Usage</a>
  * <a href="#license">License</a>

  ## Installation
  To install this project and run it locally, you will need Node and npm. From the command line, run "npm i" to ensure you have all the required dependencies installed. You will also need a SignalWire account (their free trial includes a $5 credit which covers buying a phone number and a fair amount of testing time). Once you have purchased a phone number and set up your API key, you will need to include these in a .env file in the below format:
    
    PROJECT_ID=<'Your project ID'>
    API_TOKEN=<'Your API token'>
    PHONE_NUMBER=<'The SignalWire phone number you purchased'>
    MY_PHONE_NUMBER= <'The phone number you used when you signed up (for example, your cell phone, for testing')>

    Make sure your phone numbers are in e164 format - leading with a +1 followed by the phone number with no spaces (+11234567890)

  ## Usage
  From the command line, type npm start to start the application. Once "Waiting for calls..." appears, you can dial in to the number you purchased from SignalWire and test the options from your keypad. 
  ## Questions
  If you have any questions about the project please find me on <a href= "https://github.com/llangerud">GitHub</a> or contact me via email at lily.langerud@gmail.com.

