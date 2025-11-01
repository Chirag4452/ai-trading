import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { z } from 'zod';
import { PROMPT } from './prompt';
import type { Account } from './lighter-sdk-ts/generated';
import { getIndicators } from './stockData';
import { getOpenPositions } from './openPositions';


export const invokeAgent = async (account: Account) => {
  const openrouter = createOpenRouter({
    apiKey: process.env['OPEN_ROUTER_API_KEY'] ?? '',
  });

  const intradayIndicators = await getIndicators("5m", 0);
  const longtermIndicators = await getIndicators("5m", 0);

  const openPositions = await getOpenPositions(account.apiKey);

  

  const response = streamText({
    model: openrouter(account.modelName),
    prompt: PROMPT.,
    tools: {
      getCurrentWeather: {
        description: 'Get the current weather in a given location',
        parameters: z.object({
          location: z
            .string()
            .describe('The city and state, e.g. San Francisco, CA'),
          unit: z.enum(['celsius', 'fahrenheit']).optional(),
        }),
        execute: async ({ location, unit = 'celsius' }) => {
          // Mock response for the weather
          const weatherData = {
            'Boston, MA': {
              celsius: '15°C',
              fahrenheit: '59°F',
            },
            'San Francisco, CA': {
              celsius: '18°C',
              fahrenheit: '64°F',
            },
          };

          const weather = weatherData[location];
          if (!weather) {
            return `Weather data for ${location} is not available.`;
          }

          return `The current weather in ${location} is ${weather[unit]}.`;
        },
      },
    },
  });

  await response.consumeStream();
  return response.text;
};
