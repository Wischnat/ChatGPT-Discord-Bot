import {
  ApplicationCommandOptionType,
  CommandInteraction,
} from "discord.js";
import { ChatInputCommand } from "../../types/chatInputCommand";
import { MidjourneyImagineCommandSender } from "../../apis/midjourney/midjourneyImagineCommandSender";
import fs from "fs";
import path from "path";
import config from "../../config/config.json";

const run = async (interaction: CommandInteraction) => {
  try {
    const temperature: number = interaction.options.data.at(0)
      ?.value! as number;
    const midjourneyImagineCommandSender =
      await MidjourneyImagineCommandSender.getInstance();

    config.gpt.temperature = temperature;
    const filePath = path.join(__dirname, "../../config/config.json");
    fs.writeFileSync(filePath, JSON.stringify(config));

    midjourneyImagineCommandSender.gpt.temperature = temperature;

    return await interaction.editReply(`Temperature: ${temperature}`);
  } catch (error: any) {
    return await interaction.editReply(error.message);
  }
};

export const SetTemperature: ChatInputCommand = {
  name: "set-temperature",
  description: `Randomness control: Lowering reduces randomness.`,
  run,
  options: [
    {
      name: "temperature",
      description: "Values between 0 and 2",
      required: true,
      min_value: 0,
      max_value: 2,
      type: ApplicationCommandOptionType.Number,
    },
  ],
};
