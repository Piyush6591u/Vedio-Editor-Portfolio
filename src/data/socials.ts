export type Social = {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: string;
  color: string;
};

export const socials: Social[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@alexmercer.edits",
    url: "https://instagram.com/alexmercer.edits",
    icon: "Instagram",
    color: "#E1306C",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "Alex Mercer Studio",
    url: "https://youtube.com/@alexmercerstudio",
    icon: "Youtube",
    color: "#FF0000",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: "+1 (555) 000-0000",
    url: "https://wa.me/15550000000",
    icon: "MessageCircle",
    color: "#25D366",
  },
  {
    id: "discord",
    label: "Discord",
    handle: "alexmercer#0001",
    url: "https://discord.com/users/alexmercer",
    icon: "MessageSquare",
    color: "#5865F2",
  },
  {
    id: "twitter",
    label: "Twitter / X",
    handle: "@alexmercer_edit",
    url: "https://twitter.com/alexmercer_edit",
    icon: "Twitter",
    color: "#1DA1F2",
  },
];
