
"use client";
import type { Design } from '@/types/design';
import { mockDesigns as initialMockDesigns } from '@/data/mock-designs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { LogOut, PlusCircle, Edit, Trash2, AlertCircle } from 'lucide-react';
import { ClientSideDate } from './client-side-date';
import { DesignForm, type DesignFormValues } from './design-form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
  const [designToDelete, setDesignToDelete] = useState<Design | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load designs from localStorage or fall back to mockDesigns
    // This is a temporary persistence strategy for development.
    const storedDesigns = localStorage.getItem('admin_designs');
    if (storedDesigns) {
      try {
        setDesigns(JSON.parse(storedDesigns));
      } catch (error) {
        console.error("Failed to parse stored designs, falling back to initial mock designs:", error);
        setDesigns(initialMockDesigns);
      }
    } else {
      setDesigns(initialMockDesigns);
    }
  }, []);

  useEffect(() => {
    // Persist designs to localStorage whenever they change
    if (designs.length > 0 || localStorage.getItem('admin_designs')) { // Only save if designs were loaded or are present
        localStorage.setItem('admin_designs', JSON.stringify(designs));
    }
  }, [designs]);


  const openAddDesignModal = () => {
    setEditingDesign(null);
    setIsDesignModalOpen(true);
  };

  const openEditDesignModal = (design: Design) => {
    setEditingDesign(design);
    setIsDesignModalOpen(true);
  };

  const closeDesignModal = () => {
    setIsDesignModalOpen(false);
    setEditingDesign(null);
  };

  const handleSaveDesign = (data: DesignFormValues) => {
    if (editingDesign) {
      // Update existing design
      setDesigns(prevDesigns =>
        prevDesigns.map(d =>
          d.id === editingDesign.id ? { ...d, ...data, uploadDate: d.uploadDate } : d
        )
      );
      toast({ title: "Design Updated", description: `"${data.title}" has been updated.` });
    } else {
      // Add new design
      const newDesign: Design = {
        ...data,
        id: Date.now().toString(),
        uploadDate: new Date().toISOString(),
        thumbnailUrl: data.thumbnailUrl || (data.fileType === 'image' ? data.fileUrl : `https://placehold.co/400x300/EEEEEE/333333.png?text=${data.fileType.toUpperCase()}`),
        aiHint: data.aiHint || data.title.toLowerCase().split(' ').slice(0,2).join(' '),
      };
      setDesigns(prevDesigns => [newDesign, ...prevDesigns]);
      toast({ title: "Design Added", description: `"${newDesign.title}" has been added.` });
    }
    closeDesignModal();
  };

  const openDeleteConfirmDialog = (design: Design) => {
    setDesignToDelete(design);
    setIsConfirmDeleteDialogOpen(true);
  };

  const closeDeleteConfirmDialog = () => {
    setDesignToDelete(null);
    setIsConfirmDeleteDialogOpen(false);
  };

  const handleDeleteDesignConfirm = () => {
    if (designToDelete) {
      setDesigns(prevDesigns => prevDesigns.filter(d => d.id !== designToDelete.id));
      toast({ title: "Design Deleted", description: `"${designToDelete.title}" has been deleted.`, variant: "destructive" });
      closeDeleteConfirmDialog();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="font-headline text-3xl text-primary">Admin Dashboard</h1>
        <div className="flex space-x-2">
           <Button variant="outline" onClick={openAddDesignModal}>
            <PlusCircle className="mr-2" /> Add New Design
          </Button>
          <Button variant="ghost" onClick={onLogout}>
            <LogOut className="mr-2" /> Logout
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Manage Designs</CardTitle>
          <CardDescription>View, add, edit, or delete design entries.</CardDescription>
        </CardHeader>
        <CardContent>
          {designs.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {designs.map((design) => (
                    <TableRow key={design.id}>
                      <TableCell>
                        {design.fileType === 'image' && (design.thumbnailUrl || design.fileUrl) ? (
                          <Image
                            src={design.thumbnailUrl || design.fileUrl}
                            alt={design.title}
                            width={60}
                            height={45}
                            className="rounded object-cover"
                            data-ai-hint={design.aiHint || 'design thumbnail'}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null; // Prevent infinite loop
                              target.src = `https://placehold.co/60x45/EEEEEE/333333.png?text=Error`;
                            }}
                          />
                        ) : (
                          <div className="w-[60px] h-[45px] bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                            {design.fileType ? design.fileType.toUpperCase() : 'N/A'}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap">{design.title}</TableCell>
                      <TableCell>
                        {design.category ? <Badge variant="secondary">{design.category}</Badge> : '-'}
                      </TableCell>
                      <TableCell>
                        <ClientSideDate dateString={design.uploadDate} />
                      </TableCell>
                      <TableCell className="text-right space-x-1 whitespace-nowrap">
                        <Button variant="ghost" size="icon" onClick={() => openEditDesignModal(design)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => openDeleteConfirmDialog(design)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No designs found. You can add new designs using the button above.</p>
          )}
        </CardContent>
      </Card>
      
      <DesignForm
        isOpen={isDesignModalOpen}
        onClose={closeDesignModal}
        onSubmit={handleSaveDesign}
        initialData={editingDesign}
      />

      {designToDelete && (
        <AlertDialog open={isConfirmDeleteDialogOpen} onOpenChange={setIsConfirmDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the design titled "{designToDelete.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeDeleteConfirmDialog}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteDesignConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="mt-6 p-4 bg-card border rounded-md shadow-sm">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
          <div>
            <p className="font-bold text-foreground">Developer Note:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
              <li>Admin login is client-side (credentials: admin/password).</li>
              <li>Design data modifications (add, edit, delete) are currently persisted to browser <code className="bg-muted px-1 py-0.5 rounded text-xs">localStorage</code> for this demo and will be retained across sessions on the same browser.</li>
              <li>For production, a secure backend and database are necessary for authentication and data persistence.</li>
              <li>File URLs are handled as text inputs. Real file uploads require server-side processing.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
