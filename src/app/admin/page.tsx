import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-2xl">Admin Panel</CardTitle>
          <CardDescription>
            This area is restricted. Please log in to manage designs and portfolio content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            (Full admin functionality including login and content management will be implemented here.)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
