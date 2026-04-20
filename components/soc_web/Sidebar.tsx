import * as React from "react"
import { ChevronRight, File, Folder, FilePlus, FolderPlus, Trash2, Edit } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"

import { FileNode } from "@/generated/prisma/client"

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  files?: FileNode[]
  selectedNode?: SidebarNode
  setSelectedNode?: (node: SidebarNode) => void
  currentUserId?: string | null
  onAddNode?: (name: string, slug: string, isFolder: boolean, parentId: string | null, href: string | null) => Promise<void>
  onDeleteNode?: (nodeId: string) => Promise<void>
  onEditNode?: (nodeId: string, name: string, slug: string, href: string | null) => Promise<void>
}

type SidebarNode = {
  name: string
  path: string
  id: string
  isFolder: boolean
  href?: string | null
  authorId?: string | null
  parent?: SidebarNode | null
  children: SidebarNode[]
} | null

export type { SidebarNode }
export function FileNodesToTreeRoot(fileNodes: FileNode[]): SidebarNode {
  const sorted = [...fileNodes].sort((a, b) => (a.path < b.path ? -1 : 1))
  const nodeMap: Record<string, SidebarNode> = {}
  const topLevelNodes: SidebarNode[] = []

  for (const fileNode of sorted) {
    const { id, name, path, isFolder, href, authorId } = fileNode
    nodeMap[id] = {
      id,
      name,
      path,
      isFolder,
      href,
      authorId,
      parent: null,
      children: [],
    }
  }

  for (const fileNode of sorted) {
    const node = nodeMap[fileNode.id]
    if (!node) continue

    const parentPath = fileNode.path.includes("/")
      ? fileNode.path.substring(0, fileNode.path.lastIndexOf("/"))
      : ""

    const parentNode = Object.values(nodeMap).find(
      (item) => item?.path === parentPath
    )

    if (parentNode) {
      node.parent = parentNode
      parentNode.children.push(node)
    } else {
      topLevelNodes.push(node)
    }
  }

  if (topLevelNodes.length === 1) {
    return topLevelNodes[0]
  }

  return {
    id: "root",
    name: "Root",
    path: "",
    isFolder: true,
    parent: null,
    children: topLevelNodes,
  }
}

