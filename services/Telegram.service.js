require("dotenv").config();

const axios = require("axios");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // from .env
const BOT_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // from .env



exports.sendTelegramMessage = async (text) => {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: BOT_CHAT_ID,
      text,
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error(
      "Failed to send Telegram message:",
    );
  }
};
async function verifyTelegramToken() {
  try {
    const res = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/getMe`
    );
  } catch (err) {
    console.error(
      "❌ Telegram Bot Token Invalid:",
    );
  }
}

verifyTelegramToken();
