# Issue Tracker

![Issue Tracker Dashboard](https://raw.githubusercontent.com/ethan-yz-hao/issue-tracker/main/images/dashboard.png)

This application, built using Next.js and deployed on Vercel, provides a dynamic issue tracking system that allows users to post and update issues in Markdown format. It features a modern, responsive design and is equipped with robust backend technologies to ensure efficient data management.

Deployed on Vercel: Image Gallery[https://issue-tracker-gamma-six.vercel.app/]

## Features

### Frontend
- **Markdown Editor**: Utilizes a Markdown editor for issue descriptions, allowing for rich text formatting.
  - ![Issue Tracker Markdown Editor](https://raw.githubusercontent.com/ethan-yz-hao/issue-tracker/main/images/add.png)
- **Sorting and Filtering**: Advanced sorting and filtering capabilities, with pagination handled by the backend to optimize data retrieval.
  - ![Issue Tracker List](https://raw.githubusercontent.com/ethan-yz-hao/issue-tracker/main/images/list.png)
- **Skeleton Loading**: Implements skeleton loading screens as placeholders while data is being fetched.
- **Issue Summary with Charts**: Visual representation of issue data through charts, powered by Recharts.
- **Responsive Design**: Fully responsive layout that adapts to different screen sizes for optimal user experience.
  - <img src="https://raw.githubusercontent.com/ethan-yz-hao/issue-tracker/main/images/responsive.png" width="50%" alt="Issue Tracker Responsive Layout">

### Backend
- **Create, Read, Update, and Delete**: Full CRUD capabilities for managing issues.
- **OAuth2 Login with Google**: Secure authentication using Google accounts through OAuth2, implemented with NextAuth.
- **Error Handling**: Integrates Sentry for real-time error tracking and management.

## Technologies

### Frontend
- **Radix UI & Tailwind CSS**: For UI components and styling.
- **react-simplemde-editor**: For Markdown editing capabilities.
- **axios & tanstack/react-query**: For fetching data and managing server state.
- **react-hook-form**: For form management, adding and updating issues.
- **react-loading-skeleton & react-hot-toast**: For loading indicators and toast notifications.
- **Recharts**: For creating dynamic and responsive charts for data visualization.

### Backend
- **Prisma & MySQL**: For ORM and seamless data integration.
- **zod**: For schema validation to ensure data integrity.
- **NextAuth & JWT**: For handling OAuth2 authentication and maintaining secure user sessions.
- **Sentry**: For error tracking and monitoring application health.

### Deployment
- **Vercel**: For deployment and scaling of the web application.
- **Amazon EC2**: For hosting the MySQL database and managing data storage.


## Installation

1. Clone the repository and navigate to the project directory.

```bash
git clone https://github.com/ethan-yz-hao/issue-tracker.git
cd issue-tracker
```

2. Install the dependencies.

```bash
npm install
```

3. Start the development server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
```bash
npm run dev
```

