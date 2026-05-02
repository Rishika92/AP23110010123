import { BASE_URL, TOKEN } from "../utils/config";

export const logEvent = async (level, pkg, message) => {
  try {
    await fetch(`${BASE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        stack: "frontend",
        level,
        package: pkg,
        message
      })
    });
  } catch (err) {
    console.error("Log failed");
  }
};