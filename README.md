# 🎓 AI-Powered Learning Path Generator

This is a full-stack web application that allows users to generate a personalized learning path based on their **skills** and **interests**, and provides curated resources to start learning right away. The user inputs and AI-generated results are securely stored in **Azure Cosmos DB (MongoDB API)**. The app leverages **Azure OpenAI**, **ReactJS**, and **Azure Functions (Node.js)** for a seamless and scalable experience.

---

## 🚀 Features

- 🔍 Enter your **Name**, **Skills**, and **Interests**
- 🤖 Get a **personalized learning path** using Azure OpenAI
- 📚 View **recommended resources** with documentation & video tutorials
- ☁️ **Data is stored** in Azure Cosmos DB (MongoDB API)
- 🔐 Built with secure Azure keys for API and database access

---

## 🛠️ Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | ReactJS, JavaScript, CSS      |
| Backend    | Azure Functions (Node.js)     |
| AI Engine  | Azure OpenAI API              |
| Database   | Azure Cosmos DB (MongoDB API) |

---

## 🧠 How It Works

1. User enters their details in a simple form.
2. On clicking “Generate Learning Path”:
   - The frontend sends a POST request to an Azure Function.
   - Azure Function processes input, calls Azure OpenAI, and prepares the output.
   - Recommended resources are matched from a predefined list.
   - Results are returned to the frontend **and stored** in Azure Cosmos DB.
3. The user sees:
   - A custom study plan.
   - Learning resource links (docs + YouTube).

---

## 🧾 To run locally
 Frontend
cd frontend
yarn install
yarn dev

 Backend
cd backend
func start
 
