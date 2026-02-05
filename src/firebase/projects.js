/**
 * projects.js
 * -----------------------------------
 * Service layer for Projects & Tasks
 *
 * Assumptions:
 * - projects/{projectId}.leaderId === Auth UID (string)
 * - Firestore Rules are the final authority
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "./firestore";

/* =========================
   PROJECTS
========================= */

/**
 * Fetch all projects
 */
export async function getAllProjects() {
  const projectsRef = collection(db, "projects");
  const snapshot = await getDocs(projectsRef);

  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
}

/**
 * Check if user is leader of a project
 * (UX-level check only)
 */
export async function isProjectLeader(projectId, userId) {
  const projectRef = doc(db, "projects", projectId);
  const snap = await getDoc(projectRef);

  if (!snap.exists()) return false;

  return snap.data().leaderId === userId;
}

/* =========================
   TASKS
========================= */

/**
 * Fetch tasks of a specific project
 */
export async function getProjectTasks(projectId) {
  const tasksRef = collection(db, "projects", projectId, "tasks");
  const snapshot = await getDocs(tasksRef);

  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
}

/**
 * Add new task (leader-only)
 */
export async function addTask(projectId, taskData, userId) {
  const isLeader = await isProjectLeader(projectId, userId);
  if (!isLeader) {
    throw new Error("Only project leader can add tasks");
  }

  const tasksRef = collection(db, "projects", projectId, "tasks");

  return await addDoc(tasksRef, {
    title: taskData.title,
    status: "in-progress",
    startDate: taskData.startDate || serverTimestamp(),
    deadline: taskData.deadline || null,
    completedAt: null,
    createdAt: serverTimestamp()
  });
}

/**
 * Update task (leader-only)
 */
export async function updateTask(projectId, taskId, updates, userId) {
  const isLeader = await isProjectLeader(projectId, userId);
  if (!isLeader) {
    throw new Error("Only project leader can update tasks");
  }

  const taskRef = doc(db, "projects", projectId, "tasks", taskId);

  return await updateDoc(taskRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

/**
 * Mark task as completed
 */
export async function completeTask(projectId, taskId, userId) {
  const isLeader = await isProjectLeader(projectId, userId);
  if (!isLeader) {
    throw new Error("Only project leader can complete tasks");
  }

  const taskRef = doc(db, "projects", projectId, "tasks", taskId);

  return await updateDoc(taskRef, {
    status: "completed",
    completedAt: serverTimestamp()
  });
}

/**
 * Delete task (leader-only)
 */
export async function deleteTask(projectId, taskId, userId) {
  const isLeader = await isProjectLeader(projectId, userId);
  if (!isLeader) {
    throw new Error("Only project leader can delete tasks");
  }

  const taskRef = doc(db, "projects", projectId, "tasks", taskId);
  return await deleteDoc(taskRef);
}
