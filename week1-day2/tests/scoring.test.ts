import { scoreICP } from "../src/scoring";
import { LeadProfile } from "../src/icpSchema";

describe("scoreICP", () => {
  test("returns 100 for an ideal ICP lead", () => {
    const lead: LeadProfile = {
      companyName: "Ideal Corp",
      arr: 20_000_000,
      headcount: 200,
      techStack: ["HubSpot"],
      location: "United States",
      jobTitle: "VP Sales"
    };

    expect(scoreICP(lead)).toBe(100);
  });

  test("returns 0 for a poor-fit lead", () => {
    const lead: LeadProfile = {
      companyName: "Tiny Startup",
      arr: 100_000,
      headcount: 10,
      techStack: ["Notion"],
      location: "India",
      jobTitle: "Intern"
    };

    expect(scoreICP(lead)).toBe(0);
  });

  test("gives 30 points for ideal company size", () => {
    const lead: LeadProfile = {
      companyName: "MidSize Corp",
      arr: 1_000_000,
      headcount: 200,
      techStack: [],
      location: "India",
      jobTitle: "Developer"
    };

    expect(scoreICP(lead)).toBe(30);
  });

  test("gives 30 points for sufficient ARR", () => {
    const lead: LeadProfile = {
      companyName: "Growing Corp",
      arr: 10_000_000,
      headcount: 10,
      techStack: [],
      location: "India",
      jobTitle: "Developer"
    };

    expect(scoreICP(lead)).toBe(30);
  });

  test("gives 20 points for relevant technology", () => {
    const lead: LeadProfile = {
      companyName: "Tech Corp",
      arr: 1_000_000,
      headcount: 10,
      techStack: ["Salesforce"],
      location: "India",
      jobTitle: "Developer"
    };

    expect(scoreICP(lead)).toBe(20);
  });

  test("gives 20 points for relevant buyer persona", () => {
    const lead: LeadProfile = {
      companyName: "Sales Corp",
      arr: 1_000_000,
      headcount: 10,
      techStack: [],
      location: "India",
      jobTitle: "VP Sales"
    };

    expect(scoreICP(lead)).toBe(20);
  });
});