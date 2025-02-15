export type TaskStatus = "Todo" | "In-Progress" | "Completed";

export interface Task {
    id: string ;
    name?: string;
    dueDate?: string;
    status?: TaskStatus;
    category?: string;
    description?: string;
    attachments?: File[];
    tags?: string[];
}