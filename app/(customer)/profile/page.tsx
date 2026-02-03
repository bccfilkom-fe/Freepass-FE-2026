/**
 * Profile Page
 * Display and edit user profile information
 */

"use client";

import { Edit2, Mail, Phone, Save, User as UserIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser, useUpdateUserProfile } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/dto";

const roleConfig: Record<UserRole, { label: string; color: string }> = {
  USER: { label: "Customer", color: "bg-blue-500" },
  CANTEEN_OWNER: { label: "Canteen Owner", color: "bg-purple-500" },
  ADMIN: { label: "Admin", color: "bg-red-500" },
};

// TODO: add logout button later once auth slice phase is started
// TODO: abstract logic into hook
export default function ProfilePage() {
  const { data: user, isLoading, error } = useCurrentUser();
  const updateMutation = useUpdateUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  // Initialize form data when user loads
  if (user && !isEditing && formData.fullName === "") {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
    });
  }

  const handleEdit = () => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
      });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
      });
    }
  };

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber || undefined,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-3xl">
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-6">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          My Profile
        </h1>
        <Alert
          variant="destructive"
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <p className="font-semibold">Failed to load profile</p>
          <p className="text-sm mt-1">{error.message}</p>
        </Alert>
      </div>
    );
  }

  // User not found (shouldn't happen if authenticated)
  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>
        <Alert>
          <p className="font-semibold">User not found</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      {/* Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <Card className="border-2 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-xl flex-shrink-0">
                <Image
                  src={user.avatarUrl}
                  alt={user.fullName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name and Role */}
              <div className="space-y-2">
                <CardTitle className="text-3xl">{user.fullName}</CardTitle>
                <Badge
                  className={cn("font-semibold", roleConfig[user.role].color)}
                >
                  {roleConfig[user.role].label}
                </Badge>
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing && (
              <Button onClick={handleEdit} className="group">
                <Edit2 className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {updateMutation.isError && (
            <Alert variant="destructive" className="mb-6">
              <p className="text-sm">
                Failed to update profile. Please try again.
              </p>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="flex items-center gap-2 text-base font-semibold"
              >
                <UserIcon className="w-4 h-4" />
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="text-base border-2 focus:border-primary transition-colors"
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-lg p-3 rounded-lg bg-muted/50">
                  {user.fullName}
                </p>
              )}
            </div>

            <Separator />

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-base font-semibold"
              >
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <p className="text-lg p-3 rounded-lg bg-muted/30 text-muted-foreground">
                {user.email}
              </p>
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>

            <Separator />

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="flex items-center gap-2 text-base font-semibold"
              >
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="text-base border-2 focus:border-primary transition-colors"
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-lg p-3 rounded-lg bg-muted/50">
                  {user.phoneNumber || "Not provided"}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="flex-1 group"
                >
                  <Save className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  disabled={updateMutation.isPending}
                  className="flex-1 group"
                >
                  <X className="w-4 h-4 mr-2 transition-transform group-hover:rotate-90" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card
        className="mt-6 border-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
        style={{ animationDelay: "100ms" }}
      >
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-mono text-sm">{user.id}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <span className="text-muted-foreground">Account Type</span>
            <Badge variant="outline">{roleConfig[user.role].label}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
