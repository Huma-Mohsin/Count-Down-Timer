#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
const response = await inquirer.prompt([
    {
        name: "UserInput",
        type: "number",
        message: "Enter Time In Seconds To Start Countdown",
        validate(input) {
            if (isNaN(input)) {
                return chalk.red("Please Enter Numeric Data To Start Timer");
            }
            else if (input > 60) {
                return chalk.red("Value Of Timer Must Be Between 0 and 60 Seconds");
            }
            else {
                return true;
            }
        },
    }
]);
let input = response.UserInput;
function startTimer(value) {
    const endTime = new Date(new Date().getTime() + value * 1000); // This line calculates the endTime by adding value seconds i.e input provided by the user to the current time (new Date().getTime() returns the current timestamp in milliseconds). It creates a Date object representing the future time when the countdown will end.
    const timerInterval = setInterval(() => {
        const now = new Date(); //This line retrieves the current date and time each time the interval function runs.
        const secondsLeft = differenceInSeconds(endTime, now); //differenceInSeconds calculates the difference in seconds between endTime (future time) and now (current time). This gives the number of seconds left until the countdown reaches endTime.
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            console.log(chalk.green("Countdown finished!"));
        }
        else {
            console.log(chalk.yellow(`Time left: ${secondsLeft} seconds`));
        }
    }, 1000);
}
startTimer(input);
//Author-Huma Mohsin
