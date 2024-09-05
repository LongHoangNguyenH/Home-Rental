<div align="center">
  <br />
    <a href="" target="_blank">
      <img src="https://github.com/adrianhajdin/healthcare/assets/151519281/a7dd73b6-93de-484d-84e0-e7f4e299167b" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Express-black?style=for-the-badge&logoColor=white&logo=express&color=000000" alt="express" />
    <img src="https://img.shields.io/badge/-JavaScript-black?style=for-the-badge&logoColor=black&logo=javascript&color=F7DF1E" alt="javascript" />
    <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logoColor=white&logo=node.js&color=339933" alt="nodejs" />
    <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logoColor=61DAFB&logo=react&color=61DAFB" alt="react" />
  </div>

  <h3 align="center">Home Rental Application</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🤸 [Deployment](#deploymentt)

## <a name="introduction">🤖 Introduction</a>

This website is a project about home rent, and these rooms are assorted by many factors like title, location,... The users can custom follow their needs by selecting the title or select count of rooms, bedrooms, bathrooms,... and include credentials. It’s a demo program by following a real application

## <a name="tech-stack">⚙️ Tech Stack</a>

- React.js
- Express
- Javascript
- Mongodb
- Nodejs
- Redux

## <a name="features">🔋 Features</a>

👉 **Register as a Guest**: Users can sign up and create a personal account.

👉 **Book a New Appointment**: User can make a reservation at their convenience and can book multiple appointments.

👉 **Become a host**: User also can become a host to rent out their property.

👉 **Make their wish list**: Admins can confirm and set appointment times to ensure they are properly scheduled.

👉 **Managing by trip list**: Administrators have the ability to cancel any appointment as needed.

👉 **Make their properties list**: Patients receive SMS notifications to confirm their appointment details.

👉 **Make their Reservation list**: The application works seamlessly on all device types and screen sizes.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/LongHoangNguyenH/Home-Rental

```

**Installation**

Install the project dependencies using npm:

```bash
cd Home-Rental/server
npm install
```

```bash
cd Home-Rental/client
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
MONGO_URL=
JWT_SECRET=
```

<!-- Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/). -->

**Running the Project**

run this command below from both client and server to start the application

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="deployment">🤖 Deployment</a>

To try this application, you can visit this link:

[Home Rental](https://home-rental-frontend.vercel.app/)
