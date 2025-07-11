import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Users, Wifi, WifiOff, UserPlus, Edit3, Trash2, Crown, Shield, User, Settings, Eye, FileText, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  role?: 'admin' | 'moderator' | 'user';
  employee_type?: string;
  permissions?: string[];
}

interface Permission {
  id: string;
  permission: string;
}

interface UserManagementProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const UserManagement: React.FC<UserManagementProps> = ({ syncStatus = 'disconnected' }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [newRole, setNewRole] = useState<'admin' | 'moderator' | 'user'>('user');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState<{
    email: string;
    password: string;
    full_name: string;
    employee_type: 'admin' | 'manager' | 'content_editor' | 'marketing_specialist' | 'customer_service' | 'demo_coordinator';
    role: 'admin' | 'moderator' | 'user';
  }>({
    email: '',
    password: '',
    full_name: '',
    employee_type: 'customer_service',
    role: 'user'
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const { toast } = useToast();

  const employeeTypes = [
    { value: 'admin', label: 'Administrator', icon: Crown },
    { value: 'manager', label: 'Manager', icon: Shield },
    { value: 'content_editor', label: 'Content Editor', icon: FileText },
    { value: 'marketing_specialist', label: 'Marketing Specialist', icon: BarChart3 },
    { value: 'customer_service', label: 'Customer Service', icon: User },
    { value: 'demo_coordinator', label: 'Demo Coordinator', icon: Users }
  ];

  const permissionTypes = [
    { value: 'dashboard_view', label: 'View Dashboard', icon: BarChart3 },
    { value: 'analytics_view', label: 'View Analytics', icon: BarChart3 },
    { value: 'leads_view', label: 'View Demo Requests', icon: Eye },
    { value: 'leads_manage', label: 'Manage Demo Requests', icon: Settings },
    { value: 'content_view', label: 'View Website Content', icon: Eye },
    { value: 'content_edit', label: 'Edit Website Content', icon: FileText },
    { value: 'blog_view', label: 'View Blog', icon: Eye },
    { value: 'blog_edit', label: 'Edit Blog', icon: FileText },
    { value: 'preview_view', label: 'View Live Preview', icon: Eye },
    { value: 'user_management_view', label: 'View Users', icon: Eye },
    { value: 'user_management_edit', label: 'Manage Users', icon: Settings },
    { value: 'system_settings_view', label: 'View Settings', icon: Eye },
    { value: 'system_settings_edit', label: 'Edit Settings', icon: Settings }
  ];

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch profiles with their roles and employee types
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          full_name,
          created_at
        `);

      if (profilesError) throw profilesError;

      // Fetch user roles with employee types
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role, employee_type');

      if (rolesError) throw rolesError;

      // Fetch user permissions
      const { data: userPermissions, error: permissionsError } = await supabase
        .from('user_permissions')
        .select('user_id, permission');

      if (permissionsError) throw permissionsError;

      // Combine profiles with roles and permissions
      const usersWithRoles = profiles?.map(profile => {
        const userRole = userRoles?.find(role => role.user_id === profile.id);
        const permissions = userPermissions?.filter(perm => perm.user_id === profile.id).map(p => p.permission) || [];
        return {
          ...profile,
          role: userRole?.role || 'user',
          employee_type: userRole?.employee_type || 'customer_service',
          permissions
        };
      }) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error loading users",
        description: "Failed to load user data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createUser = async () => {
    try {
      // Create the user through Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserForm.email,
        password: newUserForm.password,
        options: {
          data: {
            full_name: newUserForm.full_name
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');

      // Create profile entry
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: newUserForm.email,
          full_name: newUserForm.full_name
        });

      if (profileError) throw profileError;

      // Create role and employee type entry
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: newUserForm.role,
          employee_type: newUserForm.employee_type
        });

      if (roleError) throw roleError;

      // Add permissions
      if (selectedPermissions.length > 0) {
        const currentUser = await supabase.auth.getUser();
        const { error: permissionsError } = await supabase
          .from('user_permissions')
          .insert(
            selectedPermissions.map(permission => ({
              user_id: authData.user.id,
              permission: permission as any,
              granted_by: currentUser.data.user?.id
            }))
          );

        if (permissionsError) throw permissionsError;
      }

      toast({
        title: "User created successfully",
        description: `${newUserForm.full_name} has been added as ${newUserForm.employee_type}`,
      });

      // Reset form
      setNewUserForm({
        email: '',
        password: '',
        full_name: '',
        employee_type: 'customer_service',
        role: 'user'
      });
      setSelectedPermissions([]);
      setIsAddDialogOpen(false);
      fetchUsers();

    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Error creating user",
        description: error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive"
      });
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    try {
      // Check if user already has a role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: newRole
          });

        if (error) throw error;
      }

      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}`,
      });

      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error updating role",
        description: "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete from user_roles first (foreign key constraint)
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Delete from profiles
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "User deleted",
        description: "User has been successfully deleted",
      });

      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error deleting user",
        description: "Failed to delete user",
        variant: "destructive"
      });
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    fetchUsers();

    // Listen for changes to profiles table
    const profilesChannel = supabase
      .channel('profiles-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        console.log('Profiles table changed, refreshing users...');
        fetchUsers();
      })
      .subscribe();

    // Listen for changes to user_roles table
    const rolesChannel = supabase
      .channel('user-roles-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_roles'
      }, () => {
        console.log('User roles changed, refreshing users...');
        fetchUsers();
      })
      .subscribe();

    // Listen for changes to user_permissions table
    const permissionsChannel = supabase
      .channel('user-permissions-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_permissions'
      }, () => {
        console.log('User permissions changed, refreshing users...');
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(profilesChannel);
      supabase.removeChannel(rolesChannel);
      supabase.removeChannel(permissionsChannel);
    };
  }, [fetchUsers]);

  // Load default permissions when employee type changes
  const loadDefaultPermissions = async (employeeType: string) => {
    try {
      const { data, error } = await supabase.rpc('get_default_permissions', {
        _employee_type: employeeType as any
      });

      if (error) throw error;
      setSelectedPermissions(data || []);
    } catch (error) {
      console.error('Error loading default permissions:', error);
    }
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected':
        return <Wifi className="h-3 w-3 text-success" />;
      case 'syncing':
        return <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getEmployeeTypeIcon = (type: string) => {
    const employeeType = employeeTypes.find(et => et.value === type);
    if (employeeType) {
      const Icon = employeeType.icon;
      return <Icon className="h-4 w-4" />;
    }
    return <User className="h-4 w-4" />;
  };

  const getEmployeeTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'manager':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'content_editor':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'marketing_specialist':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'demo_coordinator':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'moderator':
        return <Shield className="h-4 w-4 text-blue-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEditUser = (user: UserProfile) => {
    setEditingUser(user);
    setNewRole(user.role || 'user');
    setIsEditDialogOpen(true);
  };

  const handleSaveRole = async () => {
    if (editingUser) {
      await updateUserRole(editingUser.id, newRole);
      setIsEditDialogOpen(false);
      setEditingUser(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-3/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 space-y-8 p-8 max-w-7xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
                User Management
              </h2>
              <p className="text-lg text-muted-foreground">Manage user accounts, roles, and permissions</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => setIsAddDialogOpen(true)} className="glass border-0 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-glow hover:shadow-primary/25 transition-all duration-300">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  {getSyncStatusIcon()}
                </div>
                <Badge variant="outline" className="glass border-0 text-sm bg-gradient-to-r from-primary/10 to-primary-light/10 text-primary border-primary/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    {syncStatus === 'connected' ? 'Live Updates' : 'Offline'}
                  </div>
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-primary/25 transition-all duration-300 group hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary-light/10 group-hover:from-primary/20 group-hover:to-primary-light/20 transition-all duration-300">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-right">
                    <CardTitle className="text-sm font-medium text-muted-foreground mb-2">Total Users</CardTitle>
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                      {users.length}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">
                  {users.length === 1 ? 'Registered user' : 'Registered users'}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-chart-3/25 transition-all duration-300 group hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-3/10 to-chart-3/20 group-hover:from-chart-3/20 group-hover:to-chart-3/30 transition-all duration-300">
                    <Crown className="h-6 w-6 text-chart-3" />
                  </div>
                  <div className="text-right">
                    <CardTitle className="text-sm font-medium text-muted-foreground mb-2">Administrators</CardTitle>
                    <div className="text-3xl font-bold bg-gradient-to-r from-chart-3 to-chart-4 bg-clip-text text-transparent">
                      {users.filter(user => user.role === 'admin').length}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">System administrators</p>
              </CardContent>
            </Card>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-chart-5/25 transition-all duration-300 group hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-5/10 to-chart-5/20 group-hover:from-chart-5/20 group-hover:to-chart-5/30 transition-all duration-300">
                    <Settings className="h-6 w-6 text-chart-5" />
                  </div>
                  <div className="text-right">
                    <CardTitle className="text-sm font-medium text-muted-foreground mb-2">Active Roles</CardTitle>
                    <div className="text-3xl font-bold bg-gradient-to-r from-chart-5 to-chart-1 bg-clip-text text-transparent">
                      {users.filter(user => user.role !== 'user').length}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">Special permissions granted</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
          <Card className="glass border-0 shadow-glow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">User Directory</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No users found</p>
                </div>
              ) : (
                <div className="glass border-0 rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Employee Type</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.full_name || 'No name set'}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`flex items-center gap-1 w-fit ${getEmployeeTypeBadgeColor(user.employee_type || 'customer_service')}`}>
                              {getEmployeeTypeIcon(user.employee_type || 'customer_service')}
                              {employeeTypes.find(et => et.value === user.employee_type)?.label || 'Customer Service'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`flex items-center gap-1 w-fit ${getRoleBadgeColor(user.role || 'user')}`}>
                              {getRoleIcon(user.role || 'user')}
                              {user.role || 'user'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {user.permissions?.length || 0} permissions
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteUser(user.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Bottom spacing for better UX */}
        <div className="h-16"></div>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with specific role and permissions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={newUserForm.full_name}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUserForm.password}
                onChange={(e) => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Minimum 8 characters"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeType">Employee Type</Label>
                <Select 
                  value={newUserForm.employee_type} 
                  onValueChange={(value: 'admin' | 'manager' | 'content_editor' | 'marketing_specialist' | 'customer_service' | 'demo_coordinator') => {
                    setNewUserForm(prev => ({ ...prev, employee_type: value }));
                    loadDefaultPermissions(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee type" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newUserForm.role} 
                  onValueChange={(value: 'admin' | 'moderator' | 'user') => 
                    setNewUserForm(prev => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        User
                      </div>
                    </SelectItem>
                    <SelectItem value="moderator">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Moderator
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4" />
                        Administrator
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                {permissionTypes.map((permission) => (
                  <div key={permission.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={permission.value}
                      checked={selectedPermissions.includes(permission.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPermissions(prev => [...prev, permission.value]);
                        } else {
                          setSelectedPermissions(prev => prev.filter(p => p !== permission.value));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={permission.value} className="text-sm flex items-center gap-2">
                      <permission.icon className="h-3 w-3" />
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createUser} disabled={!newUserForm.email || !newUserForm.password || !newUserForm.full_name}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
            <DialogDescription>
              Change the role for {editingUser?.full_name || editingUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select value={newRole} onValueChange={(value: 'admin' | 'moderator' | 'user') => setNewRole(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      User
                    </div>
                  </SelectItem>
                  <SelectItem value="moderator">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Moderator
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      Administrator
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
