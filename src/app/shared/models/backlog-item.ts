export interface BacklogItem {
  id: number;
  title: string;
  as?: string;
  want?: string;
  so?: string;
  requirements?: string[];
  priority?: number;
}
