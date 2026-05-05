"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { LuPlus, LuTrash2, LuSave, LuX } from "react-icons/lu"
import { MdEdit } from "react-icons/md"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/toastContext"
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/data/userData"

type User = {
  _id: string
  name: string
  // email: string
  password: string,
  role: "admin" | "employee"
}

type FormUser = {
  name: string
  // email: string
  password: string
  role: "admin" | "employee"
}

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState<FormUser>({
    name: "",
    // email: "",
    password: "",
    role: "employee",
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<FormUser>({
    name: "",
    // email: "",
    password: "",
    role: "employee",
  })

  const { toast } = useToast()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error: any) {
      toast({
        title: "خطا در بارگیری کاربران!",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createUser(newUser)
      setNewUser({
        name: "",
        // email: "",
        password: "",
        role: "employee",
      })
      loadUsers()
      toast({
        title: "کاربر ایجاد شد!",
        description: `${newUser.name} به عنوان کارمند اضافه شد.`,
      })
    } catch (error: any) {
      toast({
        title: "خطا در ایجاد کاربر!",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEditClick = (user: User) => {
    setEditingId(user._id)
    setEditForm({
      name: user.name,
      // email: user.email,
      password: "", // Don't show password
      role: user.role,
    })
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const updateData = {
          name: editForm.name,
          // email: editForm.email,
          role: editForm.role,
          // password: editForm.password
        }
        // Only include password if it was changed
        if (editForm.password) {
          Object.assign(updateData, { password: editForm.password })
        }
        await updateUser(editingId, updateData)
        setEditingId(null)
        loadUsers()
        toast({
          title: "کاربر به‌روزرسانی شد!",
          description: `${editForm.name} به‌روزرسانی شد.`,
        })
      }
    } catch (error: any) {
      toast({
        title: "خطا در به‌روزرسانی کاربر",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleDeleteClick = async (id: string, name: string) => {
    if (window.confirm(`از حذف "${name}" مطمئنید؟`)) {
      try {
        await deleteUser(id)
        loadUsers()
        toast({
          title: "کاربر حذف شد!",
          description: `${name} حذف شد.`,
        })
      } catch (error: any) {
        toast({
          title: "خطا در حذف کاربر!",
          description: error.message,
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreateSubmit} className="space-y-4 p-4 bg-indigo text-white  rounded-xl">
        <h3 className="font-extrabold">
          افزودن کارمند جدید
        </h3>
        <div dir="rtl" className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input
              placeholder="نام کاربری(ترجیحاً لاتین)"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Input
              placeholder="کلمه‌ی عبور"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="flex">
          <Button type="submit">
            <LuPlus className="w-4 h-4" />
            افزودن کارمند
          </Button>
        </div>
      </form>

      <div className="space-y-2">
        <h3 className="font-extrabold px-4 text-indigo">لیست کارمندان</h3>
        {users.length === 0 ? (
          <div className="text-center py-8 text-indigo">
            <p>کارمندی ثبت نشده‌است.</p>
          </div>
        ) : (
          users.filter((user) => user.role === "employee").map((user) =>
            editingId === user._id ? (
              <Card key={user._id} className="overflow-hidden mb-3 bg-indigo">
                <CardContent className="p-0">
                  <form onSubmit={handleUpdateSubmit} className="p-4 space-y-4">
                    <div dir="rtl" className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Input
                          placeholder="نام کاربری"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="کلمه‌ی عبور جدید"
                          type="password"
                          value={editForm.password}
                          onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">
                        <LuSave className="w-4 h-4" />
                        ذخیره
                      </Button>
                      <Button type="button" variant="secondary" size="sm" onClick={() => setEditingId(null)}>
                        <LuX className="w-4 h-4" />
                        لغو
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card key={user._id} className="overflow-hidden mb-3 bg-indigo text-white">
                <CardContent className="p-0">
                  <div className="pl-2 p-3 flex flex-row-reverse justify-between items-center">
                    <div>
                      <h3 className="font-extrabold">{user.name}</h3>
                    </div>
                    <div className="flex flex-row-reverse gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => handleEditClick(user)}
                      >
                        <MdEdit className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(user._id, user.name)}
                      >
                        <LuTrash2 className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          )
        )}
      </div>
    </div>
  )
}

