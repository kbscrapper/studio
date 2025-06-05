
"use client";
import type { Design } from '@/types/design';
import { mockDesigns as initialMockDesigns } from '@/data/mock-designs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { LogOut, PlusCircle, Edit, Trash2, AlertCircle, LayoutDashboard } from 'lucide-react';
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
    if (designs.length > 0 || localStorage.getItem('admin_designs')) {
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
      setDesigns(prevDesigns =>
        prevDesigns.map(d =>
          d.id === editingDesign.id ? { ...d, ...data, uploadDate: d.uploadDate } : d
        )
      );
      toast({ title: "Design Updated", description: `"${data.title}" has been updated.` });
    } else {
      const newDesign: Design = {
        ...data,
        id: Date.now().toString(),
        uploadDate: new Date().toISOString(),
        thumbnailUrl: data.thumbnailUrl || (data.fileType === 'image' ? data.fileUrl : `https://placehold.co/400x300/333333/EEEEEE.png?text=${data.fileType.toUpperCase()}`), // Darker placeholder
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
    <div className="container mx-auto px-4 py-8 text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl text-primary">Admin Dashboard</h1>
        </div>
        <div className="flex space-x-2">
           <Button variant="outline" onClick={openAddDesignModal} className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
            <PlusCircle className="mr-2" /> Add New Design
          </Button>
          <Button variant="ghost" onClick={onLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="mr-2" /> Logout
          </Button>
        </div>
      </div>

      <Card className="shadow-lg bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Manage Designs</CardTitle>
          <CardDescription className="text-muted-foreground">View, add, edit, or delete design entries.</CardDescription>
        </CardHeader>
        <CardContent>
          {designs.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="w-[80px] text-muted-foreground">Image</TableHead>
                    <TableHead className="text-muted-foreground">Title</TableHead>
                    <TableHead className="text-muted-foreground">Category</TableHead>
                    <TableHead className="text-muted-foreground">Upload Date</TableHead>
                    <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {designs.map((design) => (
                    <TableRow key={design.id} className="border-border/30 hover:bg-muted/30">
                      <TableCell>
                        {design.fileType === 'image' && (design.thumbnailUrl || design.fileUrl) ? (
                          <Image
                            src={design.thumbnailUrl || design.fileUrl}
                            alt={design.title}
                            width={60}
                            height={45}
                            className="rounded object-cover border border-border/20"
                            data-ai-hint={design.aiHint || 'design thumbnail'}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = `https://placehold.co/60x45/374151/9CA3AF.png?text=Error`; // Darker error placeholder
                            }}
                          />
                        ) : (
                          <div className="w-[60px] h-[45px] bg-muted/50 rounded border border-border/20 flex items-center justify-center text-xs text-muted-foreground">
                            {design.fileType ? design.fileType.toUpperCase() : 'N/A'}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap text-card-foreground">{design.title}</TableCell>
                      <TableCell>
                        {design.category ? <Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground/90">{design.category}</Badge> : '-'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <ClientSideDate dateString={design.uploadDate} />
                      </TableCell>
                      <TableCell className="text-right space-x-1 whitespace-nowrap">
                        <Button variant="ghost" size="icon" onClick={() => openEditDesignModal(design)} className="text-muted-foreground hover:text-primary">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => openDeleteConfirmDialog(design)}>
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
          <AlertDialogContent className="bg-card border-border text-card-foreground">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                This action cannot be undone. This will permanently delete the design titled "{designToDelete.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeDeleteConfirmDialog} className="border-border hover:bg-muted/50">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteDesignConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="mt-8 p-6 bg-card border border-border rounded-lg shadow-md">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 mr-3 mt-1 text-primary flex-shrink-0" />
          <div>
            <p className="font-bold text-card-foreground text-lg">Developer Note:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
              <li>Admin login is client-side (credentials: <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">admin/password</code>).</li>
              <li>Design data modifications (add, edit, delete) are persisted to browser <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">localStorage</code> for this demo and will be retained across sessions on the same browser.</li>
              <li>For production, a secure backend and database are necessary for authentication and data persistence.</li>
              <li>File URLs are handled as text inputs. Real file uploads require server-side processing.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
