'use client';

import { useState } from 'react';
import type { Page } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const initialPages: Page[] = [
    { id: '1', title: 'Home', status: 'Published', createdAt: '2023-10-01' },
    { id: '2', title: 'About Us', status: 'Published', createdAt: '2023-10-02' },
    { id: '3', title: 'Contact', status: 'Draft', createdAt: '2023-10-05' },
    { id: '4', title: 'Privacy Policy', status: 'Published', createdAt: '2023-09-20' },
];


export default function PagesPage() {
    const [pages, setPages] = useState<Page[]>(initialPages);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="font-headline text-3xl font-bold tracking-tight">Pages</h1>
                    <p className="text-muted-foreground">Manage your website's static pages.</p>
                </div>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Page
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pages.map((page) => (
                        <TableRow key={page.id}>
                            <TableCell className="font-medium">{page.title}</TableCell>
                            <TableCell>
                                <Badge variant={page.status === 'Published' ? 'default' : 'secondary'}>
                                    {page.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{page.createdAt}</TableCell>
                            <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline">Add New Page</DialogTitle>
                    <DialogDescription>Create a new static page for your website.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input id="title" placeholder="e.g., About Us" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Create Page</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    );
}
