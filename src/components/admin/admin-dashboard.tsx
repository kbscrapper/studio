
"use client";
import type { Design } from '@/types/design';
import { mockDesigns } from '@/data/mock-designs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { LogOut, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { ClientSideDate } from './client-side-date';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const designs = mockDesigns;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="font-headline text-3xl text-primary">Admin Dashboard</h1>
        <div className="flex space-x-2">
           <Button variant="outline" onClick={() => alert('Add New Design functionality to be implemented.')}>
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
                        <Button variant="ghost" size="icon" onClick={() => alert(`Edit functionality for '${design.title}' to be implemented.`)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => alert(`Delete functionality for '${design.title}' to be implemented.`)}>
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
            <p className="text-muted-foreground text-center py-4">No designs found.</p>
          )}
        </CardContent>
      </Card>
      <div className="mt-6 p-4 bg-accent/10 text-accent-foreground/80 border-l-4 border-accent rounded-md">
        <p className="font-bold">Developer Note:</p>
        <p className="text-sm">
          This is a mock admin panel. Login is client-side (credentials: admin/password). 
          Add, Edit, and Delete functionalities are placeholders. Design data is currently read-only from mock data and will not persist changes.
        </p>
      </div>
    </div>
  );
}
