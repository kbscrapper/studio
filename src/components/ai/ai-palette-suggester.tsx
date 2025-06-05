"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { suggestPalette, type SuggestPaletteInput, type SuggestPaletteOutput } from '@/ai/flows/suggest-palette';
import { Loader2, Palette as PaletteIcon, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Design } from '@/types/design';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AIPaletteSuggesterProps {
  design: Design;
}

// A small, real PNG data URI for testing AI (a 2x2 red square) if design.fileUrl is not a data URI
// This specific one is used in mockDesigns for ID 3.
// If another design is picked, we might need a more generic placeholder or a way to convert its image.
const fallbackImageDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABNJREFUGFdjYGBgYPj///8/Aそれは私です予約AAAAAElFTkSuQmCC';


export function AIPaletteSuggester({ design }: AIPaletteSuggesterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPalettes, setSuggestedPalettes] = useState<string[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSuggestPalettes = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestedPalettes(null);

    let designDataUri = design.fileUrl;
    if (!design.fileUrl.startsWith('data:image')) {
      // The AI flow expects a data URI. If the design.fileUrl is a regular URL,
      // we'd ideally fetch and convert it. For this demo, we'll use a fallback
      // or inform the user. Here, using a fallback for simplicity.
      // If the design ID is '3', it already has a data URI from mock data.
      if (design.id !== '3') {
         toast({
          title: "Using Fallback Image",
          description: "For AI palette suggestion on this item, a fallback image data is being used as its source is not a direct data URI.",
          variant: "default",
        });
        designDataUri = fallbackImageDataUri;
      }
    }
    
    if (design.fileType !== 'image') {
      setError("Palette suggestion is only available for image designs.");
      setIsLoading(false);
      toast({
        title: "Unsupported File Type",
        description: "AI Palette suggestion is only available for image designs.",
        variant: "destructive",
      });
      return;
    }

    try {
      const input: SuggestPaletteInput = { designDataUri };
      const result: SuggestPaletteOutput = await suggestPalette(input);
      setSuggestedPalettes(result.palettes);
      toast({
        title: "Palettes Suggested",
        description: "New color palettes have been generated for your design.",
      });
    } catch (e) {
      console.error("Error suggesting palettes:", e);
      setError("Failed to suggest palettes. Please try again.");
      toast({
        title: "Error",
        description: "Could not generate palettes. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-6">
      <Button onClick={handleSuggestPalettes} disabled={isLoading} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <PaletteIcon className="mr-2 h-4 w-4" />
        )}
        Suggest Color Palettes
      </Button>

      {error && (
        <div className="mt-4 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{error}</p>
        </div>
      )}

      {suggestedPalettes && suggestedPalettes.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Suggested Palettes:</h3>
          {suggestedPalettes.map((palette, pIndex) => (
            <Card key={pIndex} className="overflow-hidden shadow-md">
              <CardHeader>
                <CardTitle className="text-md">Palette {pIndex + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  {palette.map((color, cIndex) => (
                    <div key={cIndex} className="flex flex-col items-center">
                      <div
                        className="h-16 w-16 rounded-md border border-border"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                      <span className="mt-1 text-xs text-muted-foreground">{color}</span>
                    </div>
                  ))}
                </div>
                 <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm">Reject</Button>
                    <Button variant="default" size="sm">Approve</Button>
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
