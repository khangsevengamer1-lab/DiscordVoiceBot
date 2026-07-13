const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;

let connection;

function connectVoice() {
    const guild = client.guilds.cache.get(GUILD_ID);

    if (!guild) {
        console.log("Không tìm thấy server.");
        return;
    }

    connection = joinVoiceChannel({
        channelId: VOICE_CHANNEL_ID,
        guildId: GUILD_ID,
        adapterCreator: guild.voiceAdapterCreator,
        selfMute: false,
        selfDeaf: false
    });

    console.log("Đã vào Voice.");
}

client.once("ready", () => {
    console.log(`${client.user.tag} Online`);
    connectVoice();
});

client.on("voiceStateUpdate", () => {
    if (!connection) {
        connectVoice();
    }
});

client.login(TOKEN);
