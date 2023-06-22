import { CommandInteraction } from "discord.js";
import { ChatInputCommand } from "../../types/chatInputCommand";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";

const run = async (interaction: CommandInteraction) => {
  const midjourneyImagineCommandSender =
    await MidjourneyImagineCommandSender.getInstance();
  midjourneyImagineCommandSender.enableCommandSending = true;
  midjourneyImagineCommandSender.sendCommands();

  return await interaction.editReply("Sending imagine commands");
};

export const SendMidjourneyImagineCommands: ChatInputCommand = {
  name: "send-midjourney-imagine-commands",
  description: 'send "/imagine" midjourney commands',
  run,
};