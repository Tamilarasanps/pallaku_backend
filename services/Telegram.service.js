require("dotenv").config();
console.log(
  "Loaded env:",
  process.env.TELEGRAM_BOT_TOKEN,
  process.env.TELEGRAM_CHAT_ID
);
const axios = require("axios");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // from .env
const BOT_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // from .env

console.log("BOT_TOKEN used in request:", BOT_TOKEN);
console.log("BOT_CHAT_ID used in request:", BOT_CHAT_ID);

exports.sendTelegramMessage = async (text) => {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: BOT_CHAT_ID,
      text,
      parse_mode: "Markdown",
    });
    console.log("Message sent to Telegram successfully");
  } catch (error) {
    console.error(
      "Failed to send Telegram message:",
      error.response?.data || error.message
    );
  }
};
async function verifyTelegramToken() {
  try {
    const res = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/getMe`
    );
    console.log("✅ Telegram Bot Verified:", res.data.result.username);
  } catch (err) {
    console.error(
      "❌ Telegram Bot Token Invalid:",
      err.response?.data || err.message
    );
  }
}

verifyTelegramToken();
