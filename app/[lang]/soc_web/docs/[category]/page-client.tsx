"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";

interface Document {
  id: string;
  name: string;
  path: string;
  author: {
    name: string;
  } | null;
  createdAt: Date;
}

export default function LearningPageClient({ documents, category, isLoggedIn }: { documents: Document[]; category: string; isLoggedIn: boolean }) {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const slug = formData.get("slug") as string;

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/doc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          category,
          isFolder: true,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Failed to create document" }));
        throw new Error(error.message || "Failed to create document");
      }

      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating document:", error);
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  function handleDelete(documentId: string) {
    setDocumentToDelete(documentId);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!documentToDelete) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/doc/${documentToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Failed to delete document" }));
        throw new Error(error.message || "Failed to delete document");
      }

      // Refresh the page to update the document list
      window.location.reload();
    } catch (error) {
      console.error("Error deleting document:", error);
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {isLoggedIn && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-center min-h-[200px]">
                  <div className="flex flex-col items-center gap-4">
                    <Plus className="w-12 h-12 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Add Document</span>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
                <DialogDescription>
                  Enter the name of your new document.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <input
                    id="category"
                    name="category"
                    type="hidden"
                    value={category}
                  />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Document Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter document name"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                    disabled={isLoading}
                  />
                </div>


                <div>
                  <label htmlFor="slug" className="block text-sm font-medium mb-2">
                    Document Slug
                  </label>
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    placeholder="Enter document slug"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          )}

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Document</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this document? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={confirmDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {documents.map((document) => {
            const path = document.path;
            return (
              <div key={document.id} className="relative group">
                <Link
                  href={`./${category}/${encodeURIComponent(path)}`}
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-shadow min-h-[200px]">
                    <CardHeader>
                      <CardTitle>{document.name}</CardTitle>
                      <CardDescription>
                        {document.author?.name || "Unknown Author"}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
                {isLoggedIn && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(document.id);
                    }}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      
    </div>
  );
}
