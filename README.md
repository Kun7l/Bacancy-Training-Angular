# HireTrack

**Creator:** Krunal Khairanar

## Project Details
- **Angular Version:** v20.0.5
- **Supabase Project URL:** https://rvegpevpxsmfjrceuqhr.supabase.co
- **Vercel Live URL:** https://hire-track-chi.vercel.app/dashboard

## Setup Environment Variables

Before running the application, you need to set up your environment variables. 
You can use the built-in npm script to automatically create your environment file from the provided example:

```bash
npm run setup:env
```

This script will safely copy `environment.example.ts` to `environment.ts` in your `src/app/environments/` directory. Once created, open the `environment.ts` file and fill in your specific credentials and variables.

## How to Run locally

The app has been configured so that it runs out-of-the-box simply by checking out the branch and running the commands below:

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.
