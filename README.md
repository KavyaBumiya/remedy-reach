# Remedy Reach Chatbot Setup & Troubleshooting

## Setup Steps

1. **Install dependencies:**
	 ```
	 npm install
	 ```

2. **Set up your OpenAI API key:**
	 - Copy `.env.example` to `.env` in your project root.
	 - Edit `.env` and replace `your_openai_api_key_here` with your real OpenAI API key.

3. **Allow npm scripts in PowerShell (Windows only):**
	 - Open PowerShell and run:
		 ```powershell
		 Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
		 ```

4. **Start the development server:**
	 ```
	 npm run dev
	 ```

5. **Open your browser:**
	 - Go to the URL shown in your terminal (usually http://localhost:5173)

## Troubleshooting

- **PowerShell script error:**
	- Run the `Set-ExecutionPolicy` command above before running npm commands.
- **Cannot connect to medical assistant service:**
	- Check your `.env` file and API key.
	- Restart the dev server after editing `.env`.
	- Check your internet connection.
- **axios not found:**
	- Run `npm install axios`.
- **Other issues:**
	- Check your browser console for errors and share them with your developer or support.

---
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f04ab134-b9ec-4de4-b055-c2bb4f8f491d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f04ab134-b9ec-4de4-b055-c2bb4f8f491d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f04ab134-b9ec-4de4-b055-c2bb4f8f491d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
