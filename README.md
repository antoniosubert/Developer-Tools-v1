Here's a well-formatted README for your GitHub repository:

````markdown
# Developer Tools Collection

A comprehensive collection of web-based tools for developers, designers, and other professionals. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🛠️ **Developer Tools**:

  - **Network Tools**: Ping Test, Client IP Lookup
  - **Development Tools**: JSON Formatter, Regex Tester, API Request Builder
  - **Text Tools**: Markdown Previewer, Base64 Encoder/Decoder
  - **Date & Time**: Time Zone Converter, Date Difference Calculator, "What Week?" Tool
  - **Calculators**: BMI Calculator, Loan Calculator, Tip Calculator
  - **Converters**: Unit Converter, RGB to HEX
  - **Utilities**: PDF Merger, QR Generator, UUID Generator
  - **And more...**

- 💻 **Modern Tech Stack**:

  - **Next.js 14** with App Router
  - **TypeScript** for type safety
  - **Tailwind CSS** for styling
  - **Shadcn/UI** components
  - **Firebase Hosting**

- 🎨 **User Experience**:
  - Clean, modern interface
  - Dark mode support
  - Responsive design
  - Fast, client-side calculations

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/antoniosubert/dev-tools-collection.git
   cd dev-tools-collection
   ```
````

2. **Install dependencies**:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env` file with your Firebase configuration:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

To deploy to Firebase:

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:

   ```bash
   firebase login
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## Project Structure

```
src/
├── app/
│   ├── api/         # API routes
│   ├── tools/       # Tool pages
│   └── page.tsx     # Home page
├── components/
│   ├── tools/       # Tool-specific components
│   └── ui/          # Reusable UI components
└── lib/             # Utilities and configurations
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)

```

This README provides an organized overview of your project, including installation steps, project structure, deployment instructions, and contribution guidelines.
```
