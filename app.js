const express = require("express");
const { events } = require("./events");
const schedule = require("node-schedule");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

// Function to reverse the string
const reverseString = (text) => {
  let characters = text.split("");
  let reverseChars = characters.reverse();
  reverseChars = reverseChars.join("");
  return reverseChars;
};

function printReverseTextAfterSleep(text) {
  // Calculating the length of the string
  const length = text.length;

  // Setting the function to print the reverse of the "text" string after time in seconds equal to its length
  setTimeout(() => {
    console.log(reverseString(text));
  }, 1000 * length);
}

// Setting the script to run at 30-March-2022 at 02:30 PM IST (+05:30)
const date = new Date("30 Mar 2022 14:30:00 IST");
schedule.scheduleJob(date, function () {
  // Running a loop to schedule all events
  console.log("Scheduling events");
  events.forEach((event) => {
    const eventDate = new Date(event.dateTime);
    schedule.scheduleJob(eventDate, function () {
      printReverseTextAfterSleep(event.text);
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up and running on port 5000");
});
