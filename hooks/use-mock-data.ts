"use client";

import { useEffect, useState } from "react";
import type { Project, Deployment, Domain, CielEvent, Workspace, TeamMember } from "@/types";
import {
  getProjects,
  getProject,
  getDeployments,
  getDomains,
  getEvents,
  getWorkspace,
  getTeamMembers,
} from "@/lib/data";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => { getProjects().then(setProjects); }, []);
  return projects;
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | undefined>();
  useEffect(() => { getProject(id).then(setProject); }, [id]);
  return project;
}

export function useDeployments(projectId?: string) {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  useEffect(() => { getDeployments(projectId).then(setDeployments); }, [projectId]);
  return deployments;
}

export function useDomains(projectId?: string) {
  const [domains, setDomains] = useState<Domain[]>([]);
  useEffect(() => { getDomains(projectId).then(setDomains); }, [projectId]);
  return domains;
}

export function useEvents(projectId?: string) {
  const [events, setEvents] = useState<CielEvent[]>([]);
  useEffect(() => { getEvents(projectId).then(setEvents); }, [projectId]);
  return events;
}

export function useWorkspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  useEffect(() => { getWorkspace().then(setWorkspace); }, []);
  return workspace;
}

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  useEffect(() => { getTeamMembers().then(setMembers); }, []);
  return members;
}
