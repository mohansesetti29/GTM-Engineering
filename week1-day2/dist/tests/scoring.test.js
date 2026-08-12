"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoring_1 = require("../src/scoring");
describe("scoreICP", () => {
    test("returns 100 for an ideal ICP lead", () => {
        const lead = {
            companyName: "Ideal Corp",
            arr: 20000000,
            headcount: 200,
            techStack: ["HubSpot"],
            location: "United States",
            jobTitle: "VP Sales"
        };
        expect((0, scoring_1.scoreICP)(lead)).toBe(100);
    });
    test("returns 0 for a poor-fit lead", () => {
        const lead = {
            companyName: "Tiny Startup",
            arr: 100000,
            headcount: 10,
            techStack: ["Notion"],
            location: "India",
            jobTitle: "Intern"
        };
        expect((0, scoring_1.scoreICP)(lead)).toBe(0);
    });
    test("gives 30 points for ideal company size", () => {
        const lead = {
            companyName: "MidSize Corp",
            arr: 1000000,
            headcount: 200,
            techStack: [],
            location: "India",
            jobTitle: "Developer"
        };
        expect((0, scoring_1.scoreICP)(lead)).toBe(30);
    });
    test("gives 30 points for sufficient ARR", () => {
        const lead = {
            companyName: "Growing Corp",
            arr: 10000000,
            headcount: 10,
            techStack: [],
            location: "India",
            jobTitle: "Developer"
        };
        expect((0, scoring_1.scoreICP)(lead)).toBe(30);
    });
    test("gives 20 points for relevant technology", () => {
        const lead = {
            companyName: "Tech Corp",
            arr: 1000000,
            headcount: 10,
            techStack: ["Salesforce"],
            location: "India",
            jobTitle: "Developer"
        };
        expect((0, scoring_1.scoreICP)(lead)).toBe(20);
    });
    test("gives 20 points for relevant buyer persona", () => {
        const lead = {
            companyName: "Sales Corp",
            arr: 1000000,
            headcount: 10,
            techStack: [],
            location: "India",
            jobTitle: "VP Sales"
        };
        expect((0, scoring_1.scoreICP)(lead)).toBe(20);
    });
});
