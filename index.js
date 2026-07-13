const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let connection;

client.once("ready", () => {
    console.log(`Đăng nhập thành công: ${client.user.tag}`);

    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    if (!guild) {
        console.log("Guild not found");
        return;
    }

    connection = joinVoiceChannel({
        channelId: process.env.VOICE_CHANNEL_ID,
        guildId: process.env.GUILD_ID,
        adapterCreator: guild.voiceAdapterCreator,
        selfMute: false,
        selfDeaf: false
    });

    console.log("✅ Đã treo room thành công!");
});

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;

    if (message.content === ".ping") {
        return message.reply("🏓 Pong!");
    }

    if (message.content.startsWith(".noi")) {

        const text = message.content.slice(4).trim();

        if (!text) {
            return message.reply("Ví dụ:\n.noi Xin chào mọi người");
        }

        console.log("Nội dung:", text);

        return message.reply(`🗣️ Đã nhận:\n${text}`);

        // Sau này sẽ thêm phần phát giọng nói tại đây
    }

});

client.login(process.env.TOKEN);
