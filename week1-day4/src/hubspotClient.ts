import { Client } from "@hubspot/api-client";
import dotenv from "dotenv";

dotenv.config();

const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error(
    "HUBSPOT_ACCESS_TOKEN is missing from .env"
  );
}

export const hubspotClient = new Client({
  accessToken
});