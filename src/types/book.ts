export interface BookChapter {
  id: string;
  topicId: string;
  title: string;
  order: number;
  contentFile: string;
  estimatedMinutes: number;
  tags: string[];
}

export interface BookTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  chapters: string[];
}
