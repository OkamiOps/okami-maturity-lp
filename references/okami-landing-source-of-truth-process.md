# Okami landing source-of-truth process

Use this process whenever Marcos sends a finished landing/design artifact, ZIP, OpenDesign export, or hand-built HTML/CSS to replace an agent-generated surface.

## Rule

The artifact from Marcos becomes the source of truth. Agents should integrate, normalize paths, verify and document — not reinterpret the design from memory.

## Roles

| Level | Owner | Responsibility |
|---|---|---|
| N0 | Diana | Implement/import the frontend exactly from the source package, with only required deploy/runtime adaptations. |
| N1 | Artemis | Gate visual fidelity, runtime behavior, mobile/desktop screenshots, i18n and docs scroll. |
| N2 | Astride | Coordinate, protect source-of-truth, create PR/deploy follow-through, and update durable docs/skills. |
| N0 | Morgana | Mirror the final process/design contract into GitHub/SiYuan when it becomes reusable. |

## Import steps

1. Extract the ZIP to a profile-local evidence folder.
2. Record the file manifest and identify canonical pages (`index`, `/docs`, runtime JS, CSS, assets, fonts).
3. Create a dedicated branch from current `main`.
4. Replace the existing implementation with the supplied artifact.
5. Normalize paths for the deployment target.
6. Keep the custom domain CNAME.
7. Generate or update `DESIGN.md` from the imported code.
8. Build locally.
9. Run browser QA:
   - home desktop/mobile;
   - docs desktop/mobile;
   - docs scroll reaches deep content;
   - no horizontal overflow;
   - no console/page errors;
   - no visible unresolved template markers;
   - correct logo/background grid.
10. Open PR and wait for CI.
11. Merge only after gate approval.
12. Verify live custom domain after deploy.

## Non-negotiable checks

- Do not use `os.okamiops.com` as the default reference when Marcos asked for `okamiagent.com`.
- Do not ship a build-only/grep-only green.
- Do not swap logo variants silently.
- Do not publish partial PT/EN or docs/question coverage.
- Do not leave source-of-truth undocumented.

## Evidence expected

- Extracted source path.
- Branch and PR URL.
- Build output.
- Screenshot paths.
- Live URL checks.
- Updated `DESIGN.md`.
- SiYuan/GitHub documentation handoff when reusable.