export function AppSidebar({ 
  files = [], 
  selectedNode: propSelectedNode, 
  setSelectedNode: propSetSelectedNode,
  currentUserId,
  onAddNode,
  onDeleteNode,
  onEditNode,
  ...props 
}: SidebarProps) {

  const [fileNodes, setFileNodes] = React.useState<FileNode[]>(files)
  const treeRoot = React.useMemo(() => FileNodesToTreeRoot(fileNodes), [fileNodes])
  const [localSelectedNode, setLocalSelectedNode] = React.useState<SidebarNode>(treeRoot)
  const selectedNode = propSelectedNode !== undefined ? propSelectedNode : localSelectedNode
  const setSelectedNode = propSetSelectedNode || setLocalSelectedNode
  const [isSaving, setIsSaving] = React.useState(false)

  const [addDialogOpen, setAddDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [isAddingFolder, setIsAddingFolder] = React.useState(false)
  const [newNodeName, setNewNodeName] = React.useState("")
  const [newNodeSlug, setNewNodeSlug] = React.useState("")
  const [newNodeHref, setNewNodeHref] = React.useState("")
  const [nodeToDelete, setNodeToDelete] = React.useState<SidebarNode | null>(null)
  const [nodeToEdit, setNodeToEdit] = React.useState<SidebarNode | null>(null)

  React.useEffect(() => {
    setFileNodes(files ?? [])
  }, [files])


  const addTarget = selectedNode?.isFolder ? selectedNode : selectedNode?.parent ?? null
  const canAdd = Boolean(currentUserId && treeRoot?.authorId === currentUserId)
  const canEdit = Boolean(currentUserId && treeRoot?.id && treeRoot.id !== "root" && treeRoot?.authorId === currentUserId)
  const canDelete = canEdit

  function openAddDialog(isFolder: boolean) {
    setIsAddingFolder(isFolder)
    setNewNodeName("")
    setNewNodeHref("")
    setNewNodeSlug("")
    setAddDialogOpen(true)
  }

  async function handleAddNode() {
    const name = newNodeName.trim()
    const slug = newNodeSlug.trim()
    if (!name) return

    const targetParent = selectedNode?.isFolder
      ? selectedNode
      : selectedNode?.parent ?? null

    const parentId = targetParent?.id

    if (!onAddNode) return

    setIsSaving(true)

    try {
      await onAddNode(name, slug, isAddingFolder, parentId || null, newNodeHref || null)
      setAddDialogOpen(false)
    } catch (error) {
      console.error("Failed to add node", error)
    } finally {
      setIsSaving(false)
    }
  }

  function openDeleteDialog(node: SidebarNode) {
    setNodeToDelete(node)
    setDeleteDialogOpen(true)
  }

  async function handleDeleteNode() {
    if (!nodeToDelete || !onDeleteNode) return

    setIsSaving(true)

    try {
      await onDeleteNode(nodeToDelete.id)
      setDeleteDialogOpen(false)
      setNodeToDelete(null)
    } catch (error) {
      console.error("Failed to delete node", error)
    } finally {
      setIsSaving(false)
    }
  }

  function openEditDialog(node: SidebarNode) {
    if (!node) return
    setNodeToEdit(node)
    setNewNodeName(node.name)
    setNewNodeHref(node.href || "")
    setEditDialogOpen(true)
  }

  async function handleEditNode() {
    if (!nodeToEdit || !onEditNode) return

    const name = newNodeName.trim().replace(/\//g, "-")
    const slug = newNodeSlug.trim()

    if (!name || name === nodeToEdit.name) return

    setIsSaving(true)

    try {
      await onEditNode(nodeToEdit.id, name, slug, newNodeHref || null)
      setEditDialogOpen(false)
      setNodeToEdit(null)
    } catch (error) {
      console.error("Failed to edit node", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <Sidebar {...props}>
        <SidebarContent>
          { (canAdd || canEdit || canDelete) && (
            <div className="grid grid-cols-2 gap-2 px-3 py-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => openAddDialog(false)}
                disabled={isSaving || !canAdd}
                hidden={!canAdd}
              >
                <FilePlus className="mr-2 h-4 w-4" />
                Add File
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => openAddDialog(true)}
                disabled={isSaving || !canAdd}
                hidden={!canAdd}
              >
                <FolderPlus className="mr-2 h-4 w-4" />
                Add Folder
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (selectedNode && selectedNode.id !== "root") {
                    openEditDialog(selectedNode)
                  }
                }}
                disabled={isSaving || !canEdit}
                hidden={!canEdit}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (selectedNode && selectedNode.id !== "root") {
                    openDeleteDialog(selectedNode)
                  }
                }}
                disabled={isSaving || !canDelete}
                hidden={!canDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          ) }
          <SidebarGroup>
            <SidebarGroupLabel onClick={() => setSelectedNode(treeRoot)} style={{ cursor: 'pointer' }}>
              {treeRoot?.name}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {treeRoot?.children.map((item, index) => (
                  <Tree
                    key={index}
                    currentNode={item}
                    selectedNode={selectedNode}
                    onSelect={setSelectedNode}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

    {/* Add Node Dialog */}
    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add New {isAddingFolder ? "Folder" : "File"}
          </DialogTitle>
          <DialogDescription>
            Enter the name for the new {isAddingFolder ? "folder" : "file"}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isSaving}
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium mb-2">
              Slug
            </label>
            <input
              id="slug"
              type="text"
              placeholder="Enter slug"
              value={newNodeSlug}
              onChange={(e) => setNewNodeSlug(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isSaving}
            />
          </div>

          <div>
            <label htmlFor="href" className="block text-sm font-medium mb-2">
              Href (optional)
            </label>
            <input
              id="href"
              type="text"
              placeholder="Enter href"
              value={newNodeHref}
              onChange={(e) => setNewNodeHref(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isSaving}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setAddDialogOpen(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button onClick={handleAddNode} disabled={isSaving || !newNodeName.trim()}>
            {isSaving ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Delete Node Dialog */}
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {nodeToDelete?.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {nodeToDelete?.isFolder ? "folder" : "file"}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteNode}
            disabled={isSaving}
          >
            {isSaving ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Edit Node Dialog */}
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename {nodeToEdit?.name}</DialogTitle>
          <DialogDescription>
            Enter the new name for this {nodeToEdit?.isFolder ? "folder" : "file"}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="edit-name"
              type="text"
              placeholder="Enter new name"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isSaving}
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium mb-2">
              Slug
            </label>
            <input
              id="slug"
              type="text"
              placeholder="Enter slug"
              value={newNodeSlug}
              onChange={(e) => setNewNodeSlug(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isSaving}
            />
          </div>

          <div>
            <label htmlFor="edit-href" className="block text-sm font-medium mb-2">
              Href (optional)
            </label>
            <input
              id="edit-href"
              type="text"
              placeholder="Enter href"
              value={newNodeHref}
              onChange={(e) => setNewNodeHref(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isSaving}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setEditDialogOpen(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditNode}
            disabled={isSaving || !newNodeName.trim() || newNodeName.trim() === nodeToEdit?.name}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}


function Tree({
  currentNode,
  selectedNode,
  onSelect,
}: {
  currentNode: SidebarNode
  selectedNode: SidebarNode
  onSelect: (node: SidebarNode) => void
}) {
  if (!currentNode) return null

  const active = selectedNode?.path === currentNode.path

  if (!currentNode.isFolder) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={active}
          className="data-[active=false]:bg-transparent"
          onClick={() => onSelect(currentNode)}
        >
          <File />
          {currentNode.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={active}
            className="data-[active=false]:bg-transparent"
            onClick={() => onSelect(currentNode)}
          >
            <ChevronRight className="transition-transform" />
            <Folder />
            {currentNode.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {currentNode.children.map((childNode, index) => (
              <Tree
                key={index}
                currentNode={childNode}
                selectedNode={selectedNode}
                onSelect={onSelect}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
