import { ItemType } from './itemType';
import { Submission } from './submission';

export interface Item {
  id: string;
  item_type_id: string;
  content: string;
  language?: string;
  status: string;
  variance?: number;
  result_score?: number;
  open_reviews_level_1: number;
  open_reviews_level_2: number;
  open_reviews: number;
  open_timestamp?: string;
  close_timestamp?: string;
  in_progress_reviews_level_1: number;
  in_progress_reviews_level_2: number;
  item_type: ItemType;
  submissions: Submission[];
}
