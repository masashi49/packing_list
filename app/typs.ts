interface ChecklistItem {
  text: string;
  checked: boolean;
}

export interface Checklist {
  id: string;
  name: string;
  items: ChecklistItem[];
}

export type ViewType = "list" | "detail" | "create" | "edit";
