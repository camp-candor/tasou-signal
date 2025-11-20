interface AcceptanceCriteria {
  name: string;
  description: string;
  sub_items: string[];
}

interface Relationships {
  waiting: string[];
  blocking: string[];
  blocked_by: string[];
}

interface Attributes {
  priority: string;
  time_estimate: string;
  tags: string[];
  epic: string;
  component: string;
}

export interface Task {
  name: string;
  user_story: string;
  context_and_constraints: string;
  acceptanceCriteriaChecklist: AcceptanceCriteria[];
  subtasks: Record<string, string[]>;
  relationships: Relationships;
  attributes: Attributes;
}

export const taskClickup = (markdown: string): Task => {
  const lines = markdown.split('\n');

  const getSection = (title: string) => {
    const start = lines.findIndex((line) => line.includes(title));
    if (start === -1) return [];
    const end = lines.findIndex((line, index) => index > start && line.startsWith('### **'));
    return lines.slice(start + 1, end === -1 ? lines.length : end);
  };

  const clean = (str: string) => str.replace(/### \*\*|\*\*|\[ \]/g, '').trim();

  const name = clean(lines.find((line) => line.startsWith('### **Task Name:'))?.split(':')[1] || '');

  const descriptionLines = getSection('Task Description');
  const userStoryIndex = descriptionLines.findIndex((line) => line.includes('User Story'));
  const contextIndex = descriptionLines.findIndex((line) => line.includes('Context & Technical Constraints'));

  const user_story = descriptionLines
    .slice(userStoryIndex + 1, contextIndex)
    .join(' ')
    .replace(/\*\*|/g, '')
    .trim();
  const context_and_constraints = descriptionLines
    .slice(contextIndex + 1)
    .join(' ')
    .replace(/\*\*|/g, '')
    .trim();

  const acceptanceCriteriaLines = getSection('Acceptance Criteria');
  const acceptanceCriteriaChecklist: AcceptanceCriteria[] = [];
  acceptanceCriteriaLines.forEach((line) => {
    if (line.startsWith('*   [ ] **')) {
      const parts = line.replace('*   [ ] **', '').split(':**');
      acceptanceCriteriaChecklist.push({ name: parts[0], description: parts[1] || '', sub_items: [] });
    } else if (line.match(/^\s{1,4}\d\./)) {
      const lastItem = acceptanceCriteriaChecklist[acceptanceCriteriaChecklist.length - 1];
      if (lastItem) {
        lastItem.sub_items.push(line.replace(/\s{1,4}\d\.\s/, ''));
      }
    }
  });

  const subtaskLines = getSection('Subtasks');
  const subtasks: Record<string, string[]> = {};
  let currentCategory = '';
  subtaskLines.forEach((line) => {
    if (line.startsWith('**')) {
      currentCategory = clean(line);
      subtasks[currentCategory] = [];
    } else if (line.startsWith('*   [ ]')) {
      subtasks[currentCategory].push(line.replace('*   [ ] ', ''));
    }
  });

  const relationshipLines = getSection('Relationships');
  const relationships: Relationships = { waiting: [], blocking: [], blocked_by: [] };
  relationshipLines.forEach((line) => {
    const [key, value] = line.split(':').map((s) => s.replace('*   ', '').trim());
    if (key === 'Blocked By') relationships.blocked_by.push(value);
    if (key === 'Blocking') relationships.blocking.push(value);
  });

  const attributeLines = getSection('Attributes');
  const attributes: Attributes = { priority: '', time_estimate: '', tags: [], epic: '', component: '' };
  attributeLines.forEach((line) => {
    const [key, value] = line.split(':').map((s) => s.replace('*   ', '').trim());
    if (key === 'Priority') attributes.priority = value.replace('🔵 **', '').replace('**', '');
    if (key === 'Time Estimate') attributes.time_estimate = value;
    if (key === 'Tags') attributes.tags = value.split(',').map((s) => s.trim());
    if (key === 'Epic') attributes.epic = value;
    if (key === 'Component') attributes.component = value;
  });

  return {
    name,
    user_story,
    context_and_constraints,
    acceptanceCriteriaChecklist,
    subtasks,
    relationships,
    attributes,
  };
};
