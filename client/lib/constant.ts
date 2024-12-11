type Link = { name: string; path: string };

export const navLinks: Link[] = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "about",
    path: "/about",
  },
  {
    name: "contact us",
    path: "/contact-us",
  },
];

type Paragraph = { [key: number]: string };

export const hero_list: Paragraph[] = [
  { 1: "Rate Your Tutors" },
  { 2: "Share Feedbacks" },
  { 3: "Improve Your Teachings" },
];

export const givemestars: Paragraph[] = [{ 1: "Give Me Stars" }];
