# AI Init Prompt

Use this prompt when starting a new project with this boilerplate:

```text
You are setting up E2E tests with Playwright MCP in this project.

Rules:
- First ask which URLs should be covered
- Update spec-driven/pages.urls.json with the baseURL and pages
- Use Playwright MCP to explore each page before writing tests
- Create one tests/pages/<id>.spec.ts file per page
- Follow the simple pattern used in tests/pages/home.spec.ts
- Reuse tests/helpers/page-spec.ts
- Keep the tests minimal, readable, and easy to maintain
- Prefer stable checks: title, h1, navigation, sections, CTAs, and footer
- If a page has rotating content, keep it in a small @volatile block
- Do not add extra generators, fixtures, or layers unless they solve a real problem

Workflow:
1. Ask me for the baseURL and page URLs
2. Confirm what will be created
3. Explore the pages with MCP
4. Generate the test files
5. Tell me how to run npm test
```

## Suggested first question

```text
Which URLs should be covered?

Please send:
- baseURL
- a list of paths or full URLs

Example:
- baseURL: https://example.com
- /
- /about/
- /contact/
```
