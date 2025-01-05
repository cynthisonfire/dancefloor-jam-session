import { useEffect, useState } from "react";
import { User, Users, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

type Profile = {
  id: string;
  username: string;
  created_at: string;
};

type AnonymousUser = {
  id: string;
  username: string;
  gender: string;
  created_at: string;
};

export function AppSidebar() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [anonymousUsers, setAnonymousUsers] = useState<AnonymousUser[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Fetch regular profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
    } else {
      setProfiles(profilesData || []);
    }

    // Fetch anonymous users
    const { data: anonymousData, error: anonymousError } = await supabase
      .from("anonymous_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (anonymousError) {
      console.error("Error fetching anonymous users:", anonymousError);
    } else {
      setAnonymousUsers(anonymousData || []);
    }
  };

  const handleSignOut = async () => {
    const anonymousUser = localStorage.getItem('anonymousUser');
    
    if (anonymousUser) {
      localStorage.removeItem('anonymousUser');
      navigate("/auth");
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    } else {
      navigate("/auth");
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Users className="mr-2" />
            Users Online
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profiles.map((profile) => (
                <SidebarMenuItem key={profile.id}>
                  <SidebarMenuButton>
                    <User />
                    <span>{profile.username}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {anonymousUsers.map((user) => (
                <SidebarMenuItem key={user.id}>
                  <SidebarMenuButton>
                    <User />
                    <span>{user.username} (Guest)</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut}>
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}