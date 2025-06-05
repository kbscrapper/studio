'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting color palettes for 3D designs.
 *
 * The flow takes a data URI of a design image and returns a list of suggested color palettes.
 * - suggestPalette - The function to call to invoke the color palette suggestion flow.
 * - SuggestPaletteInput - The input type for the suggestPalette function.
 * - SuggestPaletteOutput - The output type for the suggestPalette function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPaletteInputSchema = z.object({
  designDataUri: z
    .string()
    .describe(
      "A data URI of a 3D design image. It must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestPaletteInput = z.infer<typeof SuggestPaletteInputSchema>;

const SuggestPaletteOutputSchema = z.object({
  palettes: z
    .array(
      z.array(z.string().describe('A hex color code')).describe('A color palette')
    )
    .describe('A list of suggested color palettes for the design.'),
});
export type SuggestPaletteOutput = z.infer<typeof SuggestPaletteOutputSchema>;

export async function suggestPalette(input: SuggestPaletteInput): Promise<SuggestPaletteOutput> {
  return suggestPaletteFlow(input);
}

const suggestPalettePrompt = ai.definePrompt({
  name: 'suggestPalettePrompt',
  input: {schema: SuggestPaletteInputSchema},
  output: {schema: SuggestPaletteOutputSchema},
  prompt: `You are a color palette expert. Given a 3D design, you will suggest several visually appealing color palettes.

  Provide 3 distinct color palettes that would work well with the following design.

  Return the palettes as a JSON array of arrays of hex color codes.

  Design: {{media url=designDataUri}}`,
});

const suggestPaletteFlow = ai.defineFlow(
  {
    name: 'suggestPaletteFlow',
    inputSchema: SuggestPaletteInputSchema,
    outputSchema: SuggestPaletteOutputSchema,
  },
  async input => {
    const {output} = await suggestPalettePrompt(input);
    return output!;
  }
);
