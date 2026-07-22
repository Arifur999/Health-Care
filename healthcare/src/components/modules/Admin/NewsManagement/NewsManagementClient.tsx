"use client"

import { createNewsAction, deleteNewsAction, updateNewsAction } from "@/app/(dashboardLayout)/admin/dashboard/news-management/_action"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAllNewsAdmin } from "@/services/news.services"
import { type INews } from "@/types/news.types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface FormState {
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  coverImage: string
  isPublished: boolean
}

const emptyForm: FormState = {
  title: "",
  excerpt: "",
  content: "",
  author: "Care Team",
  category: "Health Care",
  coverImage: "",
  isPublished: true,
}

const toForm = (article: INews): FormState => ({
  title: article.title,
  excerpt: article.excerpt,
  content: article.content.join("\n\n"),
  author: article.author,
  category: article.category,
  coverImage: article.coverImage ?? "",
  isPublished: article.isPublished,
})

const NewsManagementClient = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  const { data: response, isLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: getAllNewsAdmin,
  })
  const articles: INews[] = response?.data ?? []

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
        author: form.author.trim() || "Care Team",
        category: form.category.trim() || "Health Care",
        coverImage: form.coverImage.trim() || undefined,
        isPublished: form.isPublished,
      }
      return editingId ? updateNewsAction(editingId, payload) : createNewsAction(payload)
    },
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message || "Failed to save article")
        return
      }
      toast.success(editingId ? "Article updated" : "Article created")
      setOpen(false)
      setForm(emptyForm)
      setEditingId(null)
      void queryClient.invalidateQueries({ queryKey: ["admin-news"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteNewsAction,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message || "Failed to delete")
        return
      }
      toast.success("Article deleted")
      void queryClient.invalidateQueries({ queryKey: ["admin-news"] })
    },
  })

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const openEdit = (article: INews) => {
    setEditingId(article.id)
    setForm(toForm(article))
    setOpen(true)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">News Management</h1>
          <p className="text-sm text-muted-foreground">Create and manage articles shown on the public News page.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="size-4" aria-hidden="true" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Article" : "New Article"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="news-title">Title</Label>
                <Input id="news-title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="news-excerpt">Excerpt</Label>
                <textarea
                  id="news-excerpt"
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  className="min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="news-content">Content (separate paragraphs with a blank line)</Label>
                <textarea
                  id="news-content"
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="min-h-40 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="news-author">Author</Label>
                  <Input id="news-author" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="news-category">Category</Label>
                  <Input id="news-category" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="news-cover">Cover image URL (optional)</Label>
                <Input id="news-cover" value={form.coverImage} onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))} />
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
                  className="size-4"
                />
                Published
              </label>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={saveMutation.isPending}>
                Cancel
              </Button>
              <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : editingId ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading articles...</p>
      ) : articles.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No articles yet. Create your first one.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardContent className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{article.title}</p>
                    <Badge variant={article.isPublished ? "secondary" : "outline"}>
                      {article.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
                  <p className="text-xs text-muted-foreground">
                    By {article.author} · {format(new Date(article.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button variant="outline" size="icon-sm" onClick={() => openEdit(article)}>
                    <Pencil className="size-4" aria-hidden="true" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => {
                      if (window.confirm(`Delete "${article.title}"?`)) {
                        deleteMutation.mutate(article.id)
                      }
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="size-4 text-red-600" aria-hidden="true" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default NewsManagementClient
