/**
 * Firebase Firestore helper functions for managing projects and tasks
 * NOTE:
 * - This file assumes:
 *   - projects/{projectId}.leaderId = Firebase Auth UID (string)
 *   - memberProfiles will eventually use UID as document ID
 * - Firestore Security Rules are the final authority for permissions
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query
} from "firebase/firestore";

import { db } from "./firestore";

/* =========================
   PROJECTS
========================= */

/**
 * Fetch all projects (read-only for members)
 */
export async function getAllProjects() {
  const projectsRef = collection(db, "projects");
  const snapshot = await getDocs(projectsRef);

  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
}

/**
 * Fetch a single project by ID
 */
export async function getProjectById(projectId) {
  const projectRef = doc(db, "projects", projectId);
  const snap = await getDoc(projectRef);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data()
  };
}

/**
 * Convenience helper (UI only)
 * Checks if given user is leader of project
 *
 */
export async function isProjectLeader(projectId, userUid) {
  const project = await getProjectById(projectId);
  if (!project) return false;

  return project.leaderId === userUid;
}

/* =========================
   TASKS (SUBCOLLECTION)
========================= */

/**
 * Fetch all tasks for a project
 */
export async function getProjectTasks(projectId) {
  const tasksRef = collection(db, "projects", projectId, "tasks");
  const snapshot = await getDocs(tasksRef);

  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
}

/**
 * Add a new task
 * (Allowed only for project leader by Firestore rules)
 */
export async function addTask(projectId, taskData) {
  const tasksRef = collection(db, "projects", projectId, "tasks");

  return await addDoc(tasksRef, {
    title: taskData.title,
    status: taskData.status || "in-progress",
    startDate: taskData.startDate || serverTimestamp(),
    deadline: taskData.deadline || null,
    completedAt: null,
    createdAt: serverTimestamp()
  });
}

/**
 * Update task fields (leader-only)
 */
export async function updateTask(projectId, taskId, updates) {
  const taskRef = doc(db, "projects", projectId, "tasks", taskId);

  return await updateDoc(taskRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

/**
 * Mark task as completed
 */
export async function completeTask(projectId, taskId) {
  const taskRef = doc(db, "projects", projectId, "tasks", taskId);

  return await updateDoc(taskRef, {
    status: "completed",
    completedAt: serverTimestamp()
  });
}

/**
 * Delete a task (leader-only)
 */
export async function deleteTask(projectId, taskId) {
  const taskRef = doc(db, "projects", projectId, "tasks", taskId);
  return await deleteDoc(taskRef);
}
