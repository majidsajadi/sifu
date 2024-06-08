import { Octokit } from "octokit";

export const github = new Octokit().rest.repos;
