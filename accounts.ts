export interface Account {
    apiKey: string;
    name: string;
    modelName: string;
}

export const SUPPORTED_ACCOUNTS: Account[] = [{
    apiKey: process.env['API_KEY_DEEPSEEK'] ?? '',
    name: "Deepseek",
    modelName: "deepseek/deepseek-chat-v3-0324:free/uptime"
},
{
    apiKey: process.env['API_KEY_QWEN'] ?? '',
    name: "Qwen",
    modelName: "qwen/qwen3-235b-a22b:free"
},
{
    apiKey: process.env['API_KEY_OPENAI'] ?? '',
    name: "OpenAI",
    modelName: "openai/gpt-oss-20b:free"
}]