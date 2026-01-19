import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl border-border/50">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-foreground">404</h1>
            <p className="text-xl font-medium text-foreground">Page Not Found</p>
            <p className="text-muted-foreground">
              Oops! Looks like this page has gone for a walk.
            </p>
          </div>

          <Link href="/">
            <Button className="gap-2 rounded-full px-6">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
