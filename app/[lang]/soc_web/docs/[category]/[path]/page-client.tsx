"use client"

import { useState, useMemo } from "react"
import { AppSidebar, SidebarNode, FileNodesToTreeRoot } from "@/components/soc_web/Sidebar"
import { FileNode } from "@/generated/prisma/client"
import { PDFViewer } from "@/components/soc_web/PDFViewer"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


export default function LearnDocumentPageClient({ files, category, currentUserId } : { files : FileNode[], category: string, currentUserId: string | null }) {

  const [fileNodes, setFileNodes] = useState<FileNode[]>(files)
  const treeRoot = useMemo(() => FileNodesToTreeRoot(fileNodes), [fileNodes])
  const [selectedNode, setSelectedNode] = useState<SidebarNode>(treeRoot)
  
  async function handleAddNode(name: string, slug: string, isFolder: boolean, parentId: string | null, href: string | null) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/doc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          isFolder,
          parentId,
          href,
          category,
        }),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        console.error("Failed to create node", error)
        throw error
      }

      const createdNode = await response.json()
      const nextFiles = [...fileNodes, createdNode]
      setFileNodes(nextFiles)
      const newTree = FileNodesToTreeRoot(nextFiles)
      if (newTree) {
        setSelectedNode(newTree)
      }
    } catch (error) {
      console.error("Failed to add node", error)
      throw error
    }
  }

  async function handleDeleteNode(nodeId: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/doc/${nodeId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        console.error("Failed to delete node", error)
        throw error
      }

      const updated = fileNodes.filter((n) => n.id !== nodeId)
      setFileNodes(updated)
      const newTree = FileNodesToTreeRoot(updated)
      setSelectedNode(newTree)
    } catch (error) {
      console.error("Failed to delete node", error)
      throw error
    }
  }

  async function handleEditNode(nodeId: string, slug: string, name: string, href: string | null) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/doc/${nodeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          href,
        }),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        console.error("Failed to edit node", error)
        throw error
      }

      const updatedNode = await response.json()
      const updatedFiles = fileNodes.map((n) => (n.id === nodeId ? updatedNode : n))
      setFileNodes(updatedFiles)
      const newTree = FileNodesToTreeRoot(updatedFiles)
      setSelectedNode(newTree)
    } catch (error) {
      console.error("Failed to edit node", error)
      throw error
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar 
        files={fileNodes} 
        selectedNode={selectedNode} 
        setSelectedNode={setSelectedNode}
        onAddNode={handleAddNode}
        onDeleteNode={handleDeleteNode}
        onEditNode={handleEditNode}
        currentUserId={currentUserId}
      />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb>
            <BreadcrumbList>
              {selectedNode?.path.split('/').map( (segment) => (
                <>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">{segment}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          
        </header>
        <PDFViewer href={selectedNode?.href || null}/>
      </SidebarInset>
    </SidebarProvider>
  )
}
