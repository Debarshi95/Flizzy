[![Actions Status](https://github.com/Debarshi95/Flizzy/workflows/Build%20and%20Deploy/badge.svg)](https://github.com/Debarshi95/Flizzy/actions)

# FLizzy

A ReactJS based EMS.

## Demo

### Frontend

[Deployed on Netlify using github actions](https://debarshib-flizzy.netlify.app)

### Backend

[Deployed on Vercel](https://github.com/Debarshi95/Flizzy-Backend)

## Features:

- Role based authentication facility for Employee & HR
- Authenticated Employees can
  - see their Leave records
  - Apply for a leave
- - Authenticated HR can
  - see employees list
  - Create new Employee
  - Approve/Reject Employee leave request
- LazyLoading/Code-splitting of components to dynamically load at runtime
- Error management using ErrorBoundary to catch and show fallback UI.
- Loading Spinner when fetching initial data.
- Responsive UI for all screens (Desktop, Tablet, Mobile)

## Built using:

- [ReactJS](https://reactjs.org/) - Frontend framework
- [React Router](https://reactrouter.com/) - For routing & navigation
- [React-Hot-Toast](https://react-hot-toast.com) - to show Toast Notifications
- [ApolloGraphql](https://www.apollographql.com) - To make network to backend graphql server

## Run Locally

- Clone the project
  `git clone https://github.com/Debarshi95/Flizzy.git`
- Go to the project directory
- cd flizzy
- Install dependencies
  `yarn`
- Create a **.env** file
- Create a project inside Google Firebase and export the configuration
- Add the following configuration to your .env file

```
REACT_APP_APOLLO_URI="Backend server url"
```

- Start the server
  `yarn start`
