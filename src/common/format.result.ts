export interface PaginatedResult {
    data: unknown[];
    totalCount: number;
    page: number;
    limit: number;
}

export interface TaskReport {
    total: number;
    completed: number;
    remaining?: number;
    average?: number;
}

export interface ReportFormat {
    createdAt: Date;
    report: TaskReport | any ;
}