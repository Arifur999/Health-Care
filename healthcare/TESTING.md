# Testing

Unit tests use [Vitest](https://vitest.dev/) and cover pure, regression-prone
logic: currency formatting, the video-consultation link builder, the doctor
application validation schema, and the EN/বাংলা translation dictionary
(guards against a key existing in one locale but not the other).

## Running the tests

```bash
npx vitest run        # one-off run (fetches vitest if it isn't installed)
npx vitest            # watch mode
```

If Vitest is installed locally you can also use the package scripts:

```bash
npm test              # vitest run
npm run test:watch    # vitest (watch)
```

## Notes

- Test files (`src/**/*.test.ts`) and `vitest.config.ts` are excluded from the
  Next.js build in `tsconfig.json`, so they never affect production builds.
- Vitest is intentionally **not** added to `package.json` dependencies to keep
  the pnpm lockfile (used by the Vercel deploy) untouched. Install it as a
  dev dependency locally if you prefer (`pnpm add -D vitest`) once you can run
  pnpm, and it will be picked up automatically.
- Tests are pure/unit only — no database or network — so they run fast and
  don't need the backend or Docker.
