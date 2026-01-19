import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, User, PawPrint, History, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  petName: z.string().min(1, "Pet name is required"),
  breed: z.string().min(1, "Breed is required"),
  age: z.coerce.number().min(0, "Age must be valid"),
  history: z.string().optional(),
});

export default function Profile() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      petName: "",
      breed: "",
      age: 0,
      history: "",
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("petcare_profile");
    if (stored) {
      form.reset(JSON.parse(stored));
    }
  }, [form]);

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("petcare_profile", JSON.stringify(data));
      toast({
        title: "Profile Updated",
        description: "Your pet's information has been saved successfully.",
      });
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative mb-12 text-center">
        <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-b-[3rem] shadow-lg mb-12 -mt-8 -mx-4 md:rounded-3xl md:mt-0 md:mx-0"></div>
        <div className="absolute top-16 left-1/2 -translate-x-1/2">
          <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
            <AvatarImage src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300&auto=format&fit=crop" />
            <AvatarFallback className="text-3xl bg-secondary text-white">
              <PawPrint />
            </AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-3xl font-display font-bold mt-16">{form.watch("petName") || "Your Pet"}</h1>
        <p className="text-muted-foreground">{form.watch("breed") || "Unknown Breed"}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-orange-50 border-orange-100 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-700">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Weight</p>
              <p className="text-lg font-bold text-foreground">12.5 kg</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-100 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">
              <History className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Last Visit</p>
              <p className="text-lg font-bold text-foreground">Sep 15</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-100 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Owner</p>
              <p className="text-lg font-bold text-foreground">You</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update essential details about your pet</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pet Name</label>
                <div className="relative">
                  <PawPrint className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    {...form.register("petName")} 
                    className="pl-10" 
                    placeholder="e.g. Bella"
                  />
                </div>
                {form.formState.errors.petName && (
                  <p className="text-sm text-destructive">{form.formState.errors.petName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Breed</label>
                <Input {...form.register("breed")} placeholder="e.g. Golden Retriever" />
                {form.formState.errors.breed && (
                  <p className="text-sm text-destructive">{form.formState.errors.breed.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Age (Years)</label>
                <Input 
                  type="number" 
                  {...form.register("age")} 
                  placeholder="e.g. 3" 
                />
                {form.formState.errors.age && (
                  <p className="text-sm text-destructive">{form.formState.errors.age.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Medical History & Notes</label>
              <Textarea 
                {...form.register("history")} 
                placeholder="Allergies, vaccinations, medications..." 
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white min-w-[140px]"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
