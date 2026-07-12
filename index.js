const {Client,GatewayIntentBits}=require("discord.js");
const {joinVoiceChannel}=require("@discordjs/voice");
const client=new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildVoiceStates]});
client.once("ready",()=>{
 const g=client.guilds.cache.get(process.env.GUILD_ID);
 if(!g)return console.log("Guild not found");
 joinVoiceChannel({
   channelId:process.env.VOICE_CHANNEL_ID,
   guildId:process.env.GUILD_ID,
   adapterCreator:g.voiceAdapterCreator,
   selfMute:false,selfDeaf:false
 });
 console.log("Ready");
});
client.login(process.env.TOKEN);