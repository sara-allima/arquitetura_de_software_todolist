import { z } from "zod";

export enum EMAIL_SUBJECTS {
    "TASK_CREATED_SUBJECT" = "Tarefa Criada!",
    "TASK_UPDATED_SUBJECT" = "Tarefa Atualizada!",
    "TASK_DELETED_SUBJECT" = "Tarefa Deletada!",
}

export enum EMAIL_CONTENT {
    "TASK_CREATED_CONTENT" = "Uma nova tarefa foi criada! Confira seu quadro Kanban para mais detalhes.",
    "TASK_UPDATED_CONTENT" = "Sua tarefa foi atualizada! Confira seu quadro Kanban para mais detalhes.",
    "TASK_DELETED_CONTENT" = "Uma tarefa foi deletada! Confira seu quadro Kanban para mais detalhes.",
}