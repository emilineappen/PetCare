import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, User, PawPrint, History, Activity, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const petSchema = z.object({
  id: z.string(),
  petName: z.string().min(1, "Pet name is required"),
  breed: z.string().min(1, "Breed is required"),
  age: z.coerce.number().min(0, "Age must be valid"),
  history: z.string().optional(),
});

type Pet = z.infer<typeof petSchema>;

export default function Profile() {
  const { toast } = useToast();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<Pet>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      id: "",
      petName: "",
      breed: "",
      age: 0,
      history: "",
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("petcare_pets");
    if (stored) {
      setPets(JSON.parse(stored));
    } else {
      // Migrate old profile if exists
      const oldProfile = localStorage.getItem("petcare_profile");
      if (oldProfile) {
        const pet = { ...JSON.parse(oldProfile), id: Math.random().toString(36).substr(2, 9) };
        setPets([pet]);
        localStorage.setItem("petcare_pets", JSON.stringify([pet]));
        localStorage.removeItem("petcare_profile");
      }
    }
  }, []);

  const onSubmit = (data: Pet) => {
    setIsSaving(true);
    setTimeout(() => {
      let updatedPets;
      if (editingId) {
        updatedPets = pets.map(p => p.id === editingId ? data : p);
      } else {
        const newPet = { ...data, id: Math.random().toString(36).substr(2, 9) };
        updatedPets = [...pets, newPet];
      }
      
      localStorage.setItem("petcare_pets", JSON.stringify(updatedPets));
      setPets(updatedPets);
      toast({
        title: editingId ? "Profile Updated" : "Pet Added",
        description: editingId ? "Pet information updated successfully." : "New pet added to your profile.",
      });
      setIsSaving(false);
      form.reset({ id: "", petName: "", breed: "", age: 0, history: "" });
      setEditingId(null);
    }, 800);
  };

  const handleEdit = (pet: Pet) => {
    setEditingId(pet.id);
    form.reset(pet);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    const updatedPets = pets.filter(p => p.id !== id);
    localStorage.setItem("petcare_pets", JSON.stringify(updatedPets));
    setPets(updatedPets);
    toast({
      title: "Pet Removed",
      description: "Pet profile has been deleted.",
    });
  };

  const currentPetName = form.watch("petName");
  const currentBreed = form.watch("breed");

  return (
    <div className="max-w-4xl mx-auto pb-12">
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
        <h1 className="text-3xl font-display font-bold mt-16">{currentPetName || "Add Your Pet"}</h1>
        <p className="text-muted-foreground">{currentBreed || "New Profile"}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Pet Profile" : "Add New Pet"}</CardTitle>
              <CardDescription>Enter details about your pet companion</CardDescription>
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
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="flex gap-4 justify-end">
                  {editingId && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setEditingId(null);
                        form.reset({ id: "", petName: "", breed: "", age: 0, history: "" });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white min-w-[140px]"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : (
                      <>
                        {editingId ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                        {editingId ? "Update Pet" : "Add Pet"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-primary" />
            Your Pets ({pets.length})
          </h2>
          {pets.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center text-muted-foreground italic">
                No pets added yet. Use the form to add your first companion.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pets.map((pet) => (
                <Card key={pet.id} className="hover-elevate">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div onClick={() => handleEdit(pet)} className="cursor-pointer flex-1">
                        <h3 className="font-bold text-lg">{pet.petName}</h3>
                        <p className="text-sm text-muted-foreground">{pet.breed}, {pet.age} years old</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(pet.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
