/**
 * projects.js
 * -----------------------------------
 * Service layer for Projects & Tasks
 *
 * Assumptions:
 * - projects/{projectId}.leaderId === Auth UID (string)
 * - tasks.assignedTo === Auth UID
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

import { db } from "./firebase";
/*chairpersonuid is hardcoded for simplicity*/

const CHAIRPERSON_UID = "axdCCJOm2mPQsmpuKEADsvuNO9B2";
/*UX level checks*/

async function isChairperson(userId) {
  return userId === CHAIRPERSON_UID;
}

export async function isProjectLeader(projectId, userId) {
  const projectRef = doc(db, "projects", projectId);
  const snap = await getDoc(projectRef);

  if (!snap.exists()) return false;

  return snap.data().leaderId === userId;
}

async function canManageProject(projectId, userId) {
  if (await isChairperson(userId)) return true;
  return await isProjectLeader(projectId, userId);
}

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

/* =========================
   TASKS
========================= */

/**
 * Fetch tasks of a specific project
 */
//REPLACE
// export async function getProjectTasks(projectId) {
//   const tasksRef = collection(db, "projects", projectId, "tasks");
//   const snapshot = await getDocs(tasksRef);

//   return snapshot.docs.map(d => ({
//     id: d.id,
//     ...d.data()
//   }));
// }
export async function getProjectTasks(projectId) {
  const tasksRef = collection(db, "projects", projectId, "tasks");
  const snapshot = await getDocs(tasksRef);

  return snapshot.docs.map(d => {
    const data = d.data();
    
    // Convert Firestore timestamps to date strings
    const deadlineDate = data.deadline?.toDate ? 
      data.deadline.toDate().toISOString().split('T')[0] : 
      data.deadline || '';
    
    const completedDate = data.completedAt?.toDate ? 
      data.completedAt.toDate().toISOString().split('T')[0] : 
      '';
    
    // Map status from backend format to frontend format
    let displayStatus = data.status || 'In-Progress';
    if (displayStatus === 'in-progress') displayStatus = 'In-Progress';
    if (displayStatus === 'completed') displayStatus = 'Completed';
    if (displayStatus === 'delayed') displayStatus = 'Delayed';
    
    return {
      id: d.id,
      title: data.title || '',
      description: data.description || '',
      date: deadlineDate,  // Frontend expects "date"
      completedDate: completedDate,  // Frontend expects "completedDate"
      status: displayStatus,  // Frontend expects capitalized
      priority: data.priority || 'Medium',
      assignedTo: Array.isArray(data.assignedTo) ? data.assignedTo : [data.assignedTo || ''],
      github: data.github || ''
    };
  });
}

/**
 * Add new task
 * (project leader OR chairperson)
 */
export async function addTask(projectId, taskData, userId) {
  const allowed = await canManageProject(projectId, userId);
  if (!allowed) {
    throw new Error("Not authorized to add tasks");
  }

  const tasksRef = collection(db, "projects", projectId, "tasks");

  return await addDoc(tasksRef, {
    title: taskData.title,
    description: taskData.description || "",
    assignedTo: taskData.assignedTo, // auth UID
    status: "in-progress",
    startDate: taskData.startDate || serverTimestamp(),
    deadline: taskData.deadline || null,
    completedAt: null,
    createdAt: serverTimestamp()
  });
}

/**
 * Update task
 * (leader OR chairperson)
 */
export async function updateTask(projectId, taskId, updates, userId) {
  const allowed = await canManageProject(projectId, userId);
  if (!allowed) {
    throw new Error("Not authorized to update tasks");
  }

  const taskRef = doc(db, "projects", projectId, "tasks", taskId);

  // Explicitly allow only safe fields
  const allowedUpdates = {
    title: updates.title,
    description: updates.description,
    deadline: updates.deadline,
    assignedTo: updates.assignedTo,
    status: updates.status
  };

  return await updateDoc(taskRef, {
    ...allowedUpdates,
    updatedAt: serverTimestamp()
  });
}

/**
 * Mark task as completed
 */
export async function completeTask(projectId, taskId, userId) {
  const allowed = await canManageProject(projectId, userId);
  if (!allowed) {
    throw new Error("Not authorized to complete tasks");
  }

  const taskRef = doc(db, "projects", projectId, "tasks", taskId);

  return await updateDoc(taskRef, {
    status: "completed",
    completedAt: serverTimestamp()
  });
}

/**
 * Delete task
 */
export async function deleteTask(projectId, taskId, userId) {
  const allowed = await canManageProject(projectId, userId);
  if (!allowed) {
    throw new Error("Not authorized to delete tasks");
  }

  const taskRef = doc(db, "projects", projectId, "tasks", taskId);
  return await deleteDoc(taskRef);
}
