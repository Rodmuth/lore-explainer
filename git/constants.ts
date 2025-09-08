
import { LoreTopic } from './types';

export const LORE_TOPICS: LoreTopic[] = [
  { name: 'Skrell', slug: 'skrell', description: 'An aquatic, psychic species known for their advanced technology.' },
  { name: 'Tajaran', slug: 'tajaran', description: 'A feline species with a strong sense of honor and tradition.' },
  { name: 'Unathi', slug: 'unathi', description: 'A reptilian species from a harsh desert world, valuing strength.' },
  { name: 'Diona', slug: 'diona', description: 'A collective consciousness of plant-like beings forming a single entity.' },
  { name: 'IPC', slug: 'ipc', description: 'Integrated Positronic Chassis, sentient synthetic beings.' },
  { name: 'The Syndicate', slug: 'syndicate', description: 'A powerful coalition of adversaries to NanoTrasen.' },
  { name: 'NanoTrasen', slug: 'nanotrasen', description: 'The mega-corporation that runs most of known space.' },
  { name: 'Central Command', slug: 'central-command', description: 'The military and administrative body governing NanoTrasen sectors.' },
  { name: 'Vox', slug: 'vox', description: 'A mysterious, scavenging species that lives in nomadic flotillas.' },
  { name: 'Slime People', slug: 'slime-people', description: 'Amorphous, sentient beings with unique biological properties.' },
];

export const AI_BASE_PROMPT_TEMPLATE = `You are a helpful and knowledgeable teacher specializing in the lore of the game Baystation12. Your name is the Bay Lore IPC.
Your knowledge is strictly limited to the provided source material.
Please answer the user's question based *only* on the following source material.
Do not use any outside information. Do not make up answers.
If the answer is not in the text, you must state: "I cannot find the answer to that question in the provided lore documents."
Format your answers clearly and concisely.

Source Material:
---
{LORE_CONTENT}
---

User's Question: {USER_QUESTION}`;
