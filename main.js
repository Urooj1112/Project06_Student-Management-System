#! /usr/bin/env node
import inquirer from "inquirer";
console.log("");
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    enrollCourse(course) {
        this.courses.push(course);
        console.log(`${this.name} has been enrolled in ${course}`);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }
    payFees(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Fees paid successfully for ${this.name} of amount ${amount}`);
        }
        else {
            console.log(`Insufficient balance to pay fees for ${this.name}`);
        }
    }
    showStatus() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// Array to store the list of students
const students = [];
// Function to add a new student
async function addNewStudent() {
    const answers = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter student's name:"
        }
    ]);
    const newStudent = new Student(answers.name);
    students.push(newStudent); // Add the new student to the list
    console.log("New student added successfully!");
    newStudent.showStatus();
}
// Function to enroll a student in a course
async function enrollStudent() {
    if (students.length === 0) {
        console.log("No students available. Please add a student first.");
        return;
    }
    const studentChoice = await inquirer.prompt({
        name: "student",
        type: "list",
        message: "Select student to enroll:",
        choices: students.map(student => ({ name: student.name, value: student }))
    });
    const answers = await inquirer.prompt([
        {
            name: "course",
            type: "input",
            message: "Enter course to enroll in:"
        }
    ]);
    studentChoice.student.enrollCourse(answers.course);
}
// Function to view student balance
async function viewBalance() {
    if (students.length === 0) {
        console.log("No students available. Please add a student first.");
        return;
    }
    const studentChoice = await inquirer.prompt({
        name: "student",
        type: "list",
        message: "Select student to view balance:",
        choices: students.map(student => ({ name: student.name, value: student }))
    });
    studentChoice.student.viewBalance();
}
// Function to pay tuition fees
async function payFees() {
    if (students.length === 0) {
        console.log("No students available. Please add a student first.");
        return;
    }
    const studentChoice = await inquirer.prompt({
        name: "student",
        type: "list",
        message: "Select student to pay tuition fees:",
        choices: students.map(student => ({ name: student.name, value: student }))
    });
    const amountToPay = await inquirer.prompt({
        name: "amount",
        type: "number",
        message: "Enter amount to pay:"
    });
    studentChoice.student.payFees(amountToPay.amount);
}
// Function to show student status
async function showStudentStatus() {
    if (students.length === 0) {
        console.log("No students available. Please add a student first.");
        return;
    }
    const studentChoice = await inquirer.prompt({
        name: "student",
        type: "list",
        message: "Select student to show status:",
        choices: students.map(student => ({ name: student.name, value: student }))
    });
    studentChoice.student.showStatus();
}
// Main menu function
async function mainMenu() {
    while (true) {
        const choice = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "Select an action:",
            choices: [
                "Add new student",
                "Enroll student in a course",
                "View student balance",
                "Pay tuition fees",
                "Show student status",
                "Exit"
            ]
        });
        switch (choice.action) {
            case "Add new student":
                await addNewStudent();
                break;
            case "Enroll student in a course":
                await enrollStudent();
                break;
            case "View student balance":
                await viewBalance();
                break;
            case "Pay tuition fees":
                await payFees();
                break;
            case "Show student status":
                await showStudentStatus();
                break;
            case "Exit":
                console.log("Exiting program.");
                return;
        }
    }
}
// Run the main menu
mainMenu();
